import React, {Component} from "react"
import _ from "lodash"
import {resetReportContents, socketConnect, socketDisconnect, socketSend, wsUrl} from "../../redux/actions";
import {connect} from "react-redux";
import {Breadcrumb, BreadcrumbItem, Card, CardBody, Col, Input, Row,} from 'reactstrap';
import "./style.css"

import FileDisplay from "./FileDisplay"

class ReportsBrowser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current:"",
      displayedContents: this.props.contents,
      searchTerm: ""
    }

    this.onInputChange = this.onInputChange.bind(this)
    // this.waitForSocketConnection = this.waitForSocketConnection.bind(this)

    this.initialiseFolder()

  }


  waitForSocketConnection(callback) {
    const component = this; // not sure why but for some reason it works.. need to read up on it
    setTimeout(function() {
      if (component.props.socket_connection) {
        console.log("Connection is made");
        callback();
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);

      }
    }, 100);
  }

  initialiseFolder() {
    this.waitForSocketConnection(()=>this.folderQuery("results"))
  }

  componentDidMount(){
    // this.folderQuery("results")
  }


  componentWillUnmount() {
    this.props.resetReportContents()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        displayedContents: nextProps.contents,
      })
    }
  }


  folderQuery = (folder) => {
    const data = {
      message:"mediabrowser",
      operation: "view",
      folder:folder,
    };
    this.setState({current: folder})
    this.props.socketSend('reportsBrowser', data)
  };

  fileOperation = (folder, fileType, operation) => {
    const data = {
      message:"mediabrowser",
      operation,
      fileType,
      folder,
    };
    this.props.socketSend('reportsBrowser', data)
  };

  fileTracker = () => {
    const folders = this.state.current.split("/")
    let new_arr = []
    let i = 0
    let sum = ""
    while (i < folders.length) {
      sum = sum + "/" + folders[i];
      let sum_new = sum.substring(1, sum.length);
      new_arr.push({name:folders[i],path:sum_new});
      i ++
    }

    return (
      <Breadcrumb tag="nav">
        {
          _.map(new_arr, (item, i) => (

          <BreadcrumbItem className=""

                 key={i} tag="a" color='primary'
                 href="#" onClick={()=>this.folderQuery(item.path)}>
            {item.name}
          </BreadcrumbItem>
          ))
        }
      </Breadcrumb>
    )

  }

  onInputChange(event) {
      let displayedContents = _.filter(this.props.contents, content => {
        return (
          content[2].toLowerCase().includes(event.target.value.toLowerCase())
          )}
        )

      this.setState({
        displayedContents,
        searchTerm: event.target.value
      })
    }

  render() {

    const {displayedContents} = this.state;
    return (
      <Row>
          <Col>
            <Card>
              <CardBody className='border border-dark'>
                <Row>
                  <Col sm='4'>
                <div>
                 </div>
                  </Col>
                  <Col sm="8">
                    <div className="">
                      <Input value={this.state.searchTerm}
                         onChange={this.onInputChange} type="text"
                         className="form-control text-center"
                         placeholder="search by filename"
                         valid
                        />
                  </div>
                </Col>
                </Row>
                <div>
                  {this.fileTracker()}

                </div>
                <hr/>
                <FileDisplay folderQuery={this.folderQuery}
                             fileOperation={this.fileOperation}
                             contents={displayedContents}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
    )
  }
}

const mapStateToProps = state => (
  { authenticated: state.auth.authenticated,
    user: state.user_data.info,
    contents: state.reports.contents,
    socket_connection: state.user_data.channels_socket

  }

    );

export default connect(mapStateToProps,
  {socketConnect, socketDisconnect, socketSend, resetReportContents})
(ReportsBrowser);
