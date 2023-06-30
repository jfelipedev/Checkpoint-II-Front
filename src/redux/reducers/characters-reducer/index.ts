import { Action, State } from "./types";

const INITIAL_STATE: State = {
  characters: [],
};

export default function charactersReducer(state = INITIAL_STATE, action: Action) {
  if (action.type === "GET_CHARACTERS") {
    return {...state, characters: action.payload};
  }
  return state;
}
