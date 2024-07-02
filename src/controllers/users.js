import User from '../models/user.js';
import BadRequestError from '../errors/bad-request-error.js';

/**
 * @method POST
 * @path /users/signup
 */
export const signup = async (req, res) => {
    const {email, password} = req.body;

    // check if the email is in-use
    const emailInUse = await User.findOne({ email });

    if (emailInUse) {
        throw new BadRequestError('Please check credentials!');
    }

    // create new user
    const user = new User({email, password});
    await user.save();

    const authToken = user.generateJWT();

    // optional (session cookie)
    req.session = {
        authToken,
    }

    // token or user
    res.status(201).json(user);
}