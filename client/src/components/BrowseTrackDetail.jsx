const BrowseTrackDetail = (tracks) => {
  // const saveButton = (e) => {
  //   e.preventDefault()
  //   console.log(this.tracks.name)
  // }

  return (
    <aside className="grid grid-cols-3">
      {Object.keys(tracks).map((key) => {
        return (
          <div key={key}>
            <div className="flex justify-center items-center">
            <img
              style={{ width: "35%", height: "35%" }}
              src={tracks[key].track.album.images[0].url}
              alt={tracks[key].track.album.name}
              />
              </div>
            <h3>{tracks[key].track.name}</h3>
            <p>{tracks[key].track.artists[0].name}</p>
            <button
              onClick={() => {
                console.log(tracks[key].track.name);
              }}
              className="hover:bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-indigo-500 to-90% text-white"
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
