 

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export function obtenerPokemones(pokemon = '1') {
  return fetch(`${BASE_URL}/${pokemon}`)
    .then((r) => r.json())
} 
 
 