import React from "react";
import { useQuery } from "react-query";
import { getPokemon } from "../../api/getPokemon";
import { Pokemon } from "../../models/pokemon";
import notFound from "../../assets/psyduck-confused.gif";
import Spinner from "../Spinner";
import { PokemonType } from "../../models/pokemon-type";

const PokemonDetail = () => {
  const pathname = window.location.pathname;
  const search = pathname.replace("/", "") || 1;

  const { isLoading, error, data } = useQuery<Pokemon>("pokeData", () =>
    getPokemon(search)
  );

  const navigate = (id: number, direction: string) => {
    const path = direction === "next" ? id + 1 : id - 1;
    window.location.replace(window.location.origin + `/${path}`);
  };

  if (error) {
    return (
      <div>
        <img src={notFound}></img>
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
      <h2 className="capitalize">{data.name}</h2>
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
