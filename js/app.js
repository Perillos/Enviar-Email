document.addEventListener('DOMContentLoaded', function () {

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');


  // Asignar eventos
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar);
  inputMensaje.addEventListener('blur', validar);


  function validar(eve) {

    const elementoPadre = eve.target.parentElement

    if (eve.target.value.trim() === '') {
      mostrarAlerta(`El campo ${eve.target.id} es obligatorio`, elementoPadre);
      return;
    }

    if (!validarEmail(elementoPadre)) {
      mostrarAlerta('El email no es válido.', elementoPadre);
      return;
    }

    limpiarAlerta(elementoPadre);
  }

  function mostrarAlerta(mensaje, referencia) {
    


    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprueba si ya exite una alerta
    const alerta = referencia.querySelector('.bg-red-600');
    if(alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }





});

