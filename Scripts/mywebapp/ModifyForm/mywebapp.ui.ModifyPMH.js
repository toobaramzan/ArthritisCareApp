MyWebApp.namespace("UI.ModifyPMH");

MyWebApp.UI.ModifyPMH = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            GetPMHList();
            AddPMHClick();
            updatePMHClick();
        }
    }
    function ValidateForm($trForTLA) {

        var isValid = true;
        var PMHname = $("#newPMHName").val();


        if (PMHname == '') {
            MyWebApp.UI.showRoasterMessage("Please Enter a PMH value.", Enums.MessageType.Warning);
            isValid = false;
        }

        return isValid;
    }
    function AddPMHClick() {
        $('#addPMHBtn').click(function () {

            if (ValidateForm()) {
                var name = $('#newPMHName').val();
                var FieldObj = {
                    Name: name
                }
                var data = JSON.stringify(FieldObj);
                var url = "ModifyForm/addNewPMH";
                MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                    if (result.success === true) {

                        console.log(result);
                        GetPMHList();
                        MyWebApp.UI.showRoasterMessage("PMH is Added successfully!", Enums.MessageType.Success);
                        ClearFields();
                    } else {
                        MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                    }
                }, function (xhr, ajaxOptions, thrownError) {
                    MyWebApp.UI.showRoasterMessage('A problem has occurred while adding PMH : "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                });
            }
            });
            
    }
    function ClearFields() {


        $("#newPMHName").val("").watermark("PMH Name");


    }
    function GetPMHList() {

        var url = "ModifyForm/getPMHList";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayPMHList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting PMH List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

    }

    function DisplayPMHList(pmhList) {

        $("#pmhBody").html("");

        if (!pmhList)
            return;
        var source = $("#pmhListDisplaytemplate").html();
        var template = Handlebars.compile(source);

        var html = template(pmhList);
        $("#pmhBody").append(html);

        //BindAndFormat();

    }
    function updatePMHClick() {


        $('#updatePMH').click(function () {


            var toBeUpdated = $('#pmhId').val();
            var updatedName = $('#newName').val();

            var toUpdate = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName
            }
            var data = JSON.stringify(toUpdate);
            var url = "ModifyForm/updatePMH";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("PMH is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating PMH: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
            });
        });
    }

    return {
        readyMain: function () {
            initialisePage();
        }
    };
}
 ());
