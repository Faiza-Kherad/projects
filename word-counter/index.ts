#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'

const answers: {
    Sentence : string
} = await inquirer.prompt([
    {
    name: "Sentence",
    type: "input",
    message: "Enter a sentence"
    }
])

const words = answers.Sentence.trim().split(" ")

const totalWords = words.length

console.log(chalk.cyanBright(`There are total ${totalWords} words in this sentence`));


