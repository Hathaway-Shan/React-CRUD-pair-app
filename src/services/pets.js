import { checkError, client } from './client';

export async function getPets() {
  const response = await client.from('pets').select('*');

  return checkError(response);
}

export async function getPetById(id) {
  const response = await client.from('pets').select('*').match({ id }).single();

  return checkError(response);
}
