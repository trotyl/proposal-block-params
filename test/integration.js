var {DocScript} = require('./../docscript.js');
const fs = require('fs');
const Assert = require('assert');

describe("Integration Tests", function(done) {
  fs.readdirSync("./examples")
      .filter(file => {
	// Only keep the .js files
	// console.log(file);
	return file.substr(-3) === ".js";
      })
      .forEach(file => {
	// console.log(file);
	it(`${file}`, function() {
	  let code = fs.readFileSync(`./examples/${file}`);
	  let expected = fs.readFileSync(`./examples/${file}.out`);
	  // if (file != "helloworld.js") {
	  //   return;
	  // }
	  // let foo = [];
	  // let  = ;
	  // let result = DocScript.compile(code);
	  // console.log(`${docscript} ${result}`);
	  // let b = eval(`${DocScript.api()} ${result}`);
	  let stdout = [];
	  // console.log(`${code.toString()}`);
	  let foo = DocScript.compile(code.toString());
	  // console.log(foo);
	  let debug = `
            var console = {
              log: function(str) {
                stdout.push(str);
              }
            };
         `;

	  let script = `${debug} ${foo}`;
	  // console.log(script);
	  eval(script);
	  // console.log(file);
	  // let result = DocScript.eval(`
	  //    ${code.toString()}
          // `, stdout);
	  // console.log(result);
	  // console.log(stdout.join("\n"));
	  // console.log(expected.toString());
	  let succeeded = Assert.equal(
	      `${expected.toString()}`, `${stdout.join("\n")}\n`,
	      `Got: \n${stdout.join("\n")}\n`);
	  // let result = eval(code.toString());
	  // DocScript.eval(DocScript.api(), code.toString());
	});
      });
});