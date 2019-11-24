const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');
const options = { format: 'Letter'};
const axios = require("axios");
const generateHTML = require("./09-NodeJS_Homework_Develop_generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);
const open = require('open');

//code borrowed from https://www.npmjs.com/package/html-pdf
function pdfCreator(htmlFile){
  pdf.create(htmlFile, options).toFile('index.pdf', function(err){
    if (err) return console.log(err);
    open('index.pdf');
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
      choices: ["red", "blue", "pink", "green"]
    }
  ]);
}

promptUser()
  .then(function (results) {
    const username = results.username;
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(function (res) {
        const answers = {
          color:results.faveColor,
          ...res.data
        }
        console.log(answers);
        const html = generateHTML(answers);
        
        return writeFileAsync("index.html", html);
      })
      .then(function() {
        console.log("Successfully wrote to index.html");
        fs.readFile('index.html', 'utf8', (err, data) => {
          pdfCreator(data, "index.html");
        })

      })
      .catch(function (err) {
        console.log(err);
      });
  });
