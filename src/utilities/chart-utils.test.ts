import React from 'react';
import {generateRecurringChartData} from './chart-utils';
import { IDataRow } from '../common/idatarow';


test('test generateRecurringChartData should filter out data that is not in the range', () => {
    const data : IDataRow = {
        date: 1,
        amount: 1,
        label: '',
        frequency: 'once',
    }
    const startDateTimeMs = 100;
    const endDateTimeMs = 200;
   const result = generateRecurringChartData(data, startDateTimeMs, endDateTimeMs);
   expect(result.length).toBe(0);
});

test('test generateRecurringChartData should add data that is in the range', () => {
    const data : IDataRow = {
        date: 150,
        amount: 1,
        label: '',
        frequency: 'once',
    }
    const startDateTimeMs = 100;
    const endDateTimeMs = 200;
   const result = generateRecurringChartData(data, startDateTimeMs, endDateTimeMs);
   expect(result.length).toBe(1);
});