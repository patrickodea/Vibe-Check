const BrowseTrackDetail = (tracks) => {
  // const saveButton = (e) => {
  //   e.preventDefault()
  //   console.log(this.tracks.name)
  // }

  return (
    <aside>
      {Object.keys(tracks).map((key) => {
        return (
          <div key={key}>
            <img
              style={{ width: "20%", height: "20%" }}
              src={tracks[key].track.album.images[0].url}
              alt={tracks[key].track.album.name}
            />
            <h3>{tracks[key].track.name}</h3>
            <p>{tracks[key].track.artists[0].name}</p>
            <button
              onClick={() => {
                console.log(tracks[key].track.name);
              }}
            >
              Save
            </button>
          </div>
        );
      })}
    </aside>
  );
};

export default BrowseTrackDetail;
