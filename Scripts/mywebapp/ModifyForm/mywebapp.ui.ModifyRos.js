MyWebApp.namespace("UI.ModifyRos");

MyWebApp.UI.ModifyRos = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;

            GetRosList();
            AddRosClick();
            updateRosClick();
          
           
          
        }
    }
    function ValidateForm($trForTLA) {

        var isValid = true;
        var rosname = $("#newRosName").val();
     

        if (rosname == '' ) {
            MyWebApp.UI.showRoasterMessage("Please Enter a ROS value.", Enums.MessageType.Warning);
            isValid = false;
        }

        return isValid;
    }
 
    function AddRosClick() {

       
            $('#addRosBtn').click(function () {
                if (ValidateForm()) {
                    var name = $('#newRosName').val();
                    var FieldObj = {
                        Name: name
                    }

                    var data = JSON.stringify(FieldObj);
                    var url = "ModifyForm/addNewRos";
                    MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                        if (result.success === true) {

                            console.log(result);
                            GetRosList();
                            MyWebApp.UI.showRoasterMessage("ROS is Added successfully!", Enums.MessageType.Success);
                            ClearFields();
                        } else {
                            MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                        }
                    }, function (xhr, ajaxOptions, thrownError) {
                        MyWebApp.UI.showRoasterMessage('A problem has occurred while adding ROS: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                    });
                }
        });
    
    }
    function ClearFields() {

       
        $("#newRosName").val("").watermark("ROS Name");


    }
    function GetRosList() {
        

        var url = "ModifyForm/getRosList";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayRosList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting ROS List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

    }

    function DisplayRosList(rosList) {
  

        $("#rosBody").html("");

        if (!rosList)
            return;
        var source = $("#RosListDisplaytemplate").html();
        var template = Handlebars.compile(source);
      
        var html = template(rosList);
        $("#rosBody").append(html);

        //BindAndFormat();

    }
    function updateRosClick() {


        $('#updateRos').click(function () {


            var toBeUpdated = $('#rosId').val();
            var updatedName = $('#newName').val();

            var toUpdate = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName
            }
            var data = JSON.stringify(toUpdate);
            var url = "ModifyForm/updateRos";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);
                    
                    MyWebApp.UI.showRoasterMessage("ROS is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating ROS: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
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
