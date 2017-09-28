const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(5)).toBeFalsy();
    });

    it('should reject strings with only spaces', () => {
        expect(isRealString('   ')).toBeFalsy();
    });

    it('should accept strings with non-spaces', () => {
        expect(isRealString('string')).toBeTruthy();
    });
});