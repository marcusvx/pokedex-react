import React from "react";
import { useQuery } from "react-query";
import "./App.css";
import Spinner from "./Components/Spinner";
import notFound from "./psyduck-confused.gif";

const App = () => {
  const pathname = window.location.pathname;
  const firstPokemon = pathname.replace("/", "") || "pikachu";

  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";

  const { isLoading, error, data } = useQuery("pokeData", () =>
    fetch(pokeApiUrl + firstPokemon).then((res) => {
      if (res.status == 404) {
        throw new Error("Not Found");
      }
      return res.json();
    })
  );

  const navigate = (id: number, direction: string) => {
    const path = direction == "next" ? id + 1 : id - 1;
    window.location.replace(window.location.origin + `/${path}`);
  };

  if (error) {
    return (
      <div>
        <img src={notFound}></img>
        <p>Não encontrado</p>
      </div>
    );
  }

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className="App">
      <header className="App-header"></header>
      <h2 className="capitalize">{data?.name}</h2>
      <p>#{data?.id}</p>
      <p>
        Types:
        <ul>
          {data?.types.map((t: any) => (
            <li>{t.type.name}</li>
          ))}
        </ul>
      </p>
      <div>
        {isLoading ? (
          "Carregando"
        ) : (
          <img
            src={data?.sprites.other["official-artwork"].front_default}
          ></img>
        )}
      </div>
      <button onClick={() => navigate(data?.id, "previous")}>
        {"<"} Anterior
      </button>
      <button onClick={() => navigate(data?.id, "next")}>Próximo {">"}</button>
    </div>
  );
};

export default App;
