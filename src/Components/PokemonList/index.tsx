import { getPokemonList } from "../../api/getPokemonList";
import { useQuery } from "react-query";
import { PokemonListItem } from "../../models/pokemon-list-item";
import {
  Card,
  Columns,
  Container,
  Heading,
  Image,
  Media,
} from "react-bulma-components";
import TypeTag from "../TypeTag";

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
        {data.map(({ name, id, types }: PokemonListItem) => (
          <Columns.Column key={id}>
            <Card style={{ width: 300 }} className="is-clickable">
              <Card.Content>
                <Media>
                  <Media.Item>
                    <Heading className="is-capitalized" size={5}>
                      {name}
                    </Heading>
                    <Heading subtitle size={6}>
                      {types.map((type) => (
                        <TypeTag name={type.name}></TypeTag>
                      ))}
                    </Heading>
                  </Media.Item>
                  <Media.Item align="right">
                    <Image size={96} src={`sprites/${name}.png`} alt={name} />
                  </Media.Item>
                </Media>
              </Card.Content>
            </Card>
          </Columns.Column>
        ))}
      </Columns>
    </Container>
  ) : null;
};

export default PokemonList;
