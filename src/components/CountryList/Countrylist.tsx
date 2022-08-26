import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
} from "@material-ui/core/styles"
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import LastPageIcon from "@material-ui/icons/LastPage"
import CountryCard from "../CountryCard/CountryCard";
import _ from "lodash";
import "./countrylist.scss";

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
)
interface TablePaginationActionsProps {
    count: number
    page: number
    rowsPerPage: number
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void
}


function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1()
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    )
}

/**
 * Country List Component
 * @param {data} param0 Data of countries to list
 * @returns the templeathe with countries cards
 */

const Countrylist = (data: any) => {
    // sorted by asc default
    const [sortBy, setSortBy] = useState(Boolean("asc"));
    const [filteredCountries, setFilteredCountries] = useState([]);
    const { data: dataToSort } = data;
    const { countries } = dataToSort;

    //pagination related
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [paginatedCountries, setPaginatedCountries] = React.useState(countries);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    //updating data according to pagination
    React.useEffect(() => {
        const paginedC = filteredCountries.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ) as []
        setPaginatedCountries(paginedC)
    }, [page, rowsPerPage, filteredCountries])

    useEffect(() => {
        const sortedData = _.orderBy(countries, ["name"], [sortBy]) as [];
        setFilteredCountries(sortedData);
    }, [sortBy, countries]);

    const handleSorting = (e: any) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="home__countries">
            {/* sorting */}
            <div className="country-list__sort">
                <p>Sorting</p>
                <Select
                    labelId="sort-country-select-label"
                    id="sort-country"
                    disableUnderline={true}
                    defaultValue="asc"
                    onChange={handleSorting}
                >
                    <MenuItem value="asc">Asc</MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                </Select>
            </div>
            {/* country lists */}
            <div className="country-list__cards">
                {paginatedCountries.map((country: any) => (
                    <CountryCard country={country} key={country.code} />
                ))}
            </div>
            {/* pagination */}
            <div className="country-list__pagination">
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                    colSpan={3}
                    count={filteredCountries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </div>
        </div>
    );
};

export default Countrylist;
