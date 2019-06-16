import React, {Component} from 'react'
import {connect} from "react-redux"
import _ from 'lodash'
import { reportFileDownload, socketSend} from "../../redux/actions";
import config from "../../redux/actions/config"
import {Col, Row,} from 'reactstrap';
import {Item, Menu, MenuProvider, Separator} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';


const handleFileDownload = (url, func, fileType) => {
  // console.log('url', url)
  if (fileType === 'file') {
    url = url.substring(1, url.length); // to remove the / at beginning of the url
  }
  let url_arr = url.split("/")
  if (url_arr[0] === 'media') {
    url_arr.shift()
  }
  const download_name = url_arr[url_arr.length - 1]
  const url_str = url_arr.join("/")
  // console.log(url_str)

  func(url_str, download_name, fileType)
}


const RightClickMenu1 = () => {
  return(
    <Menu id='menu_id1' className="">
       <Item onClick={({event, props}) => props.folderQuery(props.url)}>view</Item>
      <Separator/>
       <Item onClick={({event, props}) => props.fileOperation(props.url, props.fileType, 'delete')}>delete</Item>
      <Separator/>
       <Item onClick={({event, props}) => handleFileDownload(props.url, props.reportFileDownload,props.fileType) }>download</Item>
    </Menu>
  )
};

const RightClickMenu2 = () => {
  return(
    <Menu id='menu_id2' className="">
       <Item onClick={({event,props}) => window.open(props.media_url, '_blank')}>view</Item>
      <Separator/>
       <Item onClick={({event, props}) => props.fileOperation(props.url, props.fileType, 'delete')}>delete</Item>
      <Separator/>
       <Item onClick={({event, props}) => handleFileDownload(props.url, props.reportFileDownload, props.fileType)}>download</Item>
    </Menu>
  )
};




class FileDisplay extends Component {

  constructor(props) {
    super();
  }


  folderIcon = (name, url,i) => {
    const {folderQuery, fileOperation, reportFileDownload} = this.props;
    return (
      <Col key={i} xs="3" sm="3" >
        <MenuProvider id="menu_id1" data={{url, folderQuery, fileOperation, fileType:'directory', reportFileDownload}}>
          <i className="icon-folder-alt icons font-5xl d-block mt-4"
             style={{cursor:'pointer'}}
             onDoubleClick={() => folderQuery(url)}>
          </i>{name}
        </MenuProvider>
      </Col>
    )
  };

  fileIcon = (name, url, i) => {
    const {folderQuery, fileOperation, reportFileDownload} = this.props;
    const media_url = `${config.channelsUrl}${url}`;
    return(
      <Col key={i} xs="3" sm="3">
        <MenuProvider id="menu_id2" data={{media_url, url, folderQuery, fileOperation, fileType:'file', reportFileDownload}}>
          <i className="icon-doc icons font-5xl d-block mt-4 "
             style={{cursor:'pointer'}}
             onDoubleClick={() => window.open(media_url, '_blank')}>
          </i>{name}
        </MenuProvider>
      </Col>
    )
  }


  renderfiles = () => {
    const {contents} = this.props;
    return (
      _.map(contents, (item, i) => (
        item[0]==="file"? this.fileIcon(item[2], item[1],i) : this.folderIcon(item[2], item[1],i)
      ))
    )
  }

  render() {
    return (
      <Row>
          {this.renderfiles()}
          <RightClickMenu1 />
        <RightClickMenu2 />


      </Row>

    )
  }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {socketSend, reportFileDownload})(FileDisplay)
