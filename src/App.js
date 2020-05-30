import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Search from './components/search/search'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './components/not-found/not-found';
import NavBar from './components/navbar/navbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#705fff',
      main: '#1432f5',
      dark: '#0003c1',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffbfff',
      main: '#f18df4',
      dark: '#bd5cc1',
      contrastText: '#000'
    }
  }
});
theme = responsiveFontSizes(theme);

export default function Album() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <NavBar />
        </div>
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Router>
              <Switch>
                <Route exact path="/" />
                {/* <Route exact path="/" component={Search} /> */}
                <Route path="/tools" component={Search} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </Container>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
