import {
  Card,
  Columns,
  Container,
  Heading,
  Image,
  Media,
} from "react-bulma-components";
import TypeTag from "../TypeTag";
import { PokemonListItem } from "../../models/pokemon-list-item";
import { PokemonType } from "../../models/pokemon-type";
import { COLORS } from "../../utils/type-colors";
import { Link } from "react-router-dom";

interface PokemonItemProps {
  id: number;
  name: string;
  types: ReadonlyArray<PokemonType>;
}

const PokemonCard = ({ id, name, types }: PokemonItemProps) => {
  return (
    <Card style={{ width: 250 }} backgroundColor="white-bis">
      <Card.Header>
        <Card.Header.Title className="is-capitalized">
          <Link className="is-size-5" to={`pokemon/${id}`}>
            {name}
          </Link>
        </Card.Header.Title>
        <Card.Header.Icon>
          <span className="has-text-grey is-size-6">#{id}</span>
        </Card.Header.Icon>
      </Card.Header>
      <Card.Content>
        <Media>
          <Media.Item>
            <TypeTag types={types}></TypeTag>
          </Media.Item>
        </Media>
        <Media>
          <Media.Item>
            <Link to={`pokemon/${id}`}>
              <Image
                style={{ width: "120px", margin: "0 auto" }}
                src={`sprites/${name}.png`}
                alt={name}
              />
            </Link>
          </Media.Item>
        </Media>
      </Card.Content>
    </Card>
  );
};

export default PokemonCard;
