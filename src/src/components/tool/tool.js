import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Tool extends React.Component {

  render() {
    return (
      <Card className="card">
        <CardContent>
          <img src={this.props.value.iconUrl} width="50"/>          
          <Typography className="title" color="textSecondary" gutterBottom>
            Package name: {this.props.value.id}
          </Typography>
          <Typography className="title" color="textSecondary" gutterBottom>
            Summary: {this.props.value.summary}
          </Typography>
          <Typography className="title" color="textSecondary" gutterBottom>
            Description: {this.props.value.description}
          </Typography>
        </CardContent>
        <CardActions>
          <a href={"https://nuget.org/packages/" + this.props.value.id} target="_blank">View on NuGet</a>
        </CardActions>
      </Card>
    );
  }
}
