import { Validation } from "@/presentention/protocols/validation"

export class ValidationStub implements Validation {
    errorMessage: string 
 // herdou a classe e add + uma propriedade

    validate (fiedName: string, fiedValue: string): string {
        return this.errorMessage
    }
}
