MyWebApp.namespace("UI.profile");

MyWebApp.UI.profile = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            GetProfileDataList();
           
        }
    }
    function GetProfileDataList() {

        // var profileObj = $('#userName').val();
        var profileObj = { userName: $('#userName').text() }
      //  alert(profileObj.userName+"HUGIGUYU");

        var dataToSend = JSON.stringify(profileObj);
        var url = "HistoryData/getDocProfileRecord";

        MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {
           // alert("i am in");
            if (result.success === true) {
               // MyWebApp.UI.showMessage("#spstatus", 'Data has been saved successfully', Enums.MessageType.Success);


            } else {
                MyWebApp.UI.showMessage("error", result.error, Enums.MessageType.Error);
            }
        }, function (xhr, ajaxoptions, thrownerror) {
            alert("why i am in");
            MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Data: "' + thrownerror + '". please try again.', Enums.MessageType.Error);
        });


    }


    return {
        readyMain: function () {
            initialisePage();
        }
    };
}
 ());

