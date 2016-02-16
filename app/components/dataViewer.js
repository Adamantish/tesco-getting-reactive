import React from 'react'
import Table from './table'

const DataViewer = React.createClass({

  viewFieldList: { 
    "display": [
      {"name": "TPNB"},
      {"name": "TPND"},
      {"name": "Description"},
      {"name": "Status"},
      {"name": "Start Date"},
      {"name": "End Date"},
      {"name": "Division"},
      {"name": "Subgroup"},
      {"name": "Supplier"},
      {"name": "QS No."},
      {"name": "Basic Cost", "displayName": "Basic"},
      {"name": "Off Invoice Discount"},
      {"name": "Invoice Cost",  "displayName": "Invoice"},
      {"name": "Net", "source": "calc"},
    ]
, "checkbox":
    [
      {"name": "Amend",  "displayName": "Amend?"}
    ]
   },

  amendFieldList: 
    { "display": 
        [
          {"name": "Description"},
          {"name": "Case Size"},
          {"name": "UOM"},
          {"name": "TPND"},
          {"name": "Basic Cost", "displayName": "Cost"},
          {"name": "Off Invoice Discount", "displayName": "Off Inv Disc"},
          {"name": "Invoice Cost", "displayName": "Inv Cost"},
          {"name": "Currency", "displayName": "Currency Code"}
        ],
      "textbox":
        [
          {"name": "Basic Cost", "displayName": "Price", "type": "textbox"},
          {"name": "Off Invoice Discount", "displayName": "Off Inv Disc", "type": "textbox"},
          {"name": "Invoice Cost", "displayName": "Inv Price", "type": "textbox"},
          {"name": "Currency", "displayName": "Currency Code", "type": "textbox"}
        ],
      "button":
        [ 
          {"name": "Don't Amend"} 
        ]
    },

  amendMetaHeadings: 
    [
      ["Current", "8"],
      ["New", "4"]
    ],
  

  filterForAmend: function(){
    const _this = this
    var output = {}

    Object.keys(this.props.store).forEach( function(key) {
      var row = _this.props.store[key]
      if ( row["Amend"] == true ) {
        output[key] = row 
      }
    })  
    return output
  },

  renderForView: function(){
    return <Table store={this.props.store} 
                  calcAttributes={this.props.calcAttributes} 
                  fieldList={this.viewFieldList}
                  handleAmendClick={this.props.handleAmendClick}
            />
  },

  renderForAmend: function(){
    return (
            <div>
              <h3 id="supplier--heading">{"Supplier: " + this.props.selectedSupplier}</h3>
              <Table store={this.filterForAmend()} 
                    calcAttributes={this.props.calcAttributes} 
                    handleAmendClick={this.props.handleAmendClick}
                    fieldList={this.amendFieldList}
                    metaHeadings={this.amendMetaHeadings}
              />
            </div>
            )
  },

  render: function() {

    if (this.props.selectedTab == "view"){
      return this.renderForView()
    } else {
      return this.renderForAmend()
    }
  }

})
export default DataViewer