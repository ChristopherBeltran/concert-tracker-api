const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Concert = require("./concert");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  concerts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concert"
  }],
  /* tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ], */
}, {
  timestamps: true,
});

userSchema.virtual("userConcerts", {
  ref: "Concert",
  localField: "_id",
  foreignField: "user",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET
  );

  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found, unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password incorrect, unable to login");
  }

  return user;
};
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//will run whenever a user deletes their account, will then delete their corresponding tasks
userSchema.pre("remove", async function (next) {
  const user = this;
  await Concert.deleteMany({
    owner: user._id,
  });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;