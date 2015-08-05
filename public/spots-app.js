$(document).ready(function(){
  
  var Spot = function(){

  };

  Spot.prototype.addSpot = function(details) {
    $.ajax({
      context: this,
      type: 'POST',
      url: '/spots',
      data: {
        spot: {
          'name': details.name,
          'type': details.type,
          'address': details.address,
          'district': details.district,
          'city': details.city,
          'wifitype': details.wifitype,
          'wifispeed': details.wifispeed,
          'wifipassword': details.wifipassword,
          'price': details.price,
          'outlets': details.outlets,
          'seats': details.seats,
          'food': details.food,
          'picture': details.picture,
          'dateadded': new Date()
        }
      },
      success: function(response) {
        console.log('place added',response);
        $('.addspot-success').removeClass('hidden').text('Spot successfully added.');
        
        setTimeout(function(){
          location.reload(true);
        },1000);
      },
      error: function(response) {
        console.log('error',response);
        $('.addspot-error').removeClass('hidden').text(response.responseText);
      }
    });
  };

  Spot.prototype.showAllSpots = function(){
    $.ajax({
      context: this,
      type: 'GET',
      url: '/spots',
      success: function(response){
        console.log('list spots',response)
        var html = '';

          response.forEach(function(item){
            html +=   '<div class="spots-item col-xs-12 col-sm-6 col-md-4 col-lg-4">'
            html +=     '<h3>' + item.name + '</h3>'
            html +=     '<img src="' + item.picture + '" class="img-responsive">'
            html +=     '<p>' + item.district + '</p>'
            html +=     '<div class="ratings-spot col-lg-12">'
            html +=       '<div class="col-lg-6">'
            html +=         '<p><span class="glyphicon glyphicon-signal"></span> ' + item.wifispeed + '</p>'
            html +=         '<p><span class="glyphicon glyphicon-flash"></span> ' + item.outlets + '</p>'
            html +=       '</div>'
            html +=       '<div class="col-lg-6">'
            html +=         '<p><span class="glyphicon glyphicon-usd"></span> ' + item.price + '</p>'
            html +=         '<p><span class="glyphicon glyphicon-cutlery"></span> ' + item.food + '</p>'
            html +=       '</div>'
            html +=     '</div>'
            html +=   '</div>'
          });

        $('#spots-list').html(html);
      }
    });
  };

  var spot = new Spot();

  spot.showAllSpots();

  $('#addspot-form').submit(function(){
    var details = {
      'name': $('#addspot-name').val(),
      'type': $('#addspot-type option:selected').text(),
      'address': $('#addspot-address').val(),
      'district': $('#addspot-district option:selected').text(),
      'city': $('#addspot-city option:selected').text(),
      'wifitype': $('#addspot-wifitype option:selected').text(),
      'wifispeed': $('#addspot-wifispeed option:selected').text(),
      'wifipassword': $('#addspot-wifipassword').val(),
      'price': $('#addspot-price option:selected').text(),
      'outlets': $('#addspot-outlets option:selected').text(),
      'seats': $('#addspot-seats option:selected').text(),
      'food': $('#addspot-food option:selected').text(),
      'picture': $('#addspot-picture').val()
    };

    spot.addSpot(details);
  });
});
