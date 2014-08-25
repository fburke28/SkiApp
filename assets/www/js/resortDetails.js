var resortName;

$('#resortsPage').live('pageshow', function(event) {
	$.mobile.showPageLoadingMsg();

	var id = getUrlVars()["id"];
	$.getJSON('http://portfolioaloptimizer.appspot.com/app/snowReport/retrieveSkiResortsForRegion?regionName=' + id, displayResorts);
});

$('#resortPage').live('pageshow', function(event) {
	$.mobile.showPageLoadingMsg();

	var id = getUrlVars()["resortName"];
	$.getJSON('http://portfolioaloptimizer.appspot.com/app/snowReport/retrieveSnowReport?resortName=' + id, displayReport);
});

$('#map').live('pageshow', function(event) {
	var id = getUrlVars()["resortName"];
	$("#report").attr("href", "skiResort.html?resortName=" + id);
	$("#performance").attr("href", "performanceTracker.html?resortName=" + id);
	$("#photos").attr("href", "photos.html?resortName=" + id);
});

$('#performanceTracker').live('pageshow', function(event) {
	var id = getUrlVars()["resortName"];
	$("#report").attr("href", "skiResort.html?resortName=" + id);
	$("#map").attr("href", "map.html?resortName=" + id);
	$("#photos").attr("href", "photos.html?resortName=" + id);
});

$('#photos').live('pageshow', function(event) {
	var id = getUrlVars()["resortName"];
	$("#report").attr("href", "skiResort.html?resortName=" + id);
	$("#map").attr("href", "map.html?resortName=" + id);
	$("#performance").attr("href", "performanceTracker.html?resortName=" + id);

	resortName = id;

	// create a datepicker with default settings
	$("#scroller").scroller({ 
		preset: 'date',
		display: 'inline',
		theme: 'jqm'
	});
});

function displayResorts(data) {
	var resorts = data;
	console.log(resorts);

	$('#resortList li').remove();
	$.each(resorts, function(index, resort) {
		$('#resortList').append('<li><a href="skiResort.html?resortName=' + resort.resortName + 
			'"><hx>' + resort.resortName + '</hx><p style="padding-top: 8px">Vertical Feet: ' +
			resort.verticalFeet + ', Trials: ' + resort.numberOfTrials + ', Lifts: ' +
			resort.numberOfLifts + '</p></a></li>');
	});

	$('#resortList').listview('refresh');

	$.mobile.hidePageLoadingMsg();
}

function displayReport(data) {
	var report = data;
	console.log(report);

	$('#headerText').text(report.resortName);
	$('#publishDate').text(report.publishDate);
	$('#openStatus').text(report.openStatus);
	$('#baseDepth').text(report.baseDepth + " " + report.snowFall48HrMetric);
	$('#snowFall48hr').text(report.snowFall48hr + " " + report.snowFall48HrMetric);
	$('#surfaceCondition').text(report.surfaceCondition);

	$("#map").attr("href", "map.html?resortName=" + report.resortName);
	$("#performance").attr("href", "performanceTracker.html?resortName=" + report.resortName);
	$("#photos").attr("href", "photos.html?resortName=" + report.resortName);

	$.mobile.hidePageLoadingMsg();
}

// A button will call this function
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 50,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: 1
	});
}

function onSuccess(imageURI) {
	var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    //var params = {};
    //params.resortName = "Killington";
    //params.headers = {'resortName' : 'Killington'};

    //options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://portfolioaloptimizer.appspot.com/app/snowReport/loadResortImage"), win, fail, options);
}

function win(r) {
	aler("Successfully uploaded photo.");
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

// Called if something bad happens.
function onFail(message) {
	alert('Failed because: ' + message);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}