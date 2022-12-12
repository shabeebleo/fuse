import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

function Auth() {
    const [isSignUp,setIsSignUp]=useState(false)

     
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webname">
          <h1>Fuse</h1>
          <h6>connecting together</h6>
        </div>
      </div>
      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm">
          <h3 style={{ color: "#008080" }}>Sign Up</h3>
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Password"
              className="infoInput"
              name="password"
            />
            <input
              type="text"
              placeholder="Confiirm Password"
              className="infoInput"
              name="confirmpass"
            />
          </div>

          <div>
            <span style={{ fontSize: "12px" }}>
              Already have an account? Login!
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
// function Login() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3 style={{ color: "#008080" }}>Login</h3>

//         <div>
//           <input
//             type="text"
//             placeholder="Username"
//             className="infoInput"
//             name="username"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Password"
//             className="infoInput"
//             name="password"
//           />
//         </div>

//         <div>
//           <span style={{ fontSize: "12px" }}>
//             Don't have an account? Register!
//           </span>
//         </div>
//         <button className="button infoButton" type="submit">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
function SignUp() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3 style={{ color: "#008080" }}>Sign Up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            className="infoInput"
            name="password"
          />
          <input
            type="text"
            placeholder="Confiirm Password"
            className="infoInput"
            name="confirmpass"
          />
        </div>

        <div>
          <span style={{ fontSize: "12px" }}>
            Already have an account? Login!
          </span>
        </div>
        <button className="button infoButton" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Auth;
