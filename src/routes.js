const express = require('express');
const routes = express.Router();

// Imported controllers
const authControllers = require('./controllers/authControllers');
const createUserCrontroller = require('./controllers/createUserControllers');
const protectedRoutesController = require('./controllers/protectedRoutesControllers');

// Imported middlewares
const authToken = require('./middlewares/authToken');


// ------------------------------------ ROUTES 

// Rota para teste
routes.get('/public', (req,res) => {
    return res.send({message: 'GET root'})
});


// Rota de Login de usuários!               -------------------- LOGIN!
routes.post('/login', authControllers.index);

// Rota de criação de usuários!             -------------------- REGISTRATION!
routes.post('/createuser', createUserCrontroller.store);

// Rotas protegidas!                        -------------------- PROTECTED!
routes.get('/protected', authToken, protectedRoutesController.index)

module.exports = routes;