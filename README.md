# fast-postgres-date-parser

A drop in for 'postgres-date' package that is few times faster.

### Installation

`yarn install @sixfold/fast-postgres-date-parser`

### Usage

```ts
import { types } from 'pg';
import { parsePostgresTimestamp} from '@sixfold/fast-postgres-date-parser';

types.setTypeParser(types.builtins.TIMESTAMPTZ, parsePostgresTimestamp);
types.setTypeParser(types.builtins.TIMESTAMP, parsePostgresTimestamp);
```

### Benchmark

The project also contains a benchmark, you can run with `yarn benchmark`

Latest benchmark against postgres-date@2.0.0

```
  postgres-date:
    1 309 014 ops/s, ±0.88%   | slowest, 62.11% slower

  faster-date-parser:
    3 455 121 ops/s, ±2.20%   | fastest
```
