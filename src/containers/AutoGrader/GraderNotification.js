import React, {Component} from "react"
import _ from "lodash"
import {clearGraderNotifyMsg} from "../../redux/actions";
import {connect} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class GraderNotification extends Component {


  success = (msg, close)  =>  toast.success(msg, close);

  info = (msg, close) =>  toast.info(msg, close);

  warn = (msg, close) => toast.warn(msg, close);

  error =(msg, close) => toast.error(msg, close);


  showNotification() {

    const NOTIFY_TYPES = {
      'success': this.success,
      'info' : this.info,
      'warning': this.warn,
      'error': this.error
    };

    const notifications = this.props.notificationMsgs
    if(notifications){
      _.map(notifications, (notification, index) => {
        // console.log(notification)
        if (notification['type'] in NOTIFY_TYPES) {
          const closeAction = { onClose: () => this.props.clearGraderNotifyMsg(index) }
          NOTIFY_TYPES[notification['type']](notification['msg'], closeAction)
        }
      })
    }
  }

  render() {
    console.log('at notification render', !_.isEmpty(this.props.notificationMsgs))
    const containerStyle = { zIndex: 1999 };
    {this.showNotification()}

    return (
      <React.Fragment>
      {
        !_.isEmpty(this.props.notificationMsgs) ?
      <ToastContainer position="top-right" autoClose={10 * 1000} style={containerStyle}/>
      : null
    }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => (
  {
    notificationMsgs: state.labgrader.notification_msgs
  }
    )

export default connect(mapStateToProps, {clearGraderNotifyMsg })(GraderNotification);
