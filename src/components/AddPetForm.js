import { NavLink, useHistory } from 'react-router-dom';
import { addPet } from '../services/pets';
import { useContext } from 'react';
import { UserContext } from '../context/context';
import PetForm from './PetForm';



export default function AddPetForm() {
  const history = useHistory();
  const { name, setName, species, setSpecies, description, setDescription } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addPet(name, species, description);
    //   AddPetForm.reset();
      history.push('/pets');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Add New Pet</h1>
      <PetForm {...{
        name,
        setName,
        species,
        setSpecies,
        description,
        setDescription,
        submit
      }} />
      <NavLink to="/pets">Back to Pets</NavLink>
    </div>
  );
}

