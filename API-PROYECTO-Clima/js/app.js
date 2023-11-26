const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        //hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    // consultar la API

    consultarAPI(ciudad, pais);
}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    //crear una alerta
    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py3',
            'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class = "font-block">Error!</strong>
        <span class="block">${mensaje}</span>
        `

        container.appendChild(alerta);

        //se elimina la alerta despues de 3s
        setTimeout(() => {
            alerta.remove()
        }, 3000);

    }

}

function consultarAPI(ciudad, pais) {

    const appId = 'eaf9fe06f599d6b4d81b31fd3639c8e2'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},
    ${pais}&appid=${appId}`;

    Spinner(); // muestra spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML();//limpia el html previo
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }

            // imprime la respuesta en el HTML
            mostrarCLima(datos);
        })
}

function mostrarCLima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max : ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMimima = document.createElement('p');
    tempMimima.innerHTML = `Min : ${min} &#8451;`;
    tempMimima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMimima);


    resultado.appendChild(resultadoDiv);

}

function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);

}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}