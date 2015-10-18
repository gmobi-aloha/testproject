(function($){
    User = Backbone.Model.extend({
       defaults: {
         username: '',
         email: ''
       }
    }); 

    Users = Backbone.Collection.extend({
       model: User,
       url: "/api/users"
    });

    var columns = [{
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
            "click #create": "createUser",
            "click #delete": "deleteUser",
            "click #modify": "modifyuser"
        },
        render: function() {
            var grid = new Backgrid.Grid({
              columns: columns,
              collection: this.collection
            });
            $('#userList').append(grid.render().el);
            /*
            var tableContent = '';
            this.collection.each(function(user) {
                 tableContent += '<tr>';
                 tableContent += '<td>' + user.get('username') + '</td>';
                 tableContent += '<td>' + user.get('email') + '</td>'; 
                 tableContent += '<td><a href="/api/users/' + user.get('_id') + '"'+ ' id="linkdeleteuser" rel="' + user.get('_id') + '">delete</a></td>';
                 tableContent += '</tr>';             
            });
            $('#userList').append(tableContent);
            */
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
        },
        deleteUser: function(event) {
            event.preventDefault();
            var _id = $('input[name=_id]').val();
            $.ajax({
                type: 'DELETE',
                url: '/api/users/' + _id
            }).done(function(res) {
                window.location.reload();
            });
        },
        modifyuser: function(event) {
            
            event.preventDefault();
            var _id = $('input[name=_id]').val();
            var email = $('input[name=email]').val();
            alert(_id);

            $.ajax({
                type: 'PUT',
                data: email=_email,
                url: '/api/users/' + _id
            }).done(function(res) {
                window.location.reload();
            });
        }

    });
    
    var tableView = new TableView();
    
})(jQuery);