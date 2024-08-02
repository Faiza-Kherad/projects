#! /usr/bin/env node


import inquirer from "inquirer";

class Player {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel = Math.max(0, this.fuel - 25);
    }

    fuelIncrease() {
        this.fuel = 100;
    }
}

class Opponent {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel = Math.max(0, this.fuel - 25);
    }
}

async function main() {
    let answer = await inquirer.prompt([
        {
            name: "playerName",
            type: "input",
            message: "Please enter your name"
        },
        {
            name: "selectOpponent",
            type: "list",
            message: "Select your opponent",
            choices: ["skeleton", "zombie", "alien"]
        }
    ]);

    let p1 = new Player(answer.playerName);
    let o1 = new Opponent(answer.selectOpponent);

    while (true) {
        let ask = await inquirer.prompt([{
            name: "action",
            type: "list",
            message: 'What would you like to do?',
            choices: ["attack", "drink portion", "run for your life"]
        }]);

        if (ask.action === "attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${p1.name}'s fuel is ${p1.fuel}`);
                console.log(`${o1.name}'s fuel is ${o1.fuel}`);
                if (p1.fuel === 0) {
                    console.log("Game Over!!");
                    process.exit();
                }
            } else {
                o1.fuelDecrease();
                console.log(`${p1.name}'s fuel is ${p1.fuel}`);
                console.log(`${o1.name}'s fuel is ${o1.fuel}`);
                if (o1.fuel === 0) {
                    console.log("You Win!!");
                    process.exit();
                }
            }
        } else if (ask.action === "drink portion") {
            p1.fuelIncrease();
            console.log(`You drink portion, your fuel is ${p1.fuel}`);
        } else if (ask.action === "run for your life") {
            console.log(`You lose, best of luck next time`);
            process.exit();
        }
    }
}

main();
