var bUrl = "https://www.coursehero.com/api/v1/",
    uUrl = "users/",
    fUrl = "documents/",
    dUrl = "download/",
    cUrl = "documents/course/",
    cID,
    fLink;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        allFrames: true,
        code: 'document.documentElement.outerHTML'
    }, function(results) {
        parseHTML(results[0]);
        chrome.tabs.update(tab.id, {
            url: fLink
        });
    });
});

function parseHTML(html) {
    var docFlag = 'document/',
        ratingFlag = 'ratings/',
        apiInd = html.indexOf(docFlag),
        ratingInd = html.indexOf(ratingFlag),
        fileID = html.substring(apiInd + docFlag.length, ratingInd - 1);
    req(uUrl);
    req(fUrl + fileID);
    req(cUrl + cID);
    fLink = bUrl + fUrl + dUrl + fileID;

}

function req(suffix) {
    var request = new XMLHttpRequest();

    request.open("GET", bUrl + suffix, true);
    request.onload = function() {
        if (request.status >= 200 || request.status <= 400) {
            var data = JSON.parse(request.responseText);
            console.log(data)
            if (data.course_id)
                cID = data.course_id
        } else {
            console.log("Bad response from server.");
        }
    };
    request.send();
}
