import "../styles/section2.css"
import google from "../images/google.png"
import Add from "../images/add (1).png"
import close from "../images/close (1).png"
import {useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie/es6";
import {auth, database} from "./firebase";
import Roomid from "./roomidcontext";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";

function Section2() {
    const {roomid, getroomid,showSms, setshowSms} = useContext(Roomid)
   const [getsms, setsms]=useState("")
    const cookies = new Cookies()
    const [modal, setmodal] = useState(false)
    const user = collection(database, "users")
    const [getuser, setuser]=useState([])
    const openmodal = () => {
        setmodal(true)
    }

    const getroom = (e) => {
        setsms(e.target.value)
        console.log(auth?.currentUser?.displayName)
    }

    const submitroom = () => {
        getroomid(getsms)
        cookies.set("roomid", getsms)
        setsms("")
        setmodal(false)
    }

    const closemodal = () => {
        setmodal(false)

    }
    useEffect(() => {
        try {

            const querymsg = query(user);
            onSnapshot(querymsg, (snapshot) => {
                let sms = []
                snapshot.forEach((doc) => {
                    sms.push({...doc.data(), id: doc.id})
                })
                setuser(sms)
            })
        } catch (err) {
            console.log("error")
        }

    }, [roomid])



    return (

        <>


            <section className="Section2"  >
                <div className="headerparent">
                    <div className="headermsg" ><h1>Message</h1>
                        <button onClick={openmodal}><img src={Add} alt="add"/></button>
                    </div>

                    <main className="maincon">
                        { getuser.map((user)=>{
                            return (
                                <>
                            <div><img src={user.profilepicture} alt=""/> <p>{user.user}</p></div>


                                </>
                            )
                        })
                        }
                    </main>
                </div>


                {modal && <div className="modal">
                    <div>
                        <button className="close" onClick={closemodal}><img src={close} alt="close"/></button>

                        <input type="text" onChange={getroom} value={getsms} />
                        <button className="btnenter" onClick={submitroom}>Enter Chat</button>


                    </div>
                </div>
                }

            </section>

        </>
    )


}


export default Section2