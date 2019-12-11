module.exports = {
    async index(req, res) {
        console.log(res.locals.auth_data)
        return res.send({ message: 'Bem vindo a Rota Protegida!' })
    }
}