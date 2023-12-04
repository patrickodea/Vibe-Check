import React, { useState, useContext } from "react";
import axios from "axios";
import { Credentials } from "../Credentials";



const serverURL =
process.env.NODE_ENV === "production"
? "https://vibe-check.up.railway.app"
: "http://localhost:3001";

const Signup = () => {
  // console.log("Current Environment: " + process.env.NODE_ENV);

  const spotify = Credentials();
  const SCOPES =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private";
  //! change redirect url in production
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${
    spotify.ClientId
  }&response_type=code&redirect_uri=${encodeURIComponent(
    "http://localhost:5173/callback"
  )}&scope=${encodeURIComponent(SCOPES)}`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (email !== "" && password.length >= 8) {
      if (isLogin) {
        console.log('You are in Login mode for this submission')
        // Perform login
        return axios({
          url: `${serverURL}/graphql`,
          method: "post",
          data: {
            query: `
              mutation LoginUser($email: String!, $password: String!) {
                loginUser(email: $email, password: $password) {
                  token
                  email
                  }
                }
              `,
            variables: {
              email: email,
              password: password,
            },
          },
        })
        .then((response) => {
          if (response && response.data) {
            if (response.data.data && response.data.data.loginUser) {
              console.log("User logged in!");
              localStorage.setItem('isLoggedIn', 'true');
              setisLoggedIn(true);
              
        
              // Store the token in local storage
              localStorage.setItem('token', response.data.data.loginUser.token);
              
              
            } else if (response.data.errors) {
              console.error(
                "Invalid login credentials:",
                response.data.errors
              );
            }
          }
        })
      } else {
        console.log('You are in Signup mode for this submission')
        // Check if user exists
        axios({
          url: `${serverURL}/graphql`,
          method: "post",
          data: {
            query: `
              query Query($email: String!) {
                userExists(email: $email) {
                  email
                }
              }
            `,
            variables: {
              email: email,
            },
          },
        })
          .then((response) => {
            if (
              response &&
              response.data &&
              response.data.data &&
              response.data.data.userExists
            ) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: "email already exists",
              }));
            } else {
              console.log("unique email entered, attempting to create user...");

              // create user in mongo db
            return axios({
              url: `${serverURL}/graphql`,
              method: "post",
              data: {
                query: `
                  mutation CreateUser($email: String!, $password: String!) {
                    createUser(email: $email, password: $password) {
                      email
                      }
                    }
                  `,
                variables: {
                  email: email,
                  password: password,
                },
              },
            });
            }
          })
          .then((response) => {
            if (response && response.data) {
              if (response.data.data && response.data.data.createUser) 
                console.log("user created, logging in...");
  
                // login in user
                return axios({
                  url: `${serverURL}/graphql`,
                  method: "post",
                  data: {
                    query: `
                      mutation LoginUser($email: String!, $password: String!) {
                        loginUser(email: $email, password: $password) {
                          token
                          email
                          }
                        }
                      `,
                    variables: {
                      email: email,
                      password: password,
                    },
                  },
                });
              
            }
          })
          .then((response) => {
            console.log('User logged in!')
            setisLoggedIn(true);
          })
          .catch((error) => {
            console.error("Error checking if user exists:", error);
          });
      }
    }
  };

  return (
    <div className="center container">
      <h2 className="text-xl m-3">{isLogin ? 'Login' : 'Signup'}</h2>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Signup' : 'Login'}
      </button>
      <form>
        {!isLoggedIn ? (
          <>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            <div>{errors.email}</div>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <div>{errors.password}</div>
            {/* submit button */}
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </>
        ) : (
          <h3>
            You are signed in, Welcome to Vibe
            Check!
          </h3>
        )}
      </form>
    </div>
  );
};

export default Signup;
