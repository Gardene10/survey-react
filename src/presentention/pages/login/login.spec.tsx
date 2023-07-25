import React from "react";
import {RenderResult, render,fireEvent, cleanup} from '@testing-library/react'
import Login from "./login";
import { ValidationSpy } from "@/presentention/test";

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

//factory makeSut 
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy}/>)
    return {
        sut,
        validationSpy
    }

}

describe('LoginComponent',()=>{
    afterEach(cleanup)

    test('Should start with initial state',() => {
        const {sut} = makeSut()
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailInput = sut.getByTestId('email-status')
        expect(emailInput.title).toBe('Campo obrigatório')
        expect(emailInput.textContent).toBe('❤️')
        const passwordInput = sut.getByTestId('password-status')
        expect(passwordInput.title).toBe('Campo obrigatório')
        expect(passwordInput.textContent).toBe('❤️')  

        
    })

    test('Should validation with correct email',() => {
        const {sut, validationSpy} = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput,{target: {value: 'any_email'}})
        expect(validationSpy.fiedName).toBe('email') 
        expect(validationSpy.fiedValue).toBe('any_email') 
    }) 

    test('Should validation with correct password',() => {
        const {sut, validationSpy} = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput,{target: {value: 'any_password'}})
        expect(validationSpy.fiedName).toBe('password') 
        expect(validationSpy.fiedValue).toBe('any_password')
      })  
   })
