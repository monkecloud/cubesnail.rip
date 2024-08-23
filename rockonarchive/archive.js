const req = new XMLHttpRequest();
function loadXMLDoc(){
  req.open("GET",'sets.json',true);
  req.send();
  req.onload = function(){
    const json = JSON.parse(req.responseText);
    //document.getElementById('testdiv').innerHTML = JSON.stringify(json);
    
    htmlOutput = "";
    htmlDiv = document.getElementById("sets");
    json.archive.forEach(function(val, i){
      const sets = Object.keys(val)
      sets.forEach(
        htmlOutput+='<div class="set" id="set' + i + '"> </div>'
      )

      console.log(sets)
     });
    console.log(htmlOutput)
  };
}
document.getElementById("buttontest").onclick = loadXMLDoc;
 