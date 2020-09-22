const mongoose = require('mongoose');

const User = mongoose.model("User");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

//Gerando o token
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