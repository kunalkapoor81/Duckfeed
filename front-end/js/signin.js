'use strict';

export default class SigninForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showError(){
     document.getElementById("msg").textContent="Invalid Sign in Attempt!";
  }

  handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                  Username: data.get('email'),
                  Password: data.get('pwd')
              });
      const poolData = {
              UserPoolId: _config.cognito.userPoolId,
              ClientId: _config.cognito.userPoolClientId
          };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
                                    Username: data.get('email'),
                                    Pool: new AmazonCognitoIdentity.CognitoUserPool(poolData)
                                });
      cognitoUser.authenticateUser(authDetails, {
          onSuccess: function(){window.location.href = 'index.html'},
          onFailure: this.showError
      });
  }

  render() {
    return (
       <div id="signinDiv" class="signinForm center">
                  <h1>Sign In</h1>
                  <span id="msg"></span>
                  <form id="signinForm" onSubmit={this.handleSubmit}>
                    <input type="email" id="email" name="email" placeholder="Email" required></input><br/><br/>
                    <input type="password" id="pwd" name="pwd" placeholder="Password" pattern=".*" required></input><br/><br/>
                    <button>Sign In</button>
                  </form>
       </div>
    );
  }
}