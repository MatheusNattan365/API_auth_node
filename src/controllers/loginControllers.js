// index, show, store, update, destroy
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Funçãa createUserTokenWithUserId
const createUserToken = userId => {
    return jwt.sign({ id: userId }, config.jwt_secret_key, { expiresIn: config.jwt_expires });
}

module.exports = {
    async index(req, res) {
        const { email, password } = req.body;
        if (!email || !password) return res.send({ error: 'Dados insuficientes' });
        try {
            const user = await Users.findOne({ email }).select('+password');
            if (!user) return res.send({ error: 'Usuário não encontrado!' });
    
            bcrypt.compare(password, user.password, (error, same) => {
                if (!same) return res.send({ error: 'Senha inválida' });
    
                user.password = undefined;
                return res.send({ user, token: createUserToken(user.id) });
            })
        } catch (error) {
            return res.send({ error: 'Usuário não autenticado' });
        }
    }
};
