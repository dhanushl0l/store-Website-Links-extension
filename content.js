var links = document.links;
var websiteLinks = [];

for (var i = 0; i < links.length; i++) {
  var link = links[i];
  var iconUrl = `https://www.google.com/s2/favicons?domain=${link.href}`;
  websiteLinks.push({ url: link.href, icon: iconUrl });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getWebsiteLinks') {
    sendResponse({ websiteLinks: websiteLinks });
  }
});
