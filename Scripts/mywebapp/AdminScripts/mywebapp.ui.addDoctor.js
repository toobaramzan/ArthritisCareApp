MyWebApp.namespace("UI.addDoctor");

MyWebApp.UI.addDoctor = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            // GetAllDataList();
            checkUserName();
            addAnotherQualification();
            addAnotherDesignation();
            //submitBtnClick();
            submitBtnClick();
        }
    }

    /*----------------------------Check User Name Availabilty---------------*/

    function checkUserName() {
        $('#uname').focusout(function () {
            var userName = $('#uname').val();
            $("#userError").hide();

            var obj = {
                Fname: null,
                Lname: null,
                Uname: userName,
                Pass: null,
                Cat: null,
                Des: null,
                Qua: null
            }

            var dataToSend = JSON.stringify(obj);

            var url = "DocInfo/CheckeUserName";

            MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {

                if (result.success === true) {

                    $('#userError').text("User Name is available");
                    $('#userError').css("color", "blue");
                    $('#userError').show();
                } else {
                    $('#userError').text("User already exists in database");
                    $('#userError').css("color", "red");
                    $('#userError').show();
                    $('#uname').focus();

                }
            }, function (xhr, ajaxoptions, thrownerror) {
                MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Data: "' + thrownerror + '". please try again.', Enums.MessageType.Error);
            });

        });

    }
    /*----------Add Another Button Click Function-------*/
    


    function addAnotherQualification() {
       
        $('#add1').click(function () {
           
            var textbox = document.createElement("input");
            textbox.setAttribute("type", "text");
            textbox.setAttribute("value", "");
            textbox.setAttribute("style", "height:auto");
            var mybr = document.createElement('br');
            var mybr2 = document.createElement('br');
            var foo = document.getElementById("quaDiv");
            foo.appendChild(mybr);
            foo.appendChild(textbox);
            foo.appendChild(mybr2);
        });
    }



    function addAnotherDesignation() {
        
        $('#add2').click(function () {
           
            var textbox = document.createElement("input");
            textbox.setAttribute("type", "text");
            textbox.setAttribute("value", "");
            textbox.setAttribute("style", "height:auto");
            var mybr = document.createElement('br');
            var mybr2 = document.createElement('br');
            var foo = document.getElementById("desDiv");
            foo.appendChild(mybr);
            foo.appendChild(textbox);
            foo.appendChild(mybr2);
        });
    }




    function submitBtnClick() {
        
        $("#submitButton").click(function () {

            var fname = $('#fname1').val();
            var lname = $('#lname1').val();
            var uname = $('#uname').val();
            var pass = $('#pass1').val();
            var cat = $('#cat').val();
            var qua = [];
            var des = [];

            $('#quaDiv input:text').each(function (i) {
                if ($(this).val()) {
                    qua[i] = $(this).val();
                }
               
            });

            $('#desDiv input:text').each(function (i) {
                if ($(this).val()) {
                    des[i] = $(this).val();
                }
               
            });
            if (fname === "" || uname === "" || pass === "") {
                alignModel();
                $("#addDocModal").modal();
            }
            else {

            var obj = {
                Fname: fname,
                Lname: lname,
                Uname: uname,
                Pass: pass,
                Cat: cat,
                Des: des,
                Qua: qua
            }

            var dataToSend = JSON.stringify(obj);
            var url = "DocInfo/SaveDocInfo";

            MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {
                
                if (result.success === true) {

                   
                    MyWebApp.UI.showMessage("#spstatus", 'Data has been saved successfully', Enums.MessageType.Success);
                } else {
                    
                    MyWebApp.UI.showMessage("error", result.error, Enums.MessageType.Error);
                }
            }, function (xhr, ajaxoptions, thrownerror) {
                MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Data: "' + thrownerror + '". please try again.', Enums.MessageType.Error);
            });
            }
        });
    }

    function alignModel() {
        function reposition() {
            var modal = $(this),
                dialog = modal.find('.modal-dialog');
            modal.css('display', 'block');

            // Dividing by two centers the modal exactly, but dividing by three 
            // or four works better for larger screens.
            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 3));
        }
        // Reposition when a modal is shown
        $('.modal').on('show.bs.modal', reposition);
        // Reposition when the window is resized
        $(window).on('resize', function () {
            $('.modal:visible').each(reposition);
        });
    }
    return {
        readyMain: function () {
            initialisePage();
        }
    };
}
 ());
