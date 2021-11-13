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
  hasSameBoss(employee) {
    return this.boss === employee.boss;
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