<template>
    <div class="home">
        <transition name="background">
            <div class="background" id="imageBox" v-show="display">
                <img :src="imgSrc" alt="背景图片" data-depth="0.5" >
            </div>
        </transition>

        <div class="topBar">
            <div class="icon-white">
                <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/icon-white.png" alt="icon-white">
            </div>
            <div class="router" v-if="name === ''">
                <div class="login" @click="turn">
                    Sign in
                </div>
                <div class="logon" @click="turnSignOn">
                    Sign on
                </div>
            </div>
            <div class="router" v-else  id="name" @click="turnHome">
               <p>
                   {{name}}
               </p>
            </div>
        </div>

        <div class="mainBox">
            <div class="icon-box">
                <img alt="icon" src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/icon-blue.png" />
            </div>
            <div class="title">
                <p>从这里开始</p>
            </div>
            <div class="input">
                <my-input v-bind:attr="index"></my-input>
            </div>
        </div>





    </div>
</template>

<script>
    import Parallax from "parallax-js" ;
    import MyInput from "../components/myinput";
    import decoratorDia from "../components/decoratorDia";
    export default {
        name: "home",
        components: {MyInput , decoratorDia},
        data(){
            return {
                display : true, // 背景图变换设置
                imagesArray : [
                    "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/pixiv16.jpg",
                    "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/pixiv14.jpg",
                    "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/bg2.jpg"
                ],
                imgSrc : "https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/bg2.jpg",
                index : 0, // 用于图片轮播
                name : ""
            }
        },
        mounted() {
            this.initImage(); // 初始化图片
            this.imageChange(); //背景图片轮播挂载
            if(sessionStorage.getItem("name")){
                this.name = sessionStorage.getItem("name");
            }
        },
        methods:{
            initImage(){
                let image = document.getElementById("imageBox");
                let parallaxInstance = new Parallax(image, {
                    limitX : 50,
                    limitY : 50,
                    hoverOnly : true
                })
            },

            imageChange(){
                setInterval(() => {
                    this.display = false;
                    setTimeout(() => {
                        this.index = (this.index + 1) % 3;
                        this.imgSrc = this.imagesArray[this.index];
                        this.display = true;
                    },500)

                },5000)
            },

            turn(){
                this.$router.push({path : "/signIn"});
            },
            turnSignOn(){
                this.$router.push({path : "/signon"});
            },
            turnHome(){
                this.$router.push({path : "/homepage"});
            }
        }
    }
</script>

<style scoped>
    .home{
        /*position: relative;*/


    }

    .background{
        /*opacity: 0;*/
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        /*left: -100px;*/
        /*top: -100px;*/
        /*overflow: hidden;*/
        overflow: hidden;


    }
    .background > img{
        display: block;
        width: 120%;
        height: 120%;
        margin-left: -100px;
        margin-top: -100px;
    }

    .topBar{
        height: 80px;
        z-index: 1;
        background-color: rgba(100,100,100,0.3);
        position: relative;
    }

    .router{
        height: 100%;
        position: absolute;
        right: 10%;
        min-width: 200px;
        color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
    }

    .logon{
        border: 1px solid white;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: color,border 0.2s ease-in-out;

    }
    .logon:hover{
        color: rgba(255,255,255,0.4);
        border: 1px solid rgba(255,255,255,0.4);
    }

    .login{
        cursor: pointer;
        transition: color 0.2s ease-in-out;
    }

    .login:hover{
        color: rgba(255,255,255,0.4);
    }

    .input{
        position: relative;
        right: 20px;
        top: 20px;
    }

    #name{
        display: flex;
    }

    #name > p{
        font-size: 25px;
        cursor: pointer;
        transition: 0.5s ease-out;
    }

    #name > p:hover{
        color: rgba(255,255,255,0.4);
    }

    /*动态*/

    .background-enter,.background-leave-to{
        opacity: 0;
    }

    .background-enter-active , .background-leave-active{
        transition:opacity 0.5s ease-in-out;
    }

    .background-enter-to , .background-leave{
        opacity: 1;
    }

/*   分界线*/

    .mainBox{
        background-color: rgba(250,250,250,0.8);
        border-radius: 10px;
        margin: 0 auto;
        width: 50%;
        position: relative;
        top: 50px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-top: 30px;
        align-items: center;
    }


    .title{
        margin-top: -15px;
    }

    .title > p{

        font-size: 20px;
    }

    .icon-box{
        width: 315px;
        height: 60px;

    }
    .icon-box > img{
        width: 100%;
        height: 100%;
    }

    .icon-white{
        width: 150px;
        height: 30px;
        position: absolute;
        top: 25px;
        left: 30px;
    }
    .icon-white > img{
        width: 100%;
        height: 100%;
    }


</style>