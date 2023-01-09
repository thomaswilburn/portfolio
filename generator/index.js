var betty = require("@nprapps/betty");
var fs = require("fs");
var path = require("path");
var local = f => path.resolve(__dirname, f);

function process(template, data) {
  var output = "";
  // step through each tag in turn
  var tagRegex = /\{(?<control>[#\/])?(?<tag>\w+)\}/ig;
  var match;
  var splice = 0;
  while (match = tagRegex.exec(template)) {
    output += template.slice(splice, match.index);
    var { control, tag } = match.groups;
    if (control) {
      if (control == "/") continue;
      var start = tagRegex.lastIndex;
      // find the sub-template and execute
      var closing = new RegExp(`\\{/${tag}\\}`, "ig");
      closing.lastIndex = tagRegex.lastIndex;
      var closed = closing.exec(template);
      splice = tagRegex.lastIndex = closed.index + closed[0].length;
      var subtemplate = template.slice(start, closed.index);
      // is this truthy or an array?
      var value = data[tag];
      if (value instanceof Array) {
        var items = value.map(d => process(subtemplate, d));
        output += items.join("");
      } else if (value) {
        output += process(subtemplate, data);
      }
    } else {
      output += data[tag];
      splice = match.index + match[0].length;
    }
  }
  output += template.slice(splice);
  return output;
}

var template = fs.readFileSync(local("template.html"), "utf-8");
var aml = fs.readFileSync(local("source.txt"), "utf-8");
var data = betty.parse(aml);
var result = process(template, data);
fs.writeFileSync("index.html", result);