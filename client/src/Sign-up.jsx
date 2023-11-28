import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: '', password: ''});

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
            url: 'http://localhost:4000/graphql', //! change to absolute path of production server
            method: 'post',
            data: {
              query: `
                query {
                  userExists(email: "${email}")
                }
              `
            }
          })
          .then(response => {
            if (response.data.data.userExists) {
              setErrors(prevErrors => ({...prevErrors, email: 'email already exists'}));
            } else {
              console.log('unique email entered')
              
              // create user in mongo db
              axios({
                url: 'http://localhost:4000/graphql', //! change to absolute path of production server
                method: 'post',
                data: {
                  query: `
                    mutation {
                      createUser(email: "${email}", password: "${password}") {
                        email
                      }
                    }
                  `
                }
              })

              //todo: show success message to user
                
              // todo: start the Spotify authorization sequence with a button click

              //todo: Store the refresh token in your MongoDB database and associate it with the user's account in your app. This links the two accounts together.

              //todo: call Login function after successful authorization
              
            }
          })
          .catch(error => {
            console.error('Error checking email', error);
            // Handle the error appropriately here
          });
        }
      };
      

    return (
        <form>
            <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
            <div>{errors.email}</div>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            <div>{errors.password}</div>
            {/* submit button */}
            <button type="submit" onClick={handleSubmit}>Sign up</button>
        </form>
    );
};

export default Signup;