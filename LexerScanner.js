var dictionary = [
  {
    token: "keyword",
    regex:
      /^(char|int|short|long|float|double|sizeof|signed|unsigned|if|else|while|for|do|break|continue|goto|main|void|return|switch|case|default|const|static|auto|extern|register|struct|union|enum|typedef|#include)$/g,
  },
  {
    token: "identifier",
    regex: /^([A-Z]|[a-z]|$)([A-Z]|[a-z]|[0-9]|printf|scanf)*$/g,
  },
  {
    token: "separator",
    regex: /^(""|'|,|\.|;)\s*$/g,
  },
  { token: "bracket", regex: /^(\(|\)|\{|\})$/g },
  { token: "operator", regex: /^(\+|\-|\/|\*|=|==|!=|<=|<|>|>=)$/g },
  { token: "literal", regex: /^"".*""$/g },
  { token: "number", regex: /^[0-9]+(\.[0-9]*(e-?[0-9]*)?)?$/g },
];

var output = [];

function getToken(str) {
  for (let index = 0; index < dictionary.length; index++) {
    if (str.match(dictionary[index].regex) !== null) {
      return dictionary[index].token;
    }
  }
}

function addLexeme(lexeme, token) {
  if (isLexemePresent(lexeme)) {
    for (let index = 0; index < output.length; index++) {
      if (output[index].lexeme === lexeme) {
        output[index].count += 1;
        break;
      }
    }
  } else output.push({ lexeme: lexeme, token: token, count: 1 });
}

function isLexemePresent(lexeme) {
  for (let index = 0; index < output.length; index++) {
    if (output[index].lexeme === lexeme) return true;
  }
  return false;
}

function displayOutput() {
  var table = document.getElementById("table");
  console.log(output);
  output.forEach((element) => {
    var row = document.createElement("tr");

    var item1 = document.createElement("td");
    var item2 = document.createElement("td");
    var item3 = document.createElement("td");

    item1.innerText = element.lexeme;
    item2.innerText = element.count;
    item3.innerText = element.token;

    row.appendChild(item1);
    row.appendChild(item2);
    row.appendChild(item3);

    table.appendChild(row);
  });
}

function lexicalScanner() {
  var input_code = document.getElementById("area").value;
  var line_fragments = input_code.split("\n");
  var fragments = [];
  line_fragments.forEach((element) => {
    var temp = element.split(" ");
    temp.forEach((item) => {
      let item2 = item.split(/[<>]/);
      console.log(item);
      fragments.push(item);
    });
  });

  fragments.forEach((element) => {
    var element_token = getToken(element);
    if (element_token || !element_token) {
      addLexeme(element, element_token);
    }
  });
  displayOutput();
}
