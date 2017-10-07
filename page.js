var parsePage = function () {
  var domainName = document.querySelector('.stickyHeader-nameText');
  if (!domainName) {
    return null;
  }

  var siteRank = document.querySelector('.rankingItem-value');
  var siteVisits = document.querySelector('[data-type="visits"] .js-countValue');
  var siteVisitDuration = document.querySelector('[data-type="time"] .js-countValue');
  var sitePagesPerVisit = document.querySelector('[data-type="ppv"] .js-countValue');
  var siteCountries = document.querySelectorAll('#geo-countries-accordion .accordion-group');

  var result = {};
  result.domainName = domainName.innerText;
  result.rank = siteRank.getAttribute('data-value');
  result.visits = siteVisits.innerText;
  result.duration = siteVisitDuration.innerText;
  result.pagesPerVisit = sitePagesPerVisit.innerText;

  result.countries = [];

  for (let i = 0; i < siteCountries.length; i++) {
    let country = siteCountries[i].querySelector('.country-name');
    let data = siteCountries[i].querySelector('.traffic-share-valueNumber');

    result.countries.push({
      country: country.innerText,
      share: data.innerText
    });
  }

  return result;
};

window.addEventListener('load', function () {
  var pageInfo = parsePage();
  if (!pageInfo) {
    return;
  }

  chrome.runtime.sendMessage(pageInfo);  
});