const mongoose = require('mongoose');
const mongoosePaginate =  require('mongoose-paginate');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

//Criptando a senha
UserSchema.pre('save',async function(next) {
    const hash = await bcrypt.hash(this.password, 10); //10 é o número de criptações
    this.password = hash;

    next();
})

//Paginação. A cada 10 itens, muda de página, no index
UserSchema.plugin(mongoosePaginate);

mongoose.model("User", UserSchema);