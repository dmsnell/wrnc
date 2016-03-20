# WRNC - WordPress React Notifications Client
A react component serving as a client for the WordPress.com notifications API

This project aims to create a fully-usable notifications client for the WordPress.com API as a fully-contained React component, embeddable inside other React projects or standalone without them.

## Getting started

### Running Locally

This app is designed to run with a default WordPress.com authentication process, but you are free to modify it to run on your own if you have [created an application](https://developer.wordpress.com/apps/) on the WordPress.com developer dashboard. If you choose a host from anything other than `notifications.dev:8888` you will need to modify the run script in `package.json`.

Make sure that you have added the appropriate entry in your `hosts` file. For example, if running on OSX and using the default `notifications.dev:8888` address, add the following line to `/etc/hosts`

```
127.0.0.1	notifications.dev
```

After cloning and verifying the settings, run `rpm run-script run` and navigate to the appropriate location in your browser. The development server should redirect to a login page on WordPress.com and then return to the notifications app after authenticating.

#### Known Issues

 - If you get an error concerning `fs` being missing, you will need to manually install it for `wpcom` with the following command sequence from your project root `cd node_modules/wpcom/; npm install fs; cd ../../`
 - If you get an error concerning `react-router`, you will need to remove it and then reinstall it. This is probably a result of the build-order when `npm install` runs. `rm -rf node_modules/react-router; npm install react-router`

### Importing into another app

Even easier, in standalone mode this app handles its own navigation without URL routing. Just include it and produce it in any React `render` function.

```js
import NotificationsApp from 'wrnc';
import { getToken } from './auth';

export default React.createClass( {
  render() {
    return (
      <div>
        <h1>Notifications!</h1>
        <NotificationsApp oAuthToken={ getToken() } />
      </div>
    );
  }
} );
```
