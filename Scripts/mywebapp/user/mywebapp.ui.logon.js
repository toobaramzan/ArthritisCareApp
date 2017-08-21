/// <reference path="../../_references.js" />

/*** 
* Exposes UI functions for the logon page
* @module Logon
* @namespace MyWebApp.UI
*/

MyWebApp.namespace("UI.Logon");

MyWebApp.UI.Logon = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {

        if (_isInitialized == false) {
            _isInitialized = true;
            ClearFields();
            BindEvents();
            LoadExistingInfo();
        }
    }//End of initialisePage

    function BindEvents() {

        $("#txtUserName").watermark('User Name');
        $("#txtPassword").watermark('Password');

        $('#lnkLogin').click(function () {
            //debugger;
            Logon();
            return false;
        });

        $('#txtUserName,#txtPassword').bind('keypress', function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                Logon();
                e.preventDefault();
                return false;
            }
        });

        $("#resend_password_link").bind("click", function () {
            window.location = $(this).attr("href");
        });

        $("#lnkHelp").bind("click", function () {
            window.location = $(this).attr("href");
        });

        $('#lnkLogin, ul#icons li').hover(
            function () { $(this).addClass('ui-state-hover'); },
            function () { $(this).removeClass('ui-state-hover'); }
        );


    }//End of BindEvents

    function ClearFields() {

    }//End of ClearFields

    function LoadExistingInfo() {

        var uName = $.cookie("UserName");
        var pasd = $.cookie("Password");

        if (uName != null && uName != "") {

            $('#txtUserName').val(uName);
            $('#txtPassword').val(pasd);
            $("#chkKeepMeLoggedIn").attr("checked", true);
        }
    }

    function Logon() {

        var userName = $('#txtUserName').val();
        var password = $('#txtPassword').val();

        if ($.trim(userName) === '') {
            MyWebApp.UI.showRoasterMessage("You must enter a user name.", Enums.MessageType.Error);
            $('#txtUserName').focus();
            return;
        }
        if ($.trim(password) === '') {
            MyWebApp.UI.showRoasterMessage("You must enter a password.", Enums.MessageType.Error);
            $('#txtPassword').focus();
            return;
        }

        if ($("#chkKeepMeLoggedIn").is(":checked") == true) {
            $.cookie("UserName", userName, { expires: 5 });
            $.cookie("Password", password, { expires: 5 });
        }
        else {
            $.cookie("UserName", null);
            $.cookie("Password", null);
        }

        var login = {
            UserName: userName,
            Password: password
        }

        var data = JSON.stringify(login);

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
    }//End of Logon function

    return {

        readyMain: function () {
            initialisePage();
        }
    };
}());


