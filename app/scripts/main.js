Parse.initialize("T5Jvwx8cyX8fyf2ZqMl7XG360P3EkKLLF3aySs7G", "N2p1J0Ik0KL1ffXkgNVeQSGAEsv5a785mqVGykQ2");


var SignupView = Parse.View.extend({
  template: _.template($("#signup-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  },
  events: {
      "submit form.signup-form": "signUp"
  },
  signUp: function(){
    var self = this;
    var username = this.$("#signup-username").val();
    var password = this.$("#signup-password").val();
    Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
      success: function(user) {
        new HomeView();
        delete self;
      },
      error: function(user, error) {
        self.$(".signup-form .error").html(error.message).show();
      }
    });
    return false;
  }
});

var HomeView = Parse.View.extend({
  template: _.template($("#home-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
      var query = new Parse.Query(Parse.User);
      query.equalTo("objectId", Parse.User._currentUser.id);
      query.find({
        success: function(results){
          console.log(results[0].attributes.username)
          $("#header").append("<h1>Welcome, " + results[0].attributes.username + " to Fantasy - GM</h1><h2>Become the best</h2>");
        },
        error: function(object, error){
          console.log('damn')
        }
      });

  }
});

var LoginView = Parse.View.extend({
  template: _.template($("#login-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  },
  events:{
    "submit form.login-form": "logIn"
  },
  logIn: function(e){
    var self = this;
    var username = this.$("#login-username").val();
    var password = this.$("#login-password").val();

    Parse.User.logIn(username, password, {
      success: function(user) {
        new HomeView();
        delete self;
      },

      error: function(user, error) {
        self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
      }
    });

    return false;
  }
});

var AccountView = Parse.View.extend({
  template: _.template($("#account-template").html()),
  initialize: function(){
    this.render();
    $(".container").html(this.el);
  },
  render: function(){
    this.$el.html(this.template(this.model));
  },
  events: {
    "click #account-submit": "submit"
  },
  submit: function(){
    
  }
});


var ParseRouter = Parse.Router.extend({
  routes:{
    "": "signup",
    "home": "home",
    "login": "login",
    "account": "account"
  },
  signup: function(){
    new SignupView();
  },
  home: function(){
    new HomeView();
  },
  login: function(){
    new LoginView();
  },
  account: function(){
    new AccountView();
  }
});

new ParseRouter();

Parse.history.start();
