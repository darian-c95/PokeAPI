import {nombreMayuscula} from '../pokedex.js'; 


export function imagenes(imagenTrasera, imagenFrontal) {    

  mostrarFotoTrasera(imagenTrasera);
  mostrarFotoFrontal(imagenFrontal);
  clickBotonIzquierdo(imagenFrontal);

}; 


function mostrarFotoTrasera(fotoTrasera) {

  document.querySelector('.fa-chevron-right').onclick = function(e) {  
    let $imagen = document.querySelector('#front_default');
    $imagen.src = fotoTrasera;
    $imagen.setAttribute('alt', 'foto trasera de pokemon'); 
    
    cambiaOpacidadPrimerCirculo();
  }
};


function mostrarFotoFrontal(fotoFrontal) {

  let $imagen = document.querySelector('#front_default');
  $imagen.src = fotoFrontal;
  $imagen.setAttribute('alt', 'foto delantera de pokemon');

  cambiaOpacidadSegundoCirculo();
};


function clickBotonIzquierdo(imagenFrontal) {
  
  document.querySelector('.fa-chevron-left').onclick = function(e) {
    mostrarFotoFrontal(imagenFrontal);
    cambiaOpacidadSegundoCirculo();
  }
};


let primerCirculo = document.querySelector('#primer-circulo');
let segundoCirculo = document.querySelector('#segundo-circulo');


function cambiaOpacidadSegundoCirculo() {
  primerCirculo.style.opacity = 1;
  segundoCirculo.style.opacity = 0.4;
};


function cambiaOpacidadPrimerCirculo() {
  primerCirculo.style.opacity = 0.4;
  segundoCirculo.style.opacity = 1;
};

export function mostrarIconos() {
  document.querySelector('.circle-cont').style.display = 'block';
  document.querySelector('.fa-chevron-right').style.display = 'block';
  document.querySelector('.fa-chevron-left').style.display = 'block';
};


export function tituloCarta(nombreDePokemon) {
  document.querySelector('h2').textContent = nombreMayuscula(nombreDePokemon);
}; 


export function pokemonTipo(dataPokemon) { 

  let arrayPokemonTipos = dataPokemon;

  const $tipos = document.querySelector('#tipos');
  $tipos.innerHTML = '';
  $tipos.textContent = 'Types:';

  arrayPokemonTipos.forEach(tipo => {
    const $tipo = document.createElement('span');
    $tipo.textContent = `${tipo} `;
    $tipo.className = `${tipo} badge`;
    $tipos.appendChild($tipo);
  }); 
};


export function pokemonHabilidades(arrayAbilityDescriptionAndName) {   

  arrayAbilityDescriptionAndName.forEach((ability, i) => { 

    let $totalHabilidades = document.querySelector('#total-habilidades');
  
    document.querySelector('#contenedor-habilidades h3').textContent = 'Abilities';
  
    let $nombreHabilidad = document.createElement('p');
    $nombreHabilidad.textContent = `${nombreMayuscula(ability[0])}: `; 
    $nombreHabilidad.className = `habilidad-${i}`;
    $totalHabilidades.appendChild($nombreHabilidad);
  
    const $texto = document.createElement('span');
    $texto.textContent = ability[1];
    let $nameAbility = document.querySelector(`.habilidad-${i}`);
    $nameAbility.appendChild($texto);

  })
};


export function pokemonAltura(respuesta) {
  document.querySelector('#altura').textContent = `Height: ${respuesta}cm`; 
};


export function pokemonPeso(respuesta) {
  document.querySelector('#peso').textContent = `Weight: ${respuesta}g`; 
};


export function pokemonexperienciaBase(respuesta) {
  document.querySelector('#experiencia_base').textContent = `Base Experience: ${respuesta}`;  
};