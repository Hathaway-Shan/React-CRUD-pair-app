import { useContext, useState } from 'react';
import { UserContext } from '../context/context';

export default function PetForm({ submit }) {
  const { name, setName, species, setSpecies, description, setDescription } = useContext(UserContext);

  // const [nameInput, setNameInput] = useState(name);
  // const [speciesInput, setSpeciesInput] = useState(species);
  // const [descriptionInput, setDescriptionInput] = useState(description);


  return (
    <form className="pet-form">
      <label>
            Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
            Species:
        <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
      </label>
      <label>
            Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button className="save-button" onClick={submit}>
        Save
      </button>
    </form>
  );
}