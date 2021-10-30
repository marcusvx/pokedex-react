import { useQuery } from "react-query";
import { getPokemon } from "../../api/getPokemon";
import { Pokemon } from "../../models/pokemon";
import notFound from "../../assets/psyduck-confused.gif";
import Spinner from "../Spinner";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Container, Heading, Level } from "react-bulma-components";
import TypeTag from "../TypeTag";

const PokemonDetail = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const history = useHistory();
  const { isLoading, error, data } = useQuery<Pokemon>(
    ["pokemonDetail", pokemonId],
    () => getPokemon(pokemonId)
  );

  const handleClick = async (id: number) => {
    history.push(`/pokemon/${id}`);
  };

  if (error) {
    return (
      <div>
        <img src={notFound} alt="Not Found"></img>
        <p>Not Found</p>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return data ? (
    <Container>
      <Box backgroundColor="white-bis"    >
        <Heading className="is-capitalized">{data.name}</Heading>
        <Heading subtitle>No. {data.id}</Heading>
        <div>
          <TypeTag types={data.types}></TypeTag>
          <div>
            {isLoading ? (
              "Carregando"
            ) : (
              <img src={data.artwork.frontDefault} alt={data.name}></img>
            )}
          </div>
        </div>
      </Box>
      <Box>
        <Level>
          <Level.Side>
            <Level.Item>
              <Button
                className="button"
                onClick={() => handleClick(data.id - 1)}
              >
                {"<"} Previous
              </Button>
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <Button
                className="button"
                onClick={() => handleClick(data.id + 1)}
              >
                Next {">"}
              </Button>
            </Level.Item>
          </Level.Side>
        </Level>
      </Box>
    </Container>
  ) : null;
};

export default PokemonDetail;
