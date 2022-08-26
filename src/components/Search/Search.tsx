import Reac from "react";
import Input from "@material-ui/core/Input";
import SearchIcon from "@mui/icons-material/Search";
import "./search.scss";

/**
 * Search Component
 * Component to made a Search
 * @param {} param0
 * @returns The search return by Currency and continent
 */
const Search = ({ ...props }) => {
    const { handleChange, search } = props;

    return (
        <div className="search-box">
            <div className="search-box__wrapper">
                <Input placeholder="Search" value={search}
                    onChange={handleChange} disableUnderline={true} />
                <SearchIcon />
            </div>
        </div>
    );
};

export default Search;
