(function($){

    User = Backbone.Model.extend({
       defaults: {
         username: '',
         email: ''
       },
       idAttribute: "_id"
    }); 

    Users = Backbone.Collection.extend({
       model: User,
       url: "/api/users"
    });
   

    var deleteCell = Backgrid.Cell.extend({
        template: _.template('<button>Delete</button>'),
        events: {
            click: "deleteRow"
        },
        deleteRow: function(event) {
            event.preventDefault();
            
            var id = this.model.get('_id');
            var email = this.model.get('email');
            alert(email);
            
            $.ajax({
                type: 'DELETE',
                url: '/api/users/' + id
            }).done(function(res) {
                window.location.reload();
            }); 
        },
        render: function() {
            this.$el.html(this.template());
            this.delegateEvents();
            return this;
        } 
    });

    var modifyCell = Backgrid.Cell.extend({
        template: _.template('<button>Modify</button>'),
        events: {
            click: "deleteRow"
        },
        deleteRow: function(event) {
            event.preventDefault();
            
            var id = this.model.get('_id');
            var email = this.model.get('email');
            
            $.ajax({
                type: 'PUT',
                data: {'email': email},
                url: '/api/users/' + id
            }).done(function(res) {
                window.location.reload();
            });
        },
        render: function() {
            this.$el.html(this.template());
            this.delegateEvents();
            return this;
        } 
    });

    var columns = [ {
         name: "_id",
         label: "ID",
         editable: false,
         cell: "string"
       }, {
         name: "username",
         label: "UserName",
         editable: false,
         cell: "string"
       }, {
         name: "email",
         label: "Email",
         cell: "string"
       }, {
         name: "",
         label: "Delete",
         editable: false,
         cell: deleteCell
       }, {
         name: "",
         label: "Modify",
         editable: false,
         cell: modifyCell
       }];

    
  
    TableView = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            var self = this;
            this.collection = new Users();
            this.collection.fetch().done(function(){
                self.render();
            });
        },
        events: {
            "click #create": "createUser"
        },
        render: function() {
            var grid = new Backgrid.Grid({
              columns: columns,
              collection: this.collection
            });

            $('#userList').append(grid.render().el);
        },
        createUser: function(event) {
            event.preventDefault();
            var username = $('input[name=username]').val();
            var email = $('input[name=email]').val();
            
            $.ajax({
                type: 'POST',
                data: {'username': username, 'email': email},
                url: '/api/users/',
                dataType: 'JSON'
            }).done(function(res) {
                window.location.reload();
            });
        }  
    });
    
    var tableView = new TableView();
    
    


})(jQuery);