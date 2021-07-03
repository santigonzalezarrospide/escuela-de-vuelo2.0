const botonLogin = document.getElementById("login");

const mailElement = document.getElementById("mail");
const passwordElement = document.getElementById("password");

botonLogin.addEventListener("click", function () {
    const mail = mailElement.value;
    const password = passwordElement.value;

    if (mail && password){
      
      const objetoBody = {
        mail: mail,
        password: password
      };

      fetch('http://localhost:3000/auth/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objetoBody)
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response);

        if (response.error) {
          alert ('Ocurrió un error');
        } else {
          alert ('Login Exitoso');
          localStorage.setItem('jwt', response.token);
        }

      });
}
else {
  alert('Falta completar campos')
}

});
