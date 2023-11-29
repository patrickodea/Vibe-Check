import axios from "axios";
import { useState, useEffect } from "react";

const Playlists = (token) => {
  const [playlists, setPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  const spotifyToken = token.token;

  useEffect(() => {
    // Popular playlists
    axios("https://api.spotify.com/v1/browse/featured-playlists?limit=5", {
      method: "GET",
      headers: { Authorization: "Bearer " + spotifyToken },
    })
      .then((response) => {
        setPlaylists(response.data.playlists.items);
        // Gets new releases
        axios("https://api.spotify.com/v1/browse/new-releases?limit=5", {
          method: "GET",
          headers: { Authorization: "Bearer " + spotifyToken },
        }).then((response) => {
          setNewReleases(response.data.albums.items);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      <h3>Featured Playlists</h3>
      {playlists.map((playlist) => (
        <button key={playlist.id} id={playlist.id}>
          {playlist.name}
        </button>
      ))}

      <h3>New Releases</h3>
      {newReleases.map((newRelease) => (
        <button key={newRelease.id} id={newRelease.id}>
          {newRelease.name}
        </button>
      ))}
    </div>
  );
};

export default Playlists;
