import  "../styles/parentsection.css"
import Navbar from "./navbar";
import Section2 from "./section2";
import Section3 from "./Section3";
import Cookies from "universal-cookie/es6";
import Roomidcontext from "./roomidcontext";
import Roomid from "./roomidcontext";
import {useState} from "react";
function Parentsection(props) {
    const cookies = new Cookies()
    const [roomid, getroomid] = useState(cookies.get('roomid'))
     const [showSms, setshowSms]=useState(false)

    const {setAuth}=props
    return (

        <Roomid.Provider value={{roomid,getroomid,showSms,setshowSms}}>
        <div className="parentcontainer">
            <section className="section1">
                <Navbar setAuth={setAuth}/></section>

                 <section className="section2">
                    <Section2 />
                </section>



            <section className="section3">


                  <Section3 />


            </section>


        </div>
        </Roomid.Provider>
    );
}

export default Parentsection;
