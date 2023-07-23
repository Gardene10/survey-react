
import React, {useContext} from "react";
import  Styles  from "./form-status-styles.scss";
import Spinner from "../spinner/spinner";
import Context from '@/presentention/contexts/form/form-context'

const FormStatus: React.FC = () => {
    const {state,errorState} = useContext(Context)
    const {isLoading} = state
    const {main} = errorState

    return (
        <div data-testid="error-wrap" className={Styles.errorWrap}>
             { state.isLoading && <Spinner className={Styles.spinner}/>}
             { errorState.main && <span className={Styles.error}>{errorState.main}</span>}
         </div>
        
    )
}
export default FormStatus