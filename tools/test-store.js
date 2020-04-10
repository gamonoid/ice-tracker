'use strict'

const Store = require('./storage');

const store = new Store();
// store.addUserData(1,1, '1-1');
// store.addUserData(1,2, '1-2');
// store.addUserData(2,2, '2-2');
store.addUserData(2,3, '2-3');


store.saveData();
