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

    //document.getElementById("sets").innerHTML = htmlOutput;

    //Processing here?
    sortGradesByWall(archive["archive"]);
    setChart(archive["archive"]);
    stackedChart(archive["archive"]);
    groupedChart(archive["archive"])
    return(json);
  };
}

//graph stuff below ---------------------------------------------------------------------------------------------------------
function groupedChart(archive){

    // Specify the chart’s dimensions.
    const width = 928;
    const height = 600;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 40;
    var grades = sortGradesByWall(archive);
    var data = []
    var allGrades = getGradesFromSets(archive)
    const areakeys = Object.keys(grades);
    // Determine the series that need to be stacked.
    areakeys.forEach((key) => {
      grades[key].forEach((grades) => {
        data.push({area: key, grade: grades[0], count: grades[1]})
      })
    })
  
    // Prepare the scales for positional and color encodings.
    // Fx encodes the state.
    const fx = d3.scaleBand()
        .domain(new Set(data.map(d => d.grade)))
        .rangeRound([marginLeft, width - marginRight])
        .paddingInner(0.1);
  
    // Both x and color encode the age class.
    const areas = new Set(data.map(d => d.area));
  
    const x = d3.scaleBand()
        .domain(areas)
        .rangeRound([0, fx.bandwidth()])
        .padding(0.05);
  
    const color = d3.scaleOrdinal()
        .domain(areas)
        .range(d3.schemeSpectral[areas.size])
        .unknown("#ccc");
  
    // Y encodes the height of the bar.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)]).nice()
        .rangeRound([height - marginBottom, marginTop]);
  
    // A function to format the value in the tooltip.
    const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")
  
    // Create the SVG container.
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
    // Append a group for each state, and a rect for each age.
    svg.append("g")
      .selectAll()
      .data(d3.group(data, d => d.grade))
      .join("g")
        .attr("transform", ([grade]) => `translate(${fx(grade)},0)`)
      .selectAll()
      .data(([, d]) => d)
      .join("rect")
        .attr("x", d => x(d.area))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.count))
        .attr("fill", d => color(d.area));
  
    // Append the horizontal axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(fx).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove());
  
    // Append the vertical axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove());
  
    // Return the chart with the color scale as a property (for the legend).
    return Object.assign(svg.node(), {scales: {color}});
  
}

function sortGradesByWall(archive){
  //return a sorted list of grades by wall
  var output = {
    "slab":[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]],
    "cave":[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]],
    "front":[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]],
    "back":[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]]
  };
  var newoutput = [];
  const areas = Object.keys(output);
  archive.forEach((set) => {
    var newSet = getGradesFromSet(set);
    console.log("slabsetslabset")
      newSet.forEach((grade, i) => { 
        output[set["area"]][i][1] += grade[1];
      })
  })
  //return in the scheme
  //[ {area: , grade: , count: } ]
  areas.forEach((key) => {
    output[key].forEach((grades) => {
      newoutput.push({area: key, grade: grades[0], count: grades[1]})
    })
  })
  console.log(newoutput)
  return(output)
}


function getGradesFromSets(archive){
  //Get the grades from a all sets
  var output = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]];
  archive.forEach((set) => {
    var newSet = getGradesFromSet(set);
    newSet.forEach((grade, i) => {
      output[i][1] += grade[1];
    })
  })
  return output;
}

function getGradesFromSet(set){

//Get the grades from a particular set in a way D3 can read
  var output = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]];
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
  return(output);
}

