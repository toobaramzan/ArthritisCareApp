
MyWebApp.UI.sleTest = (function () {
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow8").hide();
        if (_isInitialized == false) {
            _isInitialized = true;
            ResultClick();
        }
    }

    function ResultClick() {
        $("#resultBtnSle").click(function () {
            var check = [];

            $('#formAlign input:checked').each(function (i) {
                check[i] = $(this).val();
            });
            var urinray =parseInt( $("#urinray").val());
            var purea =parseInt( $("#puria").val());
            var huria = parseInt($("#huria").val());
            var pyurea =parseInt( $("#pyurea").val());

            var sle={
                u1:urinray,
                u2: purea,
                u3: huria,
                u4: pyurea,
                list:check
            }
            var dataToSend = JSON.stringify(sle);
        //    if (isNaN(urinray) || isNaN(purea) || isNaN(huria) || isNaN(pyurea))
        //    {
        //        alignModel();
        //        $("#sleModal").modal();
        //    }
        //else
        // {
            var url = "Test/testSle";
        MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {
               
            if (result.success === true) {
                $("#resValue8").text(result.data.resValue);
                $("#indicator8").text(result.data.resIndicator);

                $("#resRow8").show();
            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data. Please try again.');
        });

    //}
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
