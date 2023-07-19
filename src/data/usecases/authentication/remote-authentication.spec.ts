import { RemoteAuthentication } from "./remote-authentiction"
import { HttpPostClientSpy } from "../../test/mock-http-client"
import { mockAuthentication } from "../../../domain/tests/mock-authentication"
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy

}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url,httpPostClientSpy)
    return {
        httpPostClientSpy,
        sut
    }

}

describe('RemoteAuthentication',()=>{
    test('Should call HttpPostClient with correct url',async() => {
        const url = faker.internet.url()
        const {sut,httpPostClientSpy} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)

    })
    test('Should call HttpPostClient with correct body',async() => {
        
        const {sut,httpPostClientSpy} = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)

    })
})