const Header = ({currentPage, handlePageChange}) => {

  return (

    <header>
      <div>
       <a href="#browse"
       onClick={() => handlePageChange('Browse')}
       className={currentPage === 'Browse'? 'nav-link active' : 'nav-link'}>
       Browse</a>

       <a href="#Playlists"
       onClick={() => handlePageChange('Playlists')}
       className={currentPage === 'Playlists'? 'nav-link active' : 'nav-link'}>
       Playlists</a>

       <a href="#saved"
       onClick={() => handlePageChange('Saved')}
       className={currentPage === 'Saved'? 'nav-link active' : 'nav-link'}>
       Saved</a>

       <a href="#sign-up"
       onClick={() => handlePageChange('Signup')}
       className={currentPage === 'Signup'? 'nav-link active' : 'nav-link'}>
       Signup</a>
      </div>
    </header>
  );
}

export default Header;
