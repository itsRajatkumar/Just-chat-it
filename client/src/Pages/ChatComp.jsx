import Chat from "../Components/Chat/Chat";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../App.css"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function ChatComp() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    console.log(user)
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        console.log(doc)
        const data = doc.docs[0].data();
        console.log(data)
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/login");
      fetchUserName();
    }, [user, loading]);
    return (
      <div className="app">
        
      <div className="app__body">
       {/* sidebar */}
       <Sidebar/>
       {/* chat */}
       <Chat/>
        {/* <button onClick={logout}>Logout</button> */}
      </div>
      </div>
    );
}

export default ChatComp;