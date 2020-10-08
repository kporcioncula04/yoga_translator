import React, { Component } from 'react'
import SingleItem from './SingleItem'
import {Link, Route} from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    // backgroundColor: "red",
    // border: '5px solid black',
    // width: '30%',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const API = 'https://sheets.googleapis.com/v4/spreadsheets/1kZy1pSlKqZ8mN8pEMPQo9pNibi-9c2DtKGBseVESbHA/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaSyDEnWMc6pcxAl_vdYYwOmTcQaGC0LSg-_k'

class Sample extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount(){
    fetch(API).then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;

      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }
        this.setState({ items: rows });
    });
  }


  render() {
    const {classes} = this.props

    var matchIt = this.props.match

    const listItems = this.state.items.map((item) =>
    <React.Fragment>
        <Grid item xs={2} className={classes.root}>
          <Paper className={classes.paper}>
            <img src={item.yogaIcon} alt={item.englishName}/>
            </Paper>

            <p>
              <Button type='button' color='primary'>
                <Link to={`${matchIt.url}/${item.id}`}>{item.englishName}</Link>
              </Button>
            </p>
          </Grid>
      </React.Fragment>
    );

    return (
    <div>
      <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2}>
          {listItems}
        </Grid>
      </Grid>
    </div>


    <Route
      exact path={`${matchIt.url}/:id`}
      render={(props) => <SingleItem data={this.state.items} {...props} />}
      />

    <Route
        exact
        path={matchIt.url}
        render={() => <div>Please select a pose.</div>}
      />
    </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Sample)
