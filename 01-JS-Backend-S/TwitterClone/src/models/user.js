import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/serverConfig.js";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

}, { timestamps: true })

userSchema.pre('save', function (next) {
    const user = this
    const SALT = bcrypt.genSaltSync(9);
    const hashPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashPassword;
    next();
})

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate() {
    const token = jwt.sign({ id: this._id, email: this.email }, JWT_SECRET, {
        expiresIn: '1h'
    })
    return token;
}

const User = model("User", userSchema);

export default User;