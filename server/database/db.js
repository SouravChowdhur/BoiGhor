import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "boighor_database"
    }).then(()=>{
        console.log("BoiGhor Database Connected Successfully🤩!!!")
    }).catch(err=>{
        console.log("Error occurred connecting to database😑!!!", err)
    })
}