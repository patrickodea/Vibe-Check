import axios from "axios";
import { Credentials } from "../Credentials";
import { useState, useEffect } from "react";
import BrowseListbox from "../components/BrowseListbox";
import BrowseDetail from "../components/NewReleaseDetail";

const Browse = () => {

  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [token, setToken] = useState();


  useEffect(() => {
    // Popular playlists
    const spotify = Credentials();  

    axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 
          'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
    })
    .then(tokenResponse => {   
      setToken(tokenResponse.data.access_token);
      let spotifyToken = tokenResponse.data.access_token;
      
      axios("https://api.spotify.com/v1/browse/featured-playlists?limit=10", {
        method: "GET",
        headers: { Authorization: "Bearer " + spotifyToken },
      })
      .then((playlistResponse) => {

        setPlaylists(playlistResponse.data.playlists.items)

        // Gets new releases
        axios("https://api.spotify.com/v1/browse/new-releases?limit=15", {
          method: "GET",
          headers: { Authorization: "Bearer " + spotifyToken },
        }).then((response) => {
          setNewReleases(response.data.albums.items);
          console.log(response);
        });
      })
    })
      .catch((error) => {
        console.log(error);
      });
    }, []);

  return (
    <div>
      <div>
        <BrowseListbox playlists={playlists} newReleases={newReleases} token={token}/>
      </div>
    </div>
  );
};

export default Browse;
