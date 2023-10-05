import React from 'react';
import { render } from '@testing-library/react';
import Premium from './premium'; // Adjust the import path as needed

test('Premium component renders without crashing', () => {
 render(<Premium/>)
});