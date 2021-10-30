import { getPokemonList } from "../../api/getPokemonList";
import { useQuery } from "react-query";
import { PokemonListItem } from "../../models/pokemon-list-item";
import { Columns, Container } from "react-bulma-components";
import PokemonCard from "../PokemonCard";

const PokemonList = () => {
  const { isLoading, error, data } = useQuery("pokemonList", () =>
    getPokemonList()
  );
  if (isLoading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error</>;
  }

  return data ? (
    <Container>
      <Columns>
        {data.map(({ id, name, types }: PokemonListItem) => (
          <Columns.Column key={id}>
            <PokemonCard id={id} name={name} types={types}></PokemonCard>
          </Columns.Column>
        ))}
      </Columns>
    </Container>
  ) : null;
};

export default PokemonList;
