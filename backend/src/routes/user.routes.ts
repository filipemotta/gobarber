import { Router } from 'express';
import multer from 'multer';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UploadUserAvatarService';
import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    // console.log(request.file);

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  },
);

export default userRouter;
