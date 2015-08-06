$(document).ready(function(){
  
  var Spot = function(){
    this.name;
    this.type;
    this.address;
    this.district;
    this.city;
    this.wifitype;
    this.wifispeed;
    this.wifipassword;
    this.price;
    this.outlets;
    this.seats;
    this.food;
    this.picture;
  };

  Spot.prototype.addSpot = function() {
    $.ajax({
      context: this,
      type: 'POST',
      url: '/spots',
      data: {
        spot: {
          'name': this.name,
          'type': this.type,
          'address': this.address,
          'district': this.district,
          'city': this.city,
          'wifitype': this.wifitype,
          'wifispeed': this.wifispeed,
          'wifipassword': this.wifipassword,
          'price': this.price,
          'outlets': this.outlets,
          'seats': this.seats,
          'food': this.food,
          'picture': this.picture,
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
    
    this.loadingScreen();

    $.ajax({
      context: this,
      type: 'GET',
      url: '/spots',
      success: function(response){
        console.log('list spots',response)

        var html = '';

          response.forEach(function(item){
            html +=   '<div class="spots-item col-xs-12 col-sm-6 col-md-4 col-lg-4" data-id="' + item._id + '">'
            html +=     '<h3 class="spots-item-click" data-toggle="modal" data-target="#spot-modal"><a href="#">' + item.name + '</a></h3>'
            html +=     '<img src="' + item.picture + '" class="img-responsive img-rounded">'
            html +=     '<h4>' + item.district + '</h4>'
            html +=     '<div class="ratings-spot col-xs-12">'
            html +=       '<div class="col-xs-6">'
            html +=         '<p><span class="glyphicon glyphicon-signal"></span> ' + item.wifispeed + '</p>'
            html +=         '<p><span class="glyphicon glyphicon-flash"></span> ' + item.outlets + '</p>'
            html +=       '</div>'
            html +=       '<div class="col-xs-6">'
            html +=         '<p><span class="glyphicon glyphicon-usd"></span> ' + item.price + '</p>'
            html +=         '<p><span class="glyphicon glyphicon-cutlery"></span> ' + item.food + '</p>'
            html +=       '</div>'
            html +=     '</div>'
            html +=   '</div>'
          });

        $('#spots-list').html(html);

        setTimeout(function(){
          $('#spots-list').show();
          $('#loading').hide();
        },1000);

      }
    });
  };

  Spot.prototype.showOneSpot = function(id){
    $.ajax({
      context: this,
      type: 'GET',
      url: '/spots/' + id,
      success: function(response){
        console.log('spot details',response);
        
        var html = '';

        html +=   '<div class="modal-header">'
        html +=     '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        html +=     '<h2 class="modal-title" id="spot-modal">' + response.name + '<span class="spot-modal-type">  ' + response.type + '</span></h2>'
        html +=   '</div>'
        html +=   '<div class="modal-body">'
        html +=     '<img src="' + response.picture + '" class="img-responsive img-rounded">'
        html +=      '<p>' + response.address + '</p>'
        html +=      '<p>' + response.district + '</p>'
        html +=      '<p><span class="glyphicon glyphicon-signal"></span> ' + response.wifispeed + ' ' + response.wifitype + '</p>'
        html +=      '<p><span class="glyphicon glyphicon-flash"></span> ' + response.outlets + '</p>'
        html +=      '<p><span class="glyphicon glyphicon-usd"></span> ' + response.price + '</p>'
        html +=      '<p><span class="glyphicon glyphicon-cutlery"></span> ' + response.food + '</p>'
        html +=      '<p><span class="glyphicon glyphicon-user"></span> ' + response.seats + '</p>'
        html +=   '</div>'

        $('#spot-modal-content').html(html);
      }
    });
  };

  Spot.prototype.filterSpots = function(filterKey,filterValue){
    this.loadingScreen();

    $.ajax({
      context: this,
      type: 'GET',
      url: '/spots?'+ filterKey + '=' + filterValue,
      success: function(response){
        console.log('search spots',response);

        var html = '';

          response.forEach(function(item){
            html +=   '<div class="spots-item col-xs-12 col-sm-6 col-md-4 col-lg-4" data-id="' + item._id + '">'
            html +=     '<h3 class="spots-item-click" data-toggle="modal" data-target="#spot-modal">' + item.name + '</h3>'
            html +=     '<img src="' + item.picture + '" class="img-responsive img-rounded">'
            html +=     '<p>' + item.district + '</p>'
            html +=     '<div class="ratings-spot col-xs-12">'
            html +=       '<div class="col-xs-6">'
            html +=         '<p><span class="glyphicon glyphicon-signal"></span> ' + item.wifispeed + '</p>'
            html +=         '<p><span class="glyphicon glyphicon-flash"></span> ' + item.outlets + '</p>'
            html +=       '</div>'
            html +=       '<div class="col-xs-6">'
            html +=         '<p><span class="glyphicon glyphicon-usd"></span> ' + item.price + '</p>'
            html +=         '<p><span class="glyphicon glyphicon-cutlery"></span> ' + item.food + '</p>'
            html +=       '</div>'
            html +=     '</div>'
            html +=   '</div>'
          });
        
        setTimeout(function(){
          $('#spots-list').show();
          $('#loading').hide();
        },1000);
      }
    });
  };

  Spot.prototype.loadingScreen = function(){
    $('#spots-list').hide();
    $('#loading').show();
  };



  var spot = new Spot();

  spot.showAllSpots();

  $(document).on('submit','#addspot-form',function(e){
    e.preventDefault;

      spot.name = $('#addspot-name').val();
      spot.type = $('#addspot-type option:selected').text();
      spot.address = $('#addspot-address').val();
      spot.district = $('#addspot-district option:selected').text();
      spot.city = $('#addspot-city option:selected').text();
      spot.wifitype = $('#addspot-wifitype option:selected').text();
      spot.wifispeed = $('#addspot-wifispeed option:selected').text();
      spot.wifipassword = $('#addspot-wifipassword').val();
      spot.price = $('#addspot-price option:selected').text();
      spot.outlets = $('#addspot-outlets option:selected').text();
      spot.seats = $('#addspot-seats option:selected').text();
      spot.food = $('#addspot-food option:selected').text();
      spot.picture = $('#addspot-picture').val();

    spot.addSpot();
  });

  $(document).on('click','.spots-item-click',function(e){
    e.preventDefault;

    var id = $(this).parent().data('id');
    spot.showOneSpot(id);
  });

  $(document).on('click keypress','#search-district-btn',function(e){
    e.preventDefault;

    var searchValue = $('#search-district').val();
    
    if (e.which === 13 || e.type === 'click') {
      $('#spots-list').children().remove();

      if (searchValue === '') {
        spot.showAllSpots();
      } else {
        spot.filterSpots('district',searchValue);
      }
    }
  });

});
