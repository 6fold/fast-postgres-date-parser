import { parsePostgresTimestamp } from '../index';

describe('db utils', () => {
  describe('parsePostgresDate', () => {
    it('matches postgres-date behaviour', () => {
      expect(parsePostgresTimestamp('garbage')).toEqual(null);
      expect(parsePostgresTimestamp('2010-12-11 09:09:04')?.toString()).toEqual(
        new Date('2010-12-11 09:09:04').toString(),
      );

      expect(parsePostgresTimestamp('2011-12-11 09:09:04 BC')?.toString()).toEqual(
        new Date('-002010-12-11T09:09:04').toString(),
      );
      expect(parsePostgresTimestamp('0001-12-11 09:09:04 BC')?.toString()).toEqual(
        new Date('0000-12-11T09:09:04').toString(),
      );
      expect(parsePostgresTimestamp('0001-12-11 BC')!.getFullYear()).toEqual(0);

      expect(parsePostgresTimestamp('0013-06-01')!.getFullYear()).toEqual(13);
      expect(parsePostgresTimestamp('1800-06-01')!.getFullYear()).toEqual(1800);

      function ms(str: string) {
        const base = '2010-01-01 01:01:01';
        return parsePostgresTimestamp(base + str)!.getMilliseconds();
      }

      expect(ms('.1')).toEqual(100);
      expect(ms('.01')).toEqual(10);
      expect(ms('.74')).toEqual(740);

      function iso(str: string) {
        return parsePostgresTimestamp(str)!.toISOString();
      }

      expect(iso('2010-12-11 09:09:04.1')).toEqual(new Date(2010, 11, 11, 9, 9, 4, 100).toISOString());

      // timestamp that triggered a bug
      expect(parsePostgresTimestamp('2020-09-01 03:18:17.337+00')?.toISOString()).toEqual('2020-09-01T03:18:17.337Z');

      // fractions starting with 0
      expect(iso('2011-01-23 22:15:51.01-06')).toEqual('2011-01-24T04:15:51.010Z');
      expect(iso('2011-01-23 22:15:51.001-06')).toEqual('2011-01-24T04:15:51.001Z');
      expect(iso('2011-01-23 22:15:51.0001-06')).toEqual('2011-01-24T04:15:51.000Z');

      expect(iso('2011-01-23 22:15:51.279999999-06')).toEqual('2011-01-24T04:15:51.279Z');
      expect(iso('2011-01-23 22:15:51Z')).toEqual('2011-01-23T22:15:51.000Z');
      expect(iso('2011-01-23 10:15:51-04')).toEqual('2011-01-23T14:15:51.000Z');
      expect(iso('2011-01-23 10:15:51+06:10')).toEqual('2011-01-23T04:05:51.000Z');
      expect(iso('2011-01-23 10:15:51-06:10')).toEqual('2011-01-23T16:25:51.000Z');
      expect(iso('0005-02-03 10:53:28+01:53:28')).toEqual('0005-02-03T09:00:00.000Z');
      expect(iso('0005-02-03 09:58:45-02:01:15')).toEqual('0005-02-03T12:00:00.000Z');

      expect(iso('0076-01-01 01:30:15+12')).toEqual('0075-12-31T13:30:15.000Z');
      expect(parsePostgresTimestamp('1800-06-01')!.getFullYear()).toEqual(1800);

      expect(parsePostgresTimestamp('infinity')?.toISOString()).toEqual('+275760-09-13T00:00:00.000Z');
      expect(parsePostgresTimestamp('-infinity')?.toISOString()).toEqual('-271821-04-20T00:00:00.000Z');
    });
  });
});
