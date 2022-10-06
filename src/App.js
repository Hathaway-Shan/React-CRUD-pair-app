import './App.css';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Pets from './components/PetList';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/pets" component={Pets} />
        <Route path="*" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
