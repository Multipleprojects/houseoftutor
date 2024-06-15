const express = require('express');
const router = express.Router();
const Login = require('../Models/Student_detail');
const Admin = require('../Models/Admin');
router.post('/', async (req, res) => {
    try {
        const { name,cnic } = req.body;

        // Check if it's a student login
        const student = await Login.findOne({ name, cnic });
        if (student) {
            res.status(200).json({message:"student dashboard", studentId:student._id});
            return; // Exit the function after sending response
        }
         // Check if it's a parent login
        const parent = await Login.findOne({ fname:name, fcnic:cnic });
        if (parent) {
            res.status(200).json({message:"parent dashboard"});
            return; // Exit the function after sending response
        }
        // Check if it's an admin login
        const admin = await Admin.findOne({ name, cnic });
        if (admin) {
            res.status(200).json({message:"admin dashboard"});
            return; // Exit the function after sending response
        }

        // If none of the above conditions match, send error response
        res.status(200).json({message:"invalid cnic or username"});
    } catch (err) {
        res.status(200).json("error occurred in user login");
    }
});
module.exports = router;