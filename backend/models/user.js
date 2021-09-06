const database = require('../config/database');

class User {
  static save(user_name, email, password, callback) {
    database.query('INSERT INTO users SET user_name = ?, email = ?, password = ?', [user_name, email, password], (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  }
  static findOne(field, value, callback) {
    database.query('SELECT * FROM users WHERE ' + field + '= ?', [value], (error, user) => {
      if (error) {
        callback(error);
      } else {
        callback(user[0]);
      }
    })
  }
  static updateOne(field, value, id, callback) {
    database.query('UPDATE users SET ' + field + ' = ? WHERE id= ?', [value, id], (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null);

      }
    });
  }
  static deleteOne(id, callback) {
    database.query('DELETE FROM users WHERE id= ?', [id], (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = User;