#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const { version } = JSON.parse(fs_1.default.readFileSync(`${__dirname}/../package.json`, "utf8"));
commander_1.default
    .version(version)
    .option("-d, --destination <destination>", "S3 destination (e.g. s3://my-static-host/web-components)")
    .option("-n, --component-name <component-name>", "Component name")
    .option("-s, --src <src>", "folder to sync")
    .parse(process.argv);
const dest = commander_1.default.destination;
if (!dest)
    throw new Error("Missing parameter -d, --dest");
const name = commander_1.default.componentName;
if (!name)
    throw new Error("Missing parameter -n, --component-name");
const src = commander_1.default.src;
if (!src)
    throw new Error("Missing parameter -s, --src");
const clientVersion = JSON.parse(fs_1.default.readFileSync("package.json", "utf8"))["version"];
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
    console.log(child_process_1.execSync(cmd).toString());
});
