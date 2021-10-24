import { PokemonType } from "./pokemon-type";
import { OfficialArtwork, Sprite } from "./sprite";

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  artwork: OfficialArtwork;
}
