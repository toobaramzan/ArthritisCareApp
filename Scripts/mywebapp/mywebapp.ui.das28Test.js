
MyWebApp.UI.das28Test = (function () {
    "use strict";
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow2").hide();
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
                    $("#tjc2").val(result.data.tjc);
                    $("#sjc2").val(result.data.sjc);
                    $("#pga2").val(result.data.pga);
                    if (result.data.esr != null) {
                        $("#esr2").val(result.data.esr);
                    }
                }
               
               
            }
        });
    }

    function ResultClick() {
        $("#resultBtnDas").click(function () {

            var pga = parseInt($("#pga2").val());
            var tjc = parseInt($("#tjc2").val());
            var esr = parseInt($("#esr2").val());
            var sjc = parseInt($("#sjc2").val());
            //get pga from already stored data!
            // debugger;
            var url = "Test/das28Test/?pga=" + pga + "&tjc=" + tjc + "&sjc=" + sjc + "&esr=" + esr;

            MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
                if (result.success === true) {
                    $("#resValue2").text(result.data.resValue);
                    $("#indicator2").text(result.data.resIndicator);

                    $("#resRow2").show();
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
