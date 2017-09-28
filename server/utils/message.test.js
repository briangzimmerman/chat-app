const {generateMessage, generateLocationMessage} = require('./message');
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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'me';
        let lat = 5;
        let lng = 1;
        let returned = generateLocationMessage(from, lat, lng);
        expect(returned.from).toBe(from);
        expect(returned.url).toBe(`https://google.com/maps?q=${lat},${lng}`);
        expect(typeof returned.createdAt).toBe('number');
    });
})