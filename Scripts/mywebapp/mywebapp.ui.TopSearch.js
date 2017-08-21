

$(document).ready(function () {
    var searchObj;
        SearchPatients();
});

  
function SearchPatients() {
            $("#SearchRow1").hide();
            $("#noFound1").hide();
            var firstName = window.location.search.substring(1);
            var lastName;
            var visitDate;
            var mobile;
            var area;
            if (firstName == "") {
                alignModel();
                $("#searchModal").modal();
            }
            else {

                var url = "HistoryData/SearchTopPatients/?pFirstName=" + firstName + "&pLastName=" + lastName + "&pVisitDate=" + visitDate + "&pMobile=" + mobile + "&pArea=" + area;

                MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
                   
                    if (result.success === true) {
                 
                        DisplayPatientData(result.data);
                    } else {
                        MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);
                    }

                }, function (xhr, ajaxOptions, thrownError) {
                    MyWebApp.UI.showRoasterMessage('A problem has occurred while getting students data. Please try again.');
                });
            }

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
        $("#patientbody1").html("");
      
        if (patients.PatientList.length == 0) {
            $("#noFound1").show();
            return;
        }
        else {
            $("#SearchRow1").show();
            var source = $("#patientrowtemplate1").html();
            var template = Handlebars.compile(source);

            var html = template(patients);
            $("#patientbody1").append(html);
            insertPaging();
            
        }


    }


    function insertPaging() {
        var pagesize = 10;
        var count = "yes";
        var rows = $("#patientbody1 tr");
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

                $("#patientbody1 tr.cuurentPage").removeClass("cuurentPage").addClass("pages");

                $("#patientbody1 tr.pages[pgno=" + pgNo + "]").removeClass('pages').addClass('cuurentPage');
            });

            $("#tableFoot").append(link);

        }

    }



