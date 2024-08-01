import inquirer from 'inquirer';

class Student {
    static countdown: number = 10000;

    name: string;
    id: number;
    balance: number;
    courses: string[];

    constructor(name: string, balance: number, courses: string[] = []) {
        this.name = name;
        this.balance = balance;
        this.courses = courses;
        this.id = Student.countdown++;
    }

    enroll(course: string) {
        this.courses.push(course);
        console.log(`${this.name} has enrolled in ${course}`);
    }

    viewBalance() {
        console.log(`The balance for ${this.name} ID(${this.id}) is ${this.balance}`);
    }

    payTuition(amount: number) {
        this.balance -= amount;
        console.log(`The remaining balance for ${this.name} ID(${this.id}) is ${this.balance}`);
    }

    viewStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.id}`);
        console.log(`Courses: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}

const students: Student[] = [];

async function addStudent() {
    const answers = await inquirer.prompt([
        { name: "name", type: "input", message: "Enter the student's name:" },
        { name: "balance", type: "input", message: "Enter the initial balance:", validate: value => !isNaN(Number(value)) }
    ]);

    const student = new Student(answers.name, parseFloat(answers.balance));
    students.push(student);

    console.log(`Added new student: ${student.name} with ID: ${student.id}`);
}

async function mainMenu() {
    const answers = await inquirer.prompt([{
        name: "action",
        type: "list",
        choices: ["Add Student", "Enroll in Course", "Pay Tuition", "View Balance", "View Status", "Exit"],
        message: "What do you want to perform:"
    }]);

    switch (answers.action) {
        case "Add Student":
            await addStudent();
            break;
        case "Enroll in Course":
            await enrollCourse();
            break;
        case "Pay Tuition":
            await payTuition();
            break;
        case "View Balance":
            await viewBalance();
            break;
        case "View Status":
            await viewStatus();
            break;
        case "Exit":
            return;
    }

    await mainMenu();
}

async function enrollCourse() {
    const answers = await inquirer.prompt([
        { name: "id", type: "input", message: "Enter the student's ID:", validate: value => !isNaN(Number(value)) },
        { name: "course", type: "input", message: "Enter the course name:" }
    ]);

    const student = students.find(s => s.id === parseInt(answers.id));
    if (student) {
        student.enroll(answers.course);
    } else {
        console.log('Student not found!');
    }
}

async function payTuition() {
    const answers = await inquirer.prompt([
        { name: "id", type: "input", message: "Enter the student's ID:", validate: value => !isNaN(Number(value)) },
        { name: "amount", type: "input", message: "Enter the amount to pay:", validate: value => !isNaN(Number(value)) }
    ]);

    const student = students.find(s => s.id === parseInt(answers.id));
    if (student) {
        student.payTuition(parseFloat(answers.amount));
    } else {
        console.log('Student not found!');
    }
}

async function viewBalance() {
    const answers = await inquirer.prompt([
        { name: "id", type: "input", message: "Enter the student's ID:" }
    ]);

    const student = students.find(s => s.id === parseInt(answers.id));
    if (student) {
        student.viewBalance();
    } else {
        console.log('Student not found!');
    }
}

async function viewStatus() {
    const answers = await inquirer.prompt([
        { name: "id", type: "input", message: "Enter the student's ID:", validate: value => !isNaN(Number(value)) }
    ]);

    const student = students.find(s => s.id === parseInt(answers.id));
    if (student) {
        student.viewStatus();
    } else {
        console.log('Student not found!');
    }
}

mainMenu();
