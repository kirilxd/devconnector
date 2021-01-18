const mongoose = require('mongoose')
const UserModel = require('../models/User')
const PostModel = require('../models/Post')
const ProfileModel = require('../models/Profile')

const MONGO_URI = require('../config/keys_dev').mongoURI
const userData = {
    name: 'Kiril',
    email: 'hellowrld@gmail.com',
    password: 'qwerty',
    avatar: 'dasdasda',
    date: new Date(),
}
const postData = {
    text: 'adadadadda',
    name: 'Kiril',
    avatar: 'dadadada',
    date: new Date(),
}
const profileData = {
    handle: 'dadad',
    company: 'Apple',
    website: 'kpi.ua',
    location: 'Kyiv',
    status: 'online',
    skills: ['smart', 'responsible'],
    bio: 'dadada',
}

beforeAll(async () => {
    await mongoose.connect(
        MONGO_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        }
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe('User Model Test', () => {
    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData)
        const savedUser = await validUser.save()
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined()
        expect(savedUser.name).toBe(userData.name)
        expect(savedUser.email).toBe(userData.email)
        expect(savedUser.password).toBe(userData.password)
        expect(savedUser.avatar).toBe(userData.avatar)
    })

    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({
            name: 'Kiril',
            email: 'hellowrld@gmail.com',
            password: 'qwerty',
        })
        const savedUserWithInvalidField = await userWithInvalidField.save()
        expect(savedUserWithInvalidField._id).toBeDefined()
        expect(savedUserWithInvalidField.avatar).toBeUndefined()
    })

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new UserModel({ name: 'Kiril' })
        let err
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save()
            error = savedUserWithoutRequiredField
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.password).toBeDefined()
    })
})

describe('Post Model Test', () => {
    it('create & save post successfully', async () => {
        const validPost = new PostModel(postData)
        const savedPost = await validPost.save()
        // Object Id should be defined when successfully saved to MongoDB.
        expect(validPost.text).toBe(validPost.text)
        expect(validPost.name).toBe(validPost.name)
        expect(validPost.avatar).toBe(validPost.avatar)
    })

    it('insert post successfully, but the field does not defined in schema should be undefined', async () => {
        const postWithInvalidField = new PostModel({
            handle: 'dadad',
            company: 'Apple',
            website: 'kpi.ua',
            location: 'Kyiv',
            status: 'online',
            text: 'dadsadas',
        })
        const savedPostWithInvalidField = await postWithInvalidField.save()
        expect(savedPostWithInvalidField._id).toBeDefined()
        expect(savedPostWithInvalidField.avatar).toBeUndefined()
    })

    it('create post without required field should failed', async () => {
        const postWithoutRequiredField = new PostModel({ name: 'Kiril' })
        let err
        try {
            const savedPostWithoutRequiredField = await postWithoutRequiredField.save()
            error = savedPostWithoutRequiredField
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.text).toBeDefined()
    })
})

describe('Profile Model Test', () => {
    it('create & save profile successfully', async () => {
        const validProfile = new ProfileModel(profileData)
        const savedProfile = await validProfile.save()
        // Object Id should be defined when successfully saved to MongoDB.
        expect(validProfile.handle).toBe(validProfile.handle)
        expect(validProfile.company).toBe(validProfile.company)
        expect(validProfile.website).toBe(validProfile.website)
        expect(validProfile.location).toBe(validProfile.location)
        expect(validProfile.status).toBe(validProfile.status)
    })

    it('insert profile successfully, but the field does not defined in schema should be undefined', async () => {
        const profileWithInvalidField = new ProfileModel({
            handle: 'dadadada',
            status: 'online',
        })
        const savedProfileWithInvalidField = await profileWithInvalidField.save()
        expect(savedProfileWithInvalidField._id).toBeDefined()
        expect(savedProfileWithInvalidField.bio).toBeUndefined()
    })

    it('create profile without required field should failed', async () => {
        const profileWithoutRequiredField = new ProfileModel({
            handle: 'dadadaad',
        })
        let err
        try {
            const savedProfileWithoutRequiredField = await profileWithoutRequiredField.save()
            error = savedProfileWithoutRequiredField
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.status).toBeDefined()
    })
})
