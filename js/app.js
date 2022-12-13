document.addEventListener('DOMContentLoaded', function () {

  const email = {
    email: '',
    asunto: '',
    mensaje: ''
  }

  
  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');


  // Asignar eventos
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);

  formulario.addEventListener('submit', enviarEmail)

  btnReset.addEventListener('click', function (eve) {
    eve.preventDefault();

    resetForm();
  })

  function enviarEmail(eve) {
    eve.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout( () => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');
     
      resetForm();

      // Crear una alerta
      const alertaExito = document.createElement('P');
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      alertaExito.textContent = 'Mensaje enviado correctamente';

      formulario.appendChild(alertaExito);

      setTimeout( () => {
        alertaExito.remove();
      }, 3000);
    }, 3000);

  }


  function validar(eve) {
    const target = eve.target
    const elementoPadre = target.parentElement

    if (target.value.trim() === '') {
      mostrarAlerta(`El campo ${target.id} es obligatorio`, elementoPadre);
      email[target.name] = '';
      comprobarEmail();
      return;
    }
  
    if (target.id === 'email' && !validarEmail(target.value)) {
      mostrarAlerta('El email no es válido.', elementoPadre);
      email[target.name] = '';
      comprobarEmail();
      return;
    }

    limpiarAlerta(elementoPadre);

    // Asignar los valores
    email[target.name] = target.value.trim().toLowerCase();

    // Comprobar el objeto email
    comprobarEmail();
  }
  
  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    
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

  function comprobarEmail() {
    if (Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
    
  }

  
  function resetForm() {
    // Reiniciar objeto
    email.email = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();
    comprobarEmail(); 
  }



});

