MyWebApp.namespace("UI.ModifyLabs");

MyWebApp.UI.ModifyLabs = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            $("#visitLab2").hide();
            GetLabList();
            AddLabClick();
            updateVLabClick();
            updateHLabClick();
            updateCLabClick();
            ClearFields();
           
        }
    }
    function ValidateForm($trForTLA) {

        var isValid = true;
        var labname = $("#newLabName").val();
        var labType = $("#newLabType").val();
        var type = $("#rbhisLab:checked").val() || $("#rbvisitLab:checked").val() || $("#both:checked").val();
       
        if (labname == '' || labType=='' || type == null) {
            MyWebApp.UI.showRoasterMessage("Please Enter all input values value.", Enums.MessageType.Warning);
            ClearFields();
            isValid = false;
        }

        return isValid;
    }
    function AddLabClick() {

           // if (ValidateForm()){
                
                //var name = $('#newLabName').val();   
                //var type = $('#newLabType').val();
                
                //var labDataObj = {
                //    Name: name,
                //    Type: type
                //}
                //var data = JSON.stringify(labDataObj);
                
                $("input[name=user-lab]:radio").click(function () {
                    
                    if ($('input[name=user-lab]:checked').val() == "HistoryLab") {
        
                        $('#addLabbtn').click(function () {

                            if (ValidateForm()) {
                                var name = $('#newLabName').val();
                                var type = $('#newLabType').val();

                                var labDataObj = {
                                    Name: name,
                                    Type: type
                                }
                                var data = JSON.stringify(labDataObj);
                        
                            var url = "ModifyForm/addNewHisLab";
                            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                                if (result.success === true) {

                                    console.log(result);
                                    MyWebApp.UI.showRoasterMessage("History Lab is Added successfully!", Enums.MessageType.Success);
                                    GetLabList();
                                } else {
                                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                                }
                                ClearFields();
                               
                            }, function (xhr, ajaxOptions, thrownError) {
                                MyWebApp.UI.showRoasterMessage('A problem has occurred while adding History Lab : "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                            });
                        }
                        });
                    

                    }
                    else if ($('input[name=user-lab]:checked').val() == "VisitLab") {

                        $('#addLabbtn').click(function () {

                            if (ValidateForm()) {
                                var name = $('#newLabName').val();
                                var type = $('#newLabType').val();

                                var labDataObj = {
                                    Name: name,
                                    Type: type
                                }
                                var data = JSON.stringify(labDataObj);
                            var url = "ModifyForm/addNewVLab";
                            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                                if (result.success === true) {

                                    console.log(result);
                                    MyWebApp.UI.showRoasterMessage("Visit Lab is Added successfully!", Enums.MessageType.Success);
                                    GetLabList();
                                } else {
                                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                                }
                                ClearFields();
                            }, function (xhr, ajaxOptions, thrownError) {
                                MyWebApp.UI.showRoasterMessage('A problem has occurred while adding Visit Lab: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                            });
                        }
                        });

                    }
                    else if ($('input[name=user-lab]:checked').val() == "both") {

                        $('#addLabbtn').click(function () {

                            if (ValidateForm()) {
                                var name = $('#newLabName').val();
                                var type = $('#newLabType').val();

                                var labDataObj = {
                                    Name: name,
                                    Type: type
                                }
                                var data = JSON.stringify(labDataObj);
                                var url = "ModifyForm/addNewCLab";
                                MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                                    if (result.success === true) {

                                        console.log(result);
                                        MyWebApp.UI.showRoasterMessage("Common Lab is Added successfully!", Enums.MessageType.Success);
                                        GetLabList();
                                    } else {
                                        MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                                    }
                                    ClearFields();
                                }, function (xhr, ajaxOptions, thrownError) {
                                    MyWebApp.UI.showRoasterMessage('A problem has occurred while adding Visit Lab: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                                });
                            }
                        });

                    }
                });
            //}
               
    }

    function ClearFields() {

        $("#rbhisLab").attr("checked", false);
        $("#rbvisitLab").attr("checked", false);
        $("#both").attr("checked", false);
        $("#newLabName").val("").watermark("Lab Name");
        $("#newLabType").val("").watermark("Lab Type");  

    }

    function GetLabList() {

        var url = "ModifyForm/getVLabList";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayVisitLabList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting Visit Lab List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

        var url = "ModifyForm/getHLabList";
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayHisLabList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while History Lab List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

        var url = "ModifyForm/getCLabList";
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayCLabList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while History Lab: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

    }
    function DisplayVisitLabList(data) {

        $("#vlabbody").html("");

        if (!data) {
            return;
        }
        else {
            $("#visitLab2").show();
            var source = $("#visitLabListDisplaytemplate").html();
            var template = Handlebars.compile(source);
            var html = template(data);
            $("#vlabbody").append(html);
        }
        //BindAndFormat();

    }
    function DisplayHisLabList(data) {

        $("#hlabbody").html("");

        if (!data)
            return;

        var source = $("#hisLabListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#hlabbody").append(html);

        //BindAndFormat();

    }
    function DisplayCLabList(data) {

        $("#Clabbody").html("");

        if (!data)
            return;

        var source = $("#CLabListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#Clabbody").append(html);

        //BindAndFormat();

    }
    function updateVLabClick() {


        $('#updateVLab').click(function () {


            var toBeUpdated = $('#vLabId').val();
            var updatedName = $('#newLabName').val();
            var updatedType = $('#newLabType').val();

            var toUpdateLab = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName,
                UpdatedType: updatedType
            }
            var data = JSON.stringify(toUpdateLab);
            var url = "ModifyForm/updateVLab";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("Visit Lab is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating Visit Lab: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
            });
        });
    }

    function updateHLabClick() {


        $('#updateHLab').click(function () {


            var toBeUpdated = $('#hLabId').val();
            var updatedName = $('#newLabName').val();
            var updatedType = $('#newLabType').val();

            var toUpdateLab = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName,
                UpdatedType: updatedType
            }
            var data = JSON.stringify(toUpdateLab);
            var url = "ModifyForm/updateHLab";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("History Lab is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating History Lab: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
            });
        });
    }
    function updateCLabClick() {


        $('#updatecLab').click(function () {


            var toBeUpdated = $('#cLabId').val();
            var updatedName = $('#newLabName').val();
            var updatedType = $('#newLabType').val();

            var toUpdateLab = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName,
                UpdatedType: updatedType
            }
            var data = JSON.stringify(toUpdateLab);
            var url = "ModifyForm/updateCLab";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("Common Lab is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating History Lab: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
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
