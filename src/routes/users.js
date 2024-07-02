import {Router} from "express";
import {signup} from '../controllers/users.js';

const router = new Router();

/**
 * @method POST
 * @path /users/signup
 */
router.post('/signup', signup);


export default router;