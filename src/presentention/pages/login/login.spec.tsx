import React from "react";
import {RenderResult, render,fireEvent, cleanup} from '@testing-library/react'
import Login from "./login";
import { Validation } from "@/presentention/protocols/validation";

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}
class ValidationSpy implements Validation {
    errorMessage: string 
    input : object      // herdou a classe e add + uma propriedade

    validate (input: object): string {
        this.input = input
        return this.errorMessage
    }
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
        expect(validationSpy.input).toEqual({
            email:'any_email'
        }) 
    }) 

    test('Should validation with correct password',() => {
        const {sut, validationSpy} = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput,{target: {value: 'any_password'}})
        expect(validationSpy.input).toEqual({
            password:'any_password'
      })  
   })
})