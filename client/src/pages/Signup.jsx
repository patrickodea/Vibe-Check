import { useState } from 'react';
import axios from 'axios';
import { Credentials } from '../Credentials';


const Signup = () => {

  const spotify = Credentials();
  const SCOPES = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  //! change redirect url in production
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${spotify.ClientId}&response_type=code&redirect_uri=${encodeURIComponent('http://localhost:5173/callback')}&scope=${encodeURIComponent(SCOPES)}`;
    
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: '', password: ''});
    const [isUserCreated, setIsUserCreated] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (event.target.value === '') {
            setErrors(prevErrors => ({...prevErrors, email: 'Email is required'}));
        } else {
            setErrors(prevErrors => ({...prevErrors, email: ''}));
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8) {
            setErrors(prevErrors => ({...prevErrors, password: 'Password must be at least 8 characters'}));
        } else {
            setErrors(prevErrors => ({...prevErrors, password: ''}));
        }
    };

    // hand submit function
    const handleSubmit = (event) => {
        event.preventDefault();
        if (email !== '' && password.length >= 8) {
          axios({
            url: 'http://localhost:3001/graphql', //! change to absolute path of production server
            method: 'post',
            data: {
              query: `
              query Query($email: String!) {
                userExists(email: $email) {
                  email
                }
              }
            `,
            variables: {
              email: email
            }
            }
          })
          .then(response => {
            if (response && response.data && response.data.data && response.data.data.userExists) {
              setErrors(prevErrors => ({...prevErrors, email: 'email already exists'}));
            } else {
              console.log('unique email entered, attempting to create user...')
              
              // create user in mongo db
              return axios({
                url: 'http://localhost:3001/graphql', //! change to absolute path of production server
                method: 'post',
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
                    password: password
                  }
                }
              })
            }
          })
          .then(response => {
            if (response && response.data) {
              if (response.data.data && response.data.data.createUser) {
                console.log("User created!");
                setIsUserCreated(true);
                // rest of the success logic...
              } else if (response.data.errors) {
                console.error("Error creating user:", response.data.errors);
              }
            }
          })
          .catch(error => {
            console.error("Error creating user:", JSON.stringify(response.data.errors, null, 2));
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
        }
      };
      

    return (
      <form>
      {!isUserCreated ? (
        <>
          <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
          <div>{errors.email}</div>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
          <div>{errors.password}</div>
          {/* submit button */}
          <button type="submit" onClick={handleSubmit}>Sign up</button>
        </>
      ) : (
        <h3>Your account has been created and you are signed in, Welcome to Vibe Check!</h3>
      )}
    </form>
    );
};

export default Signup;