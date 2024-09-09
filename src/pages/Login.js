import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from "../Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import './Login&Signup.css';
import googleLogo from '../assets/img/googleIcon.png';
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const studentDoc = await getDoc(doc(db, "Users", user.uid));
      const studentData = studentDoc.data();
      const studentName = studentData.Name;
      console.log("User logged in successfully");
      localStorage.setItem("studentName", studentName);
      localStorage.setItem("studentEmail", email);
      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      window.location.href = "/Main/Dashboard";
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid email or password", {
        position: "top-center",
      });
    }
  };

  const LoginWithGoogle = async () => {
    if (isGoogleSigningIn) return;
    setIsGoogleSigningIn(true);
  
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const googleEmail = user.email;
  
      // Fetch the user from Firestore by email
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      const userData = userDoc.data();
      const userName = userData.Name;
      localStorage.setItem("studentName", userName);
      localStorage.setItem("studentEmail", googleEmail);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        if (userData.Email == googleEmail) {
          console.log("User found in Firestore, logging in...");
          toast.success("Logged in successfully with Google!", {
            position: "top-center",
          });
          window.location.href = "/Main/Dashboard";
        } else {
          console.log("No matching email in Firestore");
          toast.error("Google account isn't sign up!", {
            position: "top-center",
          });
        }
      } else {
        // User document does not exist in Firestore
        console.log("No user document found in Firestore");
        toast.error("Google account isn't sign up!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      toast.error("Error occurred during login!", {
        position: "top-center",
      });
    } finally {
      setIsGoogleSigningIn(false); // Reset the sign-in state
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
          <header>Login</header>
          <form onSubmit={handleLogIn}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`bx ${isPasswordVisible ? "bx-show" : "bx-hide"} eye-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="form-link">
              <Link to="/Reset" className="forgot-pass">Forgot password?</Link>
            </div>
            <div className="field button-field">
              <button type="submit" className="pageButton">Login</button>
              <ToastContainer />
            </div>
          </form>
          <div className="form-link">
            <span>Don't have an account? <Link to="/Signup" className="link signup-link">Signup</Link></span>
          </div>
          <div className="line"></div>
          <div className="media-options">
            <button
              className="field google pageButton"
              onClick={LoginWithGoogle}
              disabled={isGoogleSigningIn}
            >
              <img src={googleLogo} alt="Google Icon" className="google-img" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
