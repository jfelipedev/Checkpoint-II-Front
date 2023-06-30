import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

type Characters = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
};

type ResponseGenerator = {
  config?: unknown;
  data?: Characters;
  headers?: unknown;
  request?: unknown;
  status?: number;
  statusText?: string;
};

async function getCharacters() {
  return await axios.get("https://rickandmortyapi.com/api/character");
}

function* getCharactersSaga() {
  try {
    const response: ResponseGenerator = yield call(getCharacters);
    yield put({ type: "GET_CHARACTERS", payload: response.data.results });
    console.log(response.data);
  } catch (error) {
    console.log("Deu ruim ao buscar personagens");
  }
}

export default all([takeLatest("GET_CHARACTERS_SAGA", getCharactersSaga)]);
