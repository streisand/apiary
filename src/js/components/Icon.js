var React = require('react');

var Icon = React.createClass({
  
  render: function() {
    return (
      <i {...this.props}>{this.props.children}</i>
    );
  }

});

module.exports = Icon;
