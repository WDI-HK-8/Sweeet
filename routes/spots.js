var Joi = require('joi');
var Auth = require('./auth');

exports.register = function(server,options,next) {
  
  server.route([
    {
      method: 'POST',
      path: '/spots',
      config: {
        handler: function(request,reply) {
          Auth.authenticated(request, function(result) {
            if (result.authenticated) {
              var db = request.server.plugins['hapi-mongodb'].db;
              var session = request.session.get('sweeet_session');
              
              var spot = {
                'name': request.payload.spot.name,
                'type': request.payload.spot.type,
                'address': request.payload.spot.address,
                'district': request.payload.spot.district,
                'city': request.payload.spot.city,
                'wifi_type': request.payload.spot.wifitype,
                'wifi_speed': request.payload.spot.wifispeed,
                'wifi_password': request.payload.spot.wifipassword,
                'price': request.payload.spot.price,
                'outlets': request.payload.spot.outets,
                'seats': request.payload.spot.seats,
                'food': request.payload.spot.food,
                'friendlyness': request.payload.spot.friendlyness,
                'aircon': request.payload.spot.aircon,
                'terrace':request.payload.spot.terrace,
                'user_id': session.user_id
              }
              
              db.collection('spots').insert(spot, function(err,writeResult) {
                if (err) { return reply('Internal Mongodb error',err) }
                reply(writeResult);
              });

            } else {
              reply(result.message);
            }
          });
        },
        validate: {
          payload: {
            spot: {
              name: Joi.string().required(),
              type: Joi.string().required(),
              address: Joi.string().required(),
              district: Joi.string().required(),
              city: Joi.string().required(),
              wifi_type: Joi.string().required(),
              wifi_speed: Joi.required(),
              price: Joi.required(),
              outlets: Joi.required(),
              seats: Joi.required()
            }
          }
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'spots-route',
  version: '0.0.1'
};