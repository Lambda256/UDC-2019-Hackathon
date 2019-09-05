const db = require('./connect');

class Propose {
    register(propose) {
        return new Promise(async (resolve, reject) => {
            let sql = 'INSERT INTO propose SET ?';
            try {
                let result = await db.query(sql, propose);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    selectByUserName(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM propose WHERE propose.receiver_name = ?';
            try {
                let result = await db.query(sql, index);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    selectOneByIndex(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM propose WHERE propose.index = ?';
            try {
                let result = await db.query(sql, index);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    delete(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'DELETE FROM propose WHERE propose.index = ?';
            try {
                let result = await db.query(sql, index);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new Propose();