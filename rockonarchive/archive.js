
const req = new XMLHttpRequest();
req.open("GET",'sets.json',true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);
  document.getElementById('testdiv').innerHTML = JSON.stringify(json);
};
document.getElementById("buttontest").onclick = loadXMLDoc;
