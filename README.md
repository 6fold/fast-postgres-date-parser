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

Latest result against postgres-date@1.0.7 which contains performance improvements

```
Name                         Operations per second    Average time, ms
fast-postgres-date-parser    3.1 x 10^6               0.00                ==============================>
postgres-date                1.3 x 10^6               0.00                =============>
fast-postgres-date is 2.369 times faster
```
