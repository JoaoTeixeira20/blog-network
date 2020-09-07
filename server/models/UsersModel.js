const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const saltRounds = 10

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false
  }
},{
  timestamps: true,
})

//condition to hash a password when inserted to database
userSchema.pre('save', async function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    const hashedPassword = await bcrypt.hash(document.password, saltRounds);
    document.password = hashedPassword;
    next();
  }
});

//condition to validade if a password is correct
userSchema.methods.isCorrectPassword = async function(password){
  const result = await bcrypt.compareSync(password, this.password)
  return result
}

const Users = mongoose.model('User',userSchema);

module.exports = Users