import './App.css';
import Parentsection from "./components/parentsection";
import Loginpage from "./components/loginpage";
import {useEffect, useState} from "react";
import Cookies from "universal-cookie/es6"

function App() {
    const cookies = new Cookies()
    const [islogin, setislogin] = useState(cookies.get("authentication-token"))

    const [profile, setprofile] = useState()
    if (!islogin) {
        return (
            <>
                <Loginpage setAuth={setislogin}/>
            </>
        );

    } else {
        return (
            <>
                <Parentsection setAuth={setislogin} />
            </>
        )
    }
}

export default App;
