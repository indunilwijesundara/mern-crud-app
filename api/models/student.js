const mongoose = require('mongoose');

 const Schema = mongoose.Schema;
 
 const studentSchema = new Schema({

    fname:{
        type:String,
        required:true,   
    },
    lname:{
        type:String,
        required:true,   
    },
    contactnumber:{
        type:Number,
        required:true,   
    },
    nationalId:{
        type:String,
        required:true,   
    },
    email:{
        type:String,
        required:true,   
    },
    subjects:{
        type:String,
        required:true,   
    },
    dateOfBirth:{
        type:Date,
        required:true,   
    },
  
 })

 const Student = mongoose.model("Student",studentSchema);

 module.exports = Student;