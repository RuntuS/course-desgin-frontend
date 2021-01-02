<template>
    <div class="list">

        <el-table
                :data="foldersList"
                style="width: 100%"
        row-class-name="cellGo"
        @cell-click="ReqFavo">
            <el-table-column
                    prop = "name"
                    label="文件名"
                        >
            </el-table-column>
        </el-table>
        <div class="add">
            <el-button plain  v-if="!isInput" @click="enter">增加收藏夹</el-button>
            <el-input v-model="folderName" placeholder="收藏夹名称" v-else @change="AddRequest"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "favoriteList",
        props : ["folders","imageId"],
        data(){
            return {
                foldersList : [...this.folders],
                folderName : "",
                isInput : false
            }
        },
        methods : {
            enter(){
                this.isInput = true;
            },
            AddRequest(){
                let that = this;
                //这里进行新文件夹的请求
                let qs = this.$qs.stringify({
                    token : sessionStorage.getItem("token"),
                    fName : this.folderName
                });
                this.$axios({
                    method : "POST",
                    url : "user/follow/folder/create",
                    data : qs
                })
                .then(res => {
                    console.log(res);
                    this.isInput = false;
                    this.folderName = ""; // 重制输入
                    this.$message({
                        message : "创建成功",
                        type : "success"
                    })
                        this.$axios({
                            method : "GET",
                            url : "user/follow/folder/list?token="+sessionStorage.getItem("token")
                        })
                        .then(res => {
                            that.folderList = res.data.data.slice(1,);
                            console.log(res.data.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })


                })
                .catch(err => {
                    this.$message.error("创建失败，请重新创建!");
                })
            },
            ReqFavo(res){
                let folderName = res.name;
                let qs = this.$qs.stringify({
                    token : sessionStorage.getItem("token"),
                    imageId : this.imageId,
                    folderName
                })
                this.$axios({
                    method : "POST",
                    url : "/user/follow",
                    data : qs
                })
                .then(res => {
                    this.$message.success("成功收藏图片。收藏夹："+folderName);
                })
                .catch(err => {
                    this.$message.warning("收藏失败");
                })
            }
        },
        watch :{
            folders : function(res){
                console.log(res);
                this.foldersList = res;

            }
        }
    }
</script>

<style scoped>
    .title{
        margin-left: 10px;
    }

    .add{
        margin-top: 150px;
    }
    .cellGo{
        cursor: pointer;
    }
</style>