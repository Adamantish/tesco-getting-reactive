
import React from 'react'
import DataViewer from './dataViewer'

const TescoApp = React.createClass({

  getInitialState: function() {
    const csv = document.querySelector('#tesco-data').innerHTML
    const parsed = Papa.parse(csv, { header: true })
    var jsonObj = {}

    parsed.data.forEach( function(row) {
      row["Amend"] = false
      jsonObj[row["TPND"]] = row
    })
    return { store: jsonObj,
             selectedTab: "view"
            }
  },

  calcAttributes: function() {
    const _this = this
    var output = {}
    var row

    Object.keys( this.state.store ).forEach( function(key){
      row = _this.state.store[key]
      output[key] = {}
      output[key]["rowActive"] = _this.calcRowActive(row)
      output[key]["Net"] = ( row["Invoice Cost"] - row["Off Invoice Discount"]).toFixed(2)
    })

    return output
  },

  alreadyActiveID: function() {
    const _this = this

    return Object.keys(this.state.store).find( function(key) {
      return _this.state.store[key]["Amend"] == true
    })
  },

  calcRowActive: function(row) {
    const qsNo = row["QS No."]
    const activeQSNo = this.alreadyActiveID() ? this.state.store[this.alreadyActiveID()]["QS No."] : qsNo
    return activeQSNo == qsNo
  },

  handleAmendClick: function(tpnd) {
    const newStore = this.state.store
    const currentVal = newStore[tpnd]["Amend"]

    newStore[tpnd]["Amend"] = this.calcRowActive(newStore[tpnd]) ? !currentVal : currentVal
    this.setState({store: newStore})

    if( !this.alreadyActiveID() ) {
      this.setState({selectedTab: "view"})
    }
  },

  selectTab: function(tab) {
    if ( !this.alreadyActiveID() ) {
      tab = "view"
    }
    this.setState({ selectedTab: tab })
  },

  selectedSupplier: function() {
    if ( this.alreadyActiveID() ){
      return this.state.store[this.alreadyActiveID()]["Supplier"]
    }
  },

  render: function() {
    var amendDisabledClass = this.alreadyActiveID() ? "" : " inactive"
    var amendSelectedClass = this.state.selectedTab == "amend" ? " selected" : ""
    var viewSelectedClass = this.state.selectedTab == "view" ? " selected" : ""

    return (
      <div className="app-container">
        <header>
          <h2 id="title">TESCO - MyProduct Cost</h2>
            <nav>
              <div onClick={this.selectTab.bind(null,"view")} className={"tab view" + viewSelectedClass}>
                <h2>View</h2>
              </div>
              <div onClick={this.selectTab.bind(null,"amend")} className={"tab amend" + amendSelectedClass + amendDisabledClass}>
                <h2>Amend</h2>
              </div>
            </nav>
          <div className="vertical-spacer"></div>
        </header>
        <main>
          <DataViewer store={this.state.store} 
                 fieldNames={this.state.fieldNames}
                 calcAttributes={this.calcAttributes()} 
                 selectedTab={this.state.selectedTab}
                 selectedSupplier={this.selectedSupplier()}
                 handleAmendClick={this.handleAmendClick} 
          />
        </main>
      </div>
    )
  }

})

export default TescoApp
