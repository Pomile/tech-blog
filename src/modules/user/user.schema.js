import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const { Schema } = mongoose;

  export const userSchema = new Schema({
    firstName:  String, // String is shorthand for {type: String}
    lastName: String,
    email:   String,
    image: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    interest: [{ type: String, index: true }]
  }, { autoIndex: false });

userSchema.virtual('fullname').get(function() {
  return this.firstName + ' ' + this.lastName;
});

userSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.updatedAt = Date.now;
  next();
});

userSchema.pre('save', function(next) {
  const saltRounds = 10;
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.comparePassword = async (password, hash, cb) => {
  const match = await bcrypt.compare(password, hash);
  if(match) {
    return cb(null, true)
  } else {
    return cb('Password mismatch', false)
  }
};

userSchema.methods.generateJwtToken = async (user, cb) => {
  const match = await bcrypt.compare(password, hash);
  if(match) {
    return cb(null, true)
  } else {
    return cb('Password mismatch', false)
  }
};
