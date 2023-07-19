import { HttpPostParams } from "@/data/protocols/http"
import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mokedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient =>{
    return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostParams<any>({
    url:faker.internet.url(),
    body: faker.random.objectElement()
})
describe('AxiosHttpClient',()=>{
    test('Should call axios with correct url and verb', async() => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mokedAxios.post).toHaveBeenCalledWith(request.url)
        
    })
    test('Should call axios with correct url and body', async() => {
        const sut = makeSut()
        await sut.post({url:faker.internet.url()})
        expect(mokedAxios.post).toHaveBeenCalledWith(url:faker.internet.url())
        
    })
})