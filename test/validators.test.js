const isEmpty = require('../validation/is-empty');


describe('Is empty', ()=>{
    it('returns true if empty string',()=>{
        const emptyString = '';
        let value = isEmpty(emptyString);
        expect(value).toBeTruthy();
    })
})