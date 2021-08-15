const { Schema } = require('mongoose');
const BaseModel = require('./BaseModel');

const userSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true
});

userSchema.method('toClient', function () {
    const user = this.toObject();

    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
});

const userModel = BaseModel.model('users', userSchema);

class User {
    static create(data) {
        const newUser = userModel(data);
        return new Promise((resolve, reject) => {
            const error = newUser.validateSync();
            if (error) {
                reject(error);
            }
            newUser.save((err, obj) => {
                if (obj) {
                    resolve(obj);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    static get(conditions, selectParams) {
        return new Promise((resolve, reject) => {
            const query = userModel.findOne(conditions);
            if (selectParams) {
                query.select(selectParams);
            }

            query.lean().exec((err, docs) => {
                resolve(docs)
            });
        });
    }
}


module.exports = User;