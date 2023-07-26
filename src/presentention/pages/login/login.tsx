import React, { useState, useEffect } from "react";
import Styles from './login-styles.scss'
import {Footer,LoginHeader,Input,FormStatus} from "@/presentention/components";
import Context from '@/presentention/contexts/form/form-context'
import { Validation } from "@/presentention/protocols/validation";

type Props = {
    validation  : Validation

}

const Login: React.FC<Props> = ({validation}: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError : '',
        passwordError : '',
        mainError:''
    })
    useEffect(()=>{
        setState({
            ...state,
          emailError: validation.validate('email', state.email),
          passwordError :validation.validate('password', state.password)

        })

    }, [state.email,state.password])


  
    return (
        <div className={Styles.login}>
            <LoginHeader/>

            <Context.Provider value={{state, setState}}>
            <form className={Styles.form}>
            <h2>Login</h2>
            <Input type="email" name="email" placeholder="Digite seu email" />
            <Input  type="password" name="password" placeholder="Digite sua senha" />
            <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
            <span className={Styles.link}> Criar conta</span>
            <FormStatus/>
            </form>
            </Context.Provider>

            <Footer/>

            
        </div>
    )

}
export default Login
 // adicionando !! na frente transforma em boleano 
 //ex  disabled={!!state.emailError || !!state.passwordError