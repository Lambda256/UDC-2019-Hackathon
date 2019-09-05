const db = require('./connect');

class Board {
    // 게시글 등록
    createContents(board) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO board SET ?';
            db.query(sql, board).then(results => {
                resolve(results[0]);
            }).catch(err => {
               reject(err); 
            });
        });
    }

    // SELECT 

    // 게시글 조회 
    readContents() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM board WHERE board.status = 1 ';
            db.query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        }); 
    }

    // 게시글 상세 조회
    readMoreContents(board) {
        console.log("이부분이 실행이 안되나?")
        return new Promise((resolve, reject)=>{
            let sql = `SELECT * FROM board WHERE board.status = 1 and  board.index = ?`;
            db.query(sql,board.index).then(results =>{
                resolve(results[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 게시글 수정
    updateContents(board) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE board SET ? WHERE board.index = ?';
            db.query(sql, [board, board.index]).then(results => {
                resolve(results[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }
    // 게시글 삭제
    deleteContents(board) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE board SET board.status = 0 WHERE board.index = ? ';
            db.query(sql, board.index).then(results => {
                resolve(results[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = new Board();