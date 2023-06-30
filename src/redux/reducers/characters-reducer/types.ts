export type Characters = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
};
export type State = {
  characters: Array<Characters>;
};

export type Action = {
  type: string;
  payload?: any;
};
