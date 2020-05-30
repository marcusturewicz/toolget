import React from 'react';
import Tool from '../tool/tool'
import { FormControl, LinearProgress, Button, Grid, CircularProgress, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import queryString from 'query-string'

export default class Search extends React.Component {



  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    if ('q' in qs) {
      this.setState({ search: qs.q }, () => this.searchAndUpdateHistory());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const qs = queryString.parse(nextProps.location.search);
      if ('q' in qs) {
        this.setState({ search: qs.q }, () => this.search());
      }
    }
  }

  searchAndUpdateHistory() {
    this.search();
    this.props.history.push({ search: `?q=${this.state.search}`, pathname: '/tools' });
  }

  render() {

    const onLoadMoreClicked = () => {
      this.setState({ page: this.state.page + 1, newSearch: false }, () => this.search());
    }

    return (
      <div>
        <FormControl id="search-form" fullWidth>
        </FormControl>
        {this.state.loading && <LinearProgress />}
        {this.state.tools.length > 0 &&
          <div>
            <br />
            {this.state.tools.map(data => <div><Tool key={data.id} value={data}></Tool><br /></div>)}
          </div>}
        <p hidden={!(this.state.hasSearched && this.state.tools.length === 0)}>No tools could be found.</p>
        {
          this.state.tools.length > 0 &&
          <div >
            <Grid container justify="center">
              {!this.state.loading && <Button disabled={!this.state.hasMoreResults} variant="contained" color="primary" onClick={onLoadMoreClicked}>Load more...</Button>}
              {this.state.loading && <CircularProgress />}
            </Grid>
            <p hidden={this.state.hasMoreResults}>No more results available.</p>
            <br />
          </div>
        }
      </div>
    )
  }
}
