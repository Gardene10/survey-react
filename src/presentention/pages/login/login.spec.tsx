import React from "react";
import {RenderResult, render,fireEvent, cleanup} from '@testing-library/react'
import Login from "./login";
import {ValidationStub } from "@/presentention/test";
import faker from 'faker'

type SutTypes = {
    sut: RenderResult
    validationStub: ValidationStub
}

//factory makeSut 
const makeSut = (): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = faker.random.words()
    const sut = render(<Login validation={validationStub}/>)
    return {
        sut,
        validationStub
    }

}

describe('LoginComponent',()=>{
    afterEach(cleanup)

    test('Should start with initial state',() => {
        const {sut,validationStub} = makeSut()
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailInput = sut.getByTestId('email-status')
        expect(emailInput.title).toBe(validationStub.errorMessage)
        expect(emailInput.textContent).toBe('❤️')
        const passwordInput = sut.getByTestId('password-status')
        expect(passwordInput.title).toBe(validationStub.errorMessage)
        expect(passwordInput.textContent).toBe('❤️')  

    })

      test('Should show email error if Validation fails',() => {
        const {sut, validationStub} = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput,{target: { value: faker.internet.email() }})
        const emailStatus =sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationStub.errorMessage) 
        expect(emailStatus.textContent).toBe('❤️') 
      })  

      test('Should show password error if Validation fails',() => {
        const {sut, validationStub} = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput,{target: { value: faker.internet.password() }})
        const passwordStatus =sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationStub.errorMessage) 
        expect(passwordStatus.textContent).toBe('❤️') 
      })  

      test('Should show valid email state if Validation succeds',() => {
        const {sut, validationStub} = makeSut()
        validationStub.errorMessage = null
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput,{target: { value: faker.internet.email() }})
        const emailStatus =sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('tudo certo!') 
        expect(emailStatus.textContent).toBe('💚') 
      }) 

      test('Should show valid password state if Validation succeds',() => {
        const {sut, validationStub} = makeSut()
        validationStub.errorMessage = null
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput,{target: { value: faker.internet.password() }})
        const passwordStatus =sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('tudo certo!') 
        expect(passwordStatus.textContent).toBe('💚') 
      }) 

      test('Should enable submit button if form is valid',() => {
        const {sut, validationStub} = makeSut()
        validationStub.errorMessage = null
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput,{target: { value: faker.internet.password() }})
        const passwordStatus =sut.getByTestId('password-status')
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
      }) 


   })
