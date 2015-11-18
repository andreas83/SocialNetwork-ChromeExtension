  var context = "all";
  var title = "DMDN Share";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": fastShare});

  var txt = chrome.contextMenus.create({"title": title+" + text", "contexts":[context],
                                       "onclick": AskShare});

  var latestID=0;
  function notification(){
  var img = new Object();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.dasmerkendienie.com/api/content/", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);

        for (var key in resp) {

                if(resp[key].stream.type == "img")
                {
                img.src = "http://www.dasmerkendienie.com"+resp[key].stream.url;
                img.id=key;
                var opt = {
                    type: "basic",
                    title: "New posts",
                    message: "from hackers with <3",
                    iconUrl: img.src
                }
                if(img.id!=latestID)
                {
                    latestID=img.id;
                    var notification = chrome.notifications.create(img.id, opt, function(){});
                }
                }
        }
    }
  }
  xhr.send("show=1&id=1000000");

  }
  chrome.alarms.create("getNotifications", { delayInMinutes: 0.1, periodInMinutes: 0.1});
  chrome.alarms.onAlarm.addListener(function(){ notification(); });

function fastShare(info, tab) {
  console.log(info);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://www.dasmerkendienie.com/", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
  	console.log(xhr);
    }
  }
  if(info.mediaType=="image")
  {
     var data = new Object();
     data.type="img";
     data.url=info.srcUrl;
  }
  if(info.mediaType=="video")
  {
     var data = new Object();
     data.type="video";
     data.dl=true;
     data.url=info.srcUrl;
  }
  if(typeof info.mediaType==undefined)
  {
     var data = new Object();
     data.type="www";
     data.url=info.pageUrl;

  }

  chrome.storage.sync.get("api", function(items) {
    xhr.send("api_key="+items.api+"&content=&metadata="+encodeURIComponent(JSON.stringify(data)));
  });
  
}



function AskShare(info, tab) {
  var hash = prompt("Do you like to say something ?");
  if(hash)
  {
  console.log(info.srcUrl);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://www.dasmerkendienie.com/", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
  	console.log(xhr);
    }
  }
  var data = new Object();
  data.type="img";
  data.url=info.srcUrl;
  chrome.storage.sync.get("api", function(items) {
    xhr.send("api_key="+items.api+"&content="+hash+"&metadata="+encodeURIComponent(JSON.stringify(data)));
  });
  }
}

