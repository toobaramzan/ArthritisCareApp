
MyWebApp.UI.index = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
           // alert("asdas");
            LoginClick();
        }
    }

    function LoginClick()
    {
        $('#loginbtn').click(function () {
            var uname = $("#uname").val();
            var password = $("#password").val();
         redirectUrl(uname,password);
        });
    }

    function redirectUrl(uname,password)
    {
        var Login = {
            UserName: uname,
            Password:password
        }
        var data=JSON.stringify(Login);
        var url = "UserInfoData/ValidateUser";
        MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {
        if (result.success === true) {

            MyWebApp.UI.showRoasterMessage("Login is successful, entering into the application...", Enums.MessageType.Success);

                var returnUrl = MyWebApp.UI.getURLParameterByName("ReturnURL");

                if (returnUrl != "")
                    window.location.href = returnUrl;
                else
                    window.location.href = MyWebApp.Globals.baseURL + result.redirect;

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error, 5000);
            }
        }, function (xhr, ajaxOptions, thrownError) {
            //debugger;
            MyWebApp.UI.showRoasterMessage('There was a problem authenticating your credentials: "' + xhr.responseText + '". Please try again.', Enums.MessageType.Error);
        });

    }
    return {
        readyMain: function () {
            initialisePage();
        }
    };
}
 ());
