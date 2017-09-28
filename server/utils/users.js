class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let foundUser;
        this.users = this.users.filter((user) => {
            if(user.id === id) {
                foundUser = user;
                return false;
            }
            return true;
        });
        return foundUser;
    }

    getUser(id) {
        let matching = this.users.filter((user) => user.id === id);
        return matching[0];
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let names = users.map((user) => user.name);
        return names;
    }
}

module.exports = {
    Users
};