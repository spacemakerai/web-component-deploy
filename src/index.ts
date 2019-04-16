#!/usr/bin/env node

import program from "commander";
import fs from "fs";
import { execSync } from "child_process";

const { version } = JSON.parse(
  fs.readFileSync(`${__dirname}/../package.json`, "utf8")
);

program
  .version(version)
  .option(
    "-d, --destination <destination>",
    "S3 destination (e.g. s3://my-static-host/web-components)"
  )
  .option("-n, --component-name <component-name>", "Component name")
  .option("-s, --src <src>", "folder to sync")
  .parse(process.argv);

const dest: string = program.destination;
if (!dest) throw new Error("Missing parameter -d, --dest");
const name: string = program.componentName;
if (!name) throw new Error("Missing parameter -n, --component-name");
const src: string = program.src;
if (!src) throw new Error("Missing parameter -s, --src");

const clientVersion: string = JSON.parse(
  fs.readFileSync("package.json", "utf8")
)["version"];

console.log("-- Web Component Deploy --");
console.log(`Deploying version ${clientVersion} to ${dest}${name} .`);

const [major, minor, patch] = clientVersion.split(".");

[
  `v${major}`,
  `v${major}.${minor}`,
  `v${major}.${minor}.${patch}`,
  "latest"
].forEach(v => {
  const cmd = `aws s3 sync --delete "${src}" "${dest}${name}/${v}/"`;
  console.log(`Running: ${cmd}`);
  console.log(execSync(cmd).toString());
});
