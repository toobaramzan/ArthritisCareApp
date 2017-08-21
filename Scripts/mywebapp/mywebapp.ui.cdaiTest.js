
MyWebApp.UI.cdaiTest = (function () {
    "use strict";
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow1").hide();
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
                    $("#tjc1").val(result.data.tjc);
                    $("#sjc1").val(result.data.sjc);
                    $("#pga1").val(result.data.pga);
                    $("#ega1").val(result.data.ega);
                }
                
            }
        });
    }

    function ResultClick() {
        $("#resultBtnCdai").click(function () {

            var pga = parseInt($("#pga1").val());
            var tjc = parseInt($("#tjc1").val());
            var ega = parseInt($("#ega1").val());
            var sjc = parseInt($("#sjc1").val());
            //get pga from already stored data!
            if  (isNaN (pga) || isNaN(tjc) || isNaN (ega)  || isNaN( sjc)) {
                alignModel();
                $("#cdaiModal").modal();
            }
            else {
                var url = "Test/cdaiTest/?pga=" + pga + "&tjc=" + tjc + "&sjc=" + sjc + "&ega=" + ega;

                MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
                    if (result.success === true) {
                        $("#resValue1").text(result.data.resValue);
                        $("#indicator1").text(result.data.resIndicator);

                        $("#resRow1").show();
                    } else {
                        MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

                    }
                }, function (xhr, ajaxOptions, thrownError) {
                    MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data. Please try again.');
                });

            }
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
