import {Router} from "express";
import User from '../models/user.js';
import BadRequestError from '../errors/bad-request-error.js';

const router = new Router();


/**
 * @method POST
 * @path /users/signup
 */
router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    // check if the email is in-use
    const emailInUse = await User.findOne({ email });

    if (emailInUse) {
        throw new BadRequestError('Please check credentials!');
    }

    // create new user
    const user = new User({email, password});
    await user.save();

    res.status(201).json(user);

});


export default router;