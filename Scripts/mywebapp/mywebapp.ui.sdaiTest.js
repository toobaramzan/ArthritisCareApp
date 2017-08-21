
MyWebApp.UI.sdaiTest = (function () {
    "use strict";
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow4").hide();
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
                    $("#tjc4").val(result.data.tjc);
                    $("#sjc4").val(result.data.sjc);
                    $("#pga4").val(result.data.pga);
                    if (result.data.esr != null) {
                        $("#crp4").val(result.data.esr);
                    }
                    if (result.data.ega != 0) {
                        $("#ega4").val(result.data.ega);
                    }
                }
               

            }
        });
    }

    function ResultClick() {
        $("#resultBtnSdai").click(function () {
            var pga = parseInt($("#pga4").val());
            var tjc = parseInt($("#tjc4").val());
            var esr = parseInt($("#esr4").val());
            var sjc = parseInt($("#sjc4").val());
            var ega = parseInt($("#ega4").val());
            //get pga from already stored data!
            // debugger;
            var url = "Test/sdaiTest/?pga=" + pga + "&tjc=" + tjc + "&sjc=" + sjc + "&esr=" + esr + "&ega=" + ega;

            MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
                if (result.success === true) {
                    $("#resValue4").text(result.data.resValue);
                    $("#indicator4").text(result.data.resIndicator);

                    $("#resRow4").show();
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
