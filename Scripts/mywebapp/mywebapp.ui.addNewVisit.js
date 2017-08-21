MyWebApp.namespace("UI.addNewVisit");

MyWebApp.UI.addNewVisit = (function () {
    "use strict";
    var _isInitialized = false;
    var VisitDataObj;
    var valid = "yes";
    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            GetAllDataList();
            buttonForSubmissionClick();
            printPage("no");
            DiseaseRedirectLink("no");

        }
    }

    function buttonForSubmissionClick()
    {
        $("#VisitUpdateBtn").click(function () {
            submitBtnClick("yes");
        });
        $('#subBtn').click(function () {
            submitBtnClick("no");
        });
    }

    function GetAllDataList() {

        var url = "HistoryData/getAllHistoryFormFileds";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
           
            if (result.success === true) {

                console.log(result);
                DisplayUnaryLabList(result.data);
                DisplayBinaryLabList(result.data);
                DisplayMedList(result.data);
                DisplayDiseaseList(result.data);
            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting studentsPlease try again.');
        });

    }


    function DisplayUnaryLabList(data) {

        $("#LabListUnary").html("");

        if (!data)
            return;

        var source = $("#UnaryLabListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#LabListUnary").append(html);

        //BindAndFormat();

    }

    function DisplayBinaryLabList(data) {

        $("#LabListBinary").html("");

        if (!data)
            return;

        var source = $("#BinaryLabListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#LabListBinary").append(html);

        //BindAndFormat();

    }

    function DisplayMedList(data) {

        $("#MedList2").html("");

        if (!data)
            return;

        var source = $("#MedicineListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#MedList2").append(html);

        //BindAndFormat();

    }


    function DisplayDiseaseList(data) {

        $("#diseaseList2").html("");

        if (!data)
            return;

        var source = $("#DiseaseListDisplaytemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $("#diseaseList2").append(html);

        //BindAndFormat();

    }

    function submitBtnClick(update)
    {
           // alert("in");
           // var patientId = $('#patId').text();
            var fnam = $('#fnam').val();
            var lname = $('#lnam').val();
            var name = fnam +" "+ lname;
            var age = parseInt($('#age').val());
            var lastFu = $('#lastFu').val();
            var problemList = $('#problemList').val();
            var weight = $('#weight').val();
            var weightUnit = $('#unit').val();
            var weighttotal = weight + weightUnit;
            var systolicBp = parseInt($('#sysBp').val());
            var diatolicBp =parseInt($('#diasysBp').val());
            var treatmentPlan = $('#treatmentPlan').val();
            var diseaseList = [];
            var medName = [];
            var medType = [];
            var medVal = [];
            var disId = [];
            var tja = parseInt($('#tjc').val());
            var das28 =parseInt($('#das28').val());
            var sjc =parseInt($('#sjc').val());
            var vas = parseInt($('#vas').val());
            var labName = [];
            var labVal = [];
            var labResult = [];
            var general = $('#gene').val();
            var systemic = $('#syst').val();

            $('#diseaseList2 input:checked').each(function (i) {
                diseaseList[i] = $(this).val();
                var dummy = diseaseList[i].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
                disId[i] = $('#' + dummy).text();
               // alert(disId[i]);
            });
            var k = 0;
            $('#LabListUnary input').each(function (i) {
                if ($(this).val()) {
                    labVal[k] = $(this).val();
                    labName[k] = $(this).attr('name');
                    labResult[k] = null;
                    k++;
                }
            });
            $('#LabListBinary :input').each(function (i) {
                if ($(this).val()) {
                    labVal[k] = $(this).val();
                    labName[k] = $(this).attr('name');
                    var result = labName[k].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
                    labResult[k] = $('input[name='+result+']:checked').val();
                    k++;
                }
            });
            var j = 0;
            $('#MedList2 input:text').each(function (i) {
                if ($(this).val()) {
                    medVal[j] = $(this).val();
                    medName[j] = $(this).attr('name');
                    var result = medName[j].replace(/([ !@#$%^&*()+=\[\]\\';,./{}|":<>?~_-])/g, "\\$1");
                    medType[j] = $('input[name='+result+']:checked').val();
                    j++;
                }
            });
          
            var pId;
            var dat;
            if (update === "no") {
                pId = $("#patId").text();
                dat = Date.now;

            }
            else if (update === "yes") {
       
                pId = $("#pid2").text();
                dat = $("#pVdate2").text();
            }
            VisitDataObj = {
               
                 PatientId: pId,
                 Name:name,
                Age: age,
                LastFu: lastFu,
                ProblemList: problemList,
                WeightUnit: weightUnit,
                Weight: weighttotal,
                TreatmentPlan: treatmentPlan,
                SystolicBp: systolicBp,
                DiastolicBp: diatolicBp,
                DiseaseList: diseaseList,
                Tjc:tja,
                Sjc:sjc,
                Das28:das28,
                Vas: vas,
                LabName: labName,
                LabVal: labVal,
                labResult:labResult,
                MedName: medName,
                MedType: medType,
                MedVal: medVal,
                General: general,
                Systemic:systemic,
                date: dat,
                 disId:disId
            }
            
             var dataToSend = JSON.stringify(VisitDataObj);
             var url
             if (update === "no")
             {
                 url = "HistoryData/SaveVisitFormData";
             }
             else if (update === "yes")
             {
                 url = "HistoryData/UpdateVisit";
             }

            MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {
                if (result.success === true)
                {
                    MyWebApp.UI.showMessage("#spstatus", 'Data has been saved successfully', Enums.MessageType.Success);
                    printPage("yes");
                    DiseaseRedirectLink("yes");

                } else {
                        MyWebApp.UI.showMessage("error", result.error, Enums.MessageType.Error);
        }
        }, function (xhr, ajaxoptions, thrownerror) {
            MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Data, please try again.');
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
   
    function printPage(val)
    {
        $('#print').click(function () {
            if (val === "yes") {
                $("#visitModal").modal('hide');
                var win = window.open("PrintVisit", "_blank", "width=1200,height=600");
                $("#visitModal").modal('hide');
                win.print();
            }
            else {
                alignModel();
                var modal = $('#visitModal');
                modal.find('.modal-body p').text('Please Submit Form Before Print!');
                $("#visitModal").modal();

            }
        });

    }

    function DiseaseRedirectLink(valid) {
        $('#disease2').click(function () {
            if (valid === "yes") {
                window.open('testListView', '_blank');
                $("#visitModal").modal('hide');
            }
            else {
                alignModel();
                var modal = $('#visitModal');
                modal.find('.modal-body p').text('Please Submit Form Before conducting Test!');
                $("#visitModal").modal();

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
