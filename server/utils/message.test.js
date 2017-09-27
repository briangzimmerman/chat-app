const {generateMessage} = require('./message');
const expect = require('expect');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'me';
        let text = 'Hi';
        let returned = generateMessage(from, text);
        expect(returned.from).toBe(from);
        expect(returned.text).toBe(text);
        expect(typeof returned.createdAt).toBe('number');
    });
});