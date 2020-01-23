import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Tool from '../tool/tool'

export default class ToolList extends React.Component {

    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.getTools();
    }

    render() {
        if (!this.state.tools)
            return (<p>Loading data</p>)
        return (
            <div>
                {this.state.tools.map(data => <Tool value={data}></Tool>)}
            </div>
        );
    }

    getTools() {
        axios.get('https://azuresearch-usnc.nuget.org/query?packageType=DotnetTool&skip=0&take=20').then(response => {
            this.setState({ tools: response.data.data });
        });
    }
}
