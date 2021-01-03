<template>
    <div class="content">
        <div class="top">
            <div class="background">
                <img
                        src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/pixiv29.jpg"
                />
            </div>
            <div class="self-inf">
                <div class="head">
                    <img alt="hh" src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/head1.png" />
                </div>
                <div class="name">
                    {{name}}
                </div>
            </div>
        </div>

        <div class="favorite">
            <p>收藏</p>
        </div>
        <div class="search-bar">
            <div class="each" >
                <div class="XJ">
                    <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/XJ.png" />
                </div>
                <div class="SC" @click="buildNew">
                    新建文件夹
                </div>
            </div>
<!--            这里列举收藏夹-->
            <div class="each" v-for="(item,index) of folderList" :id="'ea'+index" @click="requestImageInf(index)">
                <div class="XJ">
                    <img src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/WJJ.png" />
                </div>
                <div class="SC">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div id="content">
            <vue-waterfall-easy :imgsArr="imgsArr" @click="Image" id="pubu"></vue-waterfall-easy>
        </div>
        <decorator-dia :dialog-visible.sync="isValid" :image-id="imageId"></decorator-dia>

        <el-dialog
                title="新建文件夹"
                :visible.sync="vis"
                :width="Number(width) + 200 + 'px'"
                top="10vh"
                @close="closeDia"
                id="window">
            <el-input v-model="input" placeholder="新建收藏夹的名称" @change="AddRequest"></el-input>
        </el-dialog>
    </div>
</template>

<script>
    import vueWaterfallEasy from "vue-waterfall-easy";
    import DecoratorDia from "../components/decoratorDia";
    export default {
        name: "homepage",
        components: {
            DecoratorDia,
            vueWaterfallEasy
        },
        data() {
            return {
                folderList : [],
                imgsArr: [],
                input : "",
                vis : false,
                width : 100,
                beforeIndex : 0, // 用于存储上一次选择的index
                defaultFolder : "",
                name : sessionStorage.getItem("name"),
                isValid : false,
                imageId : 0
            };
        },
        methods: {
            requestFoldersList(){
                return new Promise((resolve , reject) => {
                    this.$axios({
                        method : "GET",
                        url : `user/follow/folder/list?token=${sessionStorage.getItem("token")}`
                    })
                        .then(res => {
                            let resData = res.data;
                            this.folderList = resData.data;
                            console.log(resData.data);
                            resolve();
                        })
                        .catch(err => {
                            reject(err);
                        })
                })

            },
            //进入页面时默认请求
            requestDefaultFolder(){
                let that = this;
                return new Promise((resolve,reject) => {
                    if(that.folderList.length === 0){
                        resolve();
                    }else{
                        let doc = document.getElementById("ea0");
                        doc.classList.add("eaChange");
                        let name = this.folderList[0].name;
                        this.$axios({
                            method : "GET",
                            url : `user/follow/images/list?folderName=${name}&token=${sessionStorage.getItem("token")}`
                        })
                        .then(res => {
                            let resData = res.data;
                            this.imgsArr = resData.data;
                            resolve();
                        })
                        .catch(err => {
                            reject();
                        })
                    }
                })
            },
            requestImageInf(index){
                //样式变换
                let beforeDoc = document.getElementById("ea"+this.beforeIndex);
                beforeDoc.classList.remove("eaChange");
                let doc = document.getElementById("ea"+index);
                doc.classList.add("eaChange");
                this.beforeIndex = index; //记录
                //请求
                let name = this.folderList[index].name;
                this.$axios({
                    method : "GET",
                    url : `user/follow/images/list?folderName=${name}&token=${sessionStorage.getItem("token")}`
                })
                .then(res => {
                    let resData = res.data;
                    console.log(resData);
                    this.imgsArr = resData.data;
                })
                .catch(err => {
                    console.log(err);
                })
            },
            buildNew(){
                this.vis = true;
            },

            //关闭弹出回调
            closeDia(){
                this.vis = false;
                this.input = false;
            },
            AddRequest(){
                let qs = this.$qs.stringify({
                    token : sessionStorage.getItem("token"),
                    fName : this.input
                });

                this.$axios({
                    method : "POST",
                    url : "user/follow/folder/create",
                    data : qs
                })
                .then(res => {
                    this.vis = false;
                    this.$message.success("创建成功，收藏夹名:"+this.input);
                    this.input = "";

                    location.reload();
                })
                .catch(err => {
                    this.$message.warning("创建失败，服务器异常.")
                    console.log(err);
                })
            },
        //    高清图
            Image(event,target){
                let id =  target.value._id;
                this.imageId = id;
                this.isValid = true;
            }
        },
        async mounted() {
            // this.imgsArr = this.imgsArr_1;
            await this.requestFoldersList();
            await this.requestDefaultFolder();
        }
    };
</script>

<style scoped>
    .content {
        width: 100%;
        height: 1500px;
        position: relative;
    }
    .top {
        height: 600px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .self-inf {
        width: 10%;
        height: 100px;
        position: relative;
    }
    .self-inf {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateY(-50%);
        transform: translateX(-50%);
    }
    .head {
        width: 150px;
        height: 150px;
    }
    .head > img {
        border-radius: 75px;
        width: 100%;
        height: 100%;
    }
    .name {
        font-size: 50px;
        font-weight: 400;
        color: white;
    }
    .background {
        width: 100%;
        z-index: -1;
    }
    .background > img {

        width: 100%;
        height: 100%;
    }
    .favorite {
        position: relative;
        width: 90%;
        margin: 100px auto;
    }
    .favorite > p {
        position: absolute;
        top: -80px;
        left: 10px;
        font-size: 40px;
    }
    #content {
        position: absolute; /*必须*/
        top: 700px; /*top必须，大小可控制*/
        bottom: 0; /*bottom必须，一直延申到当前块底部*/
        width: 90%;
        left: 16%;
        border-radius: 10px;
        background-color: rgba(230, 230, 230, 0.6);
    }
    .search-bar {
        border: 1px solid rgb(50, 50, 50);
        border-radius: 10px;
        width: 10%;
        height: 600px;
        /*background-color: rgba(244,244,244,0.9);*/
        margin-left: 5%;
    }
    .each {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 50px;
        border-bottom: 1px rgb(100, 100, 100) solid;
        transition: background-color 0.5s ease-in-out;
    }
    .XJ {
        width: 25px;
        height: 25px;
    }
    .XJ > img {
        width: 100%;
        height: 100%;
    }
    .eaChange {
        background-color: #1ebfff;
        color: white;
    }
    .each:hover {
        background-color: rgba(81, 205, 255, 0.6);
    }

    #pubu{
        z-index: 10;
    }
</style>