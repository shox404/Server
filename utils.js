module.exports = function processKeySequence(keys) {
  let result = "";
  for (const action of keys) {
    const key = action.key;
    switch (key) {
      case "alt":
      case "shift":
      case "ctrl":
      case "tab":
      case "caps lock":
        result += key.toUpperCase();
        break;
      case "enter":
        result += "\n";
        break;
      case "backspace":
        result = result.slice(0, -1);
        break;
      case "space":
        result += " ";
        break;
      case "right":
        result += ">";
        break;
      default:
        result += key;
        break;
    }
  }
  return result;
};
