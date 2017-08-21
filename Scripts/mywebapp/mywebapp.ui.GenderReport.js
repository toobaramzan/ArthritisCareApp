MyWebApp.namespace("UI.GenderReport");
MyWebApp.UI.GenderReport = (function () {
    "use strict";
    var _isInitialized = false;
    var id = 1;
    var valid = "y";
    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
            //alert("in gender report");
            GetPatGenInfoRecord();
            
        }
    }

    function DisplayPatGenInfo(rosList) {

        $("#patBody").html("");
       
        if (!rosList)
            return;
        var source = $("#patListDisplaytemplate").html();
        var template = Handlebars.compile(source);
      
        var html = template(rosList);
        $("#patBody").append(html);
      
        //BindAndFormat();

    }
    function DisplayMGenInfo(rosList) {

        $("#patMBody").html("");

        if (!rosList)
            return;
        var source = $("#patMListDisplaytemplate").html();
        var template = Handlebars.compile(source);

        var html = template(rosList);
        $("#patMBody").append(html);

        //BindAndFormat();

    }


    function GetPatGenInfoRecord() {
        

        
        getMaleValues();
        GetFemaleValue();
       
    }
    function GetFemaleValue()
    {
        var l = [],myarr1=[];
        var j = 0;


        var url = "HistoryData/getGenderCountInfo";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);

                DisplayPatGenInfo(result.data);

                $("#patBody tr").each(function () {

                    var this_row = $(this);
                    var pr = $.trim(this_row.find('td:eq(0)').html());//td:eq(0) means first td of this row
                    var p1 = $.trim(this_row.find('td:eq(1)').html());


                    l[j] = pr; myarr1[j] = p1;
                    j++;

                }
                );

                var chrt = document.getElementById("myFcanvas").getContext("2d");

                var data = {
                    labels: l, //x-axis
                    datasets: [

                        {
                            label: "My Second dataset", //optional
                            fillColor: "rgba(220,120,220,0.8)",
                            strokeColor: "rgba(220,120,220,0.8)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: myarr1
                        }

                    ]
                };
                var myFirstChart = new Chart(chrt).Bar(data);



            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });
    }
    function getMaleValues()
    {
        var m = [],myarr2=[];
        var k = 0;

        var url = "HistoryData/getMaleCountInfo";
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {

            if (result.success === true) {
                console.log(result);
                DisplayMGenInfo(result.data);

                $("#patMBody tr").each(function () {
                    
                    var this_row = $(this);
                    var pr = $.trim(this_row.find('td:eq(0)').html());//td:eq(0) means first td of this row
                    var p1 = $.trim(this_row.find('td:eq(1)').html());

                    m[k] = pr; myarr2[k] = p1;
                    k++;

                }
                );

                var chrt1 = document.getElementById("myMcanvas").getContext("2d");

                var data1 = {
                    labels: m, //x-axis
                    datasets: [
                    {
                        label: "My Second dataset", //optional
                        fillColor: "rgba(220,120,220,0.8)",
                        strokeColor: "rgba(220,120,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: myarr2
                    }

                    ]
                };
                var myFirstChart = new Chart(chrt1).Bar(data1);

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        });
    }

    return {
        readyMain: function () {
            initialisePage();

        }
    };
}
 ());
