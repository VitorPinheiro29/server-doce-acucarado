const express = require('express');
const mongoose = require('mongoose');

const Recipe = mongoose.model("Recipe");

const router = express.Router();

router.post('/register-recipe', async (req, res) => {
    const {title} = req.body;

    try {

        if (await Recipe.findOne({title}))
            
        return res.status(400).send({error: 'Essa receita já existe. Tente outro título por favor'});
        const recipe = await Recipe.create(req.body);

        return res.send(recipe);
        } catch (err){
            return res.status(404).json({error: "Não foi possível cadastrar a receita"});
    }
});
    router.post('/authenticate-recipe', async (req, res) => {
        //Validação do usuário. Ver se ele existe. Login de fato
        const {title} = req.body;

        
        const recipe = await Recipe.findOne({title});//pra validar a receita, ele vai achar "findOne" o título dela

        if (!recipe) {
            return res.status(400).send({error: 'Receita não encontrada'});
        }
        
        res.send(recipe); //se deu tudo certo, com o título, retorna a receita pra ele
    }
),

module.exports = app => app.use('/recipe', router);