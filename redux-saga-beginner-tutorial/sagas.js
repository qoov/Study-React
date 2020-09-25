import { delay } from "redux-saga";
import { all, put, call, takeEvery } from "redux-saga/effects";

export function* incrementAsync() {
  console.log("before delay");
  yield call(delay, 1000);
  console.log("after delay");
  yield put({ type: "INCREMENT" });
  console.log("put type increment");
}

export function* watchIncrementAsync() {
  console.log("gen watchIncrementAsync");
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
