function IsCurrentUserHasContribPerms() {
    IsCurrentUserMemberOfGroup("Portal Owners", function (isCurrentUserInGroup) {
        if (isCurrentUserInGroup) {
            // The current user is in the [Members] group!
            alert("This is an owner!");
        }
    });
}
ExecuteOrDelayUntilScriptLoaded(IsCurrentUserHasContribPerms, 'SP.js');
function IsCurrentUserMemberOfGroup(groupName, onComplete) {

    var currentContext = new SP.ClientContext.get_current();
    var currentWeb = currentContext.get_web();

    var currentUser = currentContext.get_web().get_currentUser();
    currentContext.load(currentUser);

    var allGroups = currentWeb.get_siteGroups();
    currentContext.load(allGroups);

    var group = allGroups.getByName(groupName);
    currentContext.load(group);

    var groupUsers = group.get_users();
    currentContext.load(groupUsers);

    currentContext.executeQueryAsync(onSuccess, onFailure);

}

function onSuccess(sender, args) {
    alert("Success");
    var userInGroup = false;
    var groupUserEnumerator = groupUsers.getEnumerator();
    while (groupUserEnumerator.moveNext()) {
        var groupUser = groupUserEnumerator.get_current();
        if (groupUser.get_id() == currentUser.get_id()) {
            userInGroup = true;
            break;
        }
    }
    onComplete(userInGroup);
}

function onFailure(sender, args) {
    onComplete(false);
}

function onComplete(userInGroup) {
    if (userInGroup) {
        alert("Member of 'Portal Owners'");

    } else {
        alert("Not a 'Portal Owners' member");
    }
}