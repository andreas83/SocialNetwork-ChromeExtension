  var context = "image";
  var title = "DMDN Share";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": fastShare});

  var txt = chrome.contextMenus.create({"title": title+" + text", "contexts":[context],
                                       "onclick": AskShare});


function fastShare(info, tab) {

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

