import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios'
import Vue from 'vue'

Vue.use(VueAxios, axios)

function checkNumber() {
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i] instanceof Number) {
      return false;
    }
  }
  return true;
}

function checkString() {
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i] instanceof String) {
      return false;
    }
  }
  return true;
}

function post(url, data) {
  return axios({
    method: "POST",
    url: "http://meeting123.xiaomy.net/" + url,
    //url: url,
    data: data,
  })
}

function get(url) {
  return axios.get("http://meeting123.xiaomy.net/" + url);
}
///////////////////////////////////////////
// //getUserPublicInfo
function getUserPublicInfo(user_id) {
  if (!checkNumber(user_id)) {
    return null;
  }
  return get("api/User/getUserPublicInfo/" + user_id);
}
//register(data : {email, password, nickname})
function register(data) {
  console.log("register run")
  return post("api/User/signUp", data);
}
//signIn(data : {email, password})
function signIn(data) {
  return post("api/User/signIn", data);
}
//SEARCH
//search(searchKey)
function search(searchKey, startFrom, limitation) {
  var data = {
    startFrom: startFrom,
    limitation: limitation
  }
  if (!checkString(searchKey)) {
    return null;
  }
  return post("api/Search/" + searchKey, data);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RELATION
var RELATION = "api/Relation/";
//followSb(user_id)
function followSb(user_id) {
  if (!checkNumber(user_id)) {
    console.log("followSb")
    return null;
  }
  return get(RELATION + "follow/" + user_id);
}
//queryFollowingFor(user_id, startFrom, limitation)
function queryFollowingFor(user_id, startFrom, limitation) {
  if (!checkNumber(user_id)) {
    return null;
  }

  var data = {
    startFrom: startFrom,
    limitation: limitation
  }
  return post(RELATION + "queryFollowingFor/" + user_id, data);
}
//queryFollowersFor(user_id, startFrom, limitation)
function queryFollowersFor(user_id, startFrom, limitation) {
  if (!checkNumber(user_id)) {
    return null;
  }

  var data = {
    startFrom: startFrom,
    limitation: limitation
  }
  return post(RELATION + "queryFollowersFor/" + user_id, data);
}
//cancelFollowingTo(user_id)
function cancelFollowingTo(user_id) {
  if (!checkNumber(user_id)) {
    return null;
  }
  return get(RELATION + "cancelFollowingTo/" + user_id);
}
//if_following(follower_id, be_followed_id)
function if_following(follower_id, be_followed_id) {
  if (!checkNumber(follower_id, be_followed_id)) {
    return null;
  }
  return post(RELATION + "if_following?follower_id=" + follower_id + "&be_followed_id=" + be_followed_id);
}
//if_following_by_me(be_followed_id)
function if_following_by_me(be_followed_id) {
  if (!checkNumber(be_followed_id)) {
    return null;
  }
  console.log(RELATION + "if_following_by_me/" + be_followed_id)
  return get(RELATION + "if_following_by_me/" + be_followed_id);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//LIKE点赞
//like(message_id)
var LIKE = "api/Like/";

function like(message_id) {
  if (!checkNumber(message_id)) {
    return null;
  }
  return get(LIKE + message_id);
}
//cancelLike(message_id)
function cancelLike(message_id) {
  if (!checkNumber(message_id)) {
    return null;
  }
  return get(LIKE + "cancel/" + message_id);
}
//queryLikes(user_id)
function queryLikes(user_id) {
  if (!checkNumber(user_id)) {
    return null;
  }
  return get(
    LIKE + "query/" + user_id + "?startFrom=" + startFrom + "&limitation=" + limitation
  )
}
//checkUserLikesMessage(user_id, message_id)
function checkUserLikesMessage(user_id, message_id) {
  if (!checkNumber(user_id, message_id)) {
    return null;
  }
  return post(LIKE + "checkUserLikesMessage?user_id=" + user_id + "&message_id=" + message_id);
}
///////////////////////////////////////////////////////////////////////////////
//MESSAGE推特
var MESSAGE = "api/Message/";
//queryMessage(message_id)
function queryMessage(message_id) {
  if (!checkNumber(message_id)) {
    return null;
  }
  return post(MESSAGE + "query?message_id=" + message_id);
}
///api/Message/queryNewestMessage
function queryNewestMessage(startFrom, limitation) {
  if (!checkNumber(startFrom, limitation)) {
    return null;
  }
  let data = {
    startFrom: startFrom,
    limitation: limitation
  }
  return post(MESSAGE + "queryNewestMessage", data);
}
//queryMessagesOf(user_id, startFrom, limitation)
function queryMessagesOf(user_id, startFrom, limitation) {
  if (!checkNumber(user_id, startFrom, limitation)) {
    return null;
  }
  var data = {
    startFrom: startFrom,
    limitation: limitation
  }
  return post(MESSAGE + "queryMessage/" + user_id, data)
}
//queryFollowMessage(startFrom, limitation)
function queryFollowMessage(startFrom, limitation) {
  var data = {
    startFrom: startFrom,
    limitation: limitation
  }
  return post(MESSAGE + "queryFollowMessage", data);
}
//sendMessage(formData: {message_content, message_has_image, message_image_count, files})
function sendMessage(formData) {
  return post(MESSAGE + "send", formData);
}
//deleteMessage(message_id)
function deleteMessage(message_id) {
  return post(MESSAGE + "delete?message_id=" + message_id);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//评论
var COMMENT = "api/Comment/";

function queryComment(id, data) {
  return post(COMMENT + 'queryComments/' + id, data);
}

function addComment(id, data) {
  return post(COMMENT + 'add/' + id, data);
}

export default {
    getUserPublicInfo,
    register,
    signIn,
    search,
    followSb,
    queryFollowingFor,
    queryFollowersFor,
    cancelFollowingTo,
    if_following,
    if_following_by_me,
    like,
    cancelLike,
    queryLikes,
    checkUserLikesMessage,
    queryMessage,
    queryNewestMessage,
    queryMessagesOf,
    queryFollowMessage,
    sendMessage,
    deleteMessage,
    queryComment,
    addComment
}