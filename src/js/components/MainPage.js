var React = require('react');
var socket = io.connect('http://localhost:3000');
var MainPage = React.createClass({


  getInitialState: function() {
    return {
      count: 0
    };
  },

  render: function() {

    return (
      <div className="main-container">
        <h1> Apiary </h1>
        <p> Apiary is going to be awesome </p>
        <br/>
        <br/>
        <h3> Let's look at a React demo </h3>
        <p>
          Imagine that you had a button that incremented
          a counter when you clicked it
        </p>
        <br/>
        <button onClick={this.updateClicker}> Click Me Bitch </button>
        <br/>
        <br/>
        <div>
          <span>
            Click Counter: {this.state.count}
          </span>
        </div>

      </div>
    )
  },

  updateClicker: function(e) {

    this.setState({
      count: this.state.count + 1
    });
    socket.emit('react-event', {data: this.state.count + 1})
  }
});


module.exports = MainPage;
