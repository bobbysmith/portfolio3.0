const background = document.querySelector('.background');
const row = document.querySelector('.row');
const ruleSet = document.querySelector('.rule');
const newRuleButton = document.querySelector('.new-rule__button');
const rulesIcon = [[1,1,1], [1,1,0], [1,0,1], [1,0,0], [0,1,1], [0,1,0], [0,0,1], [0,0,0]];
let ruleNumber;

/**
 * Generates cellular automata based on a random rule set from 0 to 255.
 */
function generateAutomata() {
  ruleNumber = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  background.innerHTML = '';
  ruleSet.innerHTML = `<a href="http://atlas.wolfram.com/01/01/${ruleNumber}/">rule ${ruleNumber}</a>`;

  let row = document.createElement('div');
  row.setAttribute('class', 'row');
  background.appendChild(row);

  for (let i = 1; i < background.clientWidth / 8; i++) {
    let div = document.createElement('div');
    row.appendChild(div);
  }

  randomizeRow(row);

  for (let i = 1; i < background.clientHeight / 8; i++) {
    duplicateRow();
  }
};

/**
 * Converts the rule set number into an array of booleans representing the rule set's binary representation.
 *
 * @param {Number} num The rule set number.
 * @returns {Array} Array of boolean values representing the rule set number in binary, ex. 2 => 10 => [true, false].
 */
function numberToBooleanArray(num) {
  let binary = Number(num).toString(2);
  let arr = [];

  while (binary.length < 8) {
    binary = 0 + binary;
  }

  for (let i = 0; i < binary.length; i++) {
    arr.push(parseInt(binary[i]) ? true : false);
  }

  return arr;
}

/**
 * Adds a class to each div in the row of either active or inactive.
 *
 * @param {HTML} row The non-classed generated row of divs based on clientWidth.
 */
function randomizeRow(row) {
  for (let i = 0; i < row.childNodes.length; i++) {
    let div = row.childNodes[i];
    div.classList.add(Math.floor(Math.random() * 2) ? 'active' : 'inactive' );
  }
}

/**
 * Duplicates the previous row and processes the cells of that row based on the last row (its parent).
 */
function duplicateRow() {
  let rows = document.querySelectorAll('.row');
  let lastRow = rows[rows.length - 1];
  let clone = lastRow.cloneNode(true);
  document.querySelector('.background').appendChild(clone);
  processRow(clone, lastRow);
}

/**
 * Generates a new row based on its parent row and the rule set that is being followed.
 *
 * @param {HTML} row The new row being generated.
 * @param {HTML} parentRow The parent row which the new row is being based on.
 */
function processRow(row, parentRow) {
  for (let i = 0; i < row.childNodes.length; i++) {
    let target = row.childNodes[i];
    let parent = parentRow.childNodes[i];
    let left = parent.previousElementSibling || parentRow.childNodes[parentRow.childNodes.length - 1];
    let right = parent.nextElementSibling || parentRow.childNodes[0];
    let toggleClass = setActiveIfMatchesRule.bind(null, target, left, parent, right);

    for (let j = 0; j < rulesIcon.length; j++) {
      toggleClass(rulesIcon[j], numberToBooleanArray(ruleNumber)[j]);
    }
  }
}

/**
 * Sets a cell to active if the rule set dictates that it should and inactive if it shouldn't be active.
 *
 * @param {*} target The cell being set to active or inactive.
 * @param {*} left The left sibling of the parent cell of the target.
 * @param {*} parent The parent cell of the target.
 * @param {*} right The right sibling of the parent cell of the target.
 * @param {*} rule The individual digit from the rule set being followed.
 * @param {boolean} ruleValue The boolean representation from the rule set binary digit.
 */
function setActiveIfMatchesRule(target, left, parent, right, rule, ruleValue) {
  let matchesRule = state(left) === rule[0] && state(parent) === rule[1] && state(right) === rule[2];

  if (matchesRule) {
    toggleActive(target, ruleValue);
  }
}

/**
 * Reads the class list of the given cell and returns a binary representation of its class.
 *
 * @param {HTML} cell A single cell in the row.
 * @returns {Number} 1 for active cells, 0 for inactive cells.
 */
function state(cell) {
  return cell.classList.contains('active') ? 1 : 0;
}

/**
 * Changes a cell's class from inactive to active or active to inactive depending on the binary digit in the rule set.
 *
 * @param {HTML} cell The individual div in a row.
 * @param {boolean} isActive True or false depending on the binary digit in the rule set.
 */
function toggleActive(cell, isActive) {
  if (isActive) {
    cell.classList.remove('inactive');
    cell.classList.add('active');
  } else {
    cell.classList.remove('active');
    cell.classList.add('inactive');
  }
}

// Automatically generate automata when page loads.
generateAutomata();

// Generate new automata when the button is clicked.
newRuleButton.addEventListener('click', generateAutomata);

console.log(` _____ _____ __    __    _____\n|  |  |   __|  |  |  |  |     |\n|     |   __|  |__|  |__|  |  |\n|__|__|_____|_____|_____|_____|`);
console.log('i see you like poking around in the dev console, me too.\nlet\'s work together.');
