import { Validation } from "@/presentention/protocols/validation"

export class ValidationSpy implements Validation {
    errorMessage: string 
    fiedName: string
    fiedValue: string     // herdou a classe e add + uma propriedade

    validate (fiedName: string, fiedValue: string): string {
        this.fiedName = fiedName
        this.fiedValue = fiedValue
        return this.errorMessage
    }
}
