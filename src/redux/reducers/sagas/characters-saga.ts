import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
};

type ApiResponse = {
  results: Character[];
};

type ResponseGenerator = {
  config?: unknown;
  data?: ApiResponse;
  headers?: unknown;
  request?: unknown;
  status?: number;
  statusText?: string;
};

async function getCharacters() {
  return await axios.get<ApiResponse>("https://rickandmortyapi.com/api/character");
}

function* getCharactersSaga() {
  try {
    const response: ResponseGenerator = yield call(getCharacters);
    if (response.data) {
      yield put({ type: "GET_CHARACTERS", payload: response.data.results });
    }
  } catch (error) {
    console.log("Deu ruim ao buscar personagens");
  }
}

export default all([takeLatest("GET_CHARACTERS_SAGA", getCharactersSaga)]);
