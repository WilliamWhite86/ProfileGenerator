const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf')
const htmlFile = fs.readFileSync('index.html', 'utf8');
const options = { format: 'Letter'};
const axios = require("axios");
const generateHTML = require("./09-NodeJS_Homework_Develop_generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

//code borrowed from https://www.npmjs.com/package/html-pdf
function pdfCreator(){
  pdf.create(htmlFile, options).toFile('index.pdf', function(err, results){
    if (err) return console.log(err);
    console.log(results);
  });
}

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
      .get(`https://api.github.com/users/${username}`)
      .then(function (res) {
        const answers = {
          color:results.faveColor,
          ...res.data
        }
        console.log(answers);
        console.log(generateHTML(answers));
        const html = generateHTML(answers);

        return writeFileAsync("index.html", html);
      })
      .then(function() {
        console.log("Successfully wrote to index.html");
      })
      .then(function(){
        pdfCreator()
      })    
      .catch(function (err) {
        console.log(err);
      });
  });

  

// function writeToFile(fileName, data) {

// }

// function init() {
// }
// init();


  //init();


