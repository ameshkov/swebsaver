/**
 * The function to be executed in the page context
 */
var parsePage = function () {
  var result = {};
  result.domainName = Sw.siteDomain;
  result.category = Sw.preloadedData.overview.Category;
  result.visits = Sw.preloadedData.overview.EngagementsSimilarweb.TotalLastMonthVisits;
  result.timeOnSite = Sw.preloadedData.overview.EngagementsSimilarweb.TimeOnSite;
  result.pagesPerVisit = Sw.preloadedData.overview.EngagementsSimilarweb.PageViews;
  result.rank = Sw.preloadedData.overview.GlobalRank[0];
  result.countryRank = Sw.preloadedData.overview.Country;
  result.countryShares = [];

  for (var i = 0; i < Sw.preloadedData.overview.TopCountryShares.length; i++) {
    var shareData = Sw.preloadedData.overview.TopCountryShares[i];
    var countryShare = {
      name: Sw.Countries.list[shareData[0]].name,
      code: Sw.Countries.list[shareData[0]].iso2,
      share: shareData[1]
    };
    result.countryShares.push(countryShare);
  }

  // Post message to the content script
  window.postMessage({ type: "FROM_PAGE", data: JSON.stringify(result) }, "*");

  // Clean up
  var currentScript = document.currentScript;
  if (currentScript) {
    currentScript.parentNode.removeChild(currentScript);
  }
};

// Accept message from the in-page script
window.addEventListener("message", function (event) {
  if (event.source != window) {
    return;
  }

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.data);

    var pageInfo = JSON.parse(event.data.data);
    chrome.runtime.sendMessage(pageInfo);
  }
}, false);

// Load and execute the in-page parser script
var script = document.createElement('script');
script.innerHTML = '(' + parsePage.toString() + ')();';
document.head.appendChild(script);