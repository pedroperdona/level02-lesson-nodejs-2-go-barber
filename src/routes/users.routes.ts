import { Router } from 'express';
import ensureAuthenticade from '../middlewares/ensureAuthenticade';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticade, upload.single('avatar'), async (request, response) => {
  return response.json({ ok: true });
});

export default usersRouter;
