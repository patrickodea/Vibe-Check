const Detail = ({album, artists, name}) => {

    
    return (
        <div >
            <div className="flex justify-center items-center">
                <img style={{width: '50%', height: '50%'}}
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div >
                <label htmlFor={name} className="flex justify-center items-center">
                    {name}
                </label>
            </div>
            <div>
                <label htmlFor={artists[0].name} className="flex justify-center items-center">
                    {artists[0].name}
                </label>
            </div>
        </div>
    );
}

export default Detail;