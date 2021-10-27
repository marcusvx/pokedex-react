import MainNavbar from "./components/MainNavbar";
import PokemonDetail from "./components/PokemonDetail";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
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
          <Route path="/">
            <PokemonList />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default App;
