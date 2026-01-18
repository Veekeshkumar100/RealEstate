import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:{ type: String, required: true, unique: true },
    password: { type: String, required: true },
},{ timestamps: true });


userSchema.pre("save",async function(next){
    //  if(!this.isModified("password")) return next();
   this.password= await bcrypt.hash(this.password, 12);
//    next();
})
 
 userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
 }
 userSchema.methods.generateAuthToken = function(){
    // Implement token generation logic here (e.g., using JWT)
    return  jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
 }

const User = mongoose.model('User', userSchema);
export default User;