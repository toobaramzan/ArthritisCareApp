MyWebApp.namespace("UI.ModifyMeds");

MyWebApp.UI.ModifyMeds = (function () {
    "use strict";
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            GetMedList();
            AddMedsClick();
            updateVMedClick();
            updateHMedClick();
            updateCMedClick();
            ClearFields();
        }
    }
    function ValidateForm($trForTLA) {

        var isValid = true;
        var medname = $("#newMedName").val();
        var type = $("#rbhisMeds:checked").val() || $("#rbvisitMeds:checked").val() || $("#both:checked").val();
        
        if (medname == '' || type == null) {
            MyWebApp.UI.showRoasterMessage("Please Enter all input values value.", Enums.MessageType.Warning);
            ClearFields();
            isValid = false;
        }

        return isValid;
    }
    function AddMedsClick() {
                
        //$('#addMedBtn').click(function () {

        //    if (ValidateForm()) {

        //        var name = $('#newMedName').val();
        //        var FieldObj = {
        //            Name: name
        //        }
        //        var data = JSON.stringify(FieldObj);

                $("input[name=user-type]:radio").click(function () {

                    if ($('input[name=user-type]:checked').val() == "HistoryMeds") {

                        $('#addMedBtn').click(function () {

                            if (ValidateForm()) {

                                var name = $('#newMedName').val();
                                var FieldObj = {
                                    Name: name
                                }
                                var data = JSON.stringify(FieldObj);
                        var url = "ModifyForm/addNewHisMeds";
                        MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                            if (result.success === true) {

                                console.log(result);
                                GetMedList();
                                MyWebApp.UI.showRoasterMessage("History Med is Added successfully!", Enums.MessageType.Success);

                            } else {
                                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                            }
                            ClearFields();
                        }, function (xhr, ajaxOptions, thrownError) {
                            MyWebApp.UI.showRoasterMessage('A problem has occurred while adding History Med: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                        });

                    }
                    });

                    } else if ($('input[name=user-type]:checked').val() == "VisitMeds") {

                        $('#addMedBtn').click(function () {

                            if (ValidateForm()) {

                                var name = $('#newMedName').val();
                                var FieldObj = {
                                    Name: name
                                }
                                var data = JSON.stringify(FieldObj);
                        var url = "ModifyForm/addNewVisitMeds";
                        MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                            if (result.success === true) {

                                console.log(result);
                                GetMedList();
                                MyWebApp.UI.showRoasterMessage("Visit Med is Added successfully!", Enums.MessageType.Success);

                            } else {
                                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                            }
                            ClearFields();
                        }, function (xhr, ajaxOptions, thrownError) {
                            MyWebApp.UI.showRoasterMessage('A problem has occurred while adding Visiting Med: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                        });

                    }
                    });
                    }
                    else if ($('input[name=user-type]:checked').val() == "both") {

                        $('#addMedBtn').click(function () {

                            if (ValidateForm()) {

                                var name = $('#newMedName').val();
                                var FieldObj = {
                                    Name: name
                                }
                                var data = JSON.stringify(FieldObj);
                                var url = "ModifyForm/addNewCommonMed";
                                MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                                    if (result.success === true) {

                                        console.log(result);
                                        GetMedList();
                                        MyWebApp.UI.showRoasterMessage("Common Med is Added successfully!", Enums.MessageType.Success);

                                    } else {
                                        MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                                    }
                                    ClearFields();
                                }, function (xhr, ajaxOptions, thrownError) {
                                    MyWebApp.UI.showRoasterMessage('A problem has occurred while adding Visiting Med: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
                                });

                            }
                        });
                    }
    
                });
            //}
           // });
        
    }
    function ClearFields() {
      
        $("#rbhisMeds").attr("checked",false);
        $("#rbvisitMeds").attr("checked", false);
        $("#both").attr("checked", false);
        $("#newMedName").val("").watermark("Medication Name");
 

    }

    function GetMedList() {

        var url = "ModifyForm/getVMedsList";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayVisitMedList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting Visit Med List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

        var url = "ModifyForm/getHMedsList";
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayHisMedList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting History Med List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });

        var url = "ModifyForm/getCMedsList";
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayCMedList(result.data);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting History Med List: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });
    }
    function DisplayCMedList(data) {

        $("#cmedsbody").html("");

        if (!data)
            return;

        var source = $("#cMedicineListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#cmedsbody").append(html);

        //BindAndFormat();

    }
    function DisplayVisitMedList(data) {

        $("#vmedsbody").html("");

        if (!data)
            return;

        var source = $("#visitMedicineListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#vmedsbody").append(html);

        //BindAndFormat();

    }
    function DisplayHisMedList(data) {

        $("#hmedsbody").html("");

        if (!data)
            return;

        var source = $("#hisMedicineListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#hmedsbody").append(html);

        //BindAndFormat();

    }

    function updateVMedClick() {


        $('#updateVMed').click(function () {


            var toBeUpdated = $('#vMedId').val();
            var updatedName = $('#newName').val();

            var toUpdate = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName
            }
            var data = JSON.stringify(toUpdate);
            var url = "ModifyForm/updateVMed";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("Visit Med is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating visit Med: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
            });
        });
    }

    function updateHMedClick() {


        $('#updateHMed').click(function () {


            var toBeUpdated = $('#hMedId').val();
            var updatedName = $('#newName').val();

            var toUpdate = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName
            }
            var data = JSON.stringify(toUpdate);
            var url = "ModifyForm/updateHMed";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("History Med is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating History Med: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
            });
        });
    }
    function updateCMedClick() {
        

        $('#updateCMed').click(function () {

            
            var toBeUpdated = $('#cMedId').val();
            var updatedName = $('#newName').val();

            var toUpdate = {
                ToBeUpdated: toBeUpdated,
                UpdatedName: updatedName
            }
            var data = JSON.stringify(toUpdate);
            var url = "ModifyForm/updateCMed";
            MyWebApp.Globals.MakeAjaxCall("POST", url, data, function (result) {

                if (result.success === true) {

                    console.log(result);

                    MyWebApp.UI.showRoasterMessage("COMMON Med is updated successfully!", Enums.MessageType.Success);
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while updating History Med: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
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
