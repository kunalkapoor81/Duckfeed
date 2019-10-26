'use strict';

const e = React.createElement

class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      var xhr = new XMLHttpRequest();
      var url = "https://d3jduumsjf.execute-api.ap-south-1.amazonaws.com/prod/record/";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
                                          count: parseFloat(data.get('count')),
                                          time: data.get('time'),
                                          location: data.get('location'),
                                          food: data.get('food'),
                                          type: data.get('type'),
                                          quantity: parseFloat(data.get('quantity'))
                                  	  }));
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
              var json = JSON.parse(xhr.responseText);
          }
      }
   }

  render() {
    return (
      <form id="duck-feed-form" onSubmit={this.handleSubmit}>
        <label htmlFor="time">Enter feed time</label>
        <input id="time" name="time" type="text" /><br/>

        <label htmlFor="location">Enter park name</label>
        <input id="location" name="location" type="text" /><br/>

        <label htmlFor="count">Enter Duck Count</label>
        <input id="count" name="count" type="text" /><br/>

        <label htmlFor="food">Enter food name</label>
        <input id="food" name="food" type="text" /><br/>

		<label htmlFor="type">Enter food type</label>
        <input id="type" name="type" type="text" /><br/>

		<label htmlFor="quantity">Enter food intake quantity in grams</label>
        <input id="quantity" name="quantity" type="text" /><br/>

        <button>Send data!</button>
      </form>
    );
  }
}
const domContainer = document.querySelector('#root');
ReactDOM.render(e(MyForm), domContainer);