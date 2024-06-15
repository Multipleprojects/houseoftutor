const Studentdetail = require('../Models/Student_detail');
const csv = require('csvtojson');
const Importstudent = async (req, res) => {
    try {
        const userData = [];
    let updatemessage='';
        // Parse CSV file
        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                // Get File data
                for (let row of response) {
                      // Check for empty required fields
            // if (!row.name || !row.fname || !row.cnic || !row.fcnic || !row.semester || !row.reg_number || !row.cgpa) {
            //     return res.status(400).json("Error: Missing required fields in CSV data");
            // }
             // Check if reg_number is already processed in the current batch
                    // Check if reg_number already exists
                    const existingStudent = await Studentdetail.findOne({ reg_number: row.reg_number });
                    if (existingStudent) {
                        // Update existing document
                        existingStudent.semester = row.semester;
                        existingStudent.cgpa = row.cgpa;
                        await existingStudent.save();
                  updatemessage="studentdata updated success"     
                    } 
                    else {
                        // Store file data in schema
                        userData.push({
                            name: row.name,
                            fname: row.fname,
                            cnic: row.cnic,
                            fcnic: row.fcnic,
                            semester: row.semester,
                            reg_number: row.reg_number,
                            cgpa: row.cgpa
                        });
                    }
                }
                  
                // Insert new parsed data into MongoDB
                if (userData.length > 0) {
                    await Studentdetail.insertMany(userData);
                }
                // Respond with success message
                res.status(200).json(`Student detail CSV file imported successfully && ${updatemessage}`);
updatemessage='';
            });
    } catch (error) {
        // Handle errors
        console.error("Error occurred in Controller", error);
        res.status(200).json("Error occurred in Controller");
    }
};
//Delete data by id
const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Delete the user from MongoDB
        await Studentdetail.findByIdAndDelete(userId);
        // Respond with success message
        res.status(200).json("User deleted successfully");
    } catch (error) {
        // Handle errors
        console.error("Error occurred in deleting user", error);
        res.status(500).json("Error occurred in deleting user");
    }
};
//display data
const Display=async(req,res)=>{
    try{
const disp=await Studentdetail.find();
res.status(200).json(disp)
    }
    catch(err){console.log("error occure display method")}
}
//Get by id
 const Getbyid=async(req,res)=>{
     try {
         const userId = req.params.id;
         // Find the user by ID in MongoDB
         const userData = await Studentdetail.findById(userId);
         // If user data found, send it as response
         if (userData) {
             res.status(200).json(userData);
         } else {
             // If user data not found, send 404 Not Found response
             res.status(404).json({ message: `User with ID '${userId}' not found` });
         }
     } catch (error) {
         // Handle errors
         console.error("Error occurred in getting user by ID", error);
                  res.status(500).json("Error occurred in getting user by ID");
    }
 };
 // Update user data by ID
// const UpdateUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const userDataToUpdate = req.body; // Assuming request body contains updated user data
//         // Find the user by ID in MongoDB and update it
//         const updatedUserData = await Studentdetail.findByIdAndUpdate(userId, userDataToUpdate, { new: true });
//         // If user data updated successfully, send updated data as response
//         if (updatedUserData) {
//             res.status(200).json(updatedUserData);
//         } else {
//             // If user data not found, send 404 Not Found response
//             res.status(404).json(`User with ID '${userId}' not found`);
//         }
//     } catch (error) {
//         // Handle errors
//         console.error("Error occurred in updating user", error);
//         res.status(500).json("Error occurred in updating user");
//     }
// };
// Delete all users
const DeleteAllUsers = async (req, res) => {
    try {
        // Delete all users from MongoDB
        await Studentdetail.deleteMany({});
        // Respond with success message
        res.status(200).json("All users deleted successfully");
    } catch (error) {
        // Handle errors
        console.error("Error occurred in deleting all users", error);
        res.status(500).json("Error occurred in deleting all users");
    }
};
module.exports = { Importstudent, Display, DeleteAllUsers, Getbyid, DeleteUser };