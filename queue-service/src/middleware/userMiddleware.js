module.exports = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];
  if (userId) {
    req.user = { id: userId, role: userRole };
  }
  next();
};
