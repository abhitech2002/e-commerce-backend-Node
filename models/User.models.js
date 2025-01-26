const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    address: {
        type : String,
        default : ''
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "vendor"],
        default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
