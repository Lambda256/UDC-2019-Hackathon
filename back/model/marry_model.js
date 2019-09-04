const db = require('./connect');

class Marry {
    register(marry) {
        return new Promise(async (resolve, reject) => {
            let sql = 'INSERT INTO marry SET ?';
            try {
                let result = await db.query(sql, marry);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    selectOneByMarryIndex(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM marry WHERE marry.index = ?';
            try {
                let result = await db.query(sql, index);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    selectOneByUserIndex(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM marry WHERE groom = ? or bride = ?';
            try {
                let result = await db.query(sql, [index, index]);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    updateStatus(index) {
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE marry SET status = status + 1 WHERE marry.index = ?';
            try {
                await db.query(sql, index);
                sql = 'SELECT * FROM marry WHERE marry.index = ?';
                let result = await db.query(sql, index);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = new Marry();