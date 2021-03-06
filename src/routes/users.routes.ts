import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticade from '../middlewares/ensureAuthenticade';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticade, upload.single('avatar'), async (request, response) => {
  const updateUserAvatarService = new UpdateUserAvatarService();

  const user = await updateUserAvatarService.execute({ user_id: request.user.id, avatarFileName: request.file.filename });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
