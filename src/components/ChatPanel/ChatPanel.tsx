import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { animateScroll } from "react-scroll";
import ReactLoading from 'react-loading';
import { isAuthenticated, getCurrentUser } from 'Utils/auth';
import 'Styles/iscroll.less';
import { history } from 'Components/Routes';
import ChatColorModal from 'Components/ChatPanel/ChatColorModal/ChatColorModal';
import ChatOnlineUsers from 'Components/ChatPanel/ChatOnlineUsers/ChatOnlineUsers';
import * as api from 'Utils/api';
const env = require('Root/env.json');

const chatstyles = require('./chat-panel.css');

const now = new Date().getTime();
let username = ['user', now].join('-');
// let userRealName = username;

var online_user_list = [], history_messages = [];

const userImage = '/public/assets/images/chat/Oval%20Copy%202Normal.png';
const otheruserImage = '/public/assets/images/chat/OvalNormal.png';

let date, TimeType, hour, minutes, fullTime;
date = new Date();
hour = date.getHours();
if (hour <= 11) {
  TimeType = 'am';
} else {
  TimeType = 'pm';
}
if (hour > 12) {
  hour = hour - 12;
}
if (hour === 0) {
  hour = 12;
}
minutes = date.getMinutes();
if (minutes < 10) {
  minutes = '0' + minutes.toString();
}
fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();

let ChatEngineCore = require('chat-engine');
let typingIndicator = require('chat-engine-typing-indicator');
let myChat;

const ChatEngine = ChatEngineCore.create(
  {
   publishKey: 'pub-c-c81b63f0-9077-4a31-a946-bfe7c717ec43',
   subscribeKey: 'sub-c-040904fe-94a8-11e8-873f-86cf78041310'
   //  publishKey: 'pub-c-54fe694d-b034-472c-b642-ad6939efb60f',
   //  subscribeKey: 'sub-c-00f39342-9d77-11e8-944c-22e677923cb5'
  },
  {
    globalChannel: 'chat-engine-react'
  }
);

if (!isAuthenticated()) {
  ChatEngine.connect(
    username,
    {
      status: 'offline'
    }
  );
}

class Message extends React.Component {

  render() {
    let user_color = localStorage.getItem('color');

    user_color = (user_color != null) ? user_color : '#4599FF';
    let other_user_color = (this.props.color != null) ? this.props.color : '#4599FF';

    return (
      this.props.uuid == username ? (
        <div className={'row ' + chatstyles.c_chatbox_user}>
          <div className="col-10 col-sm-10" style={{paddingRight: '0'}}>
            <div className={chatstyles.c_chatbox}
                 style={{float: 'right', background: user_color, borderRadius: '20px 0 20px 20px'}}>
              {/*<span>{this.props.uuid}:</span><br/>*/}
              <span>{this.props.text}</span>
            </div>
            <span className={chatstyles.c_chatbox_time} style={{float: 'right', marginRight: '12px'}}>{this.props.time}</span>
          </div>
          <div className="col-2 col-sm-2">
            <img className={chatstyles.c_userphoto + ' userimage'} src={this.props.userphoto ? this.props.userphoto : userImage}/>
          </div>
        </div>
      ) : (
        <div className={'row ' + chatstyles.c_chatbox_user}>
          <div className={'col-2 col-sm-2'}>
            <img className={chatstyles.c_userphoto} src={this.props.userphoto ? this.props.userphoto : otheruserImage}/>
          </div>
          <div className="col-10 col-sm-10" style={{paddingLeft: '0'}}>
            <div className={chatstyles.c_chatbox}
                 style={{float: 'left', background: other_user_color, borderRadius: '0 20px 20px'}}>
              <span>{this.props.uuid}:</span><br/>
              <span>{this.props.text}</span>
            </div>
            <span className={chatstyles.c_chatbox_time} style={{float: 'left', marginLeft: '12px'}}>{this.props.time}</span>
          </div>
        </div>
      )
    );
  }
}

