
import React, {memo} from "react";
import  Styles  from "./login-header-styles.scss";
import Logo from "@/presentention/components/logo/logo";





const LoginHeader: React.FC = () => {
    return (
        <header className={Styles.header}>
        <Logo/>
        <h1>4Devs enquete para Programadores</h1>
    </header>
    )
}
export default memo(LoginHeader)