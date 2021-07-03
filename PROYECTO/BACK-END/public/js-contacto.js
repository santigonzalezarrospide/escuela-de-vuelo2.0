document.getElementById('button').addEventListener('click', obtenerInfo);

function obtenerInfo(){

    fetch('http://localhost:3000/contacto',{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nomb: document.getElementById('Nomb').value,
            Corr: document.getElementById('Corr').value,
            Tel: document.getElementById('Tel').value,
            mensa: document.getElementById('mensa').value 
        })
    }) .then(function(respuesta){
        console.log(respuesta);
    })

    document.getElementById('Nomb').value ="";
    document.getElementById('Corr').value ="";
    document.getElementById('Tel').value ="";
    document.getElementById('mensa').value ="";
    let mensaje = document.getElementById('mensaje');
    mensaje.innerHTML ='NOS CONTACTAREMOS CON USTED A LA BREVEDAD'
    alert('PRESIONE ACEPTAR PARA ENVIAR CORRECTAMENTE')
};