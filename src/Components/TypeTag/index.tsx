import { Image, Tag } from "react-bulma-components";
import { PokemonType } from "../../models/pokemon-type";
import { COLORS } from "../../utils/type-colors";

const TypeTag = ({ types }: { types: ReadonlyArray<PokemonType> }) => {
  return (
    <>
      {types.map(({ name }) => (
        <Tag
          key={name}
          style={{ backgroundColor: COLORS[name], color: "#fff" }}
          className="is-capitalized mr-1"
        >
          <Image src={`/types/${name}.png`} alt={name} size={16} mr={1}></Image>
          {name}
        </Tag>
      ))}
    </>
  );
};

export default TypeTag;
