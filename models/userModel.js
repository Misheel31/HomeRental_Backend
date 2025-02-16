const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    default: null,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id, role: this.role, username: this.username }, // Add username to token payload
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // Token expiration time
    );
    this.tokens = this.tokens.concat({ token }); // Append token to tokens array
    await this.save();
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

const User = mongoose.model("users", userSchema);

module.exports = User;
