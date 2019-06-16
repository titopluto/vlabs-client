import React, {Component} from "react"
import _ from "lodash"
import {clearControlNotifyMsg} from "../../redux/actions";
import {connect} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Msg = ({ closeToast }) => (
  <div>
    Lorem ipsum dolor
    <button>Retry</button>
    <button onClick={closeToast}>Close</button>
  </div>
)

class AutoNotification extends Component {

  constructor(props) {
    super(props);
  }



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
        if (notification['type'] in NOTIFY_TYPES) {
          const closeAction = { onClose: () => this.props.clearControlNotifyMsg(index) }
          NOTIFY_TYPES[notification['type']](notification['msg'], closeAction)
        }
      })
    }
  }

  render() {
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
    notificationMsgs: state.controlboard.notification_msgs
  }
    )

export default connect(mapStateToProps, {clearControlNotifyMsg })(AutoNotification);
