import React from "react";
import {render} from '@testing-library/react'
import Login from "./login";

describe('LoginComponent',()=>{
    test('Should start with initial state',() => {
        const {getByTestId} = render(<Login/>)
        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailInput = getByTestId('email-status')
        expect(emailInput.title).toBe('Campo obrigatório')
        expect(emailInput.textContent).toBe('❤️')
        const passwordInput = getByTestId('password-status')
        expect(passwordInput.title).toBe('Campo obrigatório')
        expect(passwordInput.textContent).toBe('❤️')
        
        
        
    })
})