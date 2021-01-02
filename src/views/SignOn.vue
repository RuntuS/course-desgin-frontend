<template>
    <div class="SignOn">
        <div class="backButton" @click="back">
            <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/Back.png" alt="回退">
        </div>
        <div class="container">
            <h1>注册Pixiv Search</h1>
            <form class="form">
                <div class="token">
                    <input type="text" placeholder="邮箱" v-model="account" id="mailInput">
                    <button type="submit" id="token-button" @click="TakeToken">获取验证码</button>
                </div>
                <input type="password" placeholder="密码" v-model="password">
                <input type="text" placeholder="昵称" v-model="name">
                <input type="text" placeholder="验证码" v-model="mailToken">
                <button type="submit" id="register-button" @click="register">注册</button>
            </form>
        </div>

        <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SignOn",
        data(){
            return {
                account : "",
                password : "",
                name : "",
                mailToken : ""
            }
        },
        methods : {
            back(){
                this.$router.push({path : "/home"});
            },
            //获取邮箱验证码
            TakeToken(){
                this.$axios({
                    method : "GET",
                    url : "user/register/token?mail="+this.account
                })
                .then(res => {
                    this.$message.success("验证码发送成功，请查收!");
                })
                .catch(err => {
                    this.$message.warning("服务器异常，请稍后重试!");
                })
            },
            //注册请求
            register(){
                let qs = this.$qs.stringify({
                    mail : this.account,
                    name : this.name ,
                    password : this.password,
                    mail_token : this.mailToken
                });

                this.$axios({
                    method : "POST",
                    url : "user/register",
                    data : qs
                })
                .then(res => {
                    this.$message.success("注册成功，稍后跳转登录页面.");
                    setTimeout(() => {
                        this.$router.push({path : "/signIn"});
                    },1000)
                })
                .catch(err => {
                    this.$message.warning("注册失败，请稍后重试!");
                })
            }
        }

    }
</script>

<style scoped lang="less">
    @import url(https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/css.css);

    @prim: #53e3a6;

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-weight: 300;
    }

    body{
        font-family: 'Source Sans Pro', sans-serif;
        color: white;
        font-weight: 300;

        ::-webkit-input-placeholder { /* WebKit browsers */
            font-family: 'Source Sans Pro', sans-serif;
            color:    white;
            font-weight: 300;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-family: 'Source Sans Pro', sans-serif;
            color:    white;
            opacity:  1;
            font-weight: 300;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-family: 'Source Sans Pro', sans-serif;
            color:    white;
            opacity:  1;
            font-weight: 300;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
            font-family: 'Source Sans Pro', sans-serif;
            color:    white;
            font-weight: 300;
        }
    }

    .SignOn{
        background: #50a3a2;
        background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
        background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
        background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
        background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);

        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        &.form-success{
            .container{
                h1{
                    transform: translateY(85px);
                }
            }
        }
    }

    .container{

        max-width: 600px;
        margin: 100px auto;
        padding: 80px 0;
        height: 400px;
        text-align: center;

        h1{
            font-size: 40px;
            transition-duration: 1s;
            transition-timing-function: ease-in-put;
            font-weight: 200;
            margin-bottom: 100px;
        }
    }

    form{
        padding: 20px 0;
        position: relative;
        z-index: 2;

        input{
            display: block;
            appearance: none;
            outline: 0;
            border: 1px solid fade(white, 40%);
            background-color: fade(white, 20%);
            width: 250px;

            border-radius: 3px;
            padding: 10px 15px;
            margin: 0 auto 30px auto;
            text-align: center;
            font-size: 18px;

            color: white;

            transition-duration: 0.25s;
            font-weight: 300;

            &:hover{
                background-color: fade(white, 40%);
            }

            &:focus{
                background-color: white;
                width: 300px;

                color: @prim;
            }

            &::placeholder{
                color: white;
            }
        }



        button{
            appearance: none;
            outline: 0;
            background-color: white;
            border: 0;
            padding: 10px 15px;
            color: @prim;
            border-radius: 3px;
            width: 250px;
            cursor: pointer;
            font-size: 18px;
            transition-duration: 0.25s;

            &:hover{
                background-color: rgb(245, 247, 249);
            }
        }
    }

    .bg-bubbles{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        z-index: 1;

        li{
            position: absolute;
            list-style: none;
            display: block;
            width: 40px;
            height: 40px;
            background-color: fade(white, 15%);
            bottom: -160px;

            -webkit-animation: square 25s infinite;
            animation:         square 25s infinite;

            -webkit-transition-timing-function: linear;
            transition-timing-function: linear;

            &:nth-child(1){
                left: 10%;
            }

            &:nth-child(2){
                left: 20%;

                width: 80px;
                height: 80px;

                animation-delay: 2s;
                animation-duration: 17s;
            }

            &:nth-child(3){
                left: 25%;
                animation-delay: 4s;
            }

            &:nth-child(4){
                left: 40%;
                width: 60px;
                height: 60px;

                animation-duration: 22s;

                background-color: fade(white, 25%);
            }

            &:nth-child(5){
                left: 70%;
            }

            &:nth-child(6){
                left: 80%;
                width: 120px;
                height: 120px;

                animation-delay: 3s;
                background-color: fade(white, 20%);
            }

            &:nth-child(7){
                left: 32%;
                width: 160px;
                height: 160px;

                animation-delay: 7s;
            }

            &:nth-child(8){
                left: 55%;
                width: 20px;
                height: 20px;

                animation-delay: 15s;
                animation-duration: 40s;
            }

            &:nth-child(9){
                left: 25%;
                width: 10px;
                height: 10px;

                animation-delay: 2s;
                animation-duration: 40s;
                background-color: fade(white, 30%);
            }

            &:nth-child(10){
                left: 90%;
                width: 160px;
                height: 160px;

                animation-delay: 11s;
            }
        }
    }

    @-webkit-keyframes square {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-700px) rotate(600deg); }
    }
    @keyframes square {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-700px) rotate(600deg); }
    }

    #loading{
        position: absolute;
        left: 50%;
        top: 30%;
        margin-left: -32.5px;
    }

    .backButton{
        position: absolute;
        top: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 19;

    }
    .backButton > img{
        width: 100%;
        height: 100%;
    }

    .token{
        position: relative;
        justify-content: center;
    }



    #token-button{
        top: 0;
        right: -20px;
        position: absolute;
        height: 43px;
        width: 150px;
    }

</style>