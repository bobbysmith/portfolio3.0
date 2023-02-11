const RULES_GRID = [[1,1,1], [1,1,0], [1,0,1], [1,0,0], [0,1,1], [0,1,0], [0,0,1], [0,0,0]];
const States = { ACTIVE: 'active', INACTIVE: 'inactive' };
const background = document.querySelector('.background');
const row = document.querySelector('.row');
const currentRule = document.querySelector('.rule--current');
const newRuleButton = document.querySelector('button');
let ruleNumber;

/**
 * Generates cellular automata based on a random rule set from 0 to 255.
 *
 * @returns {undefined}
 */
function generateAutomata() {
  ruleNumber = Math.floor(Math.random() * 256);
  background.innerHTML = '';
  currentRule.innerHTML = `<a href="http://atlas.wolfram.com/01/01/${ruleNumber}/" target="_blank" rel="noopener noreferrer">rule ${ruleNumber}</a>`;

  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  background.appendChild(row);

  // Fill row with cells
  for (let i = 1; i < background.clientWidth / 8; i++) {
    row.appendChild(document.createElement('div'));
  }

  // Randomize row
  for (let i = 0; i < row.childNodes.length; i++) {
    row.childNodes[i].classList.add(Math.floor(Math.random() * 2) ? States.ACTIVE : States.INACTIVE );
  }

  // Duplicate rows to fill window
  for (let i = 1; i < background.clientHeight / 8; i++) {
    duplicateRow();
  }
}

/**
 * Converts the rule set number into an array of booleans representing the rule set's binary representation.
 *
 * @param {number} num The rule set number.
 * @returns {boolean[]} Array of boolean values representing the rule set number in binary, ex. 2 => 10 => [true, false].
 */
function numberToBooleanArray(num) {
  let binary = Number(num).toString(2);
  const booleanArray = [];

  while (binary.length < 8) {
    binary = 0 + binary;
  }

  for (let i = 0; i < binary.length; i++) {
    booleanArray.push(!!parseInt(binary[i]));
  }

  return booleanArray;
}

/**
 * Duplicates the previous row and processes the cells of that row based on the last row (its parent).
 *
 * @returns {undefined}
 */
function duplicateRow() {
  const rows = document.querySelectorAll('.row');
  const lastRow = rows[rows.length - 1];
  const clone = lastRow.cloneNode(true);
  background.appendChild(clone);
  processRow(clone, lastRow);
}

/**
 * Generates a new row based on its parent row and the rule set that is being followed.
 *
 * @param {HTML} row The new row being generated.
 * @param {HTML} parentRow The parent row which the new row is being based on.
 * @returns {undefined}
 */
function processRow(row, parentRow) {
  for (let i = 0; i < row.childNodes.length; i++) {
    const target = row.childNodes[i];
    const parent = parentRow.childNodes[i];
    for (let j = 0; j < RULES_GRID.length; j++) {
      const left = parent.previousElementSibling || parentRow.childNodes[parentRow.childNodes.length - 1];
      const right = parent.nextElementSibling || parentRow.childNodes[0];
      const toggleClass = setActiveIfMatchesRule.bind(null, target, left, parent, right);
      toggleClass(RULES_GRID[j], numberToBooleanArray(ruleNumber)[j]);
    }
  }
}

/**
 * Sets a cell to active if the rule set dictates that it should and inactive if it shouldn't be active.
 *
 * @param {object} target The cell being set to active or inactive.
 * @param {object} left The left sibling of the parent cell of the target.
 * @param {object} parent The parent cell of the target.
 * @param {object} right The right sibling of the parent cell of the target.
 * @param {number} rule The individual digit from the rule set being followed.
 * @param {boolean} ruleValue The boolean representation from the rule set binary digit.
 * @returns {undefined}
 */
function setActiveIfMatchesRule(target, left, parent, right, rule, ruleValue) {
  const matchesRule = (
    cellState(left) === rule[0] &&
    cellState(parent) === rule[1] &&
    cellState(right) === rule[2]
  );

  if (matchesRule) {
    toggleActive(target, ruleValue);
  }
}

/**
 * Reads the class list of the given cell and returns a binary representation of its class.
 *
 * @param {object} cell A single cell in the row.
 * @returns {number} 1 for active cells, 0 for inactive cells.
 */
function cellState(cell) {
  return cell.classList.contains(States.ACTIVE) ? 1 : 0;
}

/**
 * Changes a cell's class from inactive to active or active to inactive depending on the binary digit in the rule set.
 *
 * @param {object} cell The individual div in a row.
 * @param {boolean} isActive True or false depending on the binary digit in the rule set.
 * @returns {undefined}
 */
function toggleActive(cell, isActive) {
  if (isActive) {
    cell.classList.remove(States.INACTIVE);
    cell.classList.add(States.ACTIVE);
  } else {
    cell.classList.remove(States.ACTIVE);
    cell.classList.add(States.INACTIVE);
  }
}

// Automatically generate automata when page loads.
generateAutomata();

// Generate new automata when the button is clicked.
newRuleButton.addEventListener('click', generateAutomata);

// Dev console stuff.
console.log(` _____ _____ __    __    _____\n|  |  |   __|  |  |  |  |     |\n|     |   __|  |__|  |__|  |  |\n|__|__|_____|_____|_____|_____|`);
console.log('i see you like poking around in the dev console. i do too.\nlet\'s work together.');
