const express = require('express');
const csv = require('csvtojson');
const CourseModel = require('../Models/Courses');
//post method
const importCourses = async (req, res) => {
    try {
        const userData = [];
        const errorMessages = [];
let update='';
        // Parse CSV file
        const response = await csv().fromFile(req.file.path);

        for (let row of response) {
            // Check if user with the same reg_number exists
            let existingUser = await CourseModel.findOne({ reg_number: row.reg_number });
            // Split courses, grades, and ratings
            const courses = row.course_title.split('\n');
            const grades = row.grade.split('\n');
            const ratings = row.rating.split('\n');
            const coursesWithGrades = courses.map((course, i) => ({
                course_title: course,
                grade: grades[i],
                rating: ratings[i]
            }));
            if (existingUser) {
                // If user exists, update the details
                existingUser.detail = coursesWithGrades;
                await existingUser.save();
            update='course data updated success'
            } else {
                // If user does not exist, create a new user
                let newUser = userData.find(user => user.reg_number === row.reg_number);
                
                if (newUser) {
                    // If reg_number exists in the new data to be inserted, add to error messages
                    errorMessages.push(`Registration number ${row.reg_number} already exists.`);
                } else {
                    userData.push({
                        reg_number: row.reg_number,
                        detail: coursesWithGrades,
                    });
                }
            }
        }

        // Insert new users if any
        if (userData.length > 0) {
            await CourseModel.insertMany(userData);
        }
        // Respond with success message
        res.status(200).json({message:`Courses detail CSV file imported successfully && ${update}`, errors: errorMessages});
    update='';
    } catch (error) {
        // Handle errors
        console.error("Error occurred in Controller", error);
        res.status(500).json("Error occurred in Controller");
    }
};
// Display data
const display = async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
    } catch (err) {
        console.log("Error occurred in display method", err);
        res.status(500).json("Error occurred in display method");
    }
}
// Delete all users
const DeleteAllUsers = async (req, res) => {
    try {
        // Delete all users from MongoDB
        await CourseModel.deleteMany({});
        // Respond with success message
        res.status(200).json("All users deleted successfully");
    } catch (error) {
        // Handle errors
        console.error("Error occurred in deleting all users", error);
        res.status(500).json("Error occurred in deleting all users");
    }
};
module.exports = {display, importCourses, DeleteAllUsers};
