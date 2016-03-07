# WRNC - WordPress React Notifications Client
A react component serving as a client for the WordPress.com notifications API

This project aims to create a fully-usable notifications client for the WordPress.com API as a fully-contained React component, embeddable inside other React projects or standalone without them.

## Getting started

After cloning this repository, create a `config.js` file in the project root to hold your oAuth Token from WordPress.com. You will need to [create an application](https://developer.wordpress.com/apps/) on the WordPress.com developer dashboard if you haven't done so already. If you choose a host from anything other than `notifications.dev:8888` you will need to modify the run script in `package.json`.

```js
// config.js
export const oAuthToken = 'Your_Token_Here'
```

After this configuration, simply run `rpm run-script run` and navigate to the appropriate location in your browser.
