'use strict';

export default class FeedForm extends React.Component {
  constructor() {
    super();
    this.state = {datetime: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDate(value){
   this.state = {datetime:value};
  };

  handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      var xhr = new XMLHttpRequest();
      var url = _config.api.url;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      //alert(this.state.datetime)
      xhr.send(JSON.stringify({
                                          count: parseFloat(data.get('count')),
                                          time:  this.state.datetime,
                                          location: data.get('location'),
                                          food: data.get('food'),
                                          type: data.get('type'),
                                          quantity: parseFloat(data.get('quantity'))
                                  	  }));
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
              if(xhr.responseText == '\"true\"'){
                document.getElementById("msg").textContent="Thank you for your submission!"
              }else{
                alert(xhr.responseText)
                document.getElementById("msg").textContent="Oops something went wrong, could you please try again?"
              }
          }
      }
   }

  render() {
    return (
      <div class="feedForm center">
          <span id="msg"></span>
          <h1>Did you feed any ducks today?</h1>
          <form id="duck-feed-form" onSubmit={this.handleSubmit}>
          <div class="formfield">
            <label htmlFor="time">When did you feed? </label>
            <Datetime id="time" name="time" onChange={this.handleDate} required/><br/><br/>
          </div>
          <div class="formfield">
            <label htmlFor="location"> Where did you feed? </label>
            <input id="location" name="location" type="text" required/><br/><br/>
          </div>
          <div class="formfield">
            <label htmlFor="count">How many Ducks did you feed? </label>
            <input id="count" name="count" type="text" required/><br/><br/>
          </div>
          <div class="formfield">
            <label htmlFor="food">What Food did you feed? </label>
            <input id="food" name="food" type="text" required/><br/><br/>
          </div>
          <div class="formfield">
            <label htmlFor="type">What Food type was the food?  </label>
            <select id="type" name="type" type="text" >
                <option value="grain">Grain</option>
                <option value="vegetable">Vegetable</option>
                <option value="fish">Fish</option>
                <option value="other">Other</option>
            </select><br/><br/>
          </div>
          <div class="formfield">
            <label htmlFor="quantity">How Much Food in Grams did you feed? </label>
            <input id="quantity" name="quantity" type="text" required/><br/><br/>
          </div>
          <div class="formfield">
             <label htmlFor="quantity">Set this as your recurring feed? </label>
             <input id="recurring" name="recurring" type="checkbox" /><br/><br/>
          </div>
           <button>Submit</button>
          </form>
      </div>
    );
  }
}