const expect = require('expect');
const { Users } = require('./users');

describe('Users class', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Brian',
                room: '1'
            }, {
                id: '2',
                name: 'Philip',
                room: '2'
            }, {
                id: '3',
                name: 'Mike',
                room: '1'
            }
        ];
    });

    it('should add a new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Brian',
            room: 'ASDF'
        };
        let returned = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names from room 1', () => {
        let userList = users.getUserList('1');
        expect(userList).toEqual(['Brian', 'Mike']);
    });

    it('should return name from room 2', () => {
        let userList = users.getUserList('2');
        expect(userList).toEqual(['Philip']);
    });

    it('should remove a user', () => {
        let original = users.users[0];
        let user = users.removeUser('1');
        expect(user).toEqual(original);
        expect(users.users.length).toBe(2);
        expect(users.users).toNotContain(user);
    });

    it('should not remove a user', () => {
        let user = users.removeUser('invalid');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('sould find user', () => {
        let user = users.getUser('1');
        expect(user).toEqual(users.users[0]);
        expect(users.users.length).toBe(3);
    });

    it('should not find user', () => {
        let user = users.getUser('invalid');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
});