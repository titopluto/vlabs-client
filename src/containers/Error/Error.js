import _ from 'lodash'
import React, {Component} from "react"
import {connect} from 'react-redux'
import {Alert} from 'reactstrap';
import {clearErrors} from "../../redux/actions"


class Error extends Component {

  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(errType, id) {
    this.props.dispatch(clearErrors(errType, id))
    this.setState({ visible: false });
  }

  renderErrors(errType) {
    const {errors} = this.props
    const typeErrors = errors[errType]

    return (
      _.map(typeErrors, (err, id) => {
        if (err['info']==='info') {
          return (
          <Alert color="success"
                 key={id}
                 toggle={()=> this.onDismiss(errType, id)}>
            {err['error']} , {err['detail']}
          </Alert>
            )
        }
        else return (
          <Alert color="danger"
                 key={id}
                 toggle={()=> this.onDismiss(errType, id)}>
            {err['error']} , {err['detail']}
          </Alert>
            )
      })
    )

  }


  render() {
    const {errType} = this.props
    return (
          <div>
            {this.renderErrors(errType)}

          </div>
    );
  }
}

const mapStateToProps = state => ({errors: state.errors})

export default connect(mapStateToProps)(Error);
