#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const chalk = require('chalk');
const semver = require('semver');
const requiredVersion = require('../package.json').engines.node;

function checkNodeVersion(wanted, id) {
    if (!semver.satisfies(process.version, wanted)) {
        console.log(
            chalk.red(
                'You are using Node ' +
                    process.version +
                    ', but this version of ' +
                    id +
                    ' requires Node ' +
                    wanted +
                    '.\nPlease upgrade your Node version.'
            )
        );
        process.exit(1);
    }
}

checkNodeVersion(requiredVersion, 'vue-cli');

const fs = require('fs');
const path = require('path');
const slash = require('slash');
const minimist = require('minimist');

const program = require('commander');

program.version(require('../package').version).usage('<command> [options]');

program
    .command('simple <app-name>')
    .description('simple init a new project based on vue')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action((name, cmd) => {
        const options = cleanArgs(cmd);

        require('../lib/create')(name, options);
    });

program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach(o => {
        const key = o.long.replace(/^--/, '');
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    });
    return args;
}
