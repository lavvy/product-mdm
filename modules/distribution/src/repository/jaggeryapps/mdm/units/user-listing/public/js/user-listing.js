/**
 * Sorting function of users
 * listed on User Management page in WSO2 MDM Console.
 */
$(function() {
    var sortableElem = '.wr-sortable';
    $(sortableElem).sortable({
        beforeStop: function(event, ui){
            var sortedIDs = $(this).sortable('toArray');
            console.log(sortedIDs);
        }
    });
    $(sortableElem).disableSelection();
});

/**
 * Following click function would execute
 * when a user clicks on "Invite" link
 * on User Management page in WSO2 MDM Console.
 */
$("a#invite-user-link").click(function() {
    var username = $(this).data("username");
    var inviteUserAPI = "/mdm/api/users/" + username + "/invite";
    var userResponse = confirm("An invitation mail will be sent to User (" + username + ") " +
                               "to initiate Enrollment Process");
    if (userResponse == true) {
        $.ajax({
            type : "GET",
            url : inviteUserAPI,
            success : function(data) {
                alert("User invitation for enrollment sent.");
            },
            error: function() {
                alert("An unexpected error occurred.");
            }
        });
    }
});

/**
 * Following click function would execute
 * when a user clicks on "Remove" link
 * on User Management page in WSO2 MDM Console.
 */
$("a#remove-user-link").click(function() {
    var username = $(this).data("username");
    var removeUserAPI = "/mdm/api/users/" + username + "/remove";
    var userResponse = confirm("Do you really want to remove this user (" + username + ") from MDM User Store?");
    if (userResponse == true) {
        $.ajax({
            type : "GET",
            url : removeUserAPI,
            success : function(data) {
                if (data == 200) {
                    alert("User (" + username + ") was successfully removed.");
                    location.reload();
                } else if (data == 400) {
                    alert("Exception at backend.");
                } else if (data == 403) {
                    alert("Action not permitted.");
                } else if (data == 409) {
                    alert("User (" + username + ") does not exist.");
                }
            },
            error : function() {
                alert("An unexpected error occurred.");
            }
        });
    }
});

