const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName:String,
    teamPin:String,
    partyID:String,
    singers:[String]
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

module.exports = mongoose.model('Team',teamSchema);