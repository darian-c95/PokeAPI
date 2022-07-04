import { obtenerPokemones, obtenerPokemon } from './api/pokeapi.js';
import { guardarPokemonEnLocalStorage, traerPokemonDeLocalStorage } from './storage/pokemonStorage.js';
import { imagenes, mostrarIconos, pokemonAltura, pokemonexperienciaBase, pokemonHabilidades, pokemonPeso, pokemonTipo, tituloCarta } from './ui/ui.js';


class Pokemon {

  constructor(data) {

    this.name = data.name; 
    this.img = data.sprites; 
    this.weight = data.weight; 
    this.height = data.height; 
    this.baseExperience = data.base_experience;  
    this.abilities = data.abilities;  
    this.types = data.types;  
      
  }
   
}


function manejadorDeData(dataPokemon) {  
  
  const pokemonInstance = new Pokemon(dataPokemon); 

  imagenes(pokemonInstance.img); 
  tituloCarta(pokemonInstance.name);
  pokemonPeso(pokemonInstance.weight);
  pokemonAltura(pokemonInstance.height);
  pokemonexperienciaBase(pokemonInstance.baseExperience);
  pokemonHabilidades(pokemonInstance.abilities); 
  pokemonTipo(pokemonInstance.types); 

};


export function nombreMayuscula(nombre) {
  return nombre[0].toUpperCase() + nombre.slice(1);
};


export async function creaListaPokemones() {

  document.querySelector('#pokemon-list p').innerHTML = '';

  const respuesta = await obtenerPokemones();
  const data = await respuesta.json();
  const pokemonesTotalLista = data.results.map((pokemon) => pokemon.name);
  
  totalPokemonesEnPokedex(data); 

  pokemonesTotalLista.forEach((pokemon) => {
    const nombrePokemonMayuscula = nombreMayuscula(pokemon);
    const $lista = document.querySelector('#pokemon-list');
    const $item = document.createElement('li');
    const $ancor = document.createElement('a');
    $ancor.setAttribute('href', pokemon);
    $ancor.className = 'nav-link';

    $ancor.textContent = nombrePokemonMayuscula;
    $item.appendChild($ancor);
    $lista.appendChild($item);
  });
      
  pokemonEnListaClickeado();
  buscarPokemonPorNombre();

};


function totalPokemonesEnPokedex(respuestaApi) {
  document.querySelector('.card span').textContent = respuestaApi.count;
};


function pokemonEnListaClickeado() {

  document.querySelector('#pokemon-list').onclick = function(e) { 
    e.preventDefault();
    mostrarIconos();

    let $elementoConClaseItemActivo = document.querySelector('.item-activo') 
    if($elementoConClaseItemActivo !== null) {
      $elementoConClaseItemActivo.classList.remove('item-activo');
      $elementoConClaseItemActivo.className = 'nav-link';
    }

    const {target} = e; 
    target.className = 'item-activo';
    const nombrePokemonClickeado = target.getAttribute('href');


    return obtenerDataPokemonClickeado(nombrePokemonClickeado);
  }
};


function obtenerDataPokemonClickeado(nombrePokemonClickeado) {
  
  const dataPokemonEnLocalStorage = traerPokemonDeLocalStorage(nombrePokemonClickeado);
  
  // if(dataPokemonEnLocalStorage) { 
  //   return manejadorDeData(dataPokemonEnLocalStorage);
  // } else {  
  //   return obtenerPokemonApi(nombrePokemonClickeado); 
  // }

};


function buscarPokemonPorNombre() {

  document.querySelector('#boton-buscar').onclick = function() {
    let nombrePokemon = document.querySelector('#input-buscar-pokemon').value; 
    obtenerPokemonApi(nombrePokemon.toLowerCase());  
    
    for(let i = 0; i <= 1117; i++) {
      let nombrePoke = document.querySelectorAll('a')[i].innerText;
      
      if(nombreMayuscula(nombrePokemon) === nombrePoke) { 

        if(document.querySelector('.item-activo') !== null) {
          document.querySelector('.item-activo').classList.remove('item-activo'); 
        }
        return document.querySelectorAll('a')[i].className = 'item-activo';
      }
    }
  }
};


export async function obtenerPokemonApi(pokemon) { 
  const respuesta = await obtenerPokemon(pokemon);
  const respuestaPokemonApi = await respuesta.json(); 
  
  // guardarPokemonEnLocalStorage(respuestaPokemonApi);

  return manejadorDeData(respuestaPokemonApi);
};
