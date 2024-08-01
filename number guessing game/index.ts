#!/usr/bin/env node

import inquirer from "inquirer";

const randomNum: number = Math.floor(Math.random() * 10 + 1);

const userGuessedNum = await inquirer.prompt([
  {
    message: "Guess a number between 1 and 10",
    name: "userGuess",
    type: "number",
  },
]);

if(userGuessedNum.userGuess === randomNum){
    console.log("Congratulations! You guess the right number");
}
else{
    console.log("You guess wrong number. Please try again")
}
    
    

