import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.blue.bold(__dirname));
console.log(chalk.green(__filename));
console.log(chalk.magenta(path.join(__dirname, '../../index.html', 'style.css')));
