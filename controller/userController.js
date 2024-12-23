const User = require("../models/userModel");

const findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.json(e);
  }
};

const save = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.start(201).json(user);
  } catch (e) {
    res.json(e);
  }
};

const findById = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }
    catch(e){
        res.json(e)
    }
}

const deleteById = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted")
    }
    catch(e){
        res.json(e)
    }
}

const update = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json("Data Updated")
    }
    catch(e){
        res.json(e)
    }
}

module.exports = {
    findAll, 
    save,
    findById,
    deleteById,
    update
}
