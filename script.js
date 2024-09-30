const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const complexityLevelElement = document.getElementById('complexityLevel');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');
const container = document.getElementById('container');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
);

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);
complexityLevelElement.addEventListener('change', updateBackgroundColor);

form.addEventListener('submit', e => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const complexityLevel = complexityLevelElement.value;
  const password = generatePassword(characterAmount, complexityLevel);
  passwordDisplay.innerText = password;
});

function generatePassword(characterAmount, complexityLevel) {
  let charCodes = LOWERCASE_CHAR_CODES;

  if (complexityLevel === 'easy') {
    charCodes = LOWERCASE_CHAR_CODES;
  } else if (complexityLevel === 'medium') {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  } else if (complexityLevel === 'intermediate') {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES, NUMBER_CHAR_CODES);
  } else if (complexityLevel === 'hard') {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES, NUMBER_CHAR_CODES, SYMBOL_CHAR_CODES);
  }

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

function updateBackgroundColor() {
  const complexityLevel = complexityLevelElement.value;
  if (complexityLevel === 'easy') {
    container.style.backgroundColor = '#d3f9d8'; 
  } else if (complexityLevel === 'medium') {
    container.style.backgroundColor = '#fff3cd'; 
  } else if (complexityLevel === 'intermediate') {
    container.style.backgroundColor = '#ffecb5';
  } else if (complexityLevel === 'hard') {
    container.style.backgroundColor = '#f8d7da'; 
  }
}
