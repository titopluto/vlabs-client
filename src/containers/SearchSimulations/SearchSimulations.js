import React, {Component} from "react"
import _ from "lodash"
import {connect} from "react-redux"
import {Button, Input} from "reactstrap";


class SearchSimulations extends Component {

  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.keyPress = this.keyPress.bind(this)
    this.clearInput = this.clearInput.bind(this)

    this.state = {
      searchTerm: '',
      displayedSimulations: this.props.simulations,
    };
  }

  onInputChange(event) {
      let newlyDisplayedSimulations = _.filter(this.props.simulations, simulation => {
        return (
          simulation.user.toLowerCase().includes(event.target.value.toLowerCase()) ||
          simulation.user_fullname.toLowerCase().includes(event.target.value.toLowerCase())
        )
      })
      this.setState({
        displayedSimulations: newlyDisplayedSimulations,
        searchTerm: event.target.value
      })
    }

  keyPress(event) {
    if(event.keyCode == 13) {
      let newlyDisplayedSimulations = _.filter(this.props.simulations, simulation => simulation.name.toLowerCase() === event.target.value.toLowerCase())
      if (newlyDisplayedSimulations.length != 0) {
        this.setState({
          displayedSimulations: newlyDisplayedSimulations
        })
      }
      else {
        this.setState({
          displayedSimulations: this.props.simulations
        })
      }
    }
  }

  clearInput() {
    this.setState({
      displayedSimulations: this.props.simulations,
      searchTerm: ''
    })
}

  render() {

    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="input-group">
            <Input value={this.state.searchTerm}  onChange={this.onInputChange} type="text"
                    className="form-control" placeholder="search by user-ID or Full Name"/>
               {/*<Button onClick={()=>this.clearInput()}></Button>*/}
            <span className="input-group-btn">
              <Button color="info">
                  <i className="icon-close icons font-2xl d-block bg-info" onClick={()=>this.clearInput()}>  </i>
              </Button>
            </span>
          </div>
                  {/*<AllSimulations searchedSimulations={this.state.displayedSimulations}/>*/}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  simulations: state.monitorboard.all_info,
})

export default connect(mapStateToProps)(SearchSimulations)
