//var currentContext;
//var adminUsers;
//var currentUserName;
//var groupCollection;
//var _group;
//var vIsAdmin = false;
//// Make sure the SharePoint script file 'sp.js' is loaded before your
//// code runs.
//SP.SOD.executeFunc('sp.js', 'SP.ClientContext', checkUser);

//function checkUser() {
//    currentContext = SP.ClientContext.get_current();

//    //get current user
//    currentUserName = currentContext.get_web().get_currentUser();
//    currentContext.load(currentUserName);

//    // get Admin group
//    groupCollection = currentContext.get_web().get_siteGroups();
//    currentContext.load(groupCollection);

//    //var _group = groupCollection.getById(10); // ID of the Group
//    currentContext.executeQueryAsync(checkUserSuccess, checkUserFailure);

//}

//function checkUserSuccess() {
//    alert("CheckUserSuccess");
//    //currentContext = SP.ClientContext.get_current();

//    var grpEnum = groupCollection.getEnumerator();

//    while (grpEnum.moveNext()) {
//        var grpItem = grpEnum.get_current();
//        currentContext.load(grpItem);

//        // here you can add one more if condition to check for "Member" group.

//        if (grpItem.get_title() == "Owner") {
//            _group = grpItem;
//            break;
//        }
//    }
//    alert("End While Loop");
//    adminUsers = _group.get_users();
//    currentContext.load(adminUsers);

//    currentContext.executeQueryAsync(findUserInGroup, checkUserFailure);
//}

//function findUserInGroup() {
//    alert("FindUserInGroup");
//    var listEnumerator = adminUsers.getEnumerator();

//    while (listEnumerator.moveNext()) {
//        alert(listEnumerator.toString());
//        var item = listEnumerator.get_current();

//        //check current user login name and user login name from admin group
//        if (currentUserName.get_loginName() == item.get_loginName()) {
//            alert("Is Admin");
//            vIsAdmin = true;
//            break;
//        }
//    }

//    if (!vIsAdmin) {
//        alert("Redirecting");
//        //window.location.replace("/sites/student");
//    }
//    else { }
//    // Owner group Url.
//    // They don't need to go anywhere
//    alert("You are an owner!");
//}

//function checkUserFailure() {
//    alert("Failure!");
//}
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