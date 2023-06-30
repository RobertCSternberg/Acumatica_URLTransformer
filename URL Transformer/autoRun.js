chrome.storage.sync.get('runAutomatically', (data) => {
  if (data.runAutomatically) {
    const script = document.createElement('script');
    script.textContent = 
		// Function to execute the script
		function executeScript() {
		  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
		  });
		}

		// Add a click listener to the browser action
		chrome.browserAction.onClicked.addListener(executeScript);

		// Add a context menu item
		chrome.contextMenus.create({
		  id: 'executeScript',
		  title: 'Activate JS Injection',
		  contexts: ['page'],
		});

		// Add a click listener to the context menu item
		chrome.contextMenus.onClicked.addListener((info, tab) => {
		  if (info.menuItemId === 'executeScript') {
			executeScript();
		  }
		});

		// Run the script automatically when the page is loaded
		function runAutomatically() {
		  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
			if (changeInfo.status === 'complete') {
			  executeScript();
			}
		  });
		}

		// Check if the script should run automatically
		chrome.storage.sync.get('runAutomatically', (data) => {
		  if (data.runAutomatically) {
			runAutomatically();
		  }
		});

		// Listen for changes in settings
		chrome.storage.onChanged.addListener((changes, areaName) => {
		  if (areaName === 'sync' && changes.runAutomatically) {
			if (changes.runAutomatically.newValue) {
			  runAutomatically();
			} else {
			  // Remove the listener when the setting is disabled
			  chrome.tabs.onUpdated.removeListener(runAutomatically);
			}
		  }
		});
						
    document.head.appendChild(script);
    script.remove();
  }
});
