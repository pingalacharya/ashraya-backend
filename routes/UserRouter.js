const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router
  .route('/login')
  .put(userController.loginUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
router
  .route('/signup')
  .post(userController.registerUser)
  .get(userController.logoutUser);
router.route('/auth').get(userController.authUser);

module.exports = router;
