//um middleware é um meio de caminho entre a requisição e a resposta. Ou seja, antes de dar
//a resposta, o servidor vai analisar isso. É como regra. Nesse caso, o usuário só vai 
//prosseguir para a próxima página, caso o token esteja correto

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({error: 'Token não informado'})
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        return res.status(401).send({error: "Token error"})
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: 'Token com formato errado'})
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({error: 'Token inválido'});
        }

        req.userId = decoded.id;

        return next();
    })
 }