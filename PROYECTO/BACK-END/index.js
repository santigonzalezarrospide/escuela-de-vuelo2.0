const express = require ('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require ('body-parser');

var nodemailer = require ('nodemailer');
const { JsonWebToken } = require('jsonwebtoken');

const authRouter = require('./routes/auth');
const vuelos = require ('./routes/vuelos');

const { verifyToken } = require('./middlewares/jwt-validate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRouter);
app.use('/agenda', vuelos);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'santiago.g.a16@gmail.com',
        pass: ''
    }
})

app.post('/contacto', function (req, res){
    console.log("endpoint contacto", req.body.Nomb + req.body.Corr +req.body.Tel + req.body.mensa);
    var mailOptions = {
        from:'satiago.g.a16@gmail.com',
        to: 'escuelaDeVuelo2021@hotmail.com', // pass: escuela1234
        subject:'Contacto de:' + req.body.Nomb, 'Email:': + req.body.Corr, 'Tel:': + req.body.Tel,
        text: req.body.mensa
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.send(error)
        } else{
            console.log('email sent' + info.response);
            res.send('exito')
        }
    });
});


app.get('/agenda', (req, res) => {

    res.send({
      agenda: listaDeAgenda
    })
  })
  
  app.post('/agenda', verifyToken, (req, res) => {
  
    const name = req.body.name;
    const apell = req.body.apell;
    const tel = req.body.tel;
    const mail = req.body.mail;
    const dia = req.body.dia;
    const mes = req.body.mes;
    const hora = req.body.hora;
    const vuelo = req.body.vuelo;
  
    const nuevoVuelo = {
        name: name, 
        apell: apell,
        tel: tel,
        mail: mail,
        dia: dia,
        mes: mes,
        hora: hora,
        vuelo: vuelo,


     
    }
  
    listaDeAgenda.push(nuevoVuelo);
  
    res.send({
      tareas: listaDeAgenda,
      tareaNueva: nuevoVuelo,
    })
  })



app.listen(PORT, function () {
    console.log('El servidor quedo corriendo en el puerto ' + PORT)
});

