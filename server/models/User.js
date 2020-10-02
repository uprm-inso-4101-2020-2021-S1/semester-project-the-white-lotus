const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * User Schema
 * This schema is provided by the mongoose package.
 * It is structured in a JSON format. The User has the
 * following properties:
 * 
 * - name: Type String, name of the User, this is a required field.
 * 
 * - addres: Type String, address of the User, can be where the User
 * lives or any other they want to input, this is not a 
 * required field.
 * 
 * - email: Type String, email address of the User that wants to register,
 * this email MUST be unique as one User can not have multiple
 * accounts with the same email, this is a required field.
 * 
 * - phone: Type String, phone number that the User wants to provide if any,
 * this property can also be used to login, this is not a required
 * field. (For the login info go to repo/server/controllers/AuthController)
 * 
 * - password: Type String, password the User want to register their account with,
 * this password will NOT be visible for anyone, even those with access
 * to the Data Base as the password will be hased. This is a required field.
 * (For more info go to repo/server/controllers/AuthController)
 * 
 * - ishost: Type boolean, decides whether the User wants to have 
 * host privilages (want because all host submissions will
 * go through revision for proper validation), this is a required
 * field.
 * 
 * - commenthistory: Type Array, this field records the history of the comments
 * the User has left on one or more places. This field has more fields
 * within it, these are:
 *  • place: Type String, this is the ID of the place that the User
 *  commented, this is a required field.
 *  • date: Type String, Date of when the comment was made, field
 *  will be filled with the Date and Time of the request automatically.
 *  • comment: Type String, Comment that the User made to the place,
 *  this is a required field.
 * 
 * - hashtags: Type Array, Hashtags that the User is following, these
 * are used to join the User into a community that follows the same
 * hashtag. This is useful for finding recommendations for such User,
 * this not a required field.
 * 
 * Elaborating more on the validations done in email and phone.
 * • email: Email provided by the User will be validated instantly
 * with a REGEX check that must contain a valid email. REGEX:
 * Any Character or Digit (many times), @, Any Character (many times),
 * ., Any Character (many times)
 * • phone: Phone provided by the User will be validated instantly
 * with a REGEX check that must contain a valid phone string. 
 * Clarifying that we not checking whether the phone number is 
 * an actual validated one, but that the format is correct.
 * REGEX: Digit (3 times), -, Digit (3 times), -, Digit (4 times)
 */
const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: false
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v){
                return /[a-zA-Z0-9\.]+@[a-zA-Z]+\.[a-zA-Z]+/.test(v);
            },
            message: props => `${props.value} is not a valid email.`
        }
    },
    phone: {
        type: String, 
        required: false, 
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String, 
        required: true
    },
    ishost: {
        type: Boolean,
        required: true
    },
    commenthistory: [{
        place: {type: String},
        date: {type: String},
        comment: {type: String}
    }],
    hashtags: {
        type: Array
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
