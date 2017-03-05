const background = document.querySelector('.background');
const row = document.querySelector('.row');
const ruleSet = document.querySelector('.rule');
const newRuleButton = document.querySelector('.new-rule__button');
const rulesIcon = [[1,1,1], [1,1,0], [1,0,1], [1,0,0], [0,1,1], [0,1,0], [0,0,1], [0,0,0]];
let ruleNumber;


function generateAutomata() {
  ruleNumber = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  background.innerHTML = '';
  ruleSet.innerHTML = `The generated background is cellular automata <a href="http://atlas.wolfram.com/01/01/${ruleNumber}/">rule ${ruleNumber}</a>.`;

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

function binary() {
  return Math.floor(Math.random() * 2);
}

function randomizeRow(row) {
  for (let i = 0; i < row.childNodes.length; i++) {
    let div = row.childNodes[i];
    div.classList.add(binary() ? 'active' : 'inactive' );
  }
}

function duplicateRow() {
  let rows = document.querySelectorAll('.row');
  let lastRow = rows[rows.length - 1];
  let clone = lastRow.cloneNode(true);
  document.querySelector('.background').appendChild(clone);

  processRow(clone, lastRow);
}

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

function setActiveIfMatchesRule(target, left, parent, right, rule, ruleValue) {
  let matchesRule = state(left) === rule[0] && state(parent) === rule[1] && state(right) === rule[2];

  if (matchesRule) {
    toggleActive(target, ruleValue);
  }
}

function state(cell) {
  return cell.classList.contains('active') ? 1 : 0;
}

function toggleActive(cell, isActive) {
  if (isActive) {
    cell.classList.remove('inactive');
    cell.classList.add('active');
  } else {
    cell.classList.remove('active');
    cell.classList.add('inactive');
  }
}


generateAutomata();
newRuleButton.addEventListener('click', generateAutomata);

console.log(' _____ _____ __    __    _____\n' + '|  |  |   __|  |  |  |  |     |\n' + '|     |   __|  |__|  |__|  |  |\n' + '|__|__|_____|_____|_____|_____|');
