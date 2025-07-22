#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
const program = new Command();

program
  .name('word-count-cli')
  .description('CLI to count the total words in a file')
  .version('0.0.1');

program.command('count')
  .description('Count the no of words in this file')
  .argument('<file>', 'file path for word count')
  .action((filePath)=>{
  try {
  const content = fs.readFileSync(filePath, 'utf-8');
  const cleaned = content.replace(/[^\w\s]/g, '').trim();
  const words = cleaned.split(/\s+/).filter((w) => w.length > 0);
  console.log(`There are ${words.length} words in this file`);
  } catch (error) {
    console.log('Enter the correct path!');
  }
  });


program.parse();
        