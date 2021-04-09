import * as fs from 'fs';
import { resolve } from 'path';
import { config, parse } from 'dotenv';

const sampleData: any = parse(fs.readFileSync('.env.example'));
const data: any = parse(fs.readFileSync('.env'));
const errors = [];

for (const config_var in sampleData) {
  if (Object.prototype.hasOwnProperty.call(sampleData, config_var)) {
    if (typeof data[config_var] === 'undefined' || data[config_var] === '') {
      errors.push(
        `Config error. Please set ${config_var} parameter in '.env' file.`,
      );
    }
  }
}

if (errors.length) {
  console.log('\x1b[31m%s\x1b[40m', errors.join('\n'));
  process.exit(-1);
}

config({ path: resolve(__dirname, '../.env') });
