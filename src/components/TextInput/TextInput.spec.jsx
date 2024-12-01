import React from 'react';
import { render, screen } from "@testing-library/react";
import { jest, test, describe } from '@jest/globals';
import { userEvent } from "@testing-library/user-event";
import { TextInput } from ".";

describe('</TextInput />', () => {
    test('should have a value of searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'} />);

        const input = screen.getByPlaceholderText(/Type your search/i);
        expect(input.value).toBe('testando');
    });

    it('should call handleChange function on each key pressed', async () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue="o valor"/>);
        const input = screen.getByPlaceholderText(/Type your search/i);
        const user = userEvent.setup();
        const typedValue ='o valor';
        await user.type(input, typedValue);

        expect(input.value).toBe(typedValue);
        expect(fn).toHaveBeenCalledTimes(typedValue.length);
    });

    it('should match snapshot', async () => {
        const fn = jest.fn();
        const { container } = render(<TextInput handleChange={fn} searchValue="" />);
        expect(container.firstChild).toMatchSnapshot();
    })
});
