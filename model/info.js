const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    }
})


module.exports = new mongoose.model('News', newsSchema);