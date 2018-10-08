const request = require("request");
const readline = require("readline");
const colors = require('colors');
const colorText = require('./colors');
const Table = require("cli-table");

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




let offset = 0;
let page = 1;


/*
This function makes an API request and uses the current time and date to filter the query.
It then takes the result and pushes it into an array, and console logs the results.
*/
function getFoodTrucks() {
  let day = new Date().getDay();
  let time = new Date().getHours().toString() + ':00';

  var table = new Table({ // Creates a new table with next page of trucks.
    head: [colorText.name, colorText.address]
  });

  request(
    `http://data.sfgov.org/resource/bbb8-hzi6.json?$order=applicant ASC&$where=(start24 <= '${time}' 
    AND end24 >= '${time}') AND dayorder = ${day}&$limit=10&$offset=${offset}`,
    function (error, response, body) {
      let foodTrucks = [];
      let trucks = JSON.parse(response.body);
      offset += 10; // Increment the offset so it will grab the next 10 on the next request.
      
      trucks.forEach(truck => table.push([truck.applicant, truck.location])); // push each truck into table

      if(table.length > 0) {
        //display a page if there are trucks available
        console.log(`~~~~~~~~~~~~~~~~~~~~~ Page: ${page} ~~~~~~~~~~~~~~~~~~~~~`);
        console.log(table.toString());    
        page += 1;
      } else { 
        // If there are no more trucks to display, close the rl.
        console.log(colorText.noMore);
        console.log(colorText.goodBye); 
        readLine.close();
      }
    }
  );
}


// This function starts off the app with a greeting and directions on how to fetch data.
function greetings() {
console.log(`Type ${colorText.next} or ${colorText.n} for more trucks`);
console.log(`Type ${colorText.done} or press ${colorText.ctrlC} to exit`);
}







/*
This function sends a prompt and waits for user input.
When a user types next it will make a request for the food trucks by calling the 'getFoodTrucks' function.
Once user types 'done' it closes the app.
*/

console.log("Hello, Welcome to FoodTruckFinder!".bold.red.bgWhite);
greetings();

readLine.on('line', (input) => {
  if(input === 'done' || input === 'stop') {
    readLine.close();
  } else {
    getFoodTrucks();
    greetings();
  }
});

// to run locally, first install node and npm. then:
// $ npm install request && node FoodTruckFinder.js

