const { createPool } = require('mysql');
const database = require('../config/database');
// const sanitizeHtml = require('sanitize-html');
// let moment = require ('../config/moment')

class Article {
    
    static find(callback) {
        database.query(`
            SELECT articles.id, articles.id_user, articles.posted_date, articles.title, articles.body, articles.img_url, users.user_name,
            (SELECT COUNT(*) FROM comments WHERE comments.id_article=articles.id) AS commentCount
            FROM articles,users 
             WHERE articles.id_user = users.id 
            ORDER BY articles.posted_date DESC`, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
    }
    static getAllPost() {
        let sql = `
        SELECT articles.id, articles.id_user, articles.posted_date, articles.title, articles.body, articles.img_url, users.user_name,
        (SELECT COUNT(*) FROM comments WHERE comments.id_article=articles.id) AS commentCount
        FROM articles,users 
        WHERE articles.id_user = users.id 
        ORDER BY articles.posted_date DESC`;
        return new Promise ((resolve) => {
            database.query(sql, function (error, result, fields){
             if (error) throw error;
              resolve(result);
            })
        }) 
    };



    static findByUserId(userId, callback) {
        database.query(`SELECT * 
            FROM articles 
            WHERE id_user = ?`, [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
        });
    }

    static findOne(id, callback) {
        database.query(`SELECT articles.id, articles.id_user, articles.posted_date, articles.title, articles.body, articles.img_url, users.user_name 
                            FROM articles 
                            INNER JOIN users
                                ON articles.id_user = users.id
                            WHERE articles.id = ?`, [id], (error, result) => {
            if (error) {
                console.log('error=', error);
                callback(error);
            } else {
                callback(result[0]);
            }
        });
    }

    static save(articleObject, callback) {
        database.query('INSERT INTO articles SET id_user = ?, title = ?, body = ?, img_url = ?', [articleObject.id_user,
            sanitizeHtml(articleObject.title, { allowedTags: [], allowedAttributes: {} }),
            sanitizeHtml(articleObject.body, { allowedTags: [], allowedAttributes: {} }),
            articleObject.img_url
        ], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static updateOne(articleObject, callback) {
        database.query('UPDATE articles SET id_user = ?, title = ?, body = ?, img_url = ? WHERE id = ?', [articleObject.id_user,
                sanitizeHtml(articleObject.title, { allowedTags: [], allowedAttributes: {} }),
                sanitizeHtml(articleObject.body, { allowedTags: [], allowedAttributes: {} }),
                articleObject.img_url, articleObject.id
            ],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
    }
    static deleteOne(articleId, callback) {
        database.query('DELETE FROM articles WHERE id= ?', [articleId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
    static deleteByUserId(userId, callback) {
        database.query('DELETE FROM articles WHERE id_user= ?', [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = Article;
