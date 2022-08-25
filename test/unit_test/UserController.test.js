const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserController = require('../../UserController.js')
const User = require('../../models/User.js');
require('dotenv').config()
const db = process.env.BDD_UNIT_URL;
//la methode beforeAll() permet d'executer le code situé a l'interieur avant tout les tests
beforeAll(async () => {
     mongoose.connect(db)
    await User.deleteMany()
})

// la methode afterAll() permet d'executer le bloc de code a l'interieur apres tout les tests
afterAll(async () => {
    await mongoose.connection.close(/*force:*/ true); // <-- important
});

/**
* @function UserController.getUsers
*/
describe('recuperer tous les utilisateurs', () => {

    it('devrait recupérer tout les utilisateurs', async () => {
        let user = new User({
            'name': 'user 1',
            'firstname': 'name user 1',
            'mail': 'mail user 1',
        })
        await user.save()
        let user2 = await new User({
            'name': 'user 2',
            'firstname': 'name user 2',
            'mail': 'mail user 2',
        })
        await user2.save()
        const res = await UserController.getUsers()
        expect(res).toHaveLength(2)
        expect(res[0]._id).toEqual(user._id)
        expect(res[0].name).toEqual(user.name)
        expect(res[0].firstname).toEqual(user.firstname)
        expect(res[0].mail).toEqual(user.mail)
        expect(res[1]._id).toEqual(user2._id)
        expect(res[1].name).toEqual(user2.name)
        expect(res[1].firstname).toEqual(user2.firstname)
        expect(res[1].mail).toEqual(user2.mail)
    })
})

/**
* @function UserController.getUserById
*/
describe('recuperer un utilisateur grace a son id', () => {

    it('devrait recupérer un utilisateur', async () => {
        let user = await new User({
            'name': 'user 1',
            'firstname': 'name user 1',
            'mail': 'mail user 1',
        })
        await user.save()
        const res = await UserController.getUserById(user._id)
        expect(res._id).toEqual(user._id)
        expect(res.name).toEqual(user.name)
        expect(res.firstname).toEqual(user.firstname)
        expect(res.mail).toEqual(user.mail)
    })

    it("devrait retourner null", async () => {
        const mockObjectId = new mongoose.Types.ObjectId();
        let user = await new User({
            'name': 'user 1',
            'firstname': 'name user 1',
            'mail': 'mail user 1',
        })
        await user.save()
        expect(await UserController.getUserById(mockObjectId)).toBe(null)
    })

    it("devrait retourner une erreur", async () => {
        let user = await new User({
            'name': 'user 1',
            'firstname': 'name user 1',
            'mail': 'mail user 1',
        })
        await user.save()
        await UserController.getUserById(user.name)
      .catch(e => {
         expect(new Error(e)).toEqual(new Error('CastError: Cast to ObjectId failed for value "user 1" (type string) at path "_id" for model "User"'));
      });
    })
})

/**
* @function UserController.updateUser
*/
describe('modifie un utilisateur', () => {

    it('devrait modifier un utilisateur', async () => {
        let user = await new User({
            'name': 'user 1',
            'firstname': 'name user 1',
            'mail': 'mail user 1',
        })
        await user.save()
        let userFind = await User.findOne({ _id: user._id })
        expect(userFind._id).toEqual(user._id)
        expect(userFind.name).toEqual(user.name)
        expect(userFind.firstname).toEqual(user.firstname)
        expect(userFind.mail).toEqual(user.mail)
        const newUser = {
            'name':'user name modified',
            'firstname': 'user firstname modified',
            'mail': 'user mail modified',
        }
        await UserController.updateUser(user._id,{
            'name':'user name modified',
            'firstname': 'user firstname modified',
            'mail': 'user mail modified',
        })
        const res = await User.findOne({ _id: user._id })
        expect(res._id).toEqual(user._id)
        expect(res.name).toEqual(newUser.name)
        expect(res.firstname).toEqual(newUser.firstname)
        expect(res.mail).toEqual(newUser.mail)
    })

    it('devrait retourner une erreur', async () => {
        let user = await new User({
            'name': 'user 1',
            'firstname': 'name user 1',
            'mail': 'mail user 1',
        })
        await user.save()
        let userFind = await User.findOne({ _id: user._id })
        expect(userFind._id).toEqual(user._id)
        expect(userFind.name).toEqual(user.name)
        expect(userFind.firstname).toEqual(user.firstname)
        expect(userFind.mail).toEqual(user.mail)
        const newUser = {
            'name':'user name modified',
            'firstname': 'user firstname modified',
            'mail': 'user mail modified',
        }
        await UserController.updateUser(user.name,{
            'name':'user name modified',
            'firstname': 'user firstname modified',
            'mail': 'user mail modified',
        })
        .catch(e => {
            expect(new Error(e)).toEqual(new Error('CastError: Cast to ObjectId failed for value "user 1" (type string) at path "_id" for model "User"'));
         });
    })
})

/**
* @function UserController.deleteUser
*/
describe('supprime un utilisateur', () => {
 
    /* Votre code ici. 
        Un test unitaire qui teste le succes de la methode
        Un test unitaire qui teste l'echec de la methode  
    */

})

/**
* @function UserController.addUser
*/

 /* Votre code ici. 
        Un test unitaire qui teste le succes de la methode
        Un test unitaire qui teste l'echec de la methode  
 */




