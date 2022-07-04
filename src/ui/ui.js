import {nombreMayuscula} from '../pokedex.js'; 

export function imagenes(pokemonImagen) {  

  let imagenFrontal = pokemonImagen.front_default;
  let imagenTrasera = pokemonImagen.back_default;
   
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
  $imagen.setAttribute('alt', 'foto delantera de pokemon') 

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
  
  let arrayPokemonTipo = [];
  dataPokemon.forEach(tipo => arrayPokemonTipo.push(tipo.type.name))

  const $tipos = document.querySelector('#tipos');
  $tipos.innerHTML = ''
  $tipos.textContent = 'Tipo:'

  arrayPokemonTipo.forEach(tipo => {
    const $tipo = document.createElement('span');
    $tipo.textContent = `${tipo} `;
    $tipo.className = `${tipo} badge`
    $tipos.appendChild($tipo);
  }); 
};


export function pokemonHabilidades(dataPokemon) { 

  document.querySelector('#contenedor-habilidades h3').textContent = 'Habilidades'
  let $totalHabilidades = document.querySelector('#total-habilidades')

  $totalHabilidades.innerHTML = '';
  let kontador = 0
  dataPokemon.forEach(habilidad => { 
    kontador++
    let $nombreHabilidad = document.createElement('p');
    $nombreHabilidad.textContent = `${nombreMayuscula(habilidad.ability.name)}: `; 
    $nombreHabilidad.className = `habilidad-${kontador}`
    $totalHabilidades.appendChild($nombreHabilidad);
  })
  
  let count = 0;
  dataPokemon.forEach(habilidad => fetch(habilidad.ability.url)
  .then((respuesta) => respuesta.json())
  .then((r) => {    
      count++
      const $texto = document.createElement('span');
      $texto.textContent = (r.flavor_text_entries.filter(cada => cada.language.name === 'es')[0].flavor_text);
      let $nameAbility = document.querySelector(`.habilidad-${count}`)
      $nameAbility.appendChild($texto)
  }))
};

export function pokemonAltura(respuesta) {
  document.querySelector('#altura').textContent = `Altura: ${respuesta}cm`; 
};

export function pokemonPeso(respuesta) {
  document.querySelector('#peso').textContent = `Peso: ${respuesta}g`; 
};

export function pokemonexperienciaBase(respuesta) {
  document.querySelector('#experiencia_base').textContent = `Experiencia Base: ${respuesta}`;  
};