$(document).ready(() => {
  setInterval(timeNow, 1000);

  function timeNow(){
    var time = new Date();
    var d = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
  
    $("#test").text(d);
    var date= time.toDateString();
    $("#date").text(date);
  }
 
});


