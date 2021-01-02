<template>
    <div class="image">
<!--        topBar开始-->
        <div class="topBar">
            <div class="icon">
                <img src="https://pixivic.com/img/icon.9a42bbfa.svg" alt="icon">
            </div>

            <div class="searchBar">
                <input placeholder="输入关键词" @keyup="search" v-model="newTag">
                <div class="search-icon">
                    <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/search-icon.png" alt="search-icon">
                </div>
            </div>

            <div class="userBox">
<!--                登录-->
                <div class="user" v-if="isSignIn" >
                    <div class="userImage" @click="turnHome">
                        <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/head1.png" alt="用户头像">
                    </div>
                    <p>{{userInfo.userName}}</p>
                </div>

<!--                没有登录-->
                <div class="sign" v-else  @click="turnSignIn">
                    Sign In
                </div>
            </div>
        </div>

<!--        topBar结束-->

        <div class="imagesBox">
            <vue-waterfall-easy :imgsArr ="list" :srcKey="type.url"   @scrollReachBottom="requestImages(pageNum)" id="waterfall" @click="Image">
                <div class="imgInfo" slot-scope="props">
                    <p class="title">{{props.value.title}}</p>
                    <p class="tags">{{props.value.tags}}</p>
                </div>
            </vue-waterfall-easy>
        </div>

        <decorator-dia :dialog-visible.sync="isValid"  :image-id.sync="imageId" ></decorator-dia>



    </div>
</template>

<script>
    import vueWaterfallEasy from "vue-waterfall-easy"
    import DecoratorDia from "../components/decoratorDia";
    export default {
        name: "Images",
        components : {DecoratorDia, vueWaterfallEasy},
        data(){
            return {
                tags : this.$route.query.tags,  // 可以直接赋值
                newTag : this.$route.query.tags, // 本页面input
                list : [],
                type : {
                    url : 'ossUrl',
                },
                pageNum : 1,
                asyncId : "", // 防抖id
                isSignIn : false,
                userInfo : {
                    token : '',
                    userName : ""
                },
                //高清图控制
                isValid : false,
                imageId : ""
            }
        },
        methods : {
            requestImages(pageNum){
                let queryStr = this.$qs.stringify({
                    tag : this.tags,
                    pageNum : pageNum
                })
                this.$axios({
                    method : "get",
                    url : `photo/search?${queryStr}`
                })
                .then(res => {
                    console.log(res.data);
                    this.list = this.list.concat(res.data);
                    this.pageNum++;
                })
                .catch(err => {

                })
            },
            search(event){
                if(this.asyncId !== ""){
                    clearTimeout(this.asyncId);
                }
                if(event.key === 'Enter') {
                    this.asyncId = setTimeout(() => {
                        this.$router.push({ path : "/images", query : {tags : this.newTag}})
                    }, 500);
                }
            },

            turnSignIn(){
                this.$router.push({path : "/signIn"})
            },

            // 高清图查阅
            Image(event , target){
                if(event.target.tagName.toLowerCase() === 'img'){
                    let imageId = target.value._id;
                    this.imageId = imageId;
                    this.isValid = true;
                }
            },
            turnHome(){
                this.$router.push({path : "/homepage"});
            }
        },
        mounted() {
            console.log(this.tags);
            this.requestImages(this.pageNum);
            if(sessionStorage.getItem("token")){
                this.isSignIn = true;
                this.userInfo.userName = sessionStorage.getItem("name");
                this.userInfo.token = sessionStorage.getItem("token");
            }
        }
    }
</script>

<style>

    .image{
        position: relative;
        height: 100%;
    }

    .topBar{
        z-index: 1;
        position: fixed;
        top: 0;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid rgba(150,150,150,0.6);
        background-color: rgba(250,250,250,0.4);
    }

    .searchBar{
        width: 60%;
        display: flex;
        align-items: center;

    }

    .searchBar > input{
        width: 60%;
        height: 50%;
        border-radius: 5px;
        outline: 0;
        border: 1px solid rgba(200,200,200,0.6);
        font-size: 16px;
        transition: 0.2s ease-out;
        padding-left: 10px; /*padding可以设置内部字体到输入边框的距离*/
    }

    .searchBar > input:focus{
        border: 1px solid rgba(86,170,255,0.7);
    }

    .searchBar > input::placeholder{
        color: rgba(150,150,150,0.6);
        font-family: inherit;
        font-size: 16px;

    }

    .search-icon{
        width: 50px;
        height: 50px;
    }

    .search-icon > img{
        width: 100%;
        height: 100%;
    }


/*    用户信息部分设置*/
    .userBox{
        min-width: 120px;
        display: flex;
        align-items: center;
    }

    .user{
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-around;
    }
    .user > p{
        font-size: 18px;
    }
    .userImage{
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 25px;
        cursor: pointer;
    }
    .userImage > img{
        width: 100%;
        height: 100%;
    }

    .sign{
        cursor: pointer;
        border: 1px solid rgba(150,150,150,0.7);
        padding: 10px;
        font-weight: 400;
        border-radius: 5px;
        transition: 0.2s ease-out;
    }

    .sign:hover{
        background-color: rgba(240,240,240,0.6);
    }


/*    图片部分设置*/
    .imagesBox{

        height: 100%;

    }

    #waterfall{
        padding-top: 80px;

    }



    .imgInfo{
        padding-left: 10px;
        padding-right: 10px;
        min-height: 100px;
    }

    .title{
        text-align: left;
        font-size: 1.2em;
        font-weight: 500;
    }

    .tags{
        font-size: 10px;
        text-align: left;
    }

    .img-wraper{
        cursor: pointer;
        transition: 0.2s ease-out;
    }

    .img-wraper:hover{
        opacity: 0.8;
    }

    #dialog{
        width: 100%;
    }



</style>