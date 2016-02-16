import React from 'react'
import TableRow from './tableRow'

const Table = React.createClass({

  mergeFieldLists: function() {
    const _this = this;
    var output = [];

    Object.keys( this.props.fieldList).forEach( function(listType) {
      output = output.concat(_this.props.fieldList[listType])
    })
    
    return output
  },

  selectFieldNamesInData: function(key) {
    const storeRow = this.props.store[key]
    const calcRow = this.props.calcAttributes[key]
    var outputRow = {}

    this.mergeFieldLists().forEach( function(field) {
      outputRow[field["name"]] = field["source"] == "calc" ? calcRow[field["name"]] : storeRow[field["name"]]
    })
    return outputRow
  },

  render: function() {
    var _this = this
    var i = 1
    var ii = 0

    var createRow = function (key){
      i += 1
      return <TableRow key={key} 
                       rowData={_this.selectFieldNamesInData(key)} 
                       calcAttributes={_this.props.calcAttributes[key]}
                       fieldList={_this.props.fieldList}
                       rowNumber={i}
                       handleClick={_this.props.handleAmendClick.bind(null, key)} 
             />
    }

    var createHeading = function(fieldName){
      var name =  fieldName["displayName"] || fieldName["name"] 
      ii += 1
      return <th key={ii}>{ name }</th>
    }

    var createMetaHeading = function(field){
        return <th key={field[0]} colSpan={ field[1] }>{ field[0] }</th>
    }

    return (
            <div className="table__container">
              <table>
                <thead>
                    <tr>{ this.props.metaHeadings ? _this.props.metaHeadings.map(createMetaHeading) : "" }</tr> 
                  <tr>{ _this.mergeFieldLists().map(createHeading) }</tr>
                </thead>
                <tbody>
                  {Object.keys( this.props.store ).map(createRow)}
                </tbody>
              </table>
            </div>
    )
  }
})

export default Table
