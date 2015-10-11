var userListData = [];
 

// DOM Ready =============================================================
$(document).ready(function() {
	
    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList').on('click', 'td a.linkshowuser', showUserInfo);

    // Delete User link click
    $('#userList').on('click', 'td a.linkdeleteuser', deleteUser);



});

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/userlist', function( data ) {
        userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(key, val){

            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + val.username + '">' + val.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="/deleteuser/' + val._id + '"'+ ' class="linkdeleteuser" rel="' + val._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        tableContent += '</table>';

        // Inject the whole content string into our existing HTML table
        $('#userList').append(tableContent);
    });
};

function showUserInfor(event) {
	// Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    
    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Delete User
function deleteUser(event) {

    console.log('delete user!');
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

