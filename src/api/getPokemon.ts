import axios from "axios";
import { Pokemon } from "../models/pokemon";
import { PokemonType } from "../models/pokemon-type";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

interface PokemonResponse {
  id: number;
  name: string;
  sprites: { other: { [key: string]: any } };
  types: Array<{ type: PokemonType }>;
}

export const getPokemon = async (nameOrId: string | number) => {
  const pokemon = await axios
    .get<PokemonResponse>(`${POKEAPI_URL}/${nameOrId}`)
    .then((res) => {
      const { data } = res;

      return {
        id: data.id as number,
        name: data.name,
        artwork: {
          frontDefault: data.sprites.other["official-artwork"].front_default,
        },
        types: data.types.map((t) => t.type),
      } as Pokemon;
    });

  return pokemon;
};
