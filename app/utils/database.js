import mongoose from "mongoose"

const connectDB = async() => {

    try{
        await mongoose.connect("mongodb+srv://aramakitaketo:aramakitaketo@cluster0.qxoiv2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("readDB:success")

    }catch(err){
        console.log("readDB:failure", err)
        throw new Error()
    }
}

export default connectDB


//mongodb+srv://aramakitaketo:aramakitaketo@cluster0.qxoiv2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0