import React, { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../Firebase"; 
import {setDoc, getDoc, doc} from "firebase/firestore";
import './Login&Signup.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const accessCodeDoc = await getDoc(doc(db, "AccessCode", "240907"));
        if (accessCodeDoc.exists()) {
          const firebaseAccessCode = accessCodeDoc.data().code;  // Retrieve the access code from Firestore
          if (code != firebaseAccessCode) {
            toast.error("Invalid access code!", {
              position: "top-center",
            });
            return;
          }
        } else {
          toast.error("Access code not found!", {
            position: "top-center",
          });
          return;
        }
    
        // Proceed with user signup if access code matches
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            Name: name,
            Email: user.email,
            PhoneNum: phone,
          });
        }
    
        console.log("User Registered Successfully!!");
        toast.success("Sign Up Account Successfully!", {
          position: "top-center",
          autoClose: 3000,
          onClose: () => navigate("/Login")
        });
    
      } catch (error) {
        console.log(error.message);
        toast.error("The user has already registered or an error occurred!", {
          position: "top-center",
        });
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
      <div>
        <div className="form-forms">
          <Link to="/">{'<Back'}</Link>
          <div className="form-content">
            <header>Sign up</header>
            <form onSubmit={handleSignUp}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                  placeholder="Create password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                className={`bx ${isPasswordVisible ? "bx-show" : "bx-hide"} eye-icon`}
                onClick={togglePasswordVisibility}
                ></i>
              </div>
              <div className="field input-field">
                <input
                  type="phone"
                  placeholder="Phone"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="field input-field">
                <input
                  type="code"
                  placeholder="Access Code"
                  className="input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div className="field button-field">
                <button type="submit" className="pageButton">Signup</button>
                <ToastContainer />
            </div>
            </form>
            <div className="form-link">
              <span>
                Already have an account?{" "}
                <Link to="/Login" type="submit">
                  Login
                </Link>
              </span>
            </div>
          </div>
      </div>
     </div>
    </div> 
  );
}

export default SignUp;
