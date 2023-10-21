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
      const linkObj = { url: url };

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { action: 'addLink', link: linkObj }, function(response) {
          if (response && response.message === 'Link added successfully!') {
            browser.storage.local.get({ links: [] }).then(function(data) {
              const links = data.links;
              links.push(linkObj);
              browser.storage.local.set({ links: links }).then(function() {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.textContent = url;
                li.appendChild(a);
                linksList.appendChild(li);
              });
            });
          }
        });
      });
    }
    // Reset input field and hide the container
    linkInput.value = '';
    inputContainer.style.display = 'none';
  });

  // Load existing links when the popup opens
  browser.storage.local.get({ links: [] }).then(function(data) {
    const storedLinks = data.links;
    storedLinks.forEach(function(linkObj) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = linkObj.url;
      a.target = '_blank';
      a.textContent = linkObj.url;
      li.appendChild(a);
      linksList.appendChild(li);
    });
  });
});
