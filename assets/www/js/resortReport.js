$('#resortPage').live('pageshow', function(event) {
	$.mobile.showPageLoadingMsg();

	//var id = getUrlVars()["resortName"];
	//$.getJSON('http://portfolioaloptimizer.appspot.com/app/snowReport/retrieveSnowReport?resortName=' + id, displayResorts);
});

function displayResorts(data) {
	var report = data;
	console.log(report);

	//$('#headerText').text(report.resortName);
	$('#publishDate').text(report.publishDate);
	$('#openStatus').text(report.openStatus);
	//$('#baseDepth').text(report.baseDepth + " " + report.snowFall48HrMetric);
	//$('#snowFall48hr').text(report.snowFall48hr + " " + report.snowFall48HrMetric);
	//$('#surfaceCondition').text(report.surfaceCondition);

	$.mobile.hidePageLoadingMsg();
}

/*function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}*/