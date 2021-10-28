import axios from "axios";
import { PokemonListItem } from "../models/pokemon-list-item";
import { GraphQLClient, gql } from "graphql-request";

const POKEAPI_GRAPHQL_URL = "https://beta.pokeapi.co/graphql/v1beta";
const graphQLClient = new GraphQLClient(POKEAPI_GRAPHQL_URL);

interface PokemonListResponse {
  pokemon_v2_pokemon: Array<{
    id: number;
    name: string;
    pokemon_v2_pokemontypes: Array<{ pokemon_v2_type: { name: string } }>;
  }>;
}

export const getPokemonList = async (
  name: string = "",
  limit: number = 150,
  offset: number = 0
) => {
  const result = await graphQLClient
    .request<PokemonListResponse>(
      gql`
        query getPokemons($limit: Int!, $offset: Int!, $name: String!) {
          pokemon_v2_pokemon(
            where: { name: { _regex: $name } }
            limit: $limit
            offset: $offset
          ) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
        }
      `,
      { name, limit, offset }
    )
    .then((response: PokemonListResponse) => {
      const result: PokemonListItem[] = response.pokemon_v2_pokemon.map(
        (item) => {
          return {
            id: item.id,
            name: item.name,
            types: item.pokemon_v2_pokemontypes.map((type) => ({
              name: type.pokemon_v2_type.name,
            })),
          } as PokemonListItem;
        }
      );
      return result;
    });

  return result;
};
