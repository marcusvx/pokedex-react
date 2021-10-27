import { useQuery } from "react-query";
import { getPokemon } from "../../api/getPokemon";
import { Pokemon } from "../../models/pokemon";
import notFound from "../../assets/psyduck-confused.gif";
import Spinner from "../Spinner";
import { PokemonType } from "../../models/pokemon-type";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const { isLoading, error, data } = useQuery<Pokemon>("pokemonDetail", () =>
    getPokemon(pokemonId)
  );

  const navigate = (id: number, direction: string) => {
    const path = direction === "next" ? id + 1 : id - 1;
    window.location.replace(window.location.origin + `/${path}`);
  };

  if (error) {
    return (
      <div>
        <img src={notFound} alt="Not Found"></img>
        <p>Not Found</p>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return data ? (
    <div className="App">
      <header className="App-header"></header>
      <Typography
        className="pokemon-name"
        variant="h2"
        sx={{ textTransform: "capitalize" }}
      >
        {data.name}
      </Typography>
      <p>#{data.id}</p>
      <p>
        Types:
        <ul>
          {data.types.map((t: PokemonType) => (
            <li>{t.name}</li>
          ))}
        </ul>
      </p>
      <div>
        {isLoading ? (
          "Carregando"
        ) : (
          <img src={data.artwork.frontDefault} alt={data.name}></img>
        )}
      </div>
      <button onClick={() => navigate(data.id, "previous")}>
        {"<"} Previous
      </button>
      <button onClick={() => navigate(data.id, "next")}>Next {">"}</button>
    </div>
  ) : null;
};

export default PokemonDetail;
