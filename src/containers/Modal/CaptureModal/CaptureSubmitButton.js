import React from 'react';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
import {Button} from "reactstrap";


const CaptureSubmitButton = ({ dispatch }) => {


  return (
      <Button onClick={() => dispatch(submit('captureForm'))}
        //                              ^^^^^^^^^^^^ name of the form
      >
        Capture
      </Button>
  )
}

export default connect()(CaptureSubmitButton);
