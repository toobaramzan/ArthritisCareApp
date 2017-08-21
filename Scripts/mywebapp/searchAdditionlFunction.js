
function setOnRowClickListener(id, date, fName, lName) {
        
    var url = "HistoryData/DetailPatientHistory/?id=" + id + "&date=" + date + "&fName=" + fName + "&lName="+lName;

    MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
        if (result.success === true) {
            window.location.href="patientHistory";
            console.log(result);
        } else {
            MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);
        }

    }, function (xhr, ajaxOptions, thrownError) {
        MyWebApp.UI.showRoasterMessage('A problem has occurred while getting data. Please try again.');
    });
}

function RedirectToLink(id,date,fname,lname)
{
    var searchObj = {
        id: id,
        lName: lname,
        fName: fname,
        vDate: date
    }

    var dataToSend = JSON.stringify(searchObj);
    var url = "HistoryData/redirectToNewVisit";

    MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {
        if (result === null) {
            window.location.href = "addNewVisit";
        }
           
    });
}
function orderBySearchfilter() {
    var value = $("#dropdown").val();
      
      
}
function UpdateFunction(id,date) {
    var searchObj = {
        id: id,
        vDate: date
    }

    var dataToSend = JSON.stringify(searchObj);
    var url = "HistoryData/UpdatePatientHistory";

    MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {

        if (result.success === true) {
            if (result.data === "no") {
                window.location.href = "UpdatePatientVisit";
            }
            else if (result.data === "yes") {
               
                window.location.href = "UpdateNewPatient";
            }
        }

    });
}
   
