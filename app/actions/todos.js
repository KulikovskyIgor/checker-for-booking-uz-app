import * as types from '../constants/ActionTypes';
import * as bookingApi from '../api/booking';

export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text };
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}

export const fetchTrains = (from, to, date, time) => dispatch => {
  return bookingApi.fetchTrains("2200001", "2218000", "2018-12-21", "00:00")
  .then((res) => res.json())
  .then(data => {
			console.log("​data", data)
    })
    .catch(e => {
			console.log("​e", e)
    })
};
