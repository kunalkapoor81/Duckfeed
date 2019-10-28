const poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)


var authTokenPromise = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                reject(err);
            } else if (!session.isValid()) {
                resolve(null);
            } else {
                resolve(session.getIdToken().getJwtToken());
            }
        });
    } else {
        resolve(null);
    }
});

function handleSignOut(){
    userPool.getCurrentUser().signOut()
    window.location.reload(false);
}

const duckElement = React.createElement
const rootContainer = document.querySelector('#root');
const signoutContainer = document.querySelector('#signout');

authTokenPromise.then(function setAuthToken(token) {
  if (token) {
      ReactDOM.render(duckElement(FeedForm), rootContainer);
      document.getElementById("signoutLink").style.display='block'
      document.getElementById("signoutLink").addEventListener("click", handleSignOut);
  } else {
      ReactDOM.render(duckElement(SigninForm), rootContainer);
  }
}).catch(function handleTokenError(error) {
  alert(error);
  ReactDOM.render(duckElement(SigninForm), rootContainer);
});