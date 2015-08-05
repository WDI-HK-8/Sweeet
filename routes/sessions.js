var Bcrypt = require('bcrypt');
var Auth = require('./auth');
var Joi = require('joi');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'POST',
      path: '/sessions',
      config: {
        handler: function(request, reply){
          var db = request.server.plugins['hapi-mongodb'].db;

          var user = request.payload.user;

          db.collection('users').findOne( { email: user.email }, function(err, userMongo) {
            if (err) {
              return reply('Internal MongoDb error');
            }

            if (userMongo === null) {
              return reply('No existing email');
            }

            Bcrypt.compare(user.password, userMongo.password, function(err,same) {
              if (!same) {
                return reply('Password doesnt match');
              }

              var randomKeyGenerator = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
              };

              var session = {
                user_id: userMongo._id,
                session_id: randomKeyGenerator()
              };

              db.collection('sessions').insert(session, function(err, writeResult) {
                if (err) {
                  return reply('Internal MongoDb error');
                }

                request.session.set('sweeet_session', session);

                reply({ authorized: true });
              });
            });
          });
        },
        validate: {
          payload: {
            user: {
              email: Joi.string().email().max(50).required(),
              password: Joi.string().min(5).max(20).required()
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/sessions/authenticated',
      handler: function(request, reply) {
        var callback = function(result) {
          reply(result);
        };

        Auth.authenticated(request, callback);

      }
    },
    {
      method: 'DELETE',
      path: '/sessions',
      handler: function(request,reply){
        var session = request.session.get('sweeet_session');

        var db = request.server.plugins['hapi-mongodb'].db;

        if (!session) { return reply('Already logged out') }

        db.collection('sessions').remove( { "session_id": session.session_id }, function(err,writeResult) {
          if (err) { return reply('Internal MongoDB error') }

          reply(writeResult);
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'sessions-route',
  version: '0.0.1'
}