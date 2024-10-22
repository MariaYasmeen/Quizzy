/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';
import { randomBytes, createHash } from 'crypto';
import bcrypt from 'bcryptjs';
// import { isEmail } from 'validator';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    // validate: [isEmail, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'Please confirm your password.'],
    // validate: {
    //   validator: function(val) {
    //     return val === this.password;
    //   },
    // message: 'Passwords do not match.'
    // },
    minlength: [8, 'Password must be at least 8 characters long.'],
  },
  photo: {
    type: String,
    default:
      'https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/main/file/image/user/default.jpg',
  },
  role: {
    type: String,
    enum: ['premium-user', 'user', 'admin'],
    default: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = randomBytes(32).toString('hex');

  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
