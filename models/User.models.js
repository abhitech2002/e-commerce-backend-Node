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

userSchema.pre("save", function(next) {
    if(this.isAdmin) {
        this.role = "admin";
    }
    next()
})

userSchema.pre("save", function(next) {
    if(this.isAdmin && this.role !== "admin") {
        return next(new Error("Admin must have admin role"));
    }
    next()
})

module.exports = mongoose.model("User", userSchema);
