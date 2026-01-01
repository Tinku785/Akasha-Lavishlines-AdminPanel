// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import Admin from "./src/models/Admin.js";

// dotenv.config();

// const updatePassword = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to DB");

//         const email = "...."; // your admin email
//         const newPassword = "..."; // your new password

//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         const result = await Admin.findOneAndUpdate(
//             { email },
//             { password: hashedPassword },
//             { new: true }
//         );

//         if (result) {
//             console.log(`✅ Password updated for ${email}`);
//         } else {
//             console.log("⚠️ Admin not found");
//         }

//         process.exit(0);
//     } catch (err) {
//         console.error("❌ Error:", err.message);
//         process.exit(1);
//     }
// };

// updatePassword();
