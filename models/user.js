const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miniproject');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  profilepic: {
    type : String,
    default : "profile.png"
  },
  password: String,
  posts: [   // ✅ rename to 'posts' (plural) for clarity
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    }
  ]
});

module.exports = mongoose.model('user', userSchema);
