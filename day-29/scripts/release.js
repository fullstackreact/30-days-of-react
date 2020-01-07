process.env.NODE_ENV = "test";
process.env.CI = true;

var chalk = require("chalk");
const exec = require("child_process").exec;

var output = [];

function runCmd(cmd) {
  return new Promise((resolve, reject) => {
    const testProcess = exec(cmd, { stdio: [0, 1, 2] });
    testProcess.stdout.on("data", msg => output.push(msg));
    testProcess.stderr.on("data", msg => output.push(msg));
    testProcess.on("close", code => (code === 0 ? resolve() : reject()));
  });
}

function build() {
  console.log(chalk.cyan("Building app"));
  return runCmd("npm run build");
}

function runTests() {
  console.log(chalk.cyan("Running tests..."));
  return runCmd("npm test");
}

function deploy() {
  console.log(chalk.green("Deploying..."));
  return runCmd(`sh -c "${__dirname}/deploy.sh"`);
}

function error() {
  console.log(chalk.red("There was an error"));
  output.forEach(msg => process.stdout.write(msg));
}

build()
  .then(runTests)
  .then(deploy)
  .catch(error);
