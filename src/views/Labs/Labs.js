import React, {Component} from 'react'
import Vlabs from '../../containers/Vlabs/Vlabs'


class LabsView extends Component {

  render() {
    const courseCode = this.props.match.params.courseCode
    const { history } = this.props
    return (
      <div className="animated fadeIn">
        {/*<Labs courseCode={courseCode} />*/}
        <Vlabs courseCode={courseCode} history={history} />
      </div>
    )
  }
}

export default LabsView
