# passport-smartthings
A Passport.js OAuth 2.0 strategy for Smart Things.

[Passport](http://passportjs.org/) strategy for authenticating with [Smart Things](http://www.smartthings.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Smart Things in your Node.js applications.
By plugging into Passport, Smart Things authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-smartthings

## Usage

#### Configure Strategy

    var SmartThingsStrategy = require('passport-smartthings').Strategy

    passport.use(new SmartThingsStrategy({
        clientID: SMARTTHINGS_CLIENT_ID,
        clientSecret: SMARTTHINGS_CLIENT_SECRET
    }));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'smartthings'` strategy, to
authenticate requests.  

Note Smart Things requires the presence of a scope permission such as "app".

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get(
        '/auth/smartthings', 
        passport.authenticate('smartthings', { scope: ['app'] })
    );

    app.get('/auth/smartthings/callback',
        passport.authenticate('smartthings', { scope: ['app'] }),
        function(req, res) { 
            res.redirect('/'); 
        }
    );

#### Extended Permissions

If you need extended permissions from the user, the permissions can be requested
via the `scope` option to `passport.authenticate()`.

For example, this authorization requests permission to the app tied to the clientID:

    app.get(
        '/auth/smartthings', 
        passport.authenticate('smartthings', { scope: ['app'] })
    );

