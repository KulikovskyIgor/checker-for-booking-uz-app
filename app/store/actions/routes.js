import * as bookingApi from '../api/booking';
import { createPayloadAction, createAsyncAction, createActionTypes, createAsyncActionTypes } from '../../utils/actionCreator';
import { getValidRoutes } from '../selectors/routes';

const ACTION_NAMESPACE = "ROUTES"

export const ACTIONS = createActionTypes(ACTION_NAMESPACE, {
  SET_ROUTE: "SET_ROUTE",
  SET_ROUTE_DATA: "SET_ROUTE_DATA",
  SET_ROUTE_UPDATED_DATA: "SET_ROUTE_UPDATED_DATA",
});

export const setRoute = route => createPayloadAction(ACTIONS.SET_ROUTE, route);

export const setRouteData = data => createPayloadAction(ACTIONS.SET_ROUTE_DATA, data);

export const setRouteUpdatedData = data => createPayloadAction(ACTIONS.SET_ROUTE_UPDATED_DATA, data);

export const fetchRouteTrains = ({ url, data, from, to, date, time }) => dispatch => {
	console.log("​url", url)
  bookingApi.fetchTrains(from, to, date, time)
  .then((res) => res.json())
  .then((res) => {
    const payload = { url, ...res };

    if (data) {
      dispatch(setRouteUpdatedData(payload));
    } else {
      dispatch(setRouteData(payload));
    }
  });
};

export const fetchRoutesTrains = () => (dispatch, getState) => {
  const validRoutes = getValidRoutes(getState());
  validRoutes.forEach(route => {
		console.log("​fetchRoutesTrains -> route", route)
    dispatch(fetchRouteTrains(route));
  });
};
