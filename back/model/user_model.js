const db = require('./connect');
class User {
    initRegister(user) {
        return new Promise(async (resolve, reject) => {
            let sql = 'INSERT INTO user SET ?';
            try {
                let result = await db.query(sql, user)
                resolve(result[0]['insertId']);
            } catch(err) {
                reject(err);
            }
        });
    }

    register(user) {
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE user SET user.ddid = ? WHERE user.index = ?';
            try {
                let result = await db.query(sql, [user.ddid, user.index]);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    selectOneByIndex(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM user WHERE user.index = ?';
            try {
                let result = await db.query(sql, index);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    selectOneByName(name) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM user WHERE user.name = ?';
            try {
                let result = await db.query(sql, name);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    getCity(city) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT name FROM city WHERE city.name like %?%';
            try {
                let result = await db.query(sql, city);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    getSpecies(species) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT name FROM species WHERE species.name like %?%'
            try {
                let result = await db.query(sql, species);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    update(user) {
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE user SET ? WHERE user.index = ?';
            try {
                let result = await db.query(sql, [user, user.index]);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    updateStatus(marry) {
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE user SET status = status + 1 WHERE user.index = ? or user.index = ?';
            try {
                let result = await db.query(sql, [marry.groom, marry.bride]);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    login(user) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM user WHERE user.id = ? AND user.pw = ?';
            try {
                let result = await db.query(sql, [user.id, user.pw]);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    checkId(id) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT COUNT(*) as count FROM user WHERE id = ?';
            try {
                let result = await db.query(sql, id);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    checkName(name) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT COUNT(*) as count FROM user WHERE name = ? or name LIKE ?';
            try {
                let result = await db.query(sql, [name, name + '%']);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = new User();