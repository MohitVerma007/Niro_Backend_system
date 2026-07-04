import {Router} from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
const router = Router();

router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login', validateRequest(loginSchema), AuthController.login);

export default router;