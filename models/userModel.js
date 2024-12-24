const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],  
        default: 'user',
    },

    tokens:[
        {
            token :{
                type:String,
                 require:true

            }
        }
    ]

});

// generating token
  userSchema. methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch(err) {
        console.log(err);
    }
  }


const User = mongoose.model("users", userSchema)

module.exports=User;