//Load file stuff below ---------------------------------------------------------------------------------------------------------

function loadJSON(){
  const req = new XMLHttpRequest();
  req.open("GET",'sets.json',true);
  req.send();

  var archive = {}
  req.onload = function(){
    const json = JSON.parse(req.responseText);
    //document.getElementById('testdiv').innerHTML = JSON.stringify(json);
    archive = json
    var htmlOutput = "";
    var htmlDiv = document.getElementById("sets");
    
    //Iterate through all sets
    json.archive.forEach(function(set, i){
      const sets = Object.keys(set)
      //Iterate through the keys of each set
      sets.forEach(function(key) {

        //Iterate through climbs
        if (key=="climbs") {
          htmlOutput += "<strong>" + key + "</strong>: " + '<br>'

          set["climbs"].forEach(function(climb) {

            //Iterate through the keys of each climb
            const climbKeys = Object.keys(climb)
            climbKeys.forEach(function(climbKey){

              //Iterate through the RIC scale
              if (climbKey=="ric"){
                const ricKeys = Object.keys(climb["ric"])

                ricKeys.forEach(function(ricKey){
                  htmlOutput += "<strong> " + ricKey + "</strong>: " + climb[climbKey][ricKey];

                })
                
              } else {
                htmlOutput += "<strong> " + climbKey + "</strong>: " + climb[climbKey] ;
              }
            })
            htmlOutput += '<br>'
          })

        } else {
          htmlOutput += "<strong>" + key + "</strong>: " + set[key] + "<br>";
        }
      });
      

     });

    document.getElementById("sets").innerHTML = htmlOutput;

    //Processing here?
    console.log(archive)
    setChart(archive["archive"]);

    return(json);
  };
}

//graph stuff below ---------------------------------------------------------------------------------------------------------
function getGradesFromSet(set){

//Get the grades from a particular set in a way D3 can read
  var output = [
    [0,0],
    [1,0],
    [2,0],
    [3,0],
    [4,0],
    [5,0],
    [6,0],
    [7,0],
    [8,0],
    [9,0],
    [10,0]
  ];
  //Yes I know it's gross but it works ok
  set["climbs"].forEach(function(climb){
    switch(climb["actualgrade"]){
      case "0":
      case "0-":
      case "0+":
        output[0][1] += 1;
        break;
      case "1":
      case "1-":
      case "1+":
        output[1][1] += 1;
        break;
      case "2":
      case "2-":
      case "2+":
        output[2][1] += 1;
        break;
      case "3":
      case "3-":
      case "3+":
        output[3][1] += 1;
        break;
      case "4":
      case "4-":
      case "4+":
        output[4][1] += 1;
        break;
      case "5":
      case "5-":
      case "5+":
        output[5][1] += 1;
        break;
      case "6":
      case "6-":
      case "6+":
        output[6][1] += 1;
        break;
      case "7":
      case "7-":
      case "7+":
        output[7][1] += 1;
        break;
      case "8":
      case "8-":
      case "8+":
        output[8][1] += 1;
        break;
      case "9":
      case "9-":
      case "9+":
        output[9][1] += 1;
        break;
    };
  });
  console.log(output);
  return(output);
}
function setGraph(set){
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const svg = d3.select("body")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")

        
  const dataset = getGradesFromSet(set);

  const w = 500;
  const h = 500;
  const padding = 60;

  const xScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, (d) => d[0])])
                    .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, (d) => d[1])])
                    .range([h - padding, padding]);

    const chartSvg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    chartSvg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy",(d) => yScale(d[1]))
      .attr("r", (d) => 5);

    chartSvg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) =>  (d[0] + "," + d[1]))
      .attr("x", (d) => xScale(d[0] + 10))
      .attr("y", (d) => yScale(d[1]))

    const xAxis = d3.axisBottom(xScale);
    // Add your code below this line
    const yAxis = undefined;
    // Add your code above this line

    chartSvg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);


}

//debug below ---------------------------------------------------------------------------------------------------------



function setChart(archive){

  var firstSet = archive[0];
  setGraph(firstSet);
}


function exampleChart(){
  
        const dataset = [
          [ 34,     78 ],
          [ 109,   280 ],
          [ 310,   120 ],
          [ 79,   411 ],
          [ 420,   220 ],
          [ 233,   145 ],
          [ 333,   96 ],
          [ 222,    333 ],
          [ 78,    320 ],
          [ 21,   123 ]
        ];

      const w = 500;
      const h = 500;
      const padding = 60;

      const xScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[0])])
                     .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([h - padding, padding]);

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d) => xScale(d[0]))
       .attr("cy",(d) => yScale(d[1]))
       .attr("r", (d) => 5);

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) =>  (d[0] + "," + d[1]))
       .attr("x", (d) => xScale(d[0] + 10))
       .attr("y", (d) => yScale(d[1]))

    const xAxis = d3.axisBottom(xScale);
    // Add your code below this line
    const yAxis = undefined;
    // Add your code above this line

    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
}
document.getElementById("buttontest").onclick = loadJSON();
 
