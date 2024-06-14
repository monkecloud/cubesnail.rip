function startTime () {
    const today = new Date();
    let hours = today.getHours();
    let mins = today.getMinutes();
    let secs = today.getSeconds();

    mins = checkTime(mins);
    secs = checkTime(secs);

  
    document.getElementById('clock').innerHTML = hours + ":" + mins + ":" + secs;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
