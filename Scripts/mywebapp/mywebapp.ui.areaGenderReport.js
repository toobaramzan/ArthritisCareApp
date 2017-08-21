MyWebApp.namespace("UI.areaGenderReport");
MyWebApp.UI.areaGenderReport = (function () {
    "use strict";
    var _isInitialized = false;
    var id = 1;
    var valid = "y";
    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
           
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


    function GetPatGenInfoRecord() {
        

        var url = "HistoryData/getPatientGenInfo";
       
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
           
            if (result.success === true) {
                console.log(result);
               
                DisplayPatGenInfo(result.data);
                var l = [];
                var myarr = [];
                var j = 0;
               // alert("i m outside");

                

                $("#patBody tr").each(function () {
                    
                    var this_row = $(this);
                    var pr = $.trim(this_row.find('td:eq(0)').html());//td:eq(0) means first td of this row
                    var p = $.trim(this_row.find('td:eq(1)').html())

                    l[j] = pr; myarr[j] = p;
                    j++;
                    
                }
                );
                

                var chrt = document.getElementById("mycanvas").getContext("2d");
                
                var data = {
                    labels: l, //x-axis
                    datasets: [

                        {
                            label: "My Second dataset", //optional
                            fillColor: "rgba(220,120,220,0.8)",
                            strokeColor: "rgba(220,120,220,0.8)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: myarr
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

    return {
        readyMain: function () {
            initialisePage();

        }
    };
}
 ());
