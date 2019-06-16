import React, {Component} from "react";
import {connect} from "react-redux"
import Dropzone from 'react-dropzone'

import {launchSimulation} from "../../redux/actions"

import {Card, CardHeader, Col, Row} from "reactstrap";


class FileUpload extends Component {

  constructor(props){
        super(props)
        this.state = { dropzoneActive: false }
        this.handleOnDrop = this.handleOnDrop.bind(this)
        this.renderDropzoneInput = this.renderDropzoneInput.bind(this)
        this.onDragEnter = this.onDragEnter.bind(this)
      }


      componentWillReceiveProps(nextProps) {
    console.log(nextProps, this.props)
     if(nextProps !==this.props){
        this.setState({
        dropzoneActive: false})
      }
  }


    handleOnDrop = (accepted, rejected) => {
        this.setState({ dropzoneActive: true});
        const history = this.props.history
        this.props.launchSimulation(null, history,{accepted, rejected})
    }

    onDragEnter() {
      console.log("in drozone enter")
      this.setState({ dropzoneActive: true });
    }

    onDragLeave() {
      console.log("in drozone LEAVE")
      this.setState({ dropzoneActive: false});
    }


    renderDropzoneInput()  {
      const {  dropzoneActive } = this.state;
      // const files = field.input.value;
      const dropActiveStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '5em 0',
        background: '#9eaaa6',
        textAlign: 'center',
        color: '#4fff43',
        fontSize:'30px',
        height: '470px',
        border: "medium dotted #b4861a",
        }

        const overlayStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            padding: '8em 0',
            background: '#bccbc6',
            textAlign: 'center',
            color: '#080504',
            fontSize:'20px',
            height: '470px',
            border: "medium dotted blue",
        }

      return (
        <div>
          <Dropzone
            // name={field.name}
            // accept=".virl"
            onDrop={this.handleOnDrop}
            multiple={false}
            style={{position: "relative"}}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            >
            {
              dropzoneActive &&
            <div style={dropActiveStyle}>
              <h1 className="display-4">
                Drop File!
              </h1>
            </div>
            }
            { !dropzoneActive &&
              <div style={overlayStyle}>
                <p className="lead">
                  <small>
                    Drag and drop your VIRL Topology file here or Click to select a file!
                  </small>
                </p>
              </div>
            }
          </Dropzone>

          {/*{field.meta.touched &&*/}
            {/*field.meta.error &&*/}
            {/*<span className="error">{field.meta.error}</span>}*/}
          {/*{files && Array.isArray(files) && (*/}
            {/*<ul>*/}
              {/*{ files.map((file, i) => <li key={i}>{file.name}</li>) }*/}
            {/*</ul>*/}
          {/*)}*/}
        </div>
      );
}



    render() {
      const { handleSubmit, authErrorMsg } = this.props
      return (
          <Row>
            <Col xs="12" sm="12" md="12">
                <Card className="bg-light" >
                  <CardHeader className="bg-facebook text-white text-capitalize text-center">
                    VIRL VMMaestro file Topology Launcher
                  </CardHeader>
                  <div className="card-body" style={{height:'500px'}}>

                      {/*<Field name="files"*/}
                             {/*component={this.renderDropzoneInput.bind(this)}/>*/}
                    {this.renderDropzoneInput()}
                  </div>
                </Card>
            </Col>
          </Row>
      )
    }
}

const mapStateToProps = state => (
    {authErrorMsg: state.auth.error_msg}
)

export  default connect(mapStateToProps, {launchSimulation})(FileUpload)


// FileUpload =
//
// export default reduxForm({
//     form: "fileUpload"
// })(FileUpload)
//
