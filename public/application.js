$(document).ready(function(){

  var Profile = function(){

  };

  Profile.prototype.signUp = function(username, email, password){
    $.ajax({
      context: this,
      type: 'POST',
      url: '/users',
      data: {
          user: {
            username: username,
            email: email,
            password: password
          }
      },
      dataType: 'json',
      success: function(response){
        console.log("create profile", response);
        $('.signup-error').addClass('hidden');
        $('.signup-success').removeClass('hidden').text('Congratulations! You successfully signed up.');
        setTimeout(function(){
          location.reload(true);
        },2000)},
      error: function(response){
        console.log('error',response);
        $('.signup-error').removeClass('hidden').text(response.responseText);
      }
    });
  };

  Profile.prototype.signIn = function(email, password){
    $.ajax({
      context: this,
      type: 'POST',
      url: '/sessions',
      data: {
          user: {
            email: email,
            password: password
          }
      },
      dataType: 'json',
      success: function(response){
        console.log('Profile loggedin',response);
        $('.signin-error').addClass('hidden');
        $('.signin-success').removeClass('hidden').text('Congratulations! You successfully signed in.');
        setTimeout(function(){
          location.reload(true);
        },2000)},
      error: function(response){
        console.log('error',response);
        $('.signin-error').removeClass('hidden').text(response.responseText);
      }
    });
  };


  var profile = new Profile();


  $('#signup-form').submit(function(){
    event.preventDefault();

    var username = $('#signup-username').val();
    var email = $('#signup-email').val();
    var password = $('#signup-password').val();

    profile.signUp(username, email, password);

  });

  $('#signin-form').submit(function(){
    event.preventDefault();

    var email = $('#signin-email').val();
    var password = $('#signin-password').val();

    profile.signIn(email, password);

  });


});