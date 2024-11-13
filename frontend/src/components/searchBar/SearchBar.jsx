import { Search } from "@mui/icons-material";
import "./searchBar.scss"

const SearchBar = ({ setTerm }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
  };
  
  return (
    <div className="searchBar">
      <input type="search" name="videoname" onChange={handleChange}></input>
      <Search className="searchIcon"/>
    </div>
  )
}

export default SearchBar;