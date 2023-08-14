import "../styles/Section3.css"
import send from "../images/paper-plane.png"
import {useContext, useEffect, useRef, useState} from "react";
import {auth} from "./firebase";
import defaultimage from "../images/user.png"
import Actionbtn from "../images/dots.png"
import {database} from "./firebase";
import Add from "../images/add (1).png"
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy,doc,deleteDoc} from "firebase/firestore"
import Roomid from "./roomidcontext";
import moment from "moment";
import Like from "../images/like.png"
function Section3() {
    const createdAtDate = new Date()
    const {roomid,getroomid} = useContext(Roomid)
    const [message, setmessage] = useState("")
    const profile = localStorage.getItem("profilepicture")
    const name = localStorage.getItem("name")
    const messageref = collection(database, "messages")
    const [firebasemessage, setfirebasemessage] = useState([])
    console.log(auth?.currentUser?.displayName)
    const  [deletemessage, setdeletemessage] = useState()
    const getmessage = (e) => {
        setmessage(e.target.value)
    }
    const sendmessage = async () => {

        try {
            await addDoc(messageref, {
                text: message === ""? "LIKE": message,
                createdAt:  createdAtDate,
                user: auth?.currentUser?.displayName,
                profilepicture: auth?.currentUser?.photoURL,
                uid: auth?.currentUser?.uid,
                roomid: roomid
            })

                setmessage("")



        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        try {

            const querymsg = query(messageref, where("roomid", "==", roomid), orderBy("createdAt"));
            onSnapshot(querymsg, (snapshot) => {
                let sms = []
                snapshot.forEach((doc) => {
                    sms.push({...doc.data(), id: doc.id})
                })
                setfirebasemessage(sms)
            })
        } catch (err) {
            console.log("error")
        }

    }, [roomid])
    const refsms = useRef()
    useEffect(() => {
        refsms.current?.scrollIntoView({behavior: "smooth"})


    }, [firebasemessage])
       console.log(moment(createdAtDate).calendar())



 function  Deletemessage(id) {

        const deletesms=doc(database,"messages", id)
   deleteDoc(deletesms)
       .then(() =>{})

 }
    console.log(firebasemessage)

    return (
        <>
            <section className="Section3">

                <div className="con">
                    <header>
                        {profile ? <img src={profile} alt="User"/> : <img src={defaultimage} alt="User"/>}
                        {name ? <p> Room: {roomid}</p> : <p>User</p>}
                    </header>

                    <main className="main">

                        {roomid ?

                            firebasemessage.map((sms, index) => {
                                return (
                                    <>
                                        {/*{*/}

                                        {/*    moment(sms.createdAt.toDate()).calendar() === moment(createdAtDate).calendar() ? "":*/}
                                        {/*    <div className="date" key={index}>{moment(sms.createdAt.toDate()).calendar()}</div>*/}
                                        {/*}*/}

                                    <div ref={refsms} className={sms.uid === auth?.currentUser?.uid ? "mssg" : "mssg1"}
                                         key={index}>
                                        <div className="actionbtn">
                                            <button onClick={()=>{Deletemessage(sms.id)}}><img src={Actionbtn} alt=""/></button>
                                        </div>

                                        <div className={sms.text==="LIKE" ? "textnobg": "text"} data-name={moment(sms.createdAt.toDate()).format('LT')}>
                                                 <p>{sms.text==="LIKE"? <img src={Like} alt=""/> : sms.text}</p></div>
                                        <div className="cons">

                                            <img src={sms.profilepicture} alt="img"/>
                                          <span>{sms.user.split(' ')[0]}</span>
                                        </div>


                                    </div>

                                    </>
                                )
                            })
                            :
                            <>
                                <div className="ifnoroomid">
                                    <h1>Get started</h1>
                                    <div><p>add</p><img src={Add} alt=""/> <p>room</p> <h4>to send message</h4></div>
                                </div>

                            </>
                        }


                    </main>
                    <div className="inputsend">
                        <input type="text" className="" onChange={getmessage} value={message}/>
                        {
                            message === "" ?
                                <button className="likebtn" onClick={sendmessage}><img src={Like} alt="img"/></button> :
                                <button className="sentbtn" onClick={sendmessage}><img src={send} alt="Send"/></button>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Section3;