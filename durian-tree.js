//building the tree
class Employee {
  //constructor - setting default values for any new object properties
  constructor(name, title, salary) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = null;
    this.subordinates = [];
  }
  // add an employee to the subordinates array of its boss and set its boss
  addSubordinate(subordinate) {
    this.subordinates.push(subordinate);
    subordinate.boss = this;
  }
  // returns number of subordinates an employee has - a getter
  get numberOfSubordinates() {
    return this.subordinates.length;
  }
  // return the number of people in between an employee and the CEO
  get numberOfPeopleToCEO() {
    let numberOfPeople = 0;
    let currentEmployee = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentEmployee.boss) {
      currentEmployee = currentEmployee.boss;
      numberOfPeople++;
    }

    return numberOfPeople;
  }
  // true if two employees share the same boss and false otherwise
  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }

  employeesThatMakeOver(amount) {

    let employees = []; // 1 - create new employees array to hold every employee that makes over the specified amount

    if (this.salary > amount) {
      employees.push(this); // 2 - if current employee makes over that amount, add them to the array
    }

    for (const subordinate of this.subordinates) {
      const subordinatesThatMakeOver = subordinate.employeesThatMakeOver(amount); // 3 - call this method on all of the current employees subordinates and combine their results with the current results
      employees = employees.concat(subordinatesThatMakeOver);
    }

    return employees;
  }

  get totalEmployees() {

    let totalEmployees = 1; 

    for (const subordinate of this.subordinates) {
      totalEmployees++;
      totalEmployees += subordinate.totalEmployees -1;
    }
    return totalEmployees;
  }
};

//unrelated nodes, not yet connected
const ada = new Employee("Ada", "CEO", 3000000.00); //root node
const craig    = new Employee("Craig", "VP Software", 1000000);
const simone   = new Employee("Simone");
const ali      = new Employee("Ali");
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
const angela   = new Employee("Angela", "VP Retail", 1000000);
const karla    = new Employee("Karla");
const phil     = new Employee("Phil", "VP Marketing", 1000000);
const florida  = new Employee("Florida");
const david    = new Employee("David")
const brian    = new Employee("Brian");

//nodes
ada.addSubordinate(craig);
ada.addSubordinate(arvinder);
ada.addSubordinate(angela);
ada.addSubordinate(phil);
craig.addSubordinate(simone);
craig.addSubordinate(ali);
phil.addSubordinate(florida);
phil.addSubordinate(david);
phil.addSubordinate(brian);
angela.addSubordinate(karla);

// who is Craig's boss?
console.log(craig.boss);

// how many subordinates does Craig have?
console.log(craig.numberOfSubordinates);

// how many people are in between Craig and the CEO?
console.log(craig.numberOfPeopleToCEO);

// traverse through entire company (including Ada) to list whoever makes over $418401/year
let wealthyEmployees = ada.employeesThatMakeOver(418401);
console.log(wealthyEmployees)

// total number of employees under a certain employee
console.log(ada.totalEmployees)
console.log(craig.totalEmployees)
