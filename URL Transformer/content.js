chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'executeScript') {
				// Check URL
			var urlCheckReg = /[a-z]{2}\d{6}\.aspx\?timeStamp=[a-zA-Z0-9]+&PopupPanel=On&[a-zA-Z0-9]+=[a-zA-Z0-9]+/gm;

			waitFor(_ => urlCheckReg.test(window.location.href))
			  .then(_ => {
				// Get URL
				var url = window.location.href;
				// Get Screen ID area
				var screenIDReg = /[a-z]{2}\d{6}\.aspx\?/gm;
				var screenID = screenIDReg.exec(url);
				// Isolate ScreenID
				screenIDReg = /[a-z]{2}\d{6}/gm;
				screenID = screenIDReg.exec(screenID)[0];
				var screenIdReplacementValue = "&ScreenID=" + screenID + "&";
				var main = url.replace(/\(W\(.*?\)\)/gm, 'Main?');
				var newURL = main.replace(/\/pages\/.*&PopupPanel=On&/gm, '');
				newURL = newURL.replace('&', screenIdReplacementValue);
				window.open(newURL,'_blank');
				window.setTimeout(function(){window.close();},300);
			  });

			function waitFor(conditionFunction) {
			  return new Promise((resolve) => {
				const poll = () => {
				  if (conditionFunction()) {
					resolve();
				  } else {
					setTimeout(poll, 400);
				  }
				};
				poll();
			  });
			}

  }
});

chrome.storage.sync.get('runAutomatically', (data) => {
  if (data.runAutomatically) {
			// Check URL
			var urlCheckReg = /[a-z]{2}\d{6}\.aspx\?timeStamp=[a-zA-Z0-9]+&PopupPanel=On&[a-zA-Z0-9]+=[a-zA-Z0-9]+/gm;

			waitFor(_ => urlCheckReg.test(window.location.href))
			  .then(_ => {
				// Get URL
				var url = window.location.href;
				// Get Screen ID area
				var screenIDReg = /[a-z]{2}\d{6}\.aspx\?/gm;
				var screenID = screenIDReg.exec(url);
				// Isolate ScreenID
				screenIDReg = /[a-z]{2}\d{6}/gm;
				screenID = screenIDReg.exec(screenID)[0];
				var screenIdReplacementValue = "&ScreenID=" + screenID + "&";
				var main = url.replace(/\(W\(.*?\)\)/gm, 'Main?');
				var newURL = main.replace(/\/pages\/.*&PopupPanel=On&/gm, '');
				newURL = newURL.replace('&', screenIdReplacementValue);
				window.open(newURL,'_blank');
				window.setTimeout(function(){window.close();},300);
			  });

			function waitFor(conditionFunction) {
			  return new Promise((resolve) => {
				const poll = () => {
				  if (conditionFunction()) {
					resolve();
				  } else {
					setTimeout(poll, 400);
				  }
				};
				poll();
			  });
			}

  }
});



