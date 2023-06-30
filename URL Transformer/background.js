// Function to execute the script
function executeScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'executeScript' });
  });
}

// Add a click listener to the browser action
chrome.browserAction.onClicked.addListener(executeScript);

// Add a context menu item
chrome.contextMenus.create({
  id: 'executeScript',
  title: 'Open as Tab/Load as Full Page',
  contexts: ['page'],
});

// Add a click listener to the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'executeScript') {
    executeScript();
  }
});
