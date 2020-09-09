import { parsePostgresTimestamp } from '../index';
const microBenchmark = require('micro-benchmark');
const postgresDate = require('postgres-date');

type BenchmarkResult = {
  name: string;
  ops: number;
  time: number;
};

const date = '2010-01-01 01:30:15.123+00';

var result = microBenchmark.suite({
  duration: 60_0000, // optional
  maxOperations: 10000000, // optional
  specs: [
    {
      name: 'postgres-date',
      fn: function () {
        postgresDate(date);
      },
    },
    {
      name: 'fast-postgres-date-parser',
      fn: function () {
        parsePostgresTimestamp(date);
      },
    },
  ],
}) as BenchmarkResult[];

const rates = result.reduce((map, res) => {
  map.set(res.name, res.ops);
  return map;
}, new Map<string, number>());

var report = microBenchmark.report(result);

console.log(report);
console.log(
  'fast-postgres-date is',
  (rates.get('fast-postgres-date-parser')! / rates.get('postgres-date')!).toFixed(3),
  'times faster',
);
