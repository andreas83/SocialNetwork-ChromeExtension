  var context = "image";
  var title = "DMDN Share";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": fastShare});

  var txt = chrome.contextMenus.create({"title": title+" + text", "contexts":[context],
                                       "onclick": AskShare});


function fastShare(info, tab) {
  console.log(info.srcUrl);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://www.dasmerkendienie.com/api.php", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
  	console.log(xhr);
    }
  }
  xhr.send("action=save&data="+info.srcUrl+"&media="+info.srcUrl);
}



function AskShare(info, tab) {
  var hash = prompt("Do you like to say something ?");
  if(hash)
  {
  console.log(info.srcUrl);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://www.dasmerkendienie.com/api.php", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
  	console.log(xhr);
    }
  }
  xhr.send("action=save&data="+hash+"&media="+info.srcUrl);
  }
}

