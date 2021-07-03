const express = require ('express');

const router = express.Router();

router.get('/agenda', (req, res) =>{
    return res.json({
        vuelos: listaDeVuelos,
        message: "lista de vuelos devuelta con exito"
    })
})

router.post('/agenda', (req, res) =>{
    const newFlight ={
        nombre: req.body.name,
        apellido: req.body.apell,
        telefono: req.body.tel,
        email: req.body.mail,
        dia: req.body.dia, 
        mes: req.body.mes, 
        hora: req.body.hora, 
        tipo: req.body.tipoDeVuelo
    }
    listaDeVuelos.push(newFlight);
    return res.json({
        vuelos: newFlight,
        message: "Agendado con exito"
    })
    
})

const listaDeVuelos = [
    {
        nombre: "Santiago",
        apellido: "Gonzalez",
        telefono: "098620",
        email: "santiago.g.a16@gmail.com",
        dia: "10", 
        mes: "julio", 
        hora: "10:30", 
        tipo: "INSTRUCCION LOCAL"
    }
]


module.exports = router;