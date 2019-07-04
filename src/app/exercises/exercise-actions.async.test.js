import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import * as exerciseActions from './exercise-actions';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions} from '../misc/utils';

describe('exercise-action async actions', () => {
  const userId = 'userId';
  const workoutId = 'workoutId';
  const {EXERCISE_GET_REQUEST, EXERCISE_ERROR} = exerciseActions;
  const mockStore = configMockStore([thunk]);

  describe('getExercises', () => {
    const {EXERCISE_GET_SUCCESS, getExercises} = exerciseActions;
    const store = mockStore({auth: {userId}});

    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    });

    it('dispatches the correct actions on success fetch response', () => {
      fetch.mockResponse(JSON.stringify([]));

      
      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout/${workoutId}/exercises`;
      const expectedActions = [
        {type: EXERCISE_GET_REQUEST},
        {type: EXERCISE_GET_SUCCESS, exercises: []}
      ];

      return store.dispatch(getExercises(workoutId))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[0]).not.toEqual(wrongUrl);

          expect(fetchArgs[1]).toEqual(fetchOptions('GET'));
          expect(fetchArgs[1]).not.toEqual(fetchOptions('POST'));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on a failed fetch response', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: EXERCISE_GET_REQUEST},
        {type: EXERCISE_ERROR, error}
      ];

      return store.dispatch(getExercises(workoutId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('addExercise', () => {
    const {
      EXERCISE_ADD_REQUEST,EXERCISE_ADD_SUCCESS, 
      addExercise
    } = exerciseActions;

    const store = mockStore({auth: {userId}});

    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    });

    it('dispatches the correct actions on success fetch response', () => {
      fetch.mockResponse(JSON.stringify({message: 'success'}));

      const data = {exerciseName: 'push ups'};

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout/${workoutId}`;
      const expectedActions = [
        {type: EXERCISE_ADD_REQUEST},
        {type: EXERCISE_ADD_SUCCESS},
        {type: EXERCISE_GET_REQUEST}
      ];

      return store.dispatch(addExercise(workoutId, data))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[0]).not.toEqual(wrongUrl);

          expect(fetchArgs[1]).toEqual(fetchOptions('POST', data));
          expect(fetchArgs[1]).not.toEqual(fetchOptions('PUT', data));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on a failed fetch response', () => {
      const data = {exerciseName: 'sit ups'};

      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: EXERCISE_ADD_REQUEST},
        {type: EXERCISE_ERROR, error}
      ];

      return store.dispatch(addExercise(workoutId, data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('editExercise', () => {
    const {
      EXERCISE_EDIT_REQUEST ,EXERCISE_EDIT_SUCCESS, 
      editExercise
    } = exerciseActions;
    const store = mockStore({auth: {userId}});
    const data = {exerciseName: 'pull ups'};
    const exerciseId = 'exerciseId';

    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    });

    it('dispatches the correct actions on success fetch response', () => {
      fetch.mockResponse(JSON.stringify({message: 'success'}));

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout/${workoutId}/exercise/${exerciseId}`;
      const expectedActions = [
        {type: EXERCISE_EDIT_REQUEST},
        {type: EXERCISE_EDIT_SUCCESS},
        {type: EXERCISE_GET_REQUEST}
      ];

      return store.dispatch(editExercise(workoutId, exerciseId, data))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[0]).not.toEqual(wrongUrl);

          expect(fetchArgs[1]).toEqual(fetchOptions('PUT', data));
          expect(fetchArgs[1]).not.toEqual(fetchOptions('POST', data));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on a failed fetch response', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: EXERCISE_EDIT_REQUEST},
        {type: EXERCISE_ERROR, error}
      ];

      return store.dispatch(editExercise(workoutId, exerciseId, data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('deleteExercise', () => {
    const {
      EXERCISE_DELETE_REQUEST ,EXERCISE_DELETE_SUCCESS, 
      deleteExercise
    } = exerciseActions;
    const store = mockStore({auth: {userId}});
    const data = {exerciseName: 'pull ups'};
    const exerciseId = 'exerciseId';

    afterEach(() => {
      store.clearActions();
      fetch.mockReset();
    });

    it('dispatches the correct actions on success fetch response', () => {
      fetch.mockResponse(JSON.stringify({message: 'success'}));

      const expectedUrl = `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`;
      const wrongUrl = `${API_BASE_URL}/users/${userId}/workout/${workoutId}/exercise/${exerciseId}`;
      const expectedActions = [
        {type: EXERCISE_DELETE_REQUEST},
        {type: EXERCISE_DELETE_SUCCESS},
        {type: EXERCISE_GET_REQUEST}
      ];

      return store.dispatch(deleteExercise(workoutId, exerciseId))
        .then(() => {
          expect(fetch).toHaveBeenCalled();

          const fetchArgs = fetch.mock.calls[0];

          expect(fetchArgs[0]).toEqual(expectedUrl);
          expect(fetchArgs[0]).not.toEqual(wrongUrl);

          expect(fetchArgs[1]).toEqual(fetchOptions('DELETE'));
          expect(fetchArgs[1]).not.toEqual(fetchOptions('POST'));

          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches the correct actions on a failed fetch response', () => {
      const error = {message: 'failed request'};
      fetch.mockReject(error);

      const expectedActions = [
        {type: EXERCISE_DELETE_REQUEST},
        {type: EXERCISE_ERROR, error}
      ];

      return store.dispatch(deleteExercise(workoutId, exerciseId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});