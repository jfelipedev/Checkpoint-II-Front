import { all } from "redux-saga/effects";
import getCharacters from "./characters-saga";

export default function* combineSagas(): Generator {
  return yield all([getCharacters]);
}
