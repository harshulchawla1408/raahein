import admin from '../firebase/firebaseConfig.js';

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(' ')[1]; // Expecting 'Bearer <token>'

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user info to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token', error });
  }
};

export default verifyFirebaseToken;
