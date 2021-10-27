import { Tag } from "react-bulma-components";
import { PokemonType } from "../../models/pokemon-type";

const TypeTag = ({ name }: PokemonType) => {
  return <Tag className="is-capitalized mr-1">{name}</Tag>;
};

export default TypeTag;
