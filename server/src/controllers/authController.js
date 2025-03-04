export const getAuth = (req, res) => {
  if (req.session.user) {
    console.log(true);
    res.json({ isAuthenticated: true });
  } else {
    console.log(false);
    res.json({ isAuthenticated: false });
  }
};

export const logoutUser = (req, res) => {
  if (!req.session) {
    return res.status(400).json({ message: "No active session found" });
  }

  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Logout failed" });
    }
    // Remove session cookie on the client
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};
