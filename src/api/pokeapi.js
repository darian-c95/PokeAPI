const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function obtenerPokemones() {

  const resp = await fetch(`${BASE_URL}?limit=5000&offset=0`);
  
  return resp;
  
} 

export async function obtenerPokemon(id) {
  
  if (id === undefined || id ===  null) {
    throw new Error('Se necesita pasar el nombre del pokemón para hacer el request');
  }

  const resp = await fetch(`${BASE_URL}/${id}`);
  
  return resp; 

} 