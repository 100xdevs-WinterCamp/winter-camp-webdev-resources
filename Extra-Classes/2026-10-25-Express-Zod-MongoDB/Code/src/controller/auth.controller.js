import { User } from "../db/users.js";
import { signinSchema, signupSchema } from "../types/type.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.message });
    }

    const passwordHash = await Bun.password.hash(result.data.password);

    const user = await User.create({
        name: result.data.name,
        email: result.data.email,
        passwordHash: passwordHash,
        role: "student",
    });

    return res.status(201).json({ 
        message: "User created successfully", 
        user: user.toJSON() 
    });
}

const signin = async (req, res) => {
    const result = signinSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({ error: result.error.message });
    }

    const user = await User.findOne({ email: result.data.email });

    if(!user) {
        return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await Bun.password.verify(result.data.password, user.passwordHash);

    if(!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
    }

    const token = await jwt.sign({ id: user._id },process.env.JWT_SECRET);

    return res.status(200).json({ message: "Login successful", token: token });
}

export { signup, signin };