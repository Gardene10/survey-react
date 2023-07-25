import React from "react";
import {RenderResult, render,fireEvent, cleanup} from '@testing-library/react'
import Login from "./login";
import { ValidationSpy } from "@/presentention/test";
import faker from 'faker'

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
        const email = faker.internet.email()
        fireEvent.input(emailInput,{target: {value: email}})
        expect(validationSpy.fiedName).toBe('email') 
        expect(validationSpy.fiedValue).toBe(email) 
    }) 

    test('Should validation with correct password',() => {
        const {sut, validationSpy} = makeSut()
        const passwordInput = sut.getByTestId('password')
        const password = faker.internet.password()
        fireEvent.input(passwordInput,{target: { value:password }})
        expect(validationSpy.fiedName).toBe('password') 
        expect(validationSpy.fiedValue).toBe(password)
      })  
   })
