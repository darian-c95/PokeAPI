import { guardarPokemonEnLocalStorage, traerPokemonDeLocalStorage } from "../storage/pokemonStorage.js";
import { obtenerPokemonApi, mostrarPokemon } from "../pokedex.js";
import { mapearPokemon } from "../mapeadores/pokemon.js";  
import { getAbilities } from "./getAbilities.js";


export async function cargarPokemon(nombrePokemonClickeado) {

  if (nombrePokemonClickeado === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }

  let pokemon;

  try {
    pokemon = traerPokemonDeLocalStorage(nombrePokemonClickeado);  
  } catch (e) {
    const pokemonData = await obtenerPokemonApi(nombrePokemonClickeado);
    pokemon = mapearPokemon(pokemonData);
    pokemon.abilities = await getAbilities(pokemon);  
    guardarPokemonEnLocalStorage(nombrePokemonClickeado, pokemon); 
  }

  return mostrarPokemon(pokemon);
}