const req = new XMLHttpRequest();
function loadXMLDoc(){
  req.open("GET",'sets.json',true);
  req.send();
  req.onload = function(){
    const json = JSON.parse(req.responseText);
    //document.getElementById('testdiv').innerHTML = JSON.stringify(json);
    
    htmlOutput = "";
    htmlDiv = document.getElementById("sets");
    json.archive.forEach(function(val){
      htmlOutput += '<div class="set"'
     });
    console.log(htmlOutput)
  };
}
document.getElementById("buttontest").onclick = loadXMLDoc;
