import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from "../Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { collection, query, getDocs, getFirestore, where } from 'firebase/firestore';
import './Login&Signup.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const Doc = await getDoc(doc(db, "Users", user.uid));
      const Data = Doc.data();
      const name = Data.Name;
      console.log("User logged in successfully");
      localStorage.setItem("Name", name);
      localStorage.setItem("Email", email);
      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      navigate("/Main/Dashboard");
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid email or password", {
        position: "top-center",
      });
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      // Query the Users collection where the Email field matches the entered email
      const usersRef = collection(db, "Users");
      const querySnapshot = await getDocs(query(usersRef, where("Email", "==", email)));

      if (!querySnapshot.empty) {
        // Assuming the email is unique, there should only be one matching document
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const storedPassword = userData.Password; // Assuming you store passwords in plaintext (which is not secure)

        if (storedPassword === password) {
          console.log("Admin logged in successfully");
          localStorage.setItem("Name", userData.Name);
          localStorage.setItem("Email", email);
          toast.success("Logged in as Admin!", {
            position: "top-center",
          });
          navigate("/Admin/Dashboard"); // Redirect to admin dashboard
        } else {
          toast.error("Incorrect password for admin login", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Admin user not found", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("Error logging in as admin:", error.message);
      toast.error("Error occurred during admin login", {
        position: "top-center",
      });
    }
  };


  const handleSubmit = (e) => {
    if (email.includes(".adm@")) {
      handleAdminLogin(e); // Call admin login function
    } else {
      handleLogIn(e); // Call regular user login function
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
          <form onSubmit={handleSubmit}>
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
        </div>
      </div>
    </div>
  );
}

export default LogIn;
