chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getWebsiteLinks' }, function(response) {
      if (response && response.websiteLinks) {
        chrome.storage.sync.set({ 'websiteLinks': response.websiteLinks });
      }
    });
  });
  