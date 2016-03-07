# WRNC - WordPress React Notifications Client
A react component serving as a client for the WordPress.com notifications API

This project aims to create a fully-usable notifications client for the WordPress.com API as a fully-contained React component, embeddable inside other React projects or standalone without them.

## Getting started

### Running Locally

After cloning this repository, create a `config.js` file in the project root to hold your oAuth Token from WordPress.com. You will need to [create an application](https://developer.wordpress.com/apps/) on the WordPress.com developer dashboard if you haven't done so already. If you choose a host from anything other than `notifications.dev:8888` you will need to modify the run script in `package.json`.

```js
// config.js
export const oAuthToken = 'Your_Token_Here'
```

After this configuration, simply run `rpm run-script run` and navigate to the appropriate location in your browser.

#### Known Issues

 - If you get an error concerning `fs` being missing, you will need to manually install it for `wpcom` with the following command sequence from your project root `cd node_modules/wpcom/; npm install fs; cd ../../`
 - If you get an error concerning `react-router`, you will need to remove it and then reinstall it. This is probably a result of the build-order when `npm install` runs. `rm -rf node_modules/react-router; npm install react-router`

### Importing into another app

Even easier, in standalone mode this app handles its own navigation without URL routing. Just include it and produce it in any React `render` function.

```
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
