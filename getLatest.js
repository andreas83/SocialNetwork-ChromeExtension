  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://www.dasmerkendienie.com/api.php", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        for (var key in resp) {
		if(resp[key].typ == "img")
		{
		var img = document.createElement('img');
		img.src = resp[key][1];
		img.width = 200;
		document.getElementById('container').appendChild(img);
		}
	}
    }
  }
  xhr.send("action=next&next=1000000");

