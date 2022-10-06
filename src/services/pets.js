import { checkError, client } from './client';

export async function getPets() {
  const response = await client.from('pets').select('*');
  return checkError(response);
}