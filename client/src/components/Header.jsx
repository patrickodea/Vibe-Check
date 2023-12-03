const Header = ({currentPage, handlePageChange}) => {

  return (

    <header className="header text-xl w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div>
       <a href="#sign-up"
       onClick={() => handlePageChange('Signup')}
       className={currentPage === 'Signup'? 'nav-link active' : 'nav-link'}>
       Signup</a>

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

       <a href="#donations"
       onClick={() => handlePageChange('Donations')}
       className={currentPage === 'Donations'? 'nav-link active' : 'nav-link'}>
       Donations</a>

      </div>
    </header>
  );
}

export default Header;
