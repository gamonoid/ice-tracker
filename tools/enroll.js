const fprint = require("../lib/fprint");
const Store = require('./storage');
const stdio = require('stdio');
const ret = fprint.init();

const options = stdio.getopt({
  'uid': {description: 'User ID', required: true, args: 1},
  'fin': {description: 'Finger', required: true, args: 1},
});

console.log(options);

if (options.fin < 1 || options.fin > 5) {
  console.log('Finger should be from 1 to 5');
  process.exit();
}

if(ret) {
  fprint.setDebug(3);
  var devices = fprint.discoverDevices();
  if(devices.length > 0) {
    devices.forEach(function(entry) {
      console.log("Found: " + entry);
    });
    var deviceHandle = fprint.openDevice(devices[0]);

    function enroll(userId, fingerId) {
      var stage = 1;
      var stages = fprint.getEnrollStages(deviceHandle);
      console.log("enroll your finger! You will need swipe your finger " + stages + " times.");
      console.log("stage " + stage++ + "/" + stages);

      fprint.enrollStart(deviceHandle, function(state, message, fingerprint) {
        console.log(message + "\n");
        if(state == 3) {
          console.log("stage " + stage++ + "/" + stages);
        }
        else if(state == 1 || state == 2) {
          if(state == 1) {
            console.log('finger print data:' + fingerprint);
          }
          fprint.enrollStop(deviceHandle, function() {
            const store = new Store();
            store.addUserData(userId, fingerId, fingerprint);
            store.saveData();
          });
        }
        else {
          console.log("Try again please. State: " + state);
        }
      });
    }

    enroll(options.uid, options.fin);
  }
}
