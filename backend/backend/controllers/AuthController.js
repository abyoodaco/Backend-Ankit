const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const helpers = require('./../common/helpers');

class AuthController {
    // POST /signin
    async signIn(req, res, postData) {
        postData = JSON.parse(postData);
        let { email, password } = postData;

        try {
            const user = await User.get({ email });

            if (!user) return helpers.validationError(res, 'The email doen\'s exists');
            if (user.password !== password.toString()) return helpers.validationError(res, 'Wrong Password');

            const token = jwt.sign({ _id: user._id }, 'secretkey');
            return helpers.success(res, { user, token });
        }
        catch (error) {
            return helpers.error(res);
        }
    }

    // POST /signup
    async signUp(req, res, postData) {
        postData = JSON.parse(postData);
        let { email, password } = postData;
        try {
            const isExist = await User.get({ email });
            if (isExist) return helpers.validationError(res, 'The email already exists');

            const newUser = await User.create({ email, password });
            const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
            return helpers.success(res, { user: newUser.toClient(), token });
        }
        catch (error) {
            return helpers.error(res);
        }
    }
}

module.exports = new AuthController();