let createReactClass = require('create-react-class');
let Chat = createReactClass({
  getInitialState: function () {

    const user = getCurrentUser();

    if (user != null) {
      username = user.name.replace(/\s+/g, '');
      // userRealName = user.name;

      ChatEngine.connect(
        username,
        {
          userphoto: ((user && user.user_photo) ? user.user_photo : userImage),
          status: 'online'
        }
      );
    }

    return {
      spinOpen: 'block',
      history: this.props.history,
      messages: [],
      chatInput: '',
      isOpenChatColorModal: false,
      isOpenChatOnlineUsers: false,
      onlineUserData: [],
      zoomout: false,
      user_photo: (user && user.user_photo) ? user.user_photo : userImage
    };
  },

  setChatInput: function (event) {
    this.setState({chatInput: event.target.value});
  },

  sendChat: function () {

    if (isAuthenticated()) {
        if (this.state.chatInput) {
          const user_color = localStorage.getItem('color');
          myChat.emit('message', {
            text: this.state.chatInput,
            color: user_color,
            user_photo: this.state.user_photo,
            time: fullTime
          });
          this.setState({chatInput: ''});
        }
    } else {
        history.push('/chatlogin');
    }
  },

  componentDidMount: function () {
    if (this.state.history && this.state.history.length > 0) {
      this.setState({
        messages: this.state.history,
        spinOpen: 'none'
      });
    }
    myChat.on('message', (payload) => {
      let messages = this.state.messages;
      messages.push(
        <Message key={this.state.messages.length} uuid={payload.sender.uuid} userphoto={payload.data.user_photo} text={payload.data.text} color={payload.data.color} time={payload.data.time}/>
      );
      this.setState({
        messages: messages
      });
    });
  },

  _handleKeyPress: function (e) {
    if (e.key === 'Enter') {
      this.sendChat();
    }
  },

  componentDidUpdate: function() {
    this.scrollToBottom();
  },

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'chat-output'
    });
  },

  onConfirmChatColor: function () {
    this.setState({
      isOpenChatColorModal: false
    });
  },

  onCancelChatColor: function () {
    this.setState({
      isOpenChatColorModal: false
    });
  },

  setColor: function () {
    if (!isAuthenticated()) {
      return;
    }
    this.setState({
      isOpenChatColorModal: true
    });
  },

  showonlineuser: function() {
    this.setState({
      isOpenChatOnlineUsers: true,
      onlineUserData: online_user_list
    });
  },

  onCancelOnlineUsers: function () {
    this.setState({
      isOpenChatOnlineUsers: false
    });
  },

  zoomout: function () {
    this.setState({
      zoomout: true
    });
  },

  onFocus: function () {
    this.setState({
      zoomout: false
    });
  },

  fileChangedHandler: function (event) {
    if (!isAuthenticated()) {
      return;
    }
    const formData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.setState({
      spinOpen: 'block'
    });

    api.userPhotoChange(formData)
      .then(response => {

        const user = getCurrentUser() || {};

        user.user_photo = env.imageUrl + response.data.file_path;
        localStorage.setItem('user', JSON.stringify(user));

        this.setState({
          user_photo: user.user_photo
        });

        var elems = document.getElementsByClassName('userimage');
        for (var i = 0; i < elems.length; i++) {
          elems[i].src = user.user_photo;
        }

        this.setState({
          spinOpen: 'none'
        });
      })
      .catch(err => {
        this.setState({
          spinOpen: 'none'
        });
      });
  },

  render() {

    let user_color = localStorage.getItem('color');
    user_color = (user_color != null) ? user_color : '#4599ff';

    let panel_class = !this.state.zoomout ? chatstyles.chatContentWrapper : (chatstyles.chatContentWrapper + ' ' + chatstyles.chatContentZoomout);
    let output_class = !this.state.zoomout ? chatstyles.c_chat_output : (chatstyles.c_chat_output + ' ' + chatstyles.c_chat_output_zoomout);

    return (
      <div>
        <div className={panel_class} id="message-panel">
          <div className={chatstyles.c_header}>
            <img src="/public/assets/images/chat/xrAsset%201Normal.png" />
            <span className={chatstyles.c_header_name}>XchangeRate Xperience</span>
            <img className={chatstyles.c_selectcolor + ' ' + chatstyles.c_onlineusers} src="/public/assets/images/chat/Group.png" onClick={this.showonlineuser}/>
            <span className={chatstyles.c_usercount} id="usercount" />
            <div className={chatstyles.c_online_status} style={{background: user_color}} onClick={this.setColor}/>
            <a className={chatstyles.c_header_close} onClick={this.zoomout}>
              <span aria-hidden="true">&times;</span>
            </a>
          </div>
          <div id="chat-output" className={output_class + ' chatoutputscroll'}> {this.state.messages} </div>
          <div className={chatstyles.c_inputpanel}>
            <div className={'row ' + chatstyles.c_inputbox}>
              <div className="col-10 col-sm-10">
                <div className={'input-group ' + chatstyles.c_input_group}>
                  <input id="chat-input" type="text" className={'form-control ' + chatstyles.c_inputbox_input}
                         value={this.state.chatInput} onChange={this.setChatInput} onKeyPress={this._handleKeyPress}  onFocus={this.onFocus}
                         placeholder="Type someting" />
                  <span className="input-group-btn">
                <button className={'btn btn-default ' + chatstyles.c_inputbox_btn} type="button" onClick={this.sendChat}/>
              </span>
                </div>
              </div>
              <div className="col-2 col-sm-2">
                {
                  !isAuthenticated() ?
                    <img className={chatstyles.c_userphoto} src={this.state.user_photo}/>
                    :
                    <div>
                      <label htmlFor="upload-photo">
                        <img className={chatstyles.c_userphoto} src={this.state.user_photo}/>
                      </label>
                      <input type="file" name="photo" id="upload-photo" style={{display: 'none'}} onChange={this.fileChangedHandler}/>
                    </div>
                }
              </div>
            </div>
          </div>
          <div className={chatstyles.loadingdiv} style={{display: this.state.spinOpen}}>
            <ReactLoading className={chatstyles.loadingspin} type={'spinningBubbles'} color={'#4599ff'} height={50} width={50} />
          </div>
        </div>
        <ChatColorModal isOpen={this.state.isOpenChatColorModal} onConfirm={this.onConfirmChatColor} onCancel={this.onCancelChatColor}/>
        <ChatOnlineUsers userData={this.state.onlineUserData} isOpen={this.state.isOpenChatOnlineUsers} onCancel={this.onCancelOnlineUsers}/>
      </div>
    );
  }
});

