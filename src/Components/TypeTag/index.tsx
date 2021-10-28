import { Tag } from "react-bulma-components";
import { PokemonType } from "../../models/pokemon-type";
import { COLORS } from "../../utils/type-colors";

const TypeTag = ({ types }: { types: PokemonType[] }) => {
  return (
    <>
      {types.map(({ name }) => (
        <Tag
          key={name}
          style={{ backgroundColor: COLORS[name], color: "#fff" }}
          className="is-capitalized mr-1"
        >
          {name}
        </Tag>
      ))}
    </>
  );
};

export default TypeTag;
