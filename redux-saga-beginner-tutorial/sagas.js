import { delay } from "redux-saga";
import { select, all, put, call, takeEvery, take } from "redux-saga/effects";

function* authorize(user, password) {
  try {
    const token = yield call("FAKE_API.authorize", user, password);
    yield put({ type: "LOGIN_SUCCESS", token });
    return token;
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  }
}

function* loginFlow() {
  while (true) {
    const { user, password } = yield take("LOGIN_REQUEST");
    const token = yield call(authorize, user, password);
    if (token) {
      yield call("FAKE_API.storeItem", { token });
      yield take("LOGOUT");
      yield call("FAKE_API.clearItem");
    }
  }
}

function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();
    console.log("action", action);
    console.log("state after", state);
  });
}

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
