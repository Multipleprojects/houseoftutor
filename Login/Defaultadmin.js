//store default admin data
// Function to insert default admin data
const Admin=require('../Models/Admin')
 const insertDefaultAdmin=async()=> 
 {
    try {
        // Check if the default admin already exists in the database
        const existingAdmin = await Admin.findOne({ name: "Mudassir Bhatti", cnic: "3240228166684" });

        // If the default admin doesn't exist, insert it into the database
        if (!existingAdmin) {
            const defaultAdmin = new Admin({
                name: "Mudassir Bhatti",
                cnic: "3240228166684"
            });
            await defaultAdmin.save();
            console.log('Default admin data inserted successfully.');
        } else {
            console.log('Default admin already exists in the database.');
        }
    } catch (error) {
        console.error('Error inserting default admin data:', error);
    }
}
module.exports = {
    insertDefaultAdmin,
};