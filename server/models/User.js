const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String, required: true
    },
    address: {
        type: String, required: false
    },
    email: {
        type: String, required: true, unique: true,
        validate: {
            validator: function(v){
                return /[a-zA-Z0-9\.]+@[a-zA-Z]+\.[a-zA-Z]+/.test(v);
            },
            message: props => `${props.value} is not a valid email.`
        }
    },
    phone: {
        type: String, required: false, 
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String, required: true
    },
    ishost: {
        type: Boolean, required: true
    },
    commenthistory: [{
        place: {type: String},
        date: {type: Date},
        comment: {type: String}
    }],
    hashtags: {
        type: Array, required: false
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
