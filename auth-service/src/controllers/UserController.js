const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');
const { saveDeduplicatedFile } = require('../middleware/uploads');

class UserController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
    }

    test = async (req, res) => {
      res.status(500).send('test success');
    }
  update = async (req, res) => {
    try {
      let userData = req.body;
      if (req.file && req.file.location) {
        req.body.image = req.file.location; // ✅ use S3 URL
      }else if (req.file) {
        const imagePath = await saveDeduplicatedFile(req.file);
        userData.image = imagePath;
      }
      const user = await this.userService.updateUser(req.user.id, userData);
      res.status(200).json({
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
module.exports = UserController;