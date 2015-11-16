chrome.webNavigation.onComplete.addListener(function(e) {
        chrome.tabs.sendMessage(e.tabId, {
            action: 'getSource'
        }, function(r) {
            console.log(r);
        });
});