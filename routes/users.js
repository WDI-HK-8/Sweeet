var Bcrypt = require('bcrypt');
var Joi = require('joi');

exports.register = function(server, options, next){

  server.route([
      {
        method: 'POST',
        path: '/users',

        config: {
          handler: function(request, reply){
            var db = request.server.plugins['hapi-mongodb'].db;
            var user = request.payload.user;

            var uniqUserQuery = {
              $or: [
                {username: user.username},
                {email: user.email},
              ]
            };

            db.collection('users').count(uniqUserQuery, function(err, userExist){
              if (userExist) {
                return reply('Error: User already exists', err);
              }

              Bcrypt.genSalt(10, function(err, salt){
                Bcrypt.hash(user.password, salt, function(err,encrypted){
                  user.password = encrypted;

                  db.collection('users').insert(user, function(err, writeResult){
                    if (err) {return reply('Internal Mongodb error',err)}

                    reply(writeResult);
                  });
                });
              });
            });
          },
          validate: {
            payload: {
              user: {
                email: Joi.string().email().max(50).required(),
                password: Joi.string().min(5).max(20).required(),
                username: Joi.string().min(3).max(20).required(),
                firstname: Joi.string().min(3).max(20),
                lastname: Joi.string().min(3).max(20)
              }
            }
          }
        }
        
      }
    ]);

  next();
};

exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};