const { call } = require("redux-saga/effects");

/** wrong
const users = yield call(fetch, '/users');
const repos = yield call(fetch, '/repos');
 */

import { all, call } from "redux-saga/effects";

const [users, repos] = yield all([
  call(fetch, '/users'),
  call(fetch, '/repos'),
])
