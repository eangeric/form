import { User } from "../database/models/user.js";
import bcrypt from "bcryptjs";
// Add a new user
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: "failed", message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    res.json({ status: "success", user });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "Internal server error" });
  }
};
