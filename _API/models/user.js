const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:String,
    password:String
});

// userSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, null, null, function(err, hash) {
//         if(err) return next(err);
//         user.password = hash;
//         next();
//     });
//   });
// userSchema.methods.comparePassword = function(password){
//    return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('User',userSchema);