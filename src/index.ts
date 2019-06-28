#!/usr/bin/env node

import program from 'commander';
import Main from './main';

program
  .option('-b, --breaktime <breaktime>', 'Set Breaktime <default 5>', parseInt)
  .option('-l, --limit <minutes>', 'Set Minutes <default 25>', parseInt)
  .version('pomodoro-cli by yudi7ll version 1.0.0', '-v, --version')
  .parse(process.argv);

const main = new Main(program.limit || 25, program.breaktime || 5);

// start loop
main.start();
