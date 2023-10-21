document.addEventListener('DOMContentLoaded', function() {
  const linksList = document.getElementById('linksList');
  const showInputButton = document.getElementById('showInputButton');
  const inputContainer = document.getElementById('inputContainer');
  const linkInput = document.getElementById('linkInput');
  const addLinkButton = document.getElementById('addLinkButton');

  showInputButton.addEventListener('click', function() {
    inputContainer.style.display = 'block';
  });

  addLinkButton.addEventListener('click', function() {
    const url = linkInput.value;
    if (url) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { action: 'addLink', url: url }, function(response) {
          if (response && response.message === 'Link added successfully!') {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.textContent = url;
            li.appendChild(a);
            linksList.appendChild(li);
          }
        });
      });
    }
    // Reset input field and hide the container
    linkInput.value = '';
    inputContainer.style.display = 'none';
  });

  // Load existing links when the popup opens
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { action: 'getLinks' }, function(response) {
      response.links.forEach(function(link) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.textContent = link;
        li.appendChild(a);
        linksList.appendChild(li);
      });
    });
  });
});
