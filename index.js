#!/usr/bin/env node

const Wrappie = require("./lib/wrappie");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("To use try 'wrappie <command>'");
  process.exit();
}

let envFile = {};
if (fs.existsSync("./env.json")) {
  envFile = JSON.parse(fs.readFileSync("./env.json", "utf-8"));
} else {
  console.warn("Warning: no env.json found in folder");
}

const params = {
  command: process.argv[2],
  commandTail: process.argv.slice(3),
  envFile: envFile,
};

const wrappie = new Wrappie(params);

wrappie.environmentBuilder().then((code) => {
  process.exit(code);
});
