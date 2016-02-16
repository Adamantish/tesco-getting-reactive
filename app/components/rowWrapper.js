import React from 'react'

var RowWrapper = React.createClass({
  render: function() {
    return <tr>{this.props.content}</tr>
  }
})

export default RowWrapper