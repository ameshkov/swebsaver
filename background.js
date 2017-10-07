// Saver service
var sWebSaver = (function () {

    var sites = {};

    chrome.storage.local.get('sites', function(items) {
        console.log("Loaded sites");
        if (!items || !items.sites) {
            return;
        }
        sites = JSON.parse(items.sites);
    });

    var saveSite = function(pageInfo) {
        if (!pageInfo.domainName) {
            return;
        }
        console.log("Saving info for " + pageInfo.domainName);
        sites[pageInfo.domainName] = pageInfo;

        chrome.storage.local.set({ 'sites': JSON.stringify(sites) });
    };

    return {
        saveSite: saveSite,
        getSites: function () {
            return sites;
        }
    };
})();

// Open options on click
chrome.browserAction.onClicked.addListener(function () {
    chrome.runtime.openOptionsPage();
});

// Receive message
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sWebSaver.saveSite(request);
    }
);