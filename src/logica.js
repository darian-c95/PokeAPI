import {obtenerPokemones} from './pokeapi.js';
import {pokemonCaracteristicas} from './ui.js';

export let contador = 1;
let secondCircle = document.querySelector('#second-circle');
let firstCircle = document.querySelector('#first-circle');

export function imagenes(pokemon) {
  obtenerPokemones(pokemon).then((r) => {
      let imagenFrontal = r.sprites.front_default;
      let imagenTrasera = r.sprites.back_default;
      mostrarFotoTrasera(imagenTrasera);
      mostrarFotoFrontal(imagenFrontal);
  });
}


function mostrarFotoTrasera(fotoTrasera) {
    document.querySelector('.fa-chevron-right').onclick = function(e) {
     $("#front_default").attr({
       src: fotoTrasera,
       title: "jQuery",
       alt: "jQuery Logo"
     });
  
     secondCircle.style.opacity = 1;
     firstCircle.style.opacity = 0.4;
   }
}
  

function mostrarFotoFrontal(fotoFrontal) {
    document.querySelector('.fa-chevron-left').onclick = function(e) {
      $("#front_default").attr({
        src: fotoFrontal,
        title: "Imagen Frontal",
        alt: "Imagen que muestra el frente del pokemon"
      });
      
      secondCircle.style.opacity = 0.4;
      firstCircle.style.opacity = 1;
    }
}


export function traeNombredePokemones() {
    for(let i = 9; i <= 898; i++) {
      obtenerPokemones(i).then((r) => {
        let namePokemon = r.forms[0].name;
        let namePokemonUppercase = namePokemon[0].toUpperCase() + namePokemon.slice(1);  
        creaListaConNombres(namePokemonUppercase);
      });
    } 
}
  
function creaListaConNombres(nombreMayuscula) {
    $(`<li><a class='nav-link'>${nombreMayuscula}</a></li>`).appendTo( "#pokemon-list" );
}


export function irASiguienteCarta() {
    document.querySelector('#next').onclick = function(e) {
      contador++;
      pokemonCaracteristicas(contador);
      imagenes(contador);
      secondCircle.style.opacity = 0.4;
      firstCircle.style.opacity = 1;
    }
}
  
  
export function irACartaAnterior() {
    document.querySelector('#back').onclick = function() {
      contador--;
      if (contador === 0) {
        contador = 1;
      }
      pokemonCaracteristicas(contador);
      imagenes(contador)
      secondCircle.style.opacity = 0.4;
      firstCircle.style.opacity = 1;
    }
}


export function buscarPokemonPorNombre() {
    document.querySelector('#button-search').onclick = function() {
      let pokemonName = document.querySelector('#search-pokemon').value;
      pokemonCaracteristicas(pokemonName);
      imagenes(pokemonName);
    }
  }
// buscarPokemonPorNombre(); Esta llamada se hace en index.js 

export function pokemonListaClickeado() {
    document.querySelector('#pokemon-list').onclick = function(e) {
      let anchorClick = (e.target.textContent).toLocaleLowerCase();
      secondCircle.style.opacity = 0.4;
      firstCircle.style.opacity = 1;
      pokemonCaracteristicas(anchorClick);
      imagenes(anchorClick);
    }
}