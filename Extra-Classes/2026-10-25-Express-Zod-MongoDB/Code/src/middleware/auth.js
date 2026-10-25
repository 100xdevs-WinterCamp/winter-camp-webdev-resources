import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; //["Bearer" , "<token>"]
    if(!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}

export default protectRoute;