
function transformAndOpenURL(url) {
  const screenIDReg = /[a-z]{2}\d{6}/gm;
  const screenID = screenIDReg.exec(/.*?([a-z]{2}\d{6}).*?/.exec(url)[1]);
  const screenIdReplacementValue = "&ScreenID=" + screenID + "&";
  let newURL = url.replace(/\(W\(.*?\)\)/gm, 'Main?').replace(/\/pages\/.*&PopupPanel=On&/gm, '');
  newURL = newURL.replace('&', screenIdReplacementValue);
  window.open(newURL, '_blank');
  setTimeout(() => window.close(), 300);
}

function waitFor(conditionFunction) {
  return new Promise(resolve => {
    const poll = () => {
      if (conditionFunction()) resolve();
      else setTimeout(poll, 400);
    };
    poll();
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'executeScript') {
    const urlCheckReg = /[a-z]{2}\d{6}\.aspx\?timeStamp=[a-zA-Z0-9]+&PopupPanel=On&[a-zA-Z0-9]+=[a-zA-Z0-9]+/gm;
    waitFor(() => urlCheckReg.test(window.location.href))
      .then(() => transformAndOpenURL(window.location.href));
  }
});

chrome.storage.sync.get('runAutomatically', (data) => {
  if (data.runAutomatically) {
    const urlCheckReg = /[a-z]{2}\d{6}\.aspx\?timeStamp=[a-zA-Z0-9]+&PopupPanel=On&[a-zA-Z0-9]+=[a-zA-Z0-9]+/gm;
    waitFor(() => urlCheckReg.test(window.location.href))
      .then(() => transformAndOpenURL(window.location.href));
  }
});
