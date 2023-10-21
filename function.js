document.addEventListener('DOMContentLoaded', function() {
    var linksList = document.getElementById('links-list');
  
    // Load stored links from storage
    chrome.storage.sync.get(['websiteLinks'], function(result) {
      var websiteLinks = result.websiteLinks || [];
  
      websiteLinks.forEach(function(link) {
        var listItem = document.createElement('li');
        var icon = document.createElement('img');
        icon.src = link.icon;
        icon.className = 'icon';
        listItem.appendChild(icon);
  
        var linkText = document.createTextNode(link.url);
        listItem.appendChild(linkText);
  
        linksList.appendChild(listItem);
      });
    });
  });
  