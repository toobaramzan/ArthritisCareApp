MyWebApp.namespace("UI.addNewPatient");
MyWebApp.UI.addNewPatient = (function () {
    "use strict";
    var _isInitialized = false;
    var id = 1;
    var valid = "y";
    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            GetAllDataList();
            LoadCities();
            SaveEvents();
            printPage(valid);
            DiseaseRedirect(valid);
        }
    }

    function LoadCities() {
       
        var myObj, x,i;
        myObj = {
            "city": ["Lahore","Layyah" ,"Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Hyderabad", "Peshawar", "Islamabad", "Quetta", "Sargodha", "Sialkot", "Bahawalpur", "Sukkur", "Jhang", "Shekhupura", "Mardan", "Gujrat", "Larkana", "Kasur", "Rahim Yar Khan", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Mingora", "Mirpur Khas", "Chiniot", "Nawabshah", "Kamoke", "Burewala", "Jhelum", "Sadiqabad", "Khanewal", "Hafizabad", "Kohat", "Jacobabad", "Shikarpur", "Muzaffargarh", "Khanpur", "Gojra", "Bahawalnagar", "Abbottabad", "Muridke", "Pakpattan", "Khuzdar", "Jaranwala", "Chishtian", "Daska", "Mandi Bahauddin", "Ahmadpur East", "Kamalia", "Tando Adam", "Khairpur", "Dera Ismail Khan", "Vehari", "Nowshera", "Dadu", "Wazirabad", "Khushab", "Charsada", "Swabi", "Chakwal", "Mianwali", "Tando Allahyar", "Kot Adu", "Turbat"]
        };
        for (i = 0; i < myObj.city.length; i++) {
            x = myObj.city[i];
            $('#hosting-plan').append($("<option></option>").attr("value", x).text(x));
        }

    }

    function SaveEvents() {
        $("#submitButton").click(function (e) {
            ValidateFields("no");
      
        });

        $("#submitUpdateButton").click(function (e) {
            ValidateFields("yes");
        });
    }

    function ValidateFields(update) {
        valid = "yes";
        if ($("#fName").val() === "" || !($("#fName").val()).match(/^[a-zA-Z\s]+$/))
        {
            document.getElementById("fName").value = "";
            document.getElementById("fName").style.borderColor = "#cc0000";
            document.getElementById("fName").placeholder = "Enter First Name!";
            document.getElementById("fName").className = "placeHolderFormat";
            valid = "no";
        }
       
        if ($("#phone").val() != "")
        {
            if(!($("#phone").val()).match(/[0-9]/g)){
            document.getElementById("phone").value = "";
            document.getElementById("phone").style.borderColor = "#cc0000";
            document.getElementById("phone").placeholder = "Enter Valid Number!";
            document.getElementById("phone").className = "placeHolderFormat";
            valid = "no";
        }
        }
        
        if($("#age").val()!="")
        {
            if (!($("#age").val()).match(/[0-9]/g))
            {
                document.getElementById("age").value = "";
                document.getElementById("age").style.borderColor = "#cc0000";
                document.getElementById("age").placeholder = "Enter Valid Age!";
                document.getElementById("age").className = "placeHolderFormat";
                valid = "no";
            }
        }
      
        if(valid === "yes")
        {
            SavePatient(update);
            printPage("yes");
            DiseaseRedirect("yes");
        }
        else {
            alignModel();
            $("#myModal").modal();
        }
    }

    function alignModel () {
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

    function validityChecker(valid)
    {

    }

    function resetPageFields()
    {
        $("input, select, textarea").not("input[type=checkbox], input[type=radio], input[type=button], input[type=submit]").val("");
        $("input[type=checkbox], input[type=radio]").prop("checked", false);
    }

    function GetAllDataList() {

        var url = "HistoryData/getAllHistoryFormFileds";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                DisplayRosList(result.data);
                DisplayPmhList(result.data);
                DisplayUnaryLabList(result.data);
                DisplayBinaryLabList(result.data);
                DisplayMedList(result.data);
                DisplayDiseaseList(result.data);
            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data Please try again.');
        });

    }

    function DisplayRosList(rosList) {

        $("#RosList").html("");

        if (!rosList)
            return;
        var source = $("#RosListDisplaytemplate").html();
        var template = Handlebars.compile(source);

        var html = template(rosList);
        $("#RosList").append(html);

        //BindAndFormat();

    }

    function DisplayPmhList(pmhList) {

        $("#PmhList").html("");

        if (!pmhList)
            return;

        var source = $("#pmhListDisplaytemplate").html();
        var template = Handlebars.compile(source);

        var html = template(pmhList);
        $("#PmhList").append(html);

        //BindAndFormat();

    }
    function DisplayDiseaseList(data) {

        $("#DiseaseList").html("");

        if (!data)
            return;

        var source = $("#DiseaseListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#DiseaseList").append(html);

        //BindAndFormat();

    }

    function DisplayUnaryLabList(data) {

        $("#UnaryLabs").html("");

        if (!data)
            return;

        var source = $("#UnaryLabListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#UnaryLabs").append(html);

        //BindAndFormat();

    }

    function DisplayBinaryLabList(data) {

        $("#BinaryLab").html("");

        if (!data)
            return;

        var source = $("#BinaryLabListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#BinaryLab").append(html);

        //BindAndFormat();

    }

    function DisplayMedList(data) {

        $("#MedList").html("");

        if (!data)
            return;

        var source = $("#MedicineListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#MedList").append(html);

        //BindAndFormat();

    }
    function SavePatient(update) {

        var diseaseList = [];
        var pmhList = [];
        var rosList = [];
        var medName = [];
        var medType = [];
        var medVal = [];
        var labName = [];
        var labVal = [];
        var labResult = [];
        var rosId = [];
        var pmhId = [];
        var disId = [];
        var medId = [];
        var labId = [];
        
        var dummy;
        $('#DiseaseList input:checked').each(function (i) {
            diseaseList[i] = $(this).attr('name');
            dummy = diseaseList[i].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
            disId[i] = $('#' + dummy).text();
        });
        $('#RosList input:checked').each(function (i) {
            rosList[i] = $(this).attr('name');
            dummy = rosList[i].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
            rosId[i] = $('#' + dummy).text();

        });
        $('#PmhList input:checked').each(function (i) {
            pmhList[i] = $(this).attr('name');
            dummy = pmhList[i].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
            pmhId[i] = $('#' + dummy).text();
        });

        var j = 0;
        $('#MedList input:text').each(function (i) {
              if ($(this).val()) {
                medVal[j] = $(this).val();
                medName[j] = $(this).attr('name');
                var d = medName[j].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
               medType[j] = $('input[name=' + d + ']:checked').val();
                j++;
            }
        });
        var k=0;
         $('#UnaryLabs input:text').each(function (i) {
             if ($(this).val()) {
                labVal[k] = $(this).val();
                labName[k] = $(this).attr('name');
                var d=  labName[k].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
                labResult[k] = null;
                k++;
            }
         });

         $('#BinaryLab input:text').each(function (i) {
             if ($(this).val()) {
                 labVal[k] = $(this).val();
                 labName[k] = $(this).attr('name');
                 var result = labName[k].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
                 labResult[k] = $('input[name=' + result + ']:checked').val();
                 k++;
             }
         });


        var weit= $("#weight").val();
        weit = weit + $("#weightType").val();
        var pId;
        var dat;
        if (update === "no") {
            pId=$("#fName").val()+"_"+id;
            dat = Date.now;
            id = id + 1;
           
        }
        else if (update === "yes") {
            pId=$("#pid").text();
            dat = $("#pVdate").text();
        }


        var addPatInfo = {
            
            visitDate: dat,
            firstName: $("#fName").val(),
            patientId: pId,
            lastName: $("#lName").val(),
            gender: $("#gender").val(),
            phoneNumber: $("#phone").val(),
            city: $("#city").val(),
            age: $("#age").val(),

            systolicBp: $("#systolicBP").val(),
            diastolicBp: $("#diastolicBP").val(),
            weight:weit,
            treatmentPlan: $("#treatmentPlan").val(),
            weightUnit:$("#weightType").val(),
            cc: $("#cc").val(),
            ph: $("#ph").val(),
            fh: $("#fh").val(),
            general: $("#general").val(),
            systemic: $("#systemic").val(),

            tjc: $("#tjc").val(),
            sjc: $("#sjc").val(),
            uac: $("#vac").val(),
            das28: $("#das28").val(),
            DiseaseList: diseaseList,
            Ros: rosList,
            pmh: pmhList,
            MedName: medName,
            MedType: medType,
            MedVal: medVal,
            LabName: labName,
            LabVal: labVal,
            LabResult: labResult,
            rosId: rosId,
            pmhId: pmhId,
            disId: disId,
            labId: labId,
            medId:medId

        }
 
        var dataToSend = JSON.stringify(addPatInfo);
        var url;
        if (update === "no")
        {
            url = "HistoryData/SavePatient";
        }
        else if (update === "yes")
        {
            url = "HistoryData/UpdatePatient";
        }

        MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {

            if (result.success === true) {
                MyWebApp.UI.showMessage("#spstatus", 'Data has been saved successfully', Enums.MessageType.Success);
                if (update === "no") {
                    resetPageFields();
                }
            } else {
                MyWebApp.UI.showMessage("#spstatus", result.error, Enums.MessageType.Error);
            }
        }, function (xhr, ajaxoptions, thrownerror) {
            MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Patient  please try again.');
        });


    }

    function printPage(val)
    {
        $('#printHis').click(function () {
            if (val==="yes") {
                // window.location.href = "PrintVisit";
                var win = window.open("PrintHistory", "_blank", "width=1200,height=600");
                $("#myModal").modal('hide');
                win.print();
            }
            else {
                alignModel();
                var modal = $('#myModal');
                modal.find('.modal-body p').text('Please Submit Form Before print!');
                $("#myModal").modal();
               
            }
        });

    }

    function DiseaseRedirect(valid) {
        $('#disease').click(function () {
            if (valid === "yes") {
                window.open('testListView', '_blank');
                $("#myModal").modal('hide');
            }
            else {
                alignModel();
                var modal = $('#myModal');
                modal.find('.modal-body p').text('Please Submit Form Before conducting Test!');

                $("#myModal").modal();

            }
        });

    }


    return {
        readyMain: function () {
            initialisePage();

        }
    };
}
 ());
