<template>
  <div class="fs-split">
    <div class="split-image">
      <img src="static/WELOG.png">
    </div>
    <div class="split-content">
      <div class="split-content-vertically-center">
        <div class="split-intro">
          Welcome to your Welog!
        </div>
        <div class="split-detail">
          <p>This is where we record and share our life.Have a nice day.</p>
        </div>
        <Button @click="login = true" size="large" type="text">Login</Button>
        <Drawer
          title="LOGIN"
          v-model="login"
          width="720"
          :mask-closable="false"
          :styles="styles"
        >
          <div class="login-input">
            <div class="label">
              USERNAME
            </div>
            <input type="text" placeholder="username" v-model="usernameL" @keyup.enter="loginEventHandeler"></input>
            <div class="label">
              PASSWORD
            </div>
            <input type="password" placeholder="password" v-model="passwordL" @keyup.enter="loginEventHandeler"></input>
          </div>
          <div class="drawer-footer">
            <Button size="large" style="margin-right: 8px" @click="login = false" type="text">Cancel</Button>
            <Button @click="loginEventHandeler" size="large" type="primary">Login</Button>
          </div>
        </Drawer>
        <Button @click="register = true" size="large" type="primary">Register</Button>
        <Drawer
          title="REGISTER"
          v-model="register"
          width="720"
          :mask-closable="false"
          :styles="styles"
        >
          <div class="ErrHint alert alert-danger" v-if="errHint">
            {{ errHint }}
          </div>
          <div class="login-input">
            <div class="label">
              USERNAME
            </div>
            <input type="text" placeholder="username" v-model="usernameR" @keyup.enter="registEventHandler"></input>
            <div class="label">
              PASSWORD
            </div>
            <input type="password" placeholder="password" v-model="passwordR" @keyup.enter="registEventHandler"></input>
            <div class="label">
              PASSWORD-CONFIRM
            </div>
            <input type="password" placeholder="password" v-model="confirmPassword" @keyup.enter="registEventHandler"></input>
          </div>
          <div class="drawer-footer">
            <Button size="large" style="margin-right: 10px" @click="register = false" type="text">Cancel</Button>
            <Button @click="registEventHandler" size="large" type="primary">Register</Button>
          </div>
        </Drawer>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import loadingAnimate from "./animate/loading"
  axios.defaults.withCredentials = true;
    export default {
        name: "Start",
        data () {
        return {
          login: false,
          register:false,
          loading:false,
          errHint:'',
          usernameL:null,
          passwordL:null,
          usernameR:null,
          passwordR:null,
          confirmPassword:null,
          styles: {
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingLeft:'50px',
            position: 'static',
            display:'flex',
            alignItems:'center'
          }
        }
      },
      components:{
        loadingAnimate
      },
      methods: {
        async loginEventHandeler () {
          this.loading=true;
          try {
            console.log("start")
            let data = {
              usernameL: this.usernameL,
              passwordL: this.passwordL
            }
            this.signIn(data).then(Response=>{
              console.log(Response);
              if(Response.data.code==200 && Response.data.message=="Sign in success")
              {
                this.checkLogin().then(Response=>{
                  console.log('aa',Response)
                })
                this.loading=false
                this.$Notice.success({
                  title: 'Login Success!',
                  desc:''
                })
                var i = Response.data.data.user_id
                this.setCookie("userID", i, 30)
                console.log(document.cookie)
                this.$router.push("/home");
              }
              else if(Response.data.code==200 && Response.data.message=="Username or Password Wrong")
              {
                this.loading=false
                this.$Notice.error({
                  title: 'Username or Password Wrong.',
                  desc:''
                })
                this.errHint="Username or Password is Wrong!"
              }
              else{
                this.loading=false
                this.$Notice.error({
                  title: "You have already loged in.",
                  desc:''
                })
                this.errHint="You have already loged in."
              }
            });
          } catch (e) {
            this.loading=false
            return {
              result: false,
              errMsg: "Can't connect with server"
            };
          }
        },
        async registEventHandler() {
          this.loading=true;
          var regUsername=/^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/
          var regPassword=/^[0-9a-zA-Z_#@!\?\-\\]{6,20}$/
          if(!regUsername.test(this.usernameR))
          {
            this.loading=false;
            this.errHint = "不对";
            this.$Notice.error({
              title: 'Please input your username again.',
              desc:''
            })
            return;
          }
          else if(!regPassword.test(this.passwordR))
          {
            this.loading=false;
            this.errHint = "Your password should be more than 6 characters, and don't use special character.";
            this.$Notice.error({
              title: 'Please input your password again.',
              desc:''
            })
            return;
          }
          else if(this.passwordR!==this.confirmPassword)
          {
            this.loading=false;
            this.errHint = "The two passwords did not match!";
            this.$Notice.error({
              title: 'Please input your password again.',
              desc:''
            })
            return;
          }
          try {
            console.log("start")
            let data = {
              usernameR: this.usernameR,
              passwordR: this.passwordR,
              confirmPassword: this.confirmPassword
            }

            this.register(data).then(Response=>{
              console.log(Response.data);
              if(Response.data.code==200 && Response.data.message=="success")
              {
                this.$Notice.success({
                  title: 'Register Success!',
                  desc:''
                })
                this.loading=false
                this.register=false
                this.login=true
              }
              else if(Response.data.code==200 && Response.data.message=="Your name is used")
              {
                this.loading=false
                this.$Notice.error({
                  title: 'This name is used.',
                  desc:''
                })
                this.errHint="The name is used!"
              }
              else{
                this.loading=false
                this.$Notice.error({
                  title: "Can't connect with server.",
                  desc:''
                })
                this.errHint="Can't connect with server."
              }
            });
          } catch (e) {
            this.loading=false;
            return {
              result: false,
              errMsg: "Can't connect with server"
            };
          }
        }
      }
    }
</script>

<style>
  .fs-split {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
  .fs-split .split-image{
    width:50%;
    padding-top: 250px;
    text-align: center;
  }
  .fs-split .split-image img{
    transition: transform .3s linear;
  }
  .fs-split .split-image img:hover{
    transform: scale(1.1);
  }
  .fs-split .split-content{
    width:50%;
    height: 100%;
    display:flex;
  }
  .fs-split .split-content .split-content-vertically-center {
    padding: 80px;
    margin-top: auto;
    margin-bottom: auto;
  }
  .split-intro{
    font-weight:bold;
    font-size: 50px;
    line-height: 50px;
    letter-spacing: 1px;
    margin-bottom: 30px;
    color:#0C0C0C;
    transition: color .4s linear;
  }
  .split-detail{
    padding: 40px 0 50px 0;
  }
  .split-detail p{
    font-size: 20px;
    color:#0C0C0C;
  }
  .split-intro:hover{
    color: #4000FF;
  }
  .ivu-btn{
    font-weight: 600;
    letter-spacing: 1px;
  }
  .ivu-btn-text{
    color:#FD146C;
  }
  .ivu-btn-primary{
    color:#FDFDFE;
    background-color: #4000FF;
  }
  .ivu-btn-text:hover{
    color:#0C0C0C;
    background-color: transparent;
  }
  .ivu-btn-primary:hover{
    background-color: #0C0C0C;
  }
  .ivu-btn-large {
    font-size: 20px;
    border-radius: 0px;
    margin-right: 20px;
  }
  .ivu-btn, .ivu-btn:active, .ivu-btn:focus {
    border:none;
    box-shadow: none;
  }
  .ivu-drawer-header{
    background-color: #0C0C0C;
  }
  .ivu-drawer-header-inner{
    color:#fff;
    height:30px;
    line-height: 30px;
    font-size: 22px;
    font-weight:500;
    letter-spacing: 1px;
  }
  .ivu-drawer-close{
    top:5px;
  }
  .ivu-drawer-close .ivu-icon-ios-close{
    color:#FD146C;
    font-size: 50px;
    font-weight: 600;
  }
  .login-input input {
    width:30vw;
    padding: 4px;
    border-top:none;
    border-right: none;
    border-left:none;
    border-bottom: 3px solid #e6ecf0;
    font-size: 20px;
    line-height: 3;
    margin-bottom: 20px;
  }
  .login-input .label{
    font-size: 25px;
    font-weight:500;
    letter-spacing: 1px;
    color:#0C0C0C;
  }
  .login-input input:focus {
    color: #0C0C0C;
    outline: none;
    transition: border-bottom-color .5s linear;
    border-bottom-color: #FD146C;
  }
  .drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 2px solid #e6ecf0;
    padding: 13px 20px;
    text-align: right;
    background: #fff;
  }
</style>
