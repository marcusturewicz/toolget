import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Tool from '../tool/tool'
import TextField from '@material-ui/core/TextField'
import { FormControl, InputLabel, Input, InputAdornment, LinearProgress } from '@material-ui/core';

export default class Search extends React.Component {

    constructor() {
        super()
        this.state = {
            hasSearched: false,
            hasData: false,
            tools: undefined,
            loading: false
        }
    }

    render() {
        const handleKeyPress = async (event) => {
            if (event.key === 'Enter') {
                this.setState( { loading: true});
                const q = event.target.value;
                axios.get('https://azuresearch-usnc.nuget.org/query?q=' + q + '&packageType=DotnetTool&skip=0&take=20').then(response => {
                    this.setState({ hasSearched: true })
                    if (response.data.data.length > 0)
                        this.setState({ hasData: true })
                    this.setState({ tools: response.data.data });
                    this.setState( { loading: false});
                });
            }
        }
        if (this.state.loading)
        {
            return (
                <div>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="search-bar">.NET global tool</InputLabel>
                        <Input
                            id="search-bar"
                            onKeyDown={handleKeyPress}
                        />
                    </FormControl>
                    <LinearProgress />
                </div>
            )            
        }        
        if (this.state.tools) {
            if (this.state.tools.length > 0) {
                return (
                    <div>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="search-bar">.NET global tool</InputLabel>
                            <Input
                                id="search-bar"
                                onKeyDown={handleKeyPress}
                            />
                        </FormControl>
                        <div>
                            <br />
                            {this.state.tools.map(data => <div><Tool key={data.id} value={data}></Tool><br /></div>)}
                        </div>
                    </div>
                )
            }
            return (
                <div>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="search-bar">.NET global tool</InputLabel>
                        <Input
                            id="search-bar"
                            onKeyDown={handleKeyPress}
                        />
                    </FormControl>
                    <p>0 results could be found.</p>
                </div>
            )
        }
        return (
            <div>
                <FormControl fullWidth>
                    <InputLabel htmlFor="search-bar">.NET global tool</InputLabel>
                    <Input
                        id="search-bar"
                        onKeyDown={handleKeyPress}
                    />
                </FormControl>
            </div>
        )
    }
}
