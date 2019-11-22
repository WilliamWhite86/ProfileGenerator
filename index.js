const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// const pdf = require('pdfjs')
const axios = require("axios");
const generateHTML = require("./09-NodeJS_Homework_Develop_generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

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


