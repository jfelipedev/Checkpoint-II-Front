import "./styles.css"
type Props = {
  url: string;
  name: string;
};

function CardsComp(props: Props) {
  return (
    <div className="card">
      <div className="img-card"><img src={props.url} alt="" /></div>
      <h1>{props.name}</h1>
    </div>
  );
}

export default CardsComp;
