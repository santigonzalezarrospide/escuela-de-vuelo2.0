const agendaUL = document.getElementById('agenda');
const botonAgendar = document.getElementById('agendar');
const completarNombre = document.getElementById('name');
const completarApellido = document.getElementById('apell');
const completarTelefono = document.getElementById('tel');
const completarEmail = document.getElementById('mail');
const completarDia = document.getElementById('dia');
const completarMes = document.getElementById('mes');
const completarHora = document.getElementById('hora');
const completarTipoDeVuelo = document.getElementById('vuelo');

function agendarVuelo(Nombre, Apellido, Telefono, Email, Dia, Mes, Hora, TipoDeVuelo){

    const nuevoVuelo = document.createElement('li');
    nuevoVuelo.textContent = Nombre;
    agendaUL.appendChild(nuevoVuelo);

    const elementoApellido = document.createElement('li');
    elementoApellido.textContent = Apellido;
    agendaUL.appendChild(elementoApellido);

    const elementoTelefono = document.createElement('li');
    elementoTelefono.textContent = Telefono;
    agendaUL.appendChild(elementoTelefono);

    const elementoEmail = document.createElement('li');
    elementoEmail.textContent = Email;
    agendaUL.appendChild(elementoEmail);

    const elementoDia = document.createElement('li');
    elementoDia.textContent = Dia;
    agendaUL.appendChild(elementoDia);
   
    const elementoMes = document.createElement('li');
    elementoMes.textContent = Mes;
    agendaUL.appendChild(elementoMes);

    const elementoHora = document.createElement('li');
    elementoHora.textContent = Hora;
    agendaUL.appendChild(elementoHora);

    const elementoTipoDeVuelo = document.createElement('li');
    elementoTipoDeVuelo.textContent = TipoDeVuelo;
    agendaUL.appendChild(elementoTipoDeVuelo);
}

botonAgendar.addEventListener('click', function(){

    fetch("http://localhost:3000/vuelos/agenda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({Nombre: completarNombre.value,
        Apellido:  completarApellido.value,
        Telefono: completarTelefono.value, 
        Email: completarEmail.value, 
        Dia: completarDia.value, 
        Mes: completarMes.value, 
        Hora: completarHora.value,
        TipoDeVuelo: completarTipoDeVuelo.value
    })
  }).then(function(respuesta) {
    return respuesta.json();
  })
  .then(function (respuestaJSON) {
    const nuevoVuelo = respuestaJSON.nuevoVuelo;
    
    agendarVuelo(nuevoVuelo.Nombre,
        nuevoVuelo.Apellido, 
        nuevoVuelo.Telefono,
        nuevoVuelo.Email,
        nuevoVuelo.Dia,
        nuevoVuelo.Mes,
        nuevoVuelo.Hora,
        nuevoVuelo.TipoDeVuelo);
  })
    agendarVuelo(completarNombre.value,
        completarApellido.value,
        completarTelefono.value,
        completarEmail.value,
        completarDia.value,
        completarMes.value,
        completarHora.value,
        completarTipoDeVuelo.value,
        botonAgendar.value);
    completarNombre.value = "";
    completarApellido.value = "";
    completarTelefono.value = "";
    completarEmail.value = "";
    completarDia.value = "";
    completarMes.value = "";
    completarHora.value = "";
    completarTipoDeVuelo.value = "";
    botonAgendar.value = "";
    alert('PRESIONE ACEPTAR PARA AGENDAR CORRECTAMENTE')


});    
fetch("http://localhost:3000/vuelos/agenda", {
  method:"GET",
}) .then(function (respuesta){
  console.log (respuesta);
  return respuesta.json();

}).then(function (respuestaJSON){
  const vuelos = respuestaJSON
  const cantiadadDeVuelos = vuelos.length;

  for(i = 0; i < cantiadadDeVuelos; i++) {
    agendarVuelo(vuelos[i].name, vuelos[i].apell, vuelos[i].tel, vuelos[i].mail, 
      vuelos[i].dia, vuelos[i].mes, vuelos[i].hora, vuelos[i].TipoDeVuelo)
  }

})
