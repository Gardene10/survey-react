import { HttpPostParams } from "@/data/protocols/http"
import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mokedAxios = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.random.number()
}

mokedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient =>{
    return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostParams<any> => ({
    url:faker.internet.url(),
    body: faker.random.objectElement()
})
describe('AxiosHttpClient',()=>{
    test('Should call axios with correct values', async() => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mokedAxios.post).toHaveBeenCalledWith(request.url,request.body)
        
    })
    test('Should return the correct statusCode and body', async() => {
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body:mockedAxiosResult.data
    })
        
    })

})