import { useState } from 'react'
import axios from 'axios';
import BrowseTrackDetail from './BrowseTrackDetail';
import NewReleaseDetail from './NewReleaseDetail';

const BrowseListbox = ({playlists, newReleases, token}) => {
    // const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
    const [tracks, setTracks] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    // const [albumTracks, setAlbumTracks] = useState([]);

    const playlistClicked = (e) => {
      e.preventDefault();
      console.log(e.target.id);

         axios(`https:api.spotify.com/v1/playlists/${e.target.id}/tracks?limit=10`, {
           method: 'GET',
           headers: {
             'Authorization' : 'Bearer ' + token
           }
         })
         .then(tracksResponse => {
        //    console.log('TRACKS: ', tracksResponse);
           setTracks(tracksResponse.data.items);
         });

    };

    const newReleasesClicked = (e) => {
        e.preventDefault();
        console.log(e.target.id);

        axios(`https:api.spotify.com/v1/albums/${e.target.id}?limit=10`, {
            method: 'GET',
            headers: {
              'Authorization' : 'Bearer ' + token
            }
          })
          .then(albumResponse => {
            setAlbumData(albumResponse.data);
          });


      };
    

  return (
    <div>
        <div>

      <h3>Featured Playlists</h3>
      {Array.isArray(playlists) ?
        playlists.map((playlist, idx) => (
            <button key={idx} id={playlist.id} onClick={playlistClicked}>
          {playlist.name}
        </button>
      )) : null}
      { tracks && <BrowseTrackDetail {...tracks} /> }
</div>
      <h3>New Releases</h3>
      {Array.isArray(newReleases) ?
      newReleases.map((newRelease, idx) => (
        <button key={idx} id={newRelease.id} onClick={newReleasesClicked}>
          {newRelease.name}
        </button>
      )) : null}
      {albumData && <NewReleaseDetail {...albumData} /> }

    </div>
  );
};

export default BrowseListbox;
