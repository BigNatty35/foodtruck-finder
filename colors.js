const colors = require("colors");

//colors for the text
const colored = {
  next: "next".bold.underline.green,
  n: "n".bold.underline.green,
  done: "done".bold.underline.green,
  name: "NAME: ".bold.white.bgBlue,
  address: "ADDRESS: ".bold.white.bgBlue,
  ctrlC: "ctrl + c".bold.underline.green,
  noMore: "No more trucks to display!".bold.underline.red,
  goodBye: "Goodbye!".italic.white
};

module.exports = colored; 