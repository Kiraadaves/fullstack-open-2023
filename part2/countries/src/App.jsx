import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        
      </div>
      {filteredData.length > 10 ? <div>Too many matches</div> : <div>{filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value, index) => {
            return (
                <p key={index}>{value.title} </p>
              
            );
          })}
        </div>
      )}</div>}
    </div>
  );
}


  

export default App;
