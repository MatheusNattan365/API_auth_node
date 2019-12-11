const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const config = require('../config');

// Funçãa createUserTokenWithUserId
const createUserToken = userId => {
    return jwt.sign({ id: userId }, config.jwt_secret_key, { expiresIn: config.jwt_expires });
}

module.exports = {
    async store(req, res) {
        let { email, password } = req.body
        if (!email || !password) return res.send('Dados insuficientes');
    
        try {
            const findUser = await Users.findOne({ email });
            if (findUser) return res.send({ error: 'Usuário já cadastrado!' });
    
            const newUser = await Users.create(req.body);
    
            return res.send({ newUser, token: createUserToken(newUser.id) });
    
        } catch (error) {
            return res.send({ error: 'Erro ao cadastrar!' });
        }
    }
};
