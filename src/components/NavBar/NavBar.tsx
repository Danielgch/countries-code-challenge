import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../Search/Search";
import "./navbar.scss";

/**
 * NavBar Component
 * Component  where is located the logo, and search functionality
 * @returns jsx whith navbar
 */
const NavBar = ({  ...props }) => {
    const { handleChange, search } = props;


    return (
        <div className="navbar">
            <div className="navbar__content container">
                {/* Logo */}
                <div className="navbar__content-left">
                    <span>COUNTRY APP</span>
                </div>
                {/* Search */}
                <div className="navbar__content-search">
                    <Search handleChange={handleChange} search={search} />
                </div>
                {/* right side items */}
                <div className="navbar__content-right">
                    <div className="navbar__content-other">
                        <PublicIcon />
                    </div>
                    <MenuIcon />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
