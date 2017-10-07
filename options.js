var sites = chrome.extension.getBackgroundPage().sWebSaver.getSites();
sites = JSON.stringify(sites);

var txt = document.getElementById("sites");
txt.innerText = sites;