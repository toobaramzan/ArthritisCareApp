
MyWebApp.UI.basdaiTest = (function () {
    "use strict";
    var _isInitialized = false;
    function initialisePage() {
        $("#resRow1").hide();
        if (_isInitialized == false) {
        	_isInitialized = true;
        	ResultClick();
        	saveClick();
        }
    }

    var t1, t2, t3, t4, t5, t6;
    function  ResultClick()
    {

    	$("input[name=fatigue]:radio").change(function () {

    		var ans = $("input[name=fatigue]:checked").val();
    		t1 =parseInt(ans);
    		if (ans >= 0 && ans <= 4)
    		{
    			$("#fatigueRes").text("Result:  Out of Danger Level");
    			$("#fatigueRes").css("color", "Green");
    			$("#fatigueRes").show();
    		}
    		else if(ans>4 && ans <=10)
    		{
    			$("#fatigueRes").text("Result: In Danger Level");
    			$("#fatigueRes").css("color", "Red");
    			$("#fatigueRes").show();
    		}
    	});

    	$("input[name=Spinalpain]:radio").change(function () {

    		var ans = $("input[name=Spinalpain]:checked").val();
    		t2 = parseInt(ans);
    		if (ans >= 0 && ans <= 4) {
    			$("#spinalRes").text("Result:  Out of Danger Level");
    			$("#spinalRes").css("color", "Green");
    			$("#spinalRes").show();
    		}
    		else if (ans > 4 && ans <= 10) {
    			$("#spinalRes").text("Result: In Danger Level");
    			$("#spinalRes").css("color", "Red");
    			$("#spinalRes").show();
    		}
    	});

    	$("input[name=Peripheralarthritis]:radio").change(function () {

    		var ans = $("input[name=Peripheralarthritis]:checked").val();
    		t3 = parseInt(ans);
    		if (ans >= 0 && ans <= 4) {
    			$("#PeripheralRes").text("Result:  Out of Danger Level");
    			$("#PeripheralRes").css("color", "Green");
    			$("#PeripheralRes").show();
    		}
    		else if (ans > 4 && ans <= 10) {
    			$("#PeripheralRes").text("Result: In Danger Level");
    			$("#PeripheralRes").css("color", "Red");
    			$("#PeripheralRes").show();
    		}
    	});

    	$("input[name=Enthesitis]:radio").change(function () {

    		var ans = $("input[name=Enthesitis]:checked").val();
    		t4 = parseInt(ans);
    		if (ans >= 0 && ans <= 4) {
    			$("#EnthesitisRes").text("Result:  Out of Danger Level");
    			$("#EnthesitisRes").css("color", "Green");
    			$("#EnthesitisRes").show();
    		}
    		else if (ans > 4 && ans <= 10) {
    			$("#EnthesitisRes").text("Result: In Danger Level");
    			$("#EnthesitisRes").css("color", "Red");
    			$("#EnthesitisRes").show();
    		}
    	});

    	$("input[name=Intensityofmorningstiffness]:radio").change(function () {

    		var ans = $("input[name=Intensityofmorningstiffness]:checked").val();
    		t5 = parseInt(ans);
    		if (ans >= 0 && ans <= 4) {
    			$("#IntensityRes").text("Result:  Out of Danger Level");
    			$("#IntensityRes").css("color", "Green");
    			$("#IntensityRes").show();
    		}
    		else if (ans > 4 && ans <= 10) {
    			$("#IntensityRes").text("Result: In Danger Level");
    			$("#IntensityRes").css("color", "Red");
    			$("#IntensityRes").show();
    		}
    	});

    	$("input[name=Durationofmorningstiffness]:radio").change(function () {

    		var ans = $("input[name=Durationofmorningstiffness]:checked").val();
    		t6 = parseInt(ans);
    		if (ans >= 0 && ans <= 4) {
    			$("#DurationRes").text("Result:  Out of Danger Level");
    			$("#DurationRes").css("color", "Green");
    			$("#DurationRes").show();
    		}
    		else if (ans > 4 && ans <= 10) {
    			$("#DurationRes").text("Result: In Danger Level");
    			$("#DurationRes").css("color", "Red");
    			$("#DurationRes").show();
    		}
    	});

    }

    function saveClick()
    {
    	$("#savebasdai").click(function () {

    	var	basdaiObj={
    			t1:t1,
    			t2:t2,
    			t3: t3,
    			t4: t4,
				t5:t5,
				t6:t6
    		}

    		var dataToSend = JSON.stringify(basdaiObj);
    		var url = "Test/testBasdai";
    		MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {

    			if (result.success === true) {
    			    MyWebApp.UI.showMessage("#spstatus", 'Data has been saved successfully', Enums.MessageType.Success);
    		
    			} else {
    				MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);

    			}
    		}, function (xhr, ajaxOptions, thrownError) {
    			MyWebApp.UI.showRoasterMessage('A problem has occurred while getting students: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
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
