import {obtenerPokemones, obtenerPokemon} from './api/pokeapi.js';
import { guardarPokemonEnLocalStorage, traerPokemonDeLocalStorage } from './storage/pokemonStorage.js';
import {imagenFrontal, pokemonAltura, pokemonexperienciaBase, pokemonHabilidades, pokemonPeso, pokemonTipo, tituloCarta} from './ui/ui.js';

let primerCirculo = document.querySelector('#primer-circulo');
let segundoCirculo = document.querySelector('#segundo-circulo');

export function nombreMayuscula(nombre) {
  return nombre[0].toUpperCase() + nombre.slice(1);
}
 
export function cambiaOpacidadSegundoCirculo() {
  primerCirculo.style.opacity = 1;
  segundoCirculo.style.opacity = 0.4;
}

function cambiaOpacidadPrimerCirculo() {
  primerCirculo.style.opacity = 0.4;
  segundoCirculo.style.opacity = 1;
}

function totalPokemonesEnPokedex(respuestaApi) {
  document.querySelector('.card span').textContent = respuestaApi.count;
}

export async function creaListaPokemones() {
  document.querySelector('#pokemon-list p').innerHTML = ''

  const respuesta = await obtenerPokemones();
  const pokemonesTotalLista = respuesta.results.map((pokemon) => pokemon.name); 
  totalPokemonesEnPokedex(respuesta);

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
}

export function buscarPokemonPorNombre() {
  document.querySelector('#boton-buscar').onclick = function() {
    let nombrePokemon = document.querySelector('#input-buscar-pokemon').value; 
    obtenerPokemonApi(nombrePokemon.toLowerCase())  
    
    for(let i = 0; i <= 1117; i++) {
      let nombrePoke = document.querySelectorAll('a')[i].innerText
      if(nombreMayuscula(nombrePokemon) === nombrePoke) { 
        if(document.querySelector('.item-activo') !== null) {
          document.querySelector('.item-activo').classList.remove('item-activo') 
            }
            return document.querySelectorAll('a')[i].className = 'item-activo';
          }
      }
  }
}

function mostrarIconos() {
  document.querySelector('.circle-cont').style.display = 'block';
  document.querySelector('.fa-chevron-right').style.display = 'block';
  document.querySelector('.fa-chevron-left').style.display = 'block';
}

export function pokemonListaClickeado() {
  document.querySelector('#pokemon-list').onclick = function(e) { 
    e.preventDefault();
    mostrarIconos();

    let $elementoConClaseItemActivo = document.querySelector('.item-activo') 
    if($elementoConClaseItemActivo !== null) {
      $elementoConClaseItemActivo.classList.remove('item-activo');
      $elementoConClaseItemActivo.className = 'nav-link';
    }

    const {target} = e 
    target.className = 'item-activo';
    const pokemonClickLista = target.getAttribute('href'); 
    
    if(pokemonClickLista) {
      try { 
        return manejadorDeData(traerPokemonDeLocalStorage(pokemonClickLista));
      } catch (e) {
        return obtenerPokemonApi(pokemonClickLista); 
      } 
    } 
  }
}

async function obtenerPokemonApi(pokemon) { 
  const respuestaPokemonApi = await obtenerPokemon(pokemon) 
  
  guardarPokemonEnLocalStorage(respuestaPokemonApi) 

  return manejadorDeData(respuestaPokemonApi);
}

function manejadorDeData(dataPokemon) { 
  imagenes(dataPokemon.sprites);
  tituloCarta(dataPokemon.name);
  imagenFrontal(dataPokemon.sprites.front_default)
  pokemonPeso(dataPokemon.weight)
  pokemonAltura(dataPokemon.height)
  pokemonexperienciaBase(dataPokemon.base_experience)
  pokemonHabilidades(dataPokemon) 
  pokemonTipo(dataPokemon)   
} 

function imagenes(pokemonImagen) {  
  let imagenFrontal = pokemonImagen.front_default;
  let imagenTrasera = pokemonImagen.back_default; 
  mostrarFotoTrasera(imagenTrasera);
  mostrarFotoFrontal(imagenFrontal);
}; 

function mostrarFotoTrasera(fotoTrasera) {
  document.querySelector('.fa-chevron-right').onclick = function(e) {  
    let $imagen = document.querySelector('#front_default');
    $imagen.src = fotoTrasera;
    $imagen.setAttribute('alt', 'foto trasera de pokemon'); 
    
    cambiaOpacidadPrimerCirculo();
  }
}

function mostrarFotoFrontal(fotoFrontal) {
  document.querySelector('.fa-chevron-left').onclick = function(e) {
    let $imagen = document.querySelector('#front_default');
    $imagen.src = fotoFrontal;
    $imagen.setAttribute('alt', 'foto delantera de pokemon') 
    
    cambiaOpacidadSegundoCirculo();
  }
} 
