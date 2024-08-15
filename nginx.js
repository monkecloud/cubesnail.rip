
function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "/rockonarchive/sets.xml", true);
    xmlhttp.send();
  }
  
function myFunction(xml) {
    var climbs, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    txt = "";
    console.log(xml)
    climbs = xmlDoc.getElementsByTagName("date");
    for (i = 0; i<climbs.length; i++) {
        txt += climbs[i].childNodes[0].nodeValue + "<br>";
    }
    document.getElementById("testdiv").innerHTML = txt;
}

document.getElementById("buttontest").onclick = loadXMLDoc;