import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FeedbackIcon from '@material-ui/icons/Feedback';
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from '@material-ui/icons/Description';
import MoreIcon from "@material-ui/icons/MoreVert";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.contrastText, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.contrastText, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const NavBarTemplate = (searchData) => {
  const classes = useStyles();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="privacy policy link" color="inherit"
          href="https://github.com/marcusturewicz/toolget/blob/master/PRIVACY.md" target="_blank" rel="noopener noreferrer">
          <DescriptionIcon />
        </IconButton>
        <p>Privacy Policy</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="feedback link" color="inherit"
          href="https://github.com/marcusturewicz/toolget/issues/new/choose" target="_blank" rel="noopener noreferrer">
          <FeedbackIcon />
        </IconButton>
        <p>Feedback</p>
      </MenuItem>
    </Menu>
  );

return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap >
              ToolGet
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search for .NET tools..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                id="search-input"
                // TODO: put state here
                value=""
                onChange={updateInputValue}
                variant="outlined"
                label="Search for .NET Tools..."
                placeholder="e.g. formatting tool"
                onKeyUp={handleKeyPress}
                autoFocus
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="privacy policy link" color="inherit"
                href="https://github.com/marcusturewicz/toolget/blob/master/PRIVACY.md" target="_blank" rel="noopener noreferrer">
                <DescriptionIcon />
              </IconButton>
              <IconButton aria-label="feedback link" color="inherit"
                href="https://github.com/marcusturewicz/toolget/issues/new/choose" target="_blank" rel="noopener noreferrer">
                <FeedbackIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      tools: [],
      loading: false,
      hasSearched: false,
      hasMoreResults: false,
      page: 0,
      pageSize: 20,
      search: '',
      newSearch: true,
    }
  }

  searchNuget() {
    this.setState({ loading: true }, () => {
      const pageSkip = searchData.page * searchData.pageSize;
      fetch(`https://azuresearch-usnc.nuget.org/query?q=${searchString}&packageType=DotnetTool&skip=${pageSkip}&take=${pageSize}`).then(resp => {
        resp.json().then(response => {
          searchData.tools = searchData.newSearch ? response.data : searchData.tools.concat(response.data);
          searchData.loading = false;
          searchData.hasSearched = true;
          searchData.hasMoreResults = response.totalHits > tools.length;
          return searchData;
        })
      });
    });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({ page: 0, newSearch: true }, () => this.searchAndUpdateHistory());
    }
  }
  handleSearchClicked() {
    this.setState({ page: 0, newSearch: true }, () => this.searchAndUpdateHistory());
  }
  updateInputValue(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    return (
      <NavBarTemplate
        tools={this.state.tools}
        loading={this.state.loading}
      />
    )
  }
}
