import { obtenerPokemones, obtenerPokemon } from './api/pokeapi.js'; 
import { mapearListadoPokemones } from './mapeadores/pokemon.js';
import { cargarPokemon } from './servicios/pokemon.js';  
import { imagenes, mostrarIconos, pokemonAltura, pokemonexperienciaBase, pokemonHabilidades, pokemonPeso, pokemonTipo, tituloCarta } from './ui/ui.js';


export async function mostrarPokemon(pokemon) {

  const { 
    name,
    imgFront,
    imgBack, 
    weight,
    height,
    baseExperience,
    types,
    abilities, 
  } = pokemon;  
    
  tituloCarta(name);
  pokemonPeso(weight);
  pokemonAltura(height);
  pokemonTipo(types); 
  pokemonHabilidades(abilities); 
  imagenes(imgBack, imgFront); 
  pokemonexperienciaBase(baseExperience);

}; 


export function nombreMayuscula(nombre) {
  return nombre[0].toUpperCase() + nombre.slice(1);
};


export async function cargarPokemones() {

  const respuesta = await obtenerPokemones();
  const data = await respuesta.json();
  
  const {total, pokemonesName} = mapearListadoPokemones(data);  
  
  pokemonEnListaClickeado();
  buscarPokemonPorNombre();
  creaListaPokemones(pokemonesName);
  totalPokemonesEnPokedex(total);
  
};


function creaListaPokemones(listaPokemones) {
  
  document.querySelector('#pokemon-list p').innerHTML = '';

  listaPokemones.forEach((pokemon) => { 
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
  
};


function totalPokemonesEnPokedex(totalPokemones) {
  document.querySelector('.card span').textContent = totalPokemones;
};


function vaciarTextoHabilidades() {
  let $totalHabilidades = document.querySelector('#total-habilidades');
  $totalHabilidades.innerHTML = '';
};


async function pokemonEnListaClickeado() {

  document.querySelector('#pokemon-list').onclick = function(e) { 
    
    e.preventDefault();
    mostrarIconos();
    vaciarTextoHabilidades();

    let $elementoConClaseItemActivo = document.querySelector('.item-activo');
    if($elementoConClaseItemActivo !== null) {
      $elementoConClaseItemActivo.classList.remove('item-activo');
      $elementoConClaseItemActivo.className = 'nav-link';
    }
    
    const {target} = e; 
    target.className = 'item-activo';
    const nombrePokemonClickeado = target.getAttribute('href');
    
    return cargarPokemon(nombrePokemonClickeado); 
  }
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

  return respuestaPokemonApi;
};
