import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSagas';

export function* rootSaga() {
  yield all([
    fork(authSaga),
  ]);
}
