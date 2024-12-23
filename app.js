const express= require("express")
const connectDB= require("./config/db")
const app= express();
const userRoute= require("./routes/userRoute")


connectDB();

app.use(express.json());

app.use("/api/user",userRoute);


const port = 3001;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})

