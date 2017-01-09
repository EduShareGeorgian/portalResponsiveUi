function getCurrentUserProperty(propertyName) {
    var returnVal = null;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
        async: false,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            try {
                var properties = data.d.UserProfileProperties.results;
                for (var i = 0; i < properties.length; i++) {
                    var property = properties[i];
                    if (property.Key == propertyName) {
                        returnVal = property.Value;
                    }
                }
            } catch (err2) {
                alert(JSON.stringify(err2));
            }
        },
        error: function (jQxhr, errorCode, errorThrown) {
            alert(errorThrown);
        }
    });
    return returnVal;
}
