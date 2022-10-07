import { useContext } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../context/context';
import usePetDetail from '../hooks/usePetDetail';
import { deletePet, updatePet } from '../services/pets';
import PetForm from './PetForm';

export default function PetDetail() {
  const { name, setName, species, setSpecies, description, setDescription, petDetail } =
    useContext(UserContext);
  const history = useHistory();
  const params = useParams();
  usePetDetail(params);

  const handleDelete = async (id) => {
    await deletePet(id);
    //redirect to /pets
    history.push('/pets');
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updatePet({ id: params.id, name, species, description });
      history.push('/pets');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };

  return (
    <div className="wrapper">
      <NavLink to="/pets">Back to Pets Page</NavLink>
      <PetForm
        {...{
          name,
          setName,
          species,
          setSpecies,
          description,
          setDescription,
          submit,
        }}
      ></PetForm>
      <button className="deletePetButton" onClick={() => handleDelete(petDetail.id)}>
        delete
      </button>
    </div>
  );
}
