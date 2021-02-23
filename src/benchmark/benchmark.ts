import { parsePostgresTimestamp } from '../index';
import * as b from 'benny';
const postgresDate = require('postgres-date');

const date = '2010-01-01 01:30:15.123+00';
b.suite(
  'Date parsing',

  b.add('postgres-date', () => {
    postgresDate(date);
  }),

  b.add('faster-date-parser', () => {
    parsePostgresTimestamp(date);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'reduce', version: '1.0.0' }),
  b.save({ file: 'reduce', format: 'table.html' }),
);
