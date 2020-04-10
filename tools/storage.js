const fs = require('fs');

const FILE = __dirname + '/data.json';

class Store {
  constructor() {
    this.newData = [];
  }

  loadData() {

    if (!fs.existsSync(FILE)) {
      this.data = {};
      fs.writeFileSync(FILE, JSON.stringify(this.data));
      return;
    }
    const data = fs.readFileSync(FILE);
    this.data = JSON.parse(data);
  }

  addUserData(userId, finger, data) {
    this.newData.push([userId, finger, data]);
  }

  saveData() {
    this.loadData();
    this.newData.forEach(([userId, finger, data]) => {
      if (this.data[userId] == null) {
        this.data[userId] = {};
      }
      this.data[userId][finger] = data;
    });
    fs.writeFileSync(FILE, JSON.stringify(this.data));
  }
}


module.exports = Store;
