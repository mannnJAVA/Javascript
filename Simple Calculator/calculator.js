 let calculation = "";

  function updateDisplay() {
    document.getElementById("display").textContent = calculation || "0";
  }

  function appendValue(val) {
    calculation += val;
    updateDisplay();
  }

  function calculate() {
    try {
      calculation = eval(calculation).toString();
    } catch {
      calculation = "Error";
    }
    updateDisplay();
  }

  function clearDisplay() {
    calculation = "";
    updateDisplay();
  }

  function backSpace() {
    calculation = calculation.slice(0, -1);
    updateDisplay();
  }

  document.addEventListener("keydown", e => {
    if (!isNaN(e.key) || "+-*/.%".includes(e.key)) appendValue(e.key);
    else if (e.key === "Enter") calculate();
    else if (e.key === "Backspace") backSpace();
    else if (e.key.toLowerCase() === "c") clearDisplay();
  });

  updateDisplay();