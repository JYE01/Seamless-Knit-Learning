import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../Firebase"; 
import { setDoc, doc, getDoc } from "firebase/firestore"; 
import './Login&Signup.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function GoogleSignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const SignUpWithGoogle = async (e) => {
    e.preventDefault();
    if (isGoogleSigningIn) return;
    setIsGoogleSigningIn(true);
  
    try {
      // Fetch the access code from Firestore
      const accessCodeDoc = await getDoc(doc(db, "AccessCode", "240907"));
      
      if (accessCodeDoc.exists()) {
        const firebaseAccessCode = accessCodeDoc.data().code;
        
        if (code === firebaseAccessCode) {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
  
          // Get user details from Google auth result
          const user = result.user;
          const googleEmail = user.email; 
          const userId = user.uid;
  
          // Save user info to Firestore
          await setDoc(doc(db, "Users", userId), {
            Name: name,
            Email: googleEmail,
            PhoneNum: phone,
          });
  
          // Show success message and navigate to login
          toast.success("Signed up successfully!", {
            position: "top-center",
            autoClose: 3000,
            onClose: () => navigate("/Login")
          });
        } else {
          toast.error("Invalid access code!", { position: "top-center" });
          setIsGoogleSigningIn(false);
          return;
        }
      } else {
        toast.error("Access code not found!", { position: "top-center" });
        setIsGoogleSigningIn(false);
        return;
      }
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      toast.error("An error occurred during sign-up. Please try again.", { position: "top-center" });
    } finally {
      setIsGoogleSigningIn(false);
    }
  };
  

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#EEEEEE", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="form-forms">
        <Link to="/">{'<Back'}</Link>
        <div className="form-content">
          <header>Sign up with Google</header>
          <form onSubmit={SignUpWithGoogle}>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Enter your name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Enter your phone number"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Enter access code"
                className="input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="field button-field">
              <button type="submit" className="pageButton" disabled={isGoogleSigningIn}>
                {isGoogleSigningIn ? "Signing Up..." : "Sign Up with Google"}
              </button>
            </div>
          </form>
          <div className="form-link">
            <span>Already have an account? <Link to="/Login" className="link login-link">Login</Link></span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default GoogleSignUp;
