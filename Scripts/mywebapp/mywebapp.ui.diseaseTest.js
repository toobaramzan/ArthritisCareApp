
MyWebApp.UI.diseaseTest = (function () {
    "use strict";
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow").hide();
        if (_isInitialized == false) {
            _isInitialized = true;
            LoadPga();
            ResultClick();
        }
    }

    function LoadPga() {
        var url = "Test/getPga";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
            if (result.success === true) {
                if (result.data.pga != null) {
                    $("#pga").val(result.data.pga);
                }
                else
                {
                    $("#pga").val(-1);
                }
            }
        });
     }

    function ResultClick() {
        $("#resultBtn").click(function () {

            var pga = parseInt($("#pga").val());
            var spinal = parseInt($("#spinal").val());
            var peripheral = parseInt($("#peripheral").val());
            var shh =parseInt( $("#shh").val());
            var esr = parseInt($("#esr").val());
            //get pga from already stored data!
           // debugger;
            var url = "Test/asdasTest/?pga=" + pga + "&spinal=" + spinal + "&peripheral=" + peripheral + "&shh=" + shh + "&esr=" + esr;
            
            MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
                if (result.success === true) {
                    $("#resValue").text(result.data.resValue);
                    $("#indicator").text(result.data.resIndicator);
                 
                    $("#resRow").show();
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);
                    
                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data. Please try again.');
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
