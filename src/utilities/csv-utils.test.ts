import React from 'react';
import {convertCSVRowIntoDataRow} from './csv-utils';


test('blank lines expect to return -1 as the date and be skipped', () => {
  expect(convertCSVRowIntoDataRow([
    '',
    '',
    '',
    ''
  ]).date).toBe(-1);
});