const toggle = document.querySelector('.toggle input');
toggle.addEventListener('click', () => {
    const onOff = toggle.parentNode.querySelector('.onoff');
    onOff.textContent = toggle.checked ? 'ON' : 'OFF';

    if (toggle.checked) {
        // Get the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // Access the current tab's content
            chrome.tabs.executeScript(tabs[0].id, {
                code: `
                var elements = document.querySelectorAll('.pr-2.pl-2.text-body-1.d-flex.ai-center.color-text-high-emphasis.d-flex.jc-end');
                var urlLinks = document.querySelectorAll('.color-brand-primary-500');
                
                if (elements.length > 0 && urlLinks.length > 0) {
                    elements.forEach(function(element, index) {
                        var downloadButton = document.createElement('a');
                        downloadButton.setAttribute('rel', 'noreferrer');
                        downloadButton.setAttribute('target', '_blank');
                        downloadButton.setAttribute('id', 'ariyanTags');
                        
                        var url = urlLinks[index] ? urlLinks[index].href.trim() : '';
                        var packageId = url.split('/').pop(); // Extract the number from the URL
                        downloadButton.href = 'https://seller.digikala.com/package/sellerpackagedetail/export/now/?packageId=' + packageId;
                        
                        downloadButton.innerHTML = '<div class="px-4 pointer MenuItemRow__rowHeader-d90201"><div data-menu-item-type="content" class="d-flex ai-center py-2 MenuItemRow__header-b93982"><div class="d-flex ml-4 undefined" data-testid="icon-wrapper"><svg style="width: 24px; height: 24px; fill: var(--color-icon-high-emphasis);"><use class="disable-events" xlink:href="#uploadExcel"></use></svg></div><p class="text-body-2">رسید تحویل</p></div></div>';
                        
                        element.appendChild(downloadButton);
                    });
                }
                `
            });
        });
    } else {
        // If toggle is off, remove color
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // Access the current tab's content
            chrome.tabs.executeScript(tabs[0].id, {
                code: `
                var elements = document.querySelectorAll('#ariyanTags');
                if (elements.length > 0) {
                    elements.forEach(function(element) {
                        element.remove(); // Remove the element from the DOM
                    });
                }
                `
            });
        });
    }
});
