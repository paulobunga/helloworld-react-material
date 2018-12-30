import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Switch, Route, Redirect, Link, withRouter,
} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  SwipeableDrawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Icon,
} from '@material-ui/core';

import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import HomeRouter from '../Home';

import { $logout } from '../Auth/state';

const withStore = connect(
  (state) => ({
    user: state.Auth.user,
  }),
  (dispatch) => ({
    logout() {
      dispatch($logout())
        .then(() => console.info('Goodbye!'))
        .catch((error) => console.log('oops!', error.message));

      // dispatch($logout())
      //   .then(() => dispatch(Activity.$toast('success', 'Goodbye!')))
      //   .catch((error) => dispatch(Activity.$toast('failure', error.message)));
    },
  }),
);

const Wrapper = (C) => withRouter(withStore(C));

const drawerWidth = 300;

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const styles = {
  swipeableDrawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -24,
    marginRight: 16,
  },
};

class Session extends Component {
  state = {
    swipeableDrawerCallapsed: false,
    navigationMenuItems: [
      {
        title: 'Home',
        icon: 'home',
        route: '/home',
      },
      {
        title: 'Profile',
        icon: 'account_circle',
        route: '/profile',
      },
    ],
  };

  toggleDrawer = (open) => () => {
    this.setState({
      swipeableDrawerCallapsed: open,
    });
  };

  render() {
    const { swipeableDrawerCallapsed, navigationMenuItems } = this.state;
    const { user, logout } = this.props;

    return (
      <div className="-x-fit">
        <AppBar position="static">
          <Toolbar>
            <IconButton style={styles.menuButton} color="inherit" onClick={this.toggleDrawer(true)}>
              <Icon>menu</Icon>
            </IconButton>

            <Typography variant="title" color="inherit">
              Home
            </Typography>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={swipeableDrawerCallapsed}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          style={styles.swipeableDrawerPaper}
        >
          <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
            <ListItem style={styles.listItem}>
              <Avatar alt={user.name} src={user.picture} />
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>

            <Divider />

            {navigationMenuItems.map((navigationMenuItem) => (
              <Link to={navigationMenuItem.route} key={navigationMenuItem.title}>
                <ListItem dense button i-key={navigationMenuItem.title}>
                  <ListItemIcon>
                    <Icon>{navigationMenuItem.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={navigationMenuItem.title} />
                </ListItem>
              </Link>
            ))}

            <ListItem dense button onClick={() => logout()}>
              <ListItemIcon>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </div>
        </SwipeableDrawer>

        <main className="-fill-height -x-relative">
          <Switch>
            <Route path="/home" component={HomeRouter} />
            <Route exact path="/profile" component={ProfileView} />
            <Redirect exact from="/*" to="/home" />
          </Switch>
        </main>
      </div>
    );
  }
}

Session.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Wrapper(Session);
