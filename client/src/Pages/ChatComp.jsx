import Chat from "../Components/Chat/Chat";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../App.css"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/Slices/userSlice";
import { CircularProgress } from "@mui/material";

function ChatComp() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const loginUser = useSelector(state=>state.user)
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        dispatch(LoginUser({...data}))
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
        
      {!loading &&<div className="app__body">
       {/* sidebar */}
       <Sidebar/>
       {/* chat */}
       <Chat/>
        {/* <button onClick={logout}>Logout</button> */}
      </div>}
      {loading && (
        <div className="chat_spinner">
          <CircularProgress />
        </div>
      )}
      </div>
    );
}

export default ChatComp;