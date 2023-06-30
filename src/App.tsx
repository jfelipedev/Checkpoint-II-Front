import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { State } from "./redux/reducers/characters-reducer/types";
import { useEffect, useState } from "react";
import CardsComp from "./components/cards/cardsComp";
import "./styles.css";
import { TextInput } from "./components/filterBar/filterBarComp";
import { ChangeEvent } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const dispatch = useDispatch();
  const { characters } = useSelector<RootState, State>(
    (store) => store.charactersReducer
  );

  useEffect(() => {
    dispatch({ type: "GET_CHARACTERS_SAGA" });
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchValue(value);
    setCurrentPage(1); // Reiniciar a página ao fazer uma nova pesquisa
  };

  // Função para obter os personagens da página atual, com base no valor de pesquisa
  const getCurrentPosts = () => {
    const filteredPosts = characters.filter((character) =>
      character.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  };

  // Função para mudar a página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="main-container">
      <div>
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      <div className="card-container">
        {getCurrentPosts().map((character) => (
          <CardsComp key={character.id} url={character.image} name={character.name} />
        ))}
      </div>  
      <div className="pagination-container">
        {characters && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={characters.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}

type PaginationProps = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <button className="page-button" onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
