MyWebApp.namespace("UI.dapsa");
MyWebApp.UI.dapsaTest = (function () {
    "use strict";
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow3").hide();
        if (_isInitialized == false) {
            _isInitialized = true;
            LoadFields();
            ResultClick();
        }
    }

    function LoadFields() {
        var url = "Test/getPga";

        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
            if (result.success === true) {
                if (result.data.pId != null) {
                    $("#tjc3").val(result.data.tjc);
                    $("#sjc3").val(result.data.sjc);
                    $("#pja3").val(result.data.pga);
                    if (result.data.esr != null) {
                        $("#crp3").val(result.data.esr);
                    }
                }
               

            }
        });
    }

    function ResultClick() {
        $("#resultBtnDapsa").click(function () {
          
            var pja = parseInt($("#pja3").val());
            var tjc = parseInt($("#tjc3").val());
            var crp = parseInt($("#crp3").val());
            var sjc = parseInt($("#sjc3").val());
            var pp = parseInt($("#pp3").val());
            //get pga from already stored data!
          

            var url = "Test/dapsaTest/?pja=" + pja + "&tjc=" + tjc + "&sjc=" + sjc + "&crp=" + crp+"&pp="+pp;

            MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
               
                if (result.success === true) {
                    $("#resValue3").text(result.data.resValue);
                    $("#indicator3").text(result.data.resIndicator);

                    $("#resRow3").show();
                } else {
                    MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                }
            }, function (xhr, ajaxOptions, thrownError) {
                MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data. Please try again.');
            });


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
