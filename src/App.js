import './App.css';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth/:type" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
