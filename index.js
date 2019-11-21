const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('pdfjs')
const axios = require("axios");

//const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your github username?"
    },
    {
      type: "list",
      name: "faveColor",
      message: "What is your favorite color?",
      choices: ["red", "blue", "pink", "red"]
    }
  ]);
}

//let answers = promptUser()

promptUser()
  .then(function (results) {
    console.log(results.username);
    console.log(results.faveColor);
    const username = results.username;
    axios
      .get(`https://github.com/${username}`)
      .then(function (res) {
        let data = res.data;
        console.log(data)
      })
      .catch(function (err) {
        console.log(err);
      });
  })
  .catch(function (err) {
    console.log(err);
  });




// axios
// .get("https://github.com/WilliamWhite86")
//   .then(function(res) {
//     console.log(res.data);
//   });


// function generatePDF(answers) {
//     const doc = new pdf.Document({
//         font:    require('pdfjs/font/Helvetica'),
//         padding: 10,


//       })
//       doc.pipe(fs.createWriteStream('output.pdf'))

//       // render something onto the document
//       answers.username
//       answers.favecolor
//       await doc.end()
//   }


const questions = [

];

function writeToFile(fileName, data) {

}

// function init() {
// }
// init();


  //init();


