// recursive call mystically aint working even on ROOT URL
// although calling individual URLs is fine

rootURL = 'http://www.mosigra.ru/';
RecursionDepth = 0;
allResMails = [];
allResURLs = [];

function retrieveMails(URLParameter) {
	RecursionDepth += 1;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', URLParameter, false)
	xhr.send();

	if (xhr.status != 200) {
		// alert( xhr.status + ': ' + xhr.statusText );
		alert(URLParameter);
		// break

	} else {
		//OK
	}
	var regExpMails = /mailto:[a-zA-Z0-9-\.@_]+/g
	var regExpURLs = /href="(.*?)"/g
	var resMails = xhr.responseText.match(regExpMails);
	var resURLs = xhr.responseText.match(regExpURLs);
	
	if (resMails != null){
	for (var i = 0; i < resMails.length; i++) {
		allResMails.push(resMails[i].slice(7,));
		}
	}
	console.log(allResMails)
	for (var i = 0; i < resURLs.length; i++) {
		if (allResURLs.indexOf(resURLs[i]) == -1) {
			allResURLs.push(resURLs[i]);
			var URLmatch = resURLs[i].match(/\bhref="http:\/\/www.mosigra/g);
			if ((URLmatch != null) && (RecursionDepth < 3)) {
				console.log(resURLs[i]);
				// console.log(URLmatch);
				// console.log((resURLs[i].slice(5,)));
				// retrieveMails(resURLs[i].slice(5,));
				retrieveMails("http://www.mosigra.ru/")
				}				
			}
		}
	}

retrieveMails(rootURL)