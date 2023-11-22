import axios from "axios";
import { useEffect, useState } from "react";
import { Credentials } from "./Credentials";

const Header = () => {
  const clientId = "b59cdff7fd2249bc9e1c068238e2f281"; // Replace with your client ID
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const spotify = Credentials(); 
  const [token, setToken] = useState('');  
  const [user, setUser] = useState([]);
  useEffect (() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
      console.log(tokenResponse.data.access_token);

      // axios('https://api.spotify.com/v1/me', {
      //   method: 'GET',
      //   headers: { 
      //     'Content-Type' : 'application/x-www-form-urlencoded',
      //     'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      //   }
      // })
      // .then(userResponse => {
      //   setUser(userResponse.data);
      //   console.log(userResponse.data);
      // });
      
    });

  }, [spotify.ClientId, spotify.ClientSecret]);   

  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } 

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append(
      "scope",
      "user-read-private user-read-email playlist-modify-public playlist-modify-private"
    );
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // })

  // async function getAccessToken(clientId, code) {
  //   const verifier = localStorage.getItem("verifier");

  //   const params = new URLSearchParams();
  //   params.append("client_id", clientId);
  //   params.append("grant_type", "authorization_code");
  //   params.append("code", code);
  //   params.append("redirect_uri", "http://localhost:5173/callback");
  //   params.append("code_verifier", verifier);

  //   axios("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: params,
  //   }).then((response) => {
  //     console.log("hit");
  //     const access_token = response;
  //     return access_token;
  //   });
  // }

  // async function fetchProfile(token) {
  //   axios("https://api.spotify.com/v1/me", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   }).then((response) => {
  //     console.log("fetch profile response", response);
  //     return response;
  //   });
  // }

  // function populateUI(profile) {
    // document.getElementById("displayName").innerText = profile.display_name;
    // if (profile.images[0]) {
    //     const profileImage = new Image(200, 200);
    //     profileImage.src = profile.images[0].url;
    //     document.getElementById("avatar").appendChild(profileImage);
    //     document.getElementById("imgUrl").innerText = profile.images[0].url;
    // }
    // document.getElementById("id").innerText = profile.id;
    // document.getElementById("email").innerText = profile.email;
    // document.getElementById("uri").innerText = profile.uri;
    // document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    // document.getElementById("url").innerText = profile.href;
    // document.getElementById("url").setAttribute("href", profile.href);
  //   console.log(profile);
  // }
  return (
    <header className="container">
      <li>
        Profile Image: <img></img>
      </li>
      <li>
        User ID: <span id="id"></span>
      </li>
    </header>
  );
};

export default Header;
