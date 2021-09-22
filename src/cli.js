#!/usr/bin/env node
/* eslint-disable max-len */
const colorText = require('chalk');

const { mdLink } = require('./index.js');

const {
  statsLinks,
  broken,
  help,
  errorPath,
  errorNoLinks,
} = require('./stats_messages');

const pathOrHelp = process.argv[2];
const options = process.argv.slice(2);
// console.log(process.argv);
const hasValidate = options.includes('--validate');
const hasStats = options.includes('--stats');
const hasHelp = options.includes('--help') || pathOrHelp === '--help';

if (hasHelp) {
  console.log(colorText.yellow(help));
} else {
  mdLink(pathOrHelp, { validate: true })
    .then((response) => {
      if (hasValidate && !hasStats) {
        console.log(response);
      }
      if (hasStats && !hasValidate) {
        console.log(statsLinks(response));
        // console.log(response);
      }
      if ((hasStats && hasValidate) || (hasValidate && hasStats)) {
        console.log(colorText.green(statsLinks(response)));
        console.log(colorText.red(broken(response)));
        // console.log(response);
      }
    }).catch((error) => {
      // console.log(error.message);
      if (error.message === 'Something bad happened, this route does not have links :c') {
        console.log(colorText.red(errorNoLinks));
      } else {
        console.log(colorText.red(errorPath));
      }
    });
}

/*
node main.js 'C:\Users\Estudiante\Documents\GitHub\LIM015-md-links\testing_functions\testing_md.md'
*/
