const admin = require("../firebase/firebaseConfig");

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'

  if (!idToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user data to req
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token", error });
  }
};

module.exports = verifyFirebaseToken;
