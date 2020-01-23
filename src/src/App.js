import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import ToolList from './components/tool-list/tool-list'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <ToolList></ToolList>
      </Container>
    </React.Fragment>
  );
}

export default App;