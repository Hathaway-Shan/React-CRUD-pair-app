import './App.css';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Pets from './components/PetList/PetList';
import PetDetail from './components/PetDetail';
import Header from './components/Header/Header';
import AddPetForm from './components/AddPetForm';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/pets/edit/:id" component={PetDetail} />
        <Route path="/pets/new" component={AddPetForm} />
        <Route path="/auth/:type" component={Auth} />
        <Route path="/pets" component={Pets} />

        <Route path="*" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
