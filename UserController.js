const User = require('./models/User.js')

class UserController {

    static async getUsers() {
        return await User.find()
    }
    static async getUserById(id) {
        return await User.findOne({ _id: id })
    }
    static async updateUser(id, updtatedUser) {
       return await User.updateOne({ _id: id }, updtatedUser)
    }
    static async deleteUser(id) {
       return await User.deleteOne({ _id: req.params.id })
    }
    static async addUser(body) {
        const user = new User(body)
       return await user.save()
    }   
}

module.exports = UserController