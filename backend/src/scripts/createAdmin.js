import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import path from "path";
import { fileURLToPath } from "url";

// Resolve .env path safely
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

const createAdmin = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not found in env");
        }
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing in env");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to DB for admin seeding");

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            console.log("⚠️ Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.create({
            email,
            password: hashedPassword,
        });

        console.log("✅ Admin created successfully");
        console.log(`📧 Email: ${email}`);
        console.log("🔐 Password: [HIDDEN]");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();
