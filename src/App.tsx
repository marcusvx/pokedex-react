import MainNavbar from "./Components/MainNavbar";
import PokemonDetail from "./Components/PokemonDetail";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonList from "./Components/PokemonList";
import "bulma/css/bulma.min.css";

const App = () => {
  return (
    <Router>
      <MainNavbar></MainNavbar>

      <section className="main">
        <Switch>
          <Route path="/pokemon/:pokemonId">
            <PokemonDetail></PokemonDetail>
          </Route>
          <Route exact path="/">
            <PokemonList />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default App;