ChatEngine.on('$.ready', (data) => {

  myChat = new ChatEngine.Chat('chatengine-xchangerate-chat');

  const user = getCurrentUser() || {};

  myChat.on('$.online.*', (data) => {
    if (_.isEmpty(data.user.state) || data.user.state.status == 'offline') {
      return;
    }

    var val = data.user.uuid;
    var index = online_user_list.findIndex(function(item, i){
      return item.uuid == val;
    });
    if (index == -1) {
      online_user_list.push(data.user);
    }
    document.getElementById('usercount').innerHTML = online_user_list.length;
  });
  myChat.on('$.offline.*', (data) => {
    if (_.isEmpty(data.user.state) || data.user.state.status == 'offline') {
      return;
    }
    if (data.user.state.status == 'online' && data.user.name == 'Me') {
      return;
    }

    for (let i = 0; i < online_user_list.length; i++) {
      if (online_user_list[i].uuid == data.user.uuid) {
        online_user_list.splice(i, 1);
        document.getElementById('usercount').innerHTML = online_user_list.length;
        break;
      }
    }
  });
  myChat.on('$.connected', () => {
    let searchy = myChat.search({
      event: 'message',
      limit: 50
    });
    searchy.on('message', (data) => {
        (data.sender.uuid == user.name) ? (data.data.user_photo = user.user_photo) : userImage;

        history_messages.push(
          <Message userphoto={data.data.user_photo} uuid={data.sender.uuid} text={data.data.text} color={data.data.color} time={data.data.time}/>
        );
    });
    searchy.on('$.search.finish', () => {
      ReactDOM.render(<Chat history={history_messages.reverse()} />, document.getElementById('message-panel-parent'));
      document.getElementById('usercount').innerHTML = online_user_list.length;
    });
  });
});

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Chat;
