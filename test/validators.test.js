const isEmpty = require('../validation/is-empty');
const education = require('../validation/education');
const experience = require('../validation/experience');
const login = require('../validation/login');
const post = require('../validation/post')

describe('Is empty', ()=>{
    it('returns true if empty string',()=>{
        const emptyString = '';
        let value = isEmpty(emptyString);
        expect(value).toBeTruthy();
    });
    it('returns true if empty object', ()=>{
        const emptyObject = {};
        let value = isEmpty(emptyObject);
        expect(value).toBeTruthy();
    })
    it('return false if non empty string', ()=>{
        const string = 'string';
        let value = isEmpty(string);
        expect(value).toBeFalsy();
    })
    it('return false if non empty string', ()=>{
        const string = 'string';
        let value = isEmpty(string);
        expect(value).toBeFalsy();
    })
})

describe('Education', ()=>{
    it('returns error with school field and without defined fields', ()=>{
        const educationData = {degree: '2', fieldofstudy: 'cs', from: '2018'}
        let {errors} = education(educationData);
        expect(errors.school).toBeDefined();
        expect(errors.degree).toBeUndefined();
        expect(errors.fieldofstudy).toBeUndefined();
        expect(errors.from).toBeUndefined();
    })
});

describe('Experience', ()=>{
    it('returns error with title field and without defined fields', ()=>{
        const experienceData = {company: 'epam', from: '2018'}
        let {errors} = experience(experienceData);
        expect(errors.title).toBeDefined();
        expect(errors.company).toBeUndefined();
        expect(errors.from).toBeUndefined();
    })
})

describe('Login', ()=>{
    it('returns error with email field and without password field', ()=>{
        const experienceData = {password: '2018'}
        let {errors} = login(experienceData);
        expect(errors.email).toBeDefined();
        expect(errors.password).toBeUndefined();
    })
})

describe('Post', ()=>{
    it('shorter than 10 symbols', ()=>{
        const data = {text: 'dada'};
        let {errors} = post(data);
        expect(errors.text).toEqual('Post must be between 10 and 300 characters')
    })
    it('no text field', ()=>{
        const data = {};
        let {errors} = post(data);
        expect(errors.text).toEqual('Text field is required');
    })
})