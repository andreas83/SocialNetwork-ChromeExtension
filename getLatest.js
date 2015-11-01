  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.dasmerkendienie.com/api/content/", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
	
        for (var key in resp) {

		if(resp[key].stream.type == "img")
		{
		var img = document.createElement('img');
		img.src = "http://www.dasmerkendienie.com"+resp[key].stream.url;
		img.width = 200;

		document.getElementById('container').appendChild(img);
		}
	}
    }
  }
  xhr.send("show=20&id=1000000");

