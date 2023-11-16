const { celebrate } = require('celebrate');
const router = require('express').Router();
const { userIdValidation, userMeValidation, userMeAvatarValidation } = require('../validators/user-validation');

const {
  getUsers,
  getCurrentUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(userIdValidation), getUserId); // Валидация приходящих на сервер данных //
router.patch('/me', celebrate(userMeValidation), updateUser); // Валидация приходящих на сервер данных //
router.patch('/me/avatar', celebrate(userMeAvatarValidation), updateAvatar); // Валидация приходящих на сервер данных //

module.exports = router;
