/// <reference path="mywebapp.ui.docSearch.js" />
MyWebApp.namespace("UI.docSearch");

MyWebApp.UI.docSearch = (function () {
    "use strict";
    var searchObj;
    var _isInitialized = false;

    function initialisePage() {
        if (_isInitialized == false) {
           
            _isInitialized = true;
            $("#SearchRow2").hide();
            $("#noFound2").hide();
            SearchPatients();

        }
    }


    function SearchPatients() {

            $('#tableFoot a').replaceWith(function () {
                return $.text("");
            });
            $("#SearchRow2").hide();
            $("#noFound2").hide();

            var url = "DocInfo/getAllDoc";

                MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
                   
                    if (result.success === true) {
                        console.log(result);
                        DisplayPatientData(result.data);
                    } else {
                        MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);
                    }

                }, function (xhr, ajaxOptions, thrownError) {
                    MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data. Please try again.');
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

    function DisplayPatientData(patients) {

        $("#docbody").html("");
     
        if (patients.docList.length == 0) {
            $("#noFound2").show();
            return;
        }
        else {
            $("#SearchRow2").show();
            var source = $("#docrowtemplate").html();
            var template = Handlebars.compile(source);

            var html = template(patients);
            $("#docbody").append(html);
            insertPaging();
        }

        //BindAndFormat();

    }

    function insertPaging() {
        var pagesize = 10;
        var count = "yes";
        var rows = $("#patientbody tr");
        var pages = Math.ceil(rows.length / pagesize);
        var startIndex = 0;
        for (var i = 1 ; i <= pages ; i++) {
            var setItems = rows.slice(startIndex, i * pagesize);
            if (count === "yes") {
                setItems.addClass("cuurentPage").attr("pgno", i);

            }
            else {
                setItems.addClass("pages").attr("pgno", i);
            }
            startIndex = i * pagesize;
            var link = $("<a href='#' >").text(i);
            if (count === "yes") {
                link.addClass("selectedPg");
            }
            count = "no";
            link.click(function (e) {
                e.preventDefault();
                $("#tableFoot a.selectedPg").removeClass("selectedPg");
                $(this).addClass("selectedPg");
                var pgNo = $(this).text();

                $("#patientbody tr.cuurentPage").removeClass("cuurentPage").addClass("pages");

                $("#patientbody tr.pages[pgno=" + pgNo + "]").removeClass('pages').addClass('cuurentPage');
            });

            $("#tableFoot").append(link);

        }

    }


    return {

        readyMain: function () {
            initialisePage();
        }
    };
}
 ());

