
chrome.storage.sync.get('runAutomatically', (data) => {
  if (data.runAutomatically) {
    function executeScript() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
      });
    }

    chrome.browserAction.onClicked.addListener(() => {
      chrome.contextMenus.create({
        id: 'executeScript',
        title: 'Activate JS Injection',
        contexts: ['page'],
      });
      chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'executeScript') executeScript();
      });
    });
    
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') executeScript();
    });
    
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes.runAutomatically) {
        changes.runAutomatically.newValue ? runAutomatically() : chrome.tabs.onUpdated.removeListener(runAutomatically);
      }
    });
  }
});
