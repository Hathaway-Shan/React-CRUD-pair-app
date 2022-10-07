import PetCard from '../components/PetCard';
import { checkError, client } from './client';

export async function getPets() {
  const response = await client.from('pets').select('*');

  return checkError(response);
}

export async function getPetById(id) {
  const response = await client.from('pets').select('*').match({ id }).single();

  return checkError(response);
}

export async function addPet(name, species, description) {
  const response = await client
    .from('pets')
    .insert([{ name, species, description }])
    .order('id', { ascending: true })
    .single();
  return checkError(response);
}

export async function updatePet(pet) {
  const response = await client.from('pets').update(pet).match({ id: pet.id });
  console.log(response.data);
  return checkError(response);
}