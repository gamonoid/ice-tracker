var fprint = require("../index");
const Store = require('./storage');
var ret = fprint.init();
if(ret) {
  fprint.setDebug(3);
  var devices = fprint.discoverDevices();
  if(devices.length > 0) {
    devices.forEach(function(entry) {
      console.log("Found: " + entry);
    });
    var deviceHandle = fprint.openDevice(devices[0]);
    console.log(deviceHandle);
    const store = new Store();
    store.loadData();
    const prints = [];
    const userData = [];
    for (const [user, fingerData] of Object.entries(store.data)) {
      for (const [fingerId, print] of Object.entries(fingerData)) {
        prints.push(print);
        userData.push([user, fingerId]);
      }
    }

    function identify() {
      console.log("identifying your finger! Please swipe your finger:");
      fprint.identifyStart(deviceHandle, prints, function(state, message, index) {
        console.log(message);
        if(state == 1 || state == 0) {
          if(state == 1) {
            console.log("MATCHED :" + JSON.stringify(userData[index]));
          } else {
            console.log("MATCH FAILED.");
          }
          fprint.identifyStop(deviceHandle, function () {
            fprint.closeDevice(deviceHandle);
            fprint.exit();
          });
        }
        else {
          console.log("Try again please. State: " + state);
        }
      });
    }

    identify();

  }
}
