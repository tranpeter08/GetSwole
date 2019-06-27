import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import * as workoutActions from './workout-actions';
import {generateWorkouts} from './workout-actions.test';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions} from '../misc/utils';

describe('workout-actions async actions', () => {
  const {WORKOUT_GET_REQUEST, WORKOUT_GET_SUCCESS, WORKOUT_ERROR} = workoutActions;
  const middlewares = [thunk];
  const mockStore = configMockStore(middlewares);
  const userId = 'fakeUser1234';
  const state = {auth: {userId}};

  describe('getWorkouts', () => {
    const {getWorkouts} = workoutActions;
    const store = mockStore(state);

    beforeEach(() => {
      fetch.resetMocks();
      store.clearActions();
    });

    it('dispatches the correct actions on successful fetch request', () => {
      let workouts = generateWorkouts(3);

      fetch.mockResponse(JSON.stringify(workouts));

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout`;

      const expectedActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_GET_SUCCESS, workouts}
      ];
      const wrongActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_GET_SUCCESS}
      ];
      
      return store.dispatch(getWorkouts())
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).not.toEqual(wrongUrl);
          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[1]).not.toEqual(fetchOptions('POST'));
          expect(fetchArgs[1]).toEqual(fetchOptions('GET'));

          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions);
          expect(actionStack).toEqual(expectedActions);
        });
    });

    it('dispatches the right actions on a failed fetch request', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_ERROR, error}
      ];
      const wrongActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_GET_SUCCESS}
      ];

      return store.dispatch(getWorkouts())
        .then(() => {
          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions)
          expect(actionStack).toEqual(expectedActions);
        });
    });
  });

  describe('addWorkout', () => {
    const {
      addWorkout, 
      WORKOUT_ADD_REQUEST, WORKOUT_ADD_SUCCESS, WORKOUT_GET_SUCCESS
    } = workoutActions;

    const store = mockStore(state);

    beforeEach(() => {
      fetch.resetMocks();
      store.clearActions();
    });

    it('dispatches the correct actions on successful fetch request', () => {
      const data = {workoutName: 'Leg day'};

      fetch.mockResponse(JSON.stringify({message: 'Success!'}));

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout`;

      const expectedActions = [
        {type: WORKOUT_ADD_REQUEST},
        {type: WORKOUT_ADD_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];

      const wrongActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_GET_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];
      
      return store.dispatch(addWorkout(data))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).not.toEqual(wrongUrl);
          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[1]).not.toEqual(fetchOptions('PUT', data));
          expect(fetchArgs[1]).toEqual(fetchOptions('POST', data));

          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions);
          expect(actionStack).toEqual(expectedActions);
        });
    });

    it('dispatches the right actions on a failed fetch request', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: WORKOUT_ADD_REQUEST},
        {type: WORKOUT_ERROR, error}
      ];
      const wrongActions = [
        {type: WORKOUT_ADD_REQUEST},
        {type: WORKOUT_ADD_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];

      return store.dispatch(addWorkout())
        .then(() => {
          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions);
          expect(actionStack).toEqual(expectedActions);
        });
    });
  });

  describe('editWorkout', () => {
    const {
      editWorkout,
      WORKOUT_EDIT_REQUEST, WORKOUT_EDIT_SUCCESS, WORKOUT_GET_SUCCESS
    } = workoutActions;

    const store = mockStore(state);

    beforeEach(() => {
      fetch.resetMocks();
      store.clearActions();
    });

    it('dispatches the correct actions on successful fetch request', () => {
      const data = {workoutName: 'Chest day'};
      const workoutId = '100abcd';

      fetch.mockResponse(JSON.stringify({message: 'Success!'}));

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout`;

      const expectedActions = [
        {type: WORKOUT_EDIT_REQUEST},
        {type: WORKOUT_EDIT_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];

      const wrongActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_GET_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];
      
      return store.dispatch(editWorkout(data, workoutId))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).not.toEqual(wrongUrl);
          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[1]).not.toEqual(fetchOptions('POST', data));
          expect(fetchArgs[1]).toEqual(fetchOptions('PUT', data));

          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions);
          expect(actionStack).toEqual(expectedActions);
        });
    });

    it('dispatches the right actions on a failed fetch request', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: WORKOUT_EDIT_REQUEST},
        {type: WORKOUT_ERROR, error}
      ];
      const wrongActions = [
        {type: WORKOUT_EDIT_REQUEST},
        {type: WORKOUT_EDIT_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];

      return store.dispatch(editWorkout())
        .then(() => {
          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions)
          expect(actionStack).toEqual(expectedActions);
        });
    });
  });

  describe('deleteWorkout', () => {
    const {
      deleteWorkout, 
      WORKOUT_DELETE_REQUEST, WORKOUT_DELETE_SUCCESS
    } = workoutActions;

    const store = mockStore(state);

    beforeEach(() => {
      fetch.resetMocks();
      store.clearActions();
    });

    it('dispatches the correct actions on successful fetch request', () => {
      const workoutId = '100abcd';

      fetch.mockResponse(JSON.stringify({message: 'Success!'}));

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout`;

      const expectedActions = [
        {type: WORKOUT_DELETE_REQUEST},
        {type: WORKOUT_DELETE_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];

      const wrongActions = [
        {type: WORKOUT_GET_REQUEST},
        {type: WORKOUT_GET_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];
      
      return store.dispatch(deleteWorkout(workoutId))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).not.toEqual(wrongUrl);
          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[1]).not.toEqual(fetchOptions('PUT'));
          expect(fetchArgs[1]).toEqual(fetchOptions('DELETE'));

          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions);
          expect(actionStack).toEqual(expectedActions);
        });
    });

    it('dispatches the right actions on a failed fetch request', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: WORKOUT_DELETE_REQUEST},
        {type: WORKOUT_ERROR, error}
      ];
      const wrongActions = [
        {type: WORKOUT_DELETE_REQUEST},
        {type: WORKOUT_DELETE_SUCCESS},
        {type: WORKOUT_GET_REQUEST}
      ];

      return store.dispatch(deleteWorkout())
        .then(() => {
          const actionStack = store.getActions();

          expect(actionStack).not.toEqual(wrongActions)
          expect(actionStack).toEqual(expectedActions);
        });
    });
  });
});