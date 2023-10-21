const links = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'addLink') {
    links.push(request.url);
    sendResponse({ message: 'Link added successfully!' });
  } else if (request.action === 'getLinks') {
    sendResponse({ links: links });
  }
});
