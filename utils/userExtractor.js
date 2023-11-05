const jwt = require('jsonwebtoken');

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  console.log('Authorization:', authorization);

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    console.log('Token:', token);
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      console.log('Decoded Token:', decodedToken);
      req.userId = decodedToken.id;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'token missing or invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
};

module.exports = userExtractor;
