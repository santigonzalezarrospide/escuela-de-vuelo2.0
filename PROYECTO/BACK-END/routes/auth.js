const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {TOKEN_SECRET, verifyToken}  = require ('../middlewares/jwt-validate.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});


router.post('/register', async (req, res) =>{

  if(req.body.mail  && req.body.password){

    if ( /^\S+@\S+\.\S+$/.test(req.body.mail) === false){
      return res.status(400).json({success: false, massage: 'Formato de mail incorrecto'});
    }
    
    const existeUser = usuarios.find((u) =>{
      return u.mail === req.body.mail;
    });

    if (existeUser){
      return res.status(400).json({success: false, massage: 'Mail repetido'});
    }
    
    const salt = await bcrypt.genSalt(10);
    console.log('salt', salt)
    const password = await bcrypt.hash(req.body.password, salt) ;
    
    const newUser = {
  
      mail: req.body.mail,
      password: password
    }

    usuarios.push(newUser);

    res.json({success: true, newUser});
  }
  else{
    res.status(400).json({success: false, massage: 'Faltan datos (requeridos mail, password)'})
  }
});


router.post('/login',   async (req, res) =>{

  const user = usuarios.find((u) => u.mail === req.body.mail);
  if (!user) {
    return res.status(400).json({ error: 'Usuario no encontrado'})
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({error: 'Contraseña no valida'});
  }

  const token = jwt.sign({
    name: user.name,
    mail: user.mail
  }, TOKEN_SECRET)

  res.json({error: null, data: 'Login exitoso', token});
})

router.get('/usuarios', verifyToken, (req, res) =>{

  console.log(req.user);

  res.json({error: null, usuarios})
})

module.exports = router;


const usuarios = [
  {
    name: "Santiago",
    mail: "escuelaDeVuelo2021@hotmail.com",
    password: "$2b$10$AR8.IsOr4HROnPAagS4pfez.ragNjOFxGsiSblA0rT80rPjWBunPy" //escuela1234
  }
];
