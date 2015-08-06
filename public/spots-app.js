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

  Spot.prototype.displaySpots = function(list){
    var html = '';

      list.forEach(function(item){
        
        var wifiSpeedHTML;
        var outletsHTML;
        var seatsHTML;
        var serviceHTML;

        if (item.wifispeed === 'Very Fast') {
          wifiSpeedHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'
        } else if (item.wifispeed === 'Fast') {
          wifiSpeedHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div></div>'
        } else if (item.wifispeed === 'Normal') {
          wifiSpeedHTML = '<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"></div></div>'
        } else if (item.wifispeed === 'Slow') {
          wifiSpeedHTML = '<div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%"></div></div>'
        }

        if (item.outlets === 'Plenty') {
          outletsHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'
        } else if (item.outlets === 'Normal') {
          outletsHTML = '<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"></div></div>'
        } else if (item.outlets === 'Few') {
          outletsHTML = '<div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%"></div></div>'
        } else if (item.outlets === 'None') {
          outletsHTML = '<div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">None</div></div>'
        }

        if (item.seats === 'Plenty') {
          seatsHTML = '<div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'
        } else if (item.seats === 'Normal') {
          seatsHTML = '<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"></div></div>'
        } else if (item.seats === 'Few') {
          seatsHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%"></div></div>'
        }

        if (item.service === 'Excellent') {
          serviceHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'
        } else if (item.service === 'Good') {
          serviceHTML = '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"></div></div>'
        } else if (item.service === 'Normal') {
          serviceHTML = '<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"></div></div>'
        } else if (item.service === 'Bad') {
          serviceHTML = '<div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%">None</div></div>'
        }

        html +=   '<div class="spots-item col-xs-12 col-sm-6 col-md-4 col-lg-4" data-id="' + item._id + '">'
        html +=     '<h3 class="spots-item-click" data-toggle="modal" data-target="#spot-modal"><a href="#">' + item.name + '</a></h3>'
        html +=     '<img src="' + item.picture + '" class="img-responsive img-rounded">'
        html +=     '<h4>' + item.district + '</h4>'
        html +=     '<div class="row">'
        html +=       '<div class="col-xs-2">'
        html +=         '<i class="fa fa-wifi fa-lg"></i>'
        html +=       '</div>'
        html +=       '<div class="col-xs-4">'
        html +=         wifiSpeedHTML;
        html +=       '</div>'
        html +=       '<div class="col-xs-2">'
        html +=         '<i class="fa fa-usd fa-lg"></i>'
        html +=       '</div>'
        html +=       '<div class="col-xs-4">'
        html +=         item.price
        html +=       '</div>'
        html +=     '</div>'
        html +=     '<div class="row">'
        html +=       '<div class="col-xs-2">'
        html +=         '<i class="fa fa-plug fa-lg"></i>'
        html +=       '</div>'
        html +=       '<div class="col-xs-4">'
        html +=         outletsHTML;
        html +=       '</div>'
        html +=       '<div class="col-xs-2">'
        html +=         '<i class="fa fa-cutlery fa-lg"></i>'
        html +=       '</div>'
        html +=       '<div class="col-xs-4">'
        html +=         item.food
        html +=       '</div>'
        html +=     '</div>'
        html +=   '</div>'
      });

    $('#spots-list').html(html);
  }

  Spot.prototype.showAllSpots = function(){
    
    this.loadingScreen();

    $.ajax({
      context: this,
      type: 'GET',
      url: '/spots',
      success: function(response){
        console.log('list spots',response)

        this.displaySpots(response);

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
        html +=     '<h4>' + response.address + '</h4>'
        html +=     '<h4>' + response.district + '</h4>'
        html +=     '<div class="row">'
        html +=       '<div class="col-xs-6">'
        html +=         '<h5><i class="fa fa-wifi fa-lg"></i>' + ' ' + response.wifispeed + '</h5>'
        html +=         '<h5><i class="fa fa-plug fa-lg"></i>' + ' ' + response.outlets + '</h5>'
        html +=         '<h5><i class="fa fa-users fa-lg"></i>' + ' ' + response.seats + '</h5>'
        html +=         '<h5><i class="fa fa-smile-o fa-lg"></i>' + ' ' + response.service + '</h5>'
        html +=       '</div>'
        html +=       '<div class="col-xs-6">'
        html +=         '<h5><i class="fa fa-signal fa-lg"></i>' + ' ' + response.wifitype + '</h5>'
        html +=         '<h5><i class="fa fa-usd fa-lg"></i>' + ' ' + response.price + '</h5>'
        html +=         '<h5><i class="fa fa-cutlery fa-lg"></i>' + ' ' + response.food + '</h5>'
        html +=       '</div>'
        html +=     '</div>'
        html +=   '</div>'

        $('#spot-modal-content').html(html);
      }
    });
  };

  Spot.prototype.searchSpots = function(searchKey,searchValue){
    this.loadingScreen();

    $.ajax({
      context: this,
      type: 'GET',
      url: '/spots?'+ searchKey + '=' + searchValue,
      success: function(response){
        console.log('search spots',response);

        this.displaySpots(response);
        
        setTimeout(function(){
          $('#spots-list').show();
          $('#loading').hide();
        },1000);
      }
    });
  };

  Spot.prototype.filterSpots = function(filterKey,filterValue){

  };

  Spot.prototype.loadingScreen = function(){
    $('#spots-list').hide();
    $('#loading').show();
  };



  var spot = new Spot();

  spot.showAllSpots();

  $(document).on('submit','#addspot-form',function(e){
    e.preventDefault();

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
      spot.service = $('#addspot-service option:selected').text();
      spot.picture = $('#addspot-picture').val();

    spot.addSpot();
  });

  $(document).on('click','.spots-item-click',function(e){
    e.preventDefault();

    var id = $(this).parent().data('id');
    spot.showOneSpot(id);
  });

  $(document).on('click keypress','#search-district-btn',function(e){
    e.preventDefault();

    var searchValue = $('#search-district').val();
    
    if (e.which === 13 || e.type === 'click') {
      $('#spots-list').children().remove();

      if (searchValue === '') {
        spot.showAllSpots();
      } else {
        spot.searchSpots('district',searchValue);
      }
    }
  });


  $(document).on('click','.filter-btn',function(e){
    e.preventDefault();
    console.log('button filter')

    var searchKey = $(this).data('filtersearch');
    var searchValue = $(this).data('filtervalue');

    spot.searchSpots(searchKey,searchValue);
  });

});
