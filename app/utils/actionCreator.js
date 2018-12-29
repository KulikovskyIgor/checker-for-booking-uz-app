const NAMESPACE_PREFIX = "@@";
/**
 * This is helper method which allows you create action types with specific prefix that looks like @@{namespace}/action
 * @param {Object} definitions - simple pair
 * @param {String} namespace - prefix of action
 * @returns {{}} - formatted response
 */
export const createActionTypes = (namespace, definitions) => {
  let actionTypes = {};
  for (const key in definitions) {
    let definition = definitions[key];
    if (typeof definition === "string") {
      actionTypes[key] = `${NAMESPACE_PREFIX}${namespace}/${definition}`;
    } else if (typeof definition === "object") {
      actionTypes[key] = createActionTypes(namespace, definition);
    }
  }
  return actionTypes;
};

/**
 * Helper function that define universal signature of action object
 * @param type
 * @returns {{type: *}}
 */
export const createAction = type => ({
  type,
});

export const createPayloadAction = (type, payload) => ({
  type,
  payload,
});

/**
 * This is grouping of request actions such REQUEST, SUCCESS, FAILURE
 * @typedef {Object} RequestActionTypes
 * @property {String} REQUEST - Indicates the start of async requesting.
 * @property {String} SUCCESS - Indicates success of executed request.
 * @property {String} FAILURE - Indicates failure of executed request.
 * @property {String} CLEAR - Clear reducer.
 */

const addActionSuffix = (name, suffix) => `${name}/${suffix}`;

/**
 * @param {String} name - action name
 * @returns {RequestActionTypes}
 */
export const createAsyncActionTypes = name => ({
  REQUEST: addActionSuffix(name, "REQUEST"),
  SUCCESS: addActionSuffix(name, "SUCCESS"),
  FAILURE: addActionSuffix(name, "FAILURE"),
  CLEAR: addActionSuffix(name, "CLEAR"),
});

/**
 * This is wrapper of thunk action to proceed async action based on RequestActionTypes
 * @param {function(...args)} fetch - can be as thunk action or the function that returns a promise.
 * @param {RequestActionTypes} action
 * @returns {function(...[*]): function(*=, *=)}
 */
export const createAsyncAction = (fetch, action) => (...args) => (
  dispatch,
  getState,
  extra
) => {
  const requestPayload = args.length && [...args];
  let fetchResult = fetch(...args);

  dispatch(createPayloadAction(action.REQUEST, requestPayload));
  typeof fetchResult === "function" &&
    (fetchResult = fetchResult(dispatch, getState, extra));

  return fetchResult
    .then(resultPayload => {
      dispatch(createPayloadAction(action.SUCCESS, resultPayload));

      return resultPayload;
    })
    .catch(error => {
      dispatch(
        createPayloadAction(action.FAILURE, {
          error: error.code || error,
        })
      );

      throw error;
    });
};
