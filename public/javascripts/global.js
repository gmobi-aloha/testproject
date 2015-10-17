(function($){
    User = Backbone.Model.extend({
       defaults: {
         username: '',
         email: ''
       }
    }); 

    Users = Backbone.Collection.extend({
       model: User,
       url: "/userlist"
    });

    var columns = [{
         name: "username",
         label: "UserName",
         editable: false,
         cell: "string"
       }, {
         name: "email",
         label: "Email",
         cell: "string"
       }, {
         name: "delete",
         label: "Delete?",
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
        render: function(){
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
                 tableContent += '<td><a href="/deleteuser/' + user.get('_id') + '"'+ ' id="linkdeleteuser" rel="' + user.get('_id') + '">delete</a></td>';
                 tableContent += '</tr>';             
            });
            $('#userList').append(tableContent);
            */
        }
    });
    
    

    var table_View = new TableView();
    

})(jQuery);


function generateTable() {
   
    var User = Backbone.Model.extend({});
       
    var Users = Backbone.Collection.extend({
         model: User,
         url: "/userlist"
    }); 

    var userlist = new Users();
    alert(userlist.fetch());
    userlist.fetch();
       
    var columns = [{
         name: "name",
         label: "UserName",
         editable: false,
         cell: "string"
       }, {
         name: "email",
         label: "Email",
         cell: "string"
       }, {
         name: "delete",
         label: "Delete?",
         cell: "string"
    }];
       
    var grid = new Backgrid.Grid({
         columns: columns,
         collections: userlist  
    });

    $('#userList').append(grid.render().$el);
}
