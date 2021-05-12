import React, { useState } from 'react';
import './SearchBar.css';


//Props toevoegen in ()-->Dit is destructure?-->Ja want je gebruikt nu setLocationHandler in de functies
function SearchBar({ setLocationHandler }) {
    const [query, setQuery] = useState('');

    //eventhandler functie genaamd handleClick
    function handleClick() {
        setLocationHandler(query);
    }

    //Zorg ervoor dat deze functie wordt aangeroepen als er op de "zoek" knop geklikt wordt

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setLocationHandler(query);
        }
    }

    return (
        <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          onKeyDown={keyPressCheck}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek een stad in Nederland"
      />

      <button
          type="button"
          onClick={handleClick}
      >
        Zoek
      </button>
    </span>
    );
};

export default SearchBar;
