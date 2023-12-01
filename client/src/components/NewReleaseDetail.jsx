const BrowseDetail = (albumData) => {
  // console.log(albumData);

  return (
    <div>
        {albumData.images ?
        <div>
        <img
          style={{ width: "30%", height: "30%" }}
          src={albumData.images[0].url}
          alt={albumData.name}
        />
        <h3>{albumData.name}</h3>
        <h4>{albumData.album_type}</h4>
        <p>{albumData.release_date}</p>
      </div> 
      : null}
    </div>
  );
};

export default BrowseDetail;
