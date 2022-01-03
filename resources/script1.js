const encrypt = document.getElementById('encrypt');
const decrypt = document.getElementById('decrypt');
const codeBox = document.getElementById('codeBox');
const resultHeader = document.getElementById('resultHeader');
const ok = document.getElementById('ok')
const codeText = document.getElementById('codeText');

const caesarCipher = (str, amount = 0) => {
    if (amount < 0) {
      return caesarCipher(str, amount + 26);
    }
    let output = '';
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (char.match(/[a-z]/i)) {
        let code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
      output += char;
    }
    return output;
  };
  
  const symbolCipher = (str) => {
    const symbols = {
      'i': '!',
      '!': 'i',
      'l': '1',
      '1': 'l',
      's': '$',
      '$': 's',
      'o': '0',
      '0': 'o',
      'a': '@',
      '@': 'a',
      'e': '3',
      '3': 'e',
      'b': '6',
      '6': 'b'
    }
  
    let output = '';
    for (let i = 0; i < str.length; i++) {
      let char = str.toLowerCase()[i];
  
      if (symbols[char]) {
        output += symbols[char]
      } else {
        output += char;
      }
    }
    return output;
  }
  
  const reverseCipher = (sentence) => {
    let words = sentence.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].split('').reverse().join('');
    }
     return words.join(' ');
  };
  
  const encodeMessage = (str) => {
    // Use the encryptor functions here.
    const output1 = caesarCipher(str, 8);
    const output2 = reverseCipher(output1);
    const output3 = symbolCipher(output2);
    return output3;
  }
  
  const decodeMessage = (str) => {
    // Use the encryptor functions here.
    const decode1 = symbolCipher(str);
    const decode2 = reverseCipher(decode1);
    const decode3 = caesarCipher(decode2, -8);
    return decode3;
  }

/*  var maxLength = 25;
var userData = -1;

while (userData == -1 || (userData != null && userData.length > maxLength)) {
    userData = window.prompt('Please enter some data. It should be no more than ' + maxLength + ' characters in length', ');
} */

const openEncryptPrompt = function() {
    let maxLength = 100;
    let message = -1;
    while (message == -1 || message.length > maxLength) {
        message = window.prompt('Please enter message to be encrypted: (max 100 characters)')
    }
    codeBox.style.visibility = 'visible';
    resultHeader.innerHTML = 'Your encoded message is as follows:';
    codeText.innerHTML = encodeMessage(message); 
}

encrypt.onclick = openEncryptPrompt;

const openDecryptPrompt = function() {
    let maxLength = 100;
    let message = -1;
    while (message == -1 || message.length > maxLength) {
        message = window.prompt('Please enter message to be decrypted: (max 100 characters)')
    }
    codeBox.style.visibility = 'visible';
    resultHeader.innerHTML = 'Your decoded message is as follows:';
    codeText.innerHTML = decodeMessage(message); 
}

decrypt.onclick = openDecryptPrompt;

const closeCodeBox = function() {
    codeBox.style.visibility = 'hidden';
}

ok.onclick = closeCodeBox;