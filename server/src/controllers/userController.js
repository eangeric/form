import { User } from "../database/models/user.js";
import { hashPassword } from "../utils/password.js";

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: "failed", message: "All fields are required" });
    }

    if (await User.findOne({ email })) {
      return res.json({
        status: "failed",
        message: "Email already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ status: "success", newUser });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "Internal server error" });
  }
};
