import React from 'react'
import RowWrapper from './rowWrapper'


const TableRow = React.createClass({

  renderCheckBox: function(key) {
    const _this = this  
    return (
      <input key={key} 
            type="checkbox" 
            checked={_this.props.rowData[key]}
            onClick={_this.props.handleClick}
      /> 
    )
  },

  render: function() {
    
    const _this = this

    var createItem = function(listType) {
      const subList = _this.props.fieldList[listType]

      return subList.map(function (field) {
        var key = field["name"]
        const isActive = _this.props.calcAttributes["rowActive"]
        var cssClasses = "dataItem " + key 
        cssClasses += isActive ? "" : " inactive"
        cssClasses += isActive && _this.props.rowNumber % 2 == 1 ? " shaded" : ""

        switch ( listType ) {
        case "checkbox": 
          return (  <td className={cssClasses}>
                      {_this.renderCheckBox(key)}
                    </td> 
            )
        case "button":
          return (<td className={cssClasses}>
                    <div className="btn--remove" onClick={_this.props.handleClick}>Remove</div>
                  </td> 
                  )
        case "textbox":
          return (<td className={cssClasses}>
                    <input type="text" className="textbox" value={_this.props.rowData[key]}></input>
                  </td> 
                  )
        default: 
          return  <td className={cssClasses}>{_this.props.rowData[key]}</td>
        }
      })
    }
    
    var tpnd = _this.props.rowData["TPND"]
    return <RowWrapper key={tpnd} className="tableRow" content={Object.keys( _this.props.fieldList ).map(createItem)} />
  }
})

export default TableRow