function setGraph(archive){
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

        
  const dataset = getGradesFromSets(archive);
  const padding = 60;

  const xScale = d3.scaleBand()
                    .domain(dataset.map((d) => d[0]))
                    .range([padding, width - padding])
                    .padding(0.1);

  const yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d) => d[1])])
                  .range([height - padding, padding]);

  //Set up the container for the svg
  const chartSvg = d3.select("body")
                .append("svg")
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height])
                .attr("style", "max-width: 100%; height: auto;");

  //Create and add the bars
  chartSvg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(dataset)
    .join("rect")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

  //x axis and label
  chartSvg.append("g")
    .attr("transform", `translate(0,${height - padding})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));

  //y axis and label
  chartSvg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale).tickFormat((yScale) => (yScale).toFixed()))
      //.call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 40)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Grade"));
}

function getGradeFrequency(archive){
  
}


function stackedChart(archive){
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;
  var grades = sortGradesByWall(archive);
  var data = []
  var allGrades = getGradesFromSets(archive)
  const areas = Object.keys(grades);
  // Determine the series that need to be stacked.
  areas.forEach((key) => {
    grades[key].forEach((grades) => {
      data.push({area: key, grade: grades[0], count: grades[1]})
    })
  })
console.log(data)
  const series = d3.stack()
      .keys(d3.union(data.map(d => d.area))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key).count) // get value for each series key and stack
    (d3.index(data, d => d.grade, d => d.area)); // group by stack then series key

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleBand()
      .domain(d3.groupSort(data, D => -d3.sum(D, d => d.count), d => d.grade))
      .range([marginLeft, width - marginRight])
      .padding(0.1);


  const y = d3.scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .rangeRound([height - marginBottom, marginTop]);


  const color = d3.scaleOrdinal()
      .domain(series.map((d) => d.key))
      .range(d3.schemeSpectral[series.length])
      .unknown("#ccc");

  // A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

  // Create the SVG container.
  const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append a group for each series, and a rect for each element in the series.
  svg.append("g")
    .selectAll()
    .data(series)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(D => D.map(d => (d.key = D.key, d)))
    .join("rect")
      .attr("x", d => x(d.data[0]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
    .append("title")
      .text(d => `${d.data[0]} ${d.key}\n${formatValue(d.data[1].get(d.key).population)}`);

  // Append the horizontal axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").remove());

  // Append the vertical axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call(g => g.selectAll(".domain").remove());

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), {scales: {color}});
}
//debug below ---------------------------------------------------------------------------------------------------------



function setChart(archive){

  var firstSet = archive[0];
  setGraph(archive);
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


//Front end stuff

//Listeners

const slabSVG = document.getElementById('slabPolygon');
const caveSVG = document.getElementById('cavePolygon');
const frontSVG = document.getElementById('slabPolygon');
const backSVG = document.getElementById('slabPolygon');
const $hoverables = [slabSVG,caveSVG,frontSVG,backSVG];

const $bigBall = document.getElementById('circle');


for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mousemove', function (e) {
  //  onMouseHover(e, $hoverables[i]);
});
}


function onMouseHover(event, svg){
  const cursorX = event.clientX - svg.getBoundingClientRect().left;
  const cursorY = event.clientY - svg.getBoundingClientRect().top;
  
  // Update the circle's position
  $bigBall.setAttribute('cx', cursorX);
  $bigBall.setAttribute('cy', cursorY);
}

function onMouseHoverOut(e){

}

const svg = slabSVG;
let rect;

// Add event listener for when the mouse enters the SVG
svg.addEventListener('mouseenter', (event) => {
  // Create a new rectangle element when mouse enters
  rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', 50);
  rect.setAttribute('height', 50);
  rect.setAttribute('fill', 'red');
  svg.appendChild(rect);
});

// Update the rectangle's position on mousemove
svg.addEventListener('mousemove', (event) => {
  const cursorX = event.clientX - svg.getBoundingClientRect().left;
  const cursorY = event.clientY - svg.getBoundingClientRect().top;
  console.log("hi")
  rect.setAttribute('x', cursorX - 25); // Center the rectangle
  rect.setAttribute('y', cursorY - 25); // Center the rectangle
});

// Remove the rectangle when the mouse leaves the SVG
svg.addEventListener('mouseleave', () => {
  rect.remove();
});