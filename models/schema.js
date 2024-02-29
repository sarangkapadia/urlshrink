const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlPairs: {
        type: Map,
        of: String,
        required: true
    }
});

const urlModel = mongoose.model('urlModel', urlSchema, 'Urls');
module.exports = urlModel;