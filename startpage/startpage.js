function startTime () {
    const today = new Date();
    let hours = today.getHours();
    let mins = today.getMinutes();
    let secs = today.getSeconds();
    let date = today.toUTCString().match(/^(.*? ){3}/g);
    mins = checkTime(mins);
    secs = checkTime(secs);
    
    document.getElementById('clock').innerHTML = hours + ":" + mins;
    setTimeout(startTime, 1000);

    document.getElementById('date').innerHTML = date;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
