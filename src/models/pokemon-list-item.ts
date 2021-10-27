import { PokemonType } from "./pokemon-type";

export interface PokemonListItem {
  name: string;
  id: number;
  types: PokemonType[];
}
