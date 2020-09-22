const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model("User");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

//Gerando o Token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, 
    });//sessão expira em 1 dia
};

    /**router.get('/users', async (req, res) => {
        const {page = 1} = req.query; //fazer o "?page=2"

        //const users = await User.paginate({/*condições*///}//, //{page, limit: 10}); 

      //  return res.json(users);
   // });

    //router.get('/users/:id', async (req, res) => {
       // const user = await User.findById(req.params.id); //pegar o id que coloquei na rota

        //return res.json(user);
   // });

    router.post('/register', async (req, res) => {
        //Criação de Usuários
        const {email} = req.body;

        try {
            if (await User.findOne({email}))
                return res.status(400).send({error: 'O usuário já existe'});

            const user = await User.create(req.body); //req.body é oq eu escrevo no corpo json do Insomnia

            user.password = undefined; //a senha não vai voltar pro usuário

            return res.send({
                user,
                token: generateToken({ id: user.id }),
            });
        } catch (err) {
            return res.status(400).json({error: 'Login falhou'});
        }
    });

    router.put('/users/:id', async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        //req.params.id é pra pegar o item em específico e req.body é onde vamos modificá-lo
        //new:true  é pra voltar o usuário atualizado

        return res.json(user);
    }); 

    router.delete('/users/:id', async (req, res) => {
        await User.findByIdAndRemove (req.params.id);

        return res.send('Parabéns, você deletou com sucesso!');
    });

    function generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400, 
        });//sessão expira em 1 dia
    };
    
        router.post('/authenticate', async (req, res) => {
            //Validação do usuário. Ver se ele existe. Login de fato
            const {email, password} = req.body;
    
            
            const user = await User.findOne({email}).select('+password');//pra validar a entrada do usuário, ele vai achar "findOne" o email e o password
            //Validando o email
            if (!user) {
                return res.status(400).send({error: 'Usuário não encontrado'});
            }
            
            //Validando a senha
            if (!await bcrypt.compare(password, user.password)) {//"password (usuário colocou) é igual ao user.passowrd?"
                return res.status(400).send({error: 'Senha inválida'});
            }
    
            user.password = undefined;
            
            res.send({user, 
                token: generateToken({id: user.id}),
            }); //se deu tudo certo, com o email e senha, retorna o usuário pra ele
        }
    )

    module.exports = app => app.use('/user', router);