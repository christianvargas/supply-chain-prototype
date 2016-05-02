'use strict';

module.exports = (function() {
  var $ = require('jquery'),
    jqueryCookie = require('jquery.cookie'),
    Auth;

  /********** COOKIES **********/
  return Auth = (function() {
    Auth.prototype.ACCESS_TOKEN_COOKIE_NAME = 'auth.access_token';
    Auth.prototype.REFRESH_TOKEN_COOKIE_NAME = 'auth.refresh_token';


    /********** AUTH OBJECT **********/
    function Auth(tokenUrl, clientId, clientSecret, refreshTokenTtl) {
      if (refreshTokenTtl == null) {
        refreshTokenTtl = 1209600;
      }
      this.tokenUrl = tokenUrl;
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.refreshTokenTtl = refreshTokenTtl;
    }


    /********** GET ACCESS TOKEN **********/
    Auth.prototype.getAccessToken = function() {
      var accessToken;
      accessToken = $.cookie(this.ACCESS_TOKEN_COOKIE_NAME);
      if (accessToken != null) {
        return accessToken;
      } else {
        return null;
      }
    };


    /********** GET REFRESH TOKEN **********/
    Auth.prototype.getRefreshToken = function() {
      var refreshToken;
      refreshToken = $.cookie(this.REFRESH_TOKEN_COOKIE_NAME);
      if (refreshToken != null) {
        return refreshToken;
      } else {
        return null;
      }
    };


    /*
      Logs in the user by fetching an access token.

      @param username The username
      @param password The password
      @param success  A success callback (optional)
      @param error    An error callback (optional)
     */

    Auth.prototype.login = function(username, password, success, error) {
      return this._fetchPost({
        grant_type: 'password',
        username: username,
        password: password
      }, success, error);
    };


    /*
     Tells if the user needs to login.
     If no access token is present we try to fetch it from the refresh token.

     @return True if the user needs to login, false otherwise
     */

    Auth.prototype.needsLogin = function() {

      var refreshToken;
      if (this.getAccessToken() !== null) {
        return false;
      }
      refreshToken = this.getRefreshToken();
      if (refreshToken !== null) {
        this._fetchAccessTokenWithRefreshToken(refreshToken);
        if (this.getAccessToken() === null) {
          return true;
        }
        return false;
      }
      return true;
    };


    /*
      Logs out the user by clearing the stored tokens.
     */

    Auth.prototype.logout = function() {
      $.removeCookie(this.ACCESS_TOKEN_COOKIE_NAME);
      return $.removeCookie(this.REFRESH_TOKEN_COOKIE_NAME);
    };


    /*
      Fetches an access token with a previously created refresh token.

      @param refreshToken The refresh token
      @param success      A success callback (optional)
      @param error        An error callback (optional)
     */

    Auth.prototype._fetchAccessTokenWithRefreshToken = function(refreshToken, success, error) {
      return this._fetchPost({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }, success, error);
    };


    /*
      Sends a json post request to fetch a token (internal).

      @param postData The data to post
      @param success  A success callback (optional)
      @param error    An error callback (optional)
     */

    Auth.prototype._fetchPost = function(postData, success, error) {
      return $.ajax({
        url: this.tokenUrl,
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        },
        dataType: 'json',
        data: JSON.stringify(postData),
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            _this._storeData(data);
            if (success != null) {
              return success(data, textStatus, jqXHR);
            }
          };
        })(this),
        error: function(jqXHR, textStatus, errorThrown) {
          if (error != null) {
            return error(jqXHR, textStatus, errorThrown);
          }
        }
      });
    };


    /*
      Stores the data received in the token response (internal).

      @param data The received data
     */

    Auth.prototype._storeData = function(data) {
      var accessTokenExpiration, refreshTokenExpiration;
      accessTokenExpiration = new Date;
      accessTokenExpiration.setSeconds(accessTokenExpiration.getSeconds + parseInt(data.expires_in));
      refreshTokenExpiration = new Date;
      refreshTokenExpiration.setSeconds(refreshTokenExpiration.getSeconds + this.refreshTokenTtl);
      $.cookie(this.ACCESS_TOKEN_COOKIE_NAME, data.access_token, {
        expires: accessTokenExpiration
      });
      return $.cookie(this.REFRESH_TOKEN_COOKIE_NAME, data.refresh_token, {
        expires: refreshTokenExpiration
      });
    };

    return Auth;

  })();

}).call(this);
