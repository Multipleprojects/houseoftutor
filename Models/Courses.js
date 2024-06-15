const mongoose=require('mongoose')
const Course_schema=new mongoose.Schema({
    reg_number:{ type: String, unique: true },
    detail:[{
        course_title:String,
        grade:String,
        rating:Number
    }]
})
const Course_model=mongoose.model('Course_model',Course_schema)
module.exports=Course_model