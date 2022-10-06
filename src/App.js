import './App.css';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Pets from './components/PetList';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/pets" component={Pets} />
      </Switch>
    </div>
  );
}

export default App;
