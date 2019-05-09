import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import ProfileView from './ProfileView';
import HomeRouter from '../Home';

import { $logout } from '../Auth/state';

const withStore = connect((state) => ({
  user: state.Auth.user,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  user: PropTypes.User.isRequired,
};

const Wrapper = (C) => withRouter(withStore(C));

const styles = {
  menuButton: {
    marginLeft: -24,
    marginRight: 16,
  },
};

class Session extends Component {
  state = {
    navigationMenuVisible: false,
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

  toggleNavigationMenuVisibility() {
    this.setState((state) => ({
      navigationMenuVisible: !state.navigationMenuVisible,
    }));
  }

  logout() {
    const { dispatch } = this.props;

    dispatch($logout())
      .then(() => Dialog.toast(Dialog.SUCCESS, 'Goodbye!'))
      .catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  render() {
    const { navigationMenuVisible, navigationMenuItems } = this.state;

    const { user } = this.props;

    return (
      <div className="-x-fit">
        <AppBar position="static">
          <Toolbar>
            <IconButton style={styles.menuButton} color="inherit" onClick={() => this.toggleNavigationMenuVisibility()}>
              <Icon>menu</Icon>
            </IconButton>

            <Typography variant="h6" color="inherit">
              Home
            </Typography>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={navigationMenuVisible}
          onClose={() => this.toggleNavigationMenuVisibility()}
          onOpen={() => this.toggleNavigationMenuVisibility()}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleNavigationMenuVisibility()}
            onKeyDown={() => this.toggleNavigationMenuVisibility()}
          >
            <ListItem style={styles.listItem}>
              <Avatar alt={user.name} src={user.picture} />
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>

            <Divider />

            {navigationMenuItems.map((navigationMenuItem) => (
              <Link to={navigationMenuItem.route} key={navigationMenuItem.route}>
                <ListItem dense button selected={navigationMenuItem.route === this.props.location.pathname}>
                  <ListItemIcon>
                    <Icon>{navigationMenuItem.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={navigationMenuItem.title} />
                </ListItem>
              </Link>
            ))}

            <ListItem dense button onClick={() => this.logout()}>
              <ListItemIcon>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </div>
        </SwipeableDrawer>

        <main className="-x-relative">
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

Session.propTypes = propTypes;

export default Wrapper(Session);
