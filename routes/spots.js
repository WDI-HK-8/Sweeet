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
                'wifitype': request.payload.spot.wifitype,
                'wifispeed': request.payload.spot.wifispeed,
                'wifipassword': request.payload.spot.wifipassword,
                'price': request.payload.spot.price,
                'outlets': request.payload.spot.outlets,
                'seats': request.payload.spot.seats,
                'food': request.payload.spot.food,
                'picture': request.payload.spot.picture,
                'dateadded': request.payload.spot.dateadded,
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
              wifitype: Joi.string().required(),
              wifispeed: Joi.string().required(),
              wifipassword: Joi.string().allow(''),
              price: Joi.string().required(),
              outlets: Joi.string().required(),
              seats: Joi.string().required(),
              food: Joi.string().required(),
              picture: Joi.string().allow(''),
              dateadded: Joi.date().required(),
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/spots',
      handler: function(request,reply){
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('spots').find().toArray(function(err,list){
          if (err) { return reply('Internal MongoDB error', err); }
          
          reply(list);
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'spots-route',
  version: '0.0.1'
};