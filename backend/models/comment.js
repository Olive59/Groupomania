const mySql = require ('mysql');
const { createPool } = require('mysql');
const database = require('../config/database');
const sanitizeHtml = require('sanitize-html');
let moment = require ('../config/moment')

class Comment {
    static find(callback) {
        database.query(`
            SELECT comments.id, comments.id_user, comments.post_date, comments.body, users.user_name,
            (SELECT COUNT(*) FROM comments WHERE comments.id=comments.id) AS commentCount
            FROM comments,users 
            WHERE comments.id_user = users.id 
            ORDER BY comments.post_date DESC`, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
    }

    static findByUserId(userId, callback) {
        database.query(`SELECT * 
            FROM comments 
            WHERE id_user = ?`, [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
    }

    static findOne(id, callback) {
        database.query(`SELECT comments.id, comments.id_user, comments.post_date, comments.body, users.user_name 
                            FROM comments 
                            INNER JOIN users
                                ON comments.id_user = users.id
                            WHERE comments.id = ?`, [id], (error, result) => {
            if (error) {
                console.log('error=', error);
                callback(error);
            } else {
                callback(result[0]);
            }
        });
    }

    static save(commentObject, callback) {
        database.query('INSERT INTO comments SET id_user = ?, body = ?', [commentObject.id_user,
            sanitizeHtml(commentObject.title, { allowedTags: [], allowedAttributes: {} }),
            sanitizeHtml(commentObject.body, { allowedTags: [], allowedAttributes: {} }),
            commentObject.img_url
        ], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static updateOne(commentObject, callback) {
        database.query('UPDATE comments SET id_user = ?, body = ?, WHERE id = ?', [commentObject.id_user,
                sanitizeHtml(commentObject.title, { allowedTags: [], allowedAttributes: {} }),
                sanitizeHtml(commentObject.body, { allowedTags: [], allowedAttributes: {} }),
                commentObject.img_url, commentObject.id
            ],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
    }
    static deleteOne(commentId, callback) {
        database.query('DELETE FROM comments WHERE id= ?', [commentId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static deleteByUserId(userId, callback) {
        database.query('DELETE FROM comments WHERE id_user= ?', [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = Comment;
