const mongoose = require('mongoose');
const mongoosePaginate =  require('mongoose-paginate');

const RecipeSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    /*img: {
        type: String,
        required: true
    },*/

    ingredients: {
        type: String,
        required: true
    },

    preparation: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

mongoose.model("Recipe", RecipeSchema);