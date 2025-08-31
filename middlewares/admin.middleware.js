// This will check if the user is an admin or not from jwt token
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/admin.model";

dotenv.config();

const secret = process.env.JWT_SECRET;

const adminMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "No token provided or invalid format"
      });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, secret);
    
    if (!decoded.email) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }
    
    const admin = await Admin.findOne({ email: decoded.email });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized - Admin not found"
      });
    }
    
    // Attach admin to request object
    req.admin = {
      _id: admin._id,
      name: admin.name,
      email: admin.email
    };
    
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    } else {
      console.error('Admin middleware error:', error);
      return res.status(500).json({
        success: false,
        message: "Failed to authenticate token"
      });
    }
  }
};

export default adminMiddleware;