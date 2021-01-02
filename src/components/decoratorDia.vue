<template>
    <div class="dialog-my">
        <el-dialog
                title="清晰图"
                :visible.sync="vis"
                :width="Number(width) + 200 + 'px'"
                top="10vh"
                @close="closeDia"
                id="window">
            <loading v-if="isLoading"></loading>
            <div class="high-image-box" :style="{width : width + 'px' , height : height + 'px'}" v-if="isLoadingOver">
                <img :src="imageUrl" alt="插图">
            </div>
            <div class="star-fav" v-if="isLoadingOver"> <!--点赞 收藏盒子-->
                <!--                    点赞 -->
                <div class="fav">
                    <div class="icon-box-2 icon-box" v-if="!isStar" @click="RStar" >
                        <svg t="1609378457021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3422" width="40" height="40"><path d="M512.910222 919.893333c-31.374222 0-55.409778-20.423111-70.769778-35.783111C405.831111 847.800889 155.804444 546.816 136.533333 523.591111c-45.326222-45.809778-70.257778-106.282667-70.257777-170.424889 0-64.597333 25.287111-125.468444 71.210666-171.377778l6.456889-6.456888a241.493333 241.493333 0 0 1 171.904-71.210667c64.924444 0 125.980444 25.287111 171.904 71.210667 1.052444 1.052444 2.033778 2.190222 2.901333 3.399111 0.028444 0 8.234667 10.197333 21.347556 10.197333 13.738667 0 19.896889-8.120889 20.551111-9.045333 1.166222-1.92 2.090667-2.958222 3.697778-4.551111a241.493333 241.493333 0 0 1 171.904-71.210667 241.493333 241.493333 0 0 1 171.904 71.210667l6.456889 6.456888c45.923556 45.909333 71.210667 106.780444 71.210666 171.377778 0 64.128-24.917333 124.572444-70.200888 170.368-19.242667 23.409778-262.030222 318.805333-303.815112 360.590222-15.36 15.36-39.409778 35.768889-70.798222 35.768889zM315.847111 160.995556a185.002667 185.002667 0 0 0-131.683555 54.542222l-6.456889 6.456889c-35.171556 35.171556-54.542222 81.749333-54.542223 131.157333 0 49.408 19.370667 95.985778 54.542223 131.157333 0.625778 0.611556 1.208889 1.265778 1.777777 1.948445 92.472889 111.402667 274.773333 329.514667 302.890667 357.632 12.686222 12.686222 22.954667 19.114667 30.535111 19.114666 9.457778 0 21.845333-10.382222 30.563556-19.114666 32.512-32.526222 211.072-248.078222 300.928-357.518222 0.597333-0.725333 1.223111-1.408 1.877333-2.062223 35.171556-35.171556 54.542222-81.763556 54.542222-131.157333 0-49.408-19.370667-95.985778-54.542222-131.157333l-6.456889-6.456889a185.002667 185.002667 0 0 0-131.683555-54.542222c-48.952889 0-95.047111 18.773333-130.019556 52.906666-6.983111 9.344-27.804444 31.900444-66.133333 31.900445-36.750222 0-59.079111-23.438222-65.592889-31.388445a184.96 184.96 0 0 0-130.545778-53.418666z" p-id="3423" fill="#bfbfbf"></path><path d="M190.122667 336.696889a14.208 14.208 0 0 1-13.724445-17.991111 147.370667 147.370667 0 0 1 37.916445-64.981334l3.996444-3.996444a146.602667 146.602667 0 0 1 137.742222-39.296 14.222222 14.222222 0 1 1-6.442666 27.704889 118.215111 118.215111 0 0 0-111.175111 31.701333l-3.996445 3.996445a118.940444 118.940444 0 0 0-30.606222 52.423111 14.264889 14.264889 0 0 1-13.710222 10.439111zM416.597333 273.991111a14.179556 14.179556 0 0 1-10.055111-4.167111 120.675556 120.675556 0 0 0-15.445333-13.041778 14.208 14.208 0 0 1-3.370667-19.825778 14.208 14.208 0 0 1 19.825778-3.384888c6.798222 4.807111 13.226667 10.24 19.114667 16.128a14.208 14.208 0 0 1-10.069334 24.291555z" p-id="3424" fill="#bfbfbf"></path></svg>
                    </div>
                    <div class="icon-box-2 icon-box" v-else   @click="RStar">
                        <svg t="1609378602806" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1159" width="40" height="40"><path d="M938.666667 362.666667A234.666667 234.666667 0 0 0 704 128 271.36 271.36 0 0 0 512 216.32 271.36 271.36 0 0 0 320 128 234.666667 234.666667 0 0 0 85.333333 362.666667c0 167.253333 202.666667 352 298.666667 448l97.28 97.28a32 32 0 0 0 22.613333 9.386666h16.213334a32 32 0 0 0 22.613333-9.386666L640 810.666667c96-96 298.666667-280.746667 298.666667-448z" p-id="1160" fill="#FF4060"></path></svg>
                    </div>
                </div>

                <div class="star" >

<!--                    收藏-->
                    <div class="icon-box-1 icon-box" v-if="isFavorite" @click="Rfavo">
                        <svg t="1609378085520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="40" height="40"><path d="M512 736.853333L775.68 896l-69.973333-299.946667L938.666667 394.24l-306.773334-26.026667L512 85.333333 392.106667 368.213333 85.333333 394.24l232.96 201.813333L248.32 896z" p-id="2278" fill="#cdcdcd"></path></svg>
                    </div>
                    <div class="icon-box-1 icon-box" v-else @click="Rfavo">
                        <svg t="1609378085520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="40" height="40"><path d="M512 736.853333L775.68 896l-69.973333-299.946667L938.666667 394.24l-306.773334-26.026667L512 85.333333 392.106667 368.213333 85.333333 394.24l232.96 201.813333L248.32 896z" p-id="2278" fill="#f4ea2a"></path></svg>
                    </div>
                </div>

                <div class="ps icon-box" @click="goPs">
                    <svg t="1609382643069" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5573" width="40" height="40"><path d="M768 128H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128V256a128 128 0 0 0-128-128z" fill="#50E6FF" p-id="5574"></path><path d="M768 853.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333V256a85.333333 85.333333 0 0 1 85.333333-85.333333h512a85.333333 85.333333 0 0 1 85.333333 85.333333v512a85.333333 85.333333 0 0 1-85.333333 85.333333z" fill="#092347" p-id="5575"></path><path d="M309.482667 327.936c0-2.261333 1.642667-4.16 3.882666-4.416 8.533333-0.938667 32.341333-2.88 83.136-2.88 76.544 0 130.154667 30.357333 130.154667 113.429333 0 74.922667-51.008 118.890667-133.312 118.890667h-25.941333v125.482667c0 2.090667-1.706667 3.797333-3.797334 3.797333h-50.304a3.797333 3.797333 0 0 1-3.797333-3.797333v-350.506667z m57.92 172.266667s25.322667 0.170667 31.04 0.170666c46.997333 0 68.373333-27.861333 68.373333-65.194666 0-34.965333-20.778667-62.229333-64.213333-62.229334-17.898667 0-35.178667 1.024-35.178667 1.024v126.229334zM557.994667 618.026667c0-2.026667 2.197333-3.285333 3.882666-2.176 10.752 7.189333 32.576 19.498667 66.368 19.498666 22.058667 0 36.010667-9.493333 36.010667-24.981333 0-17.152-23.573333-29.589333-43.029333-40.149333-19.349333-10.496-62.805333-27.349333-62.805334-81.621334 0-48.106667 38.442667-77.12 90.794667-77.12 20.053333 0 42.176 3.114667 57.109333 8.554667a6.186667 6.186667 0 0 1 3.946667 5.909333v48.874667c0 2.005333-2.112 3.306667-3.797333 2.197333-9.365333-6.122667-30.016-15.488-58.432-15.488-23.658667 0-34.069333 11.52-34.069334 23.253334 0 20.565333 27.392 29.162667 51.968 43.584 38.336 21.333333 56.106667 42.176 56.106667 74.837333 0 53.418667-39.829333 83.413333-93.781333 83.413333-27.861333 0-54.058667-6.08-67.456-14.229333a6.101333 6.101333 0 0 1-2.794667-5.354667l-0.021333-49.002666z" fill="#FFFFFF" p-id="5576"></path></svg>
                </div>



            </div>

<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="vis = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="vis = false">确 定</el-button>-->
<!--            </span>-->

            <el-dialog
                    width="30%"
                    title="添加收藏夹"
                    :visible.sync="innerVisible"
                    append-to-body
                    @close="closeTwoDia">
                <favorite-list v-bind:folders="folderList" :image-id="_id">

                </favorite-list>
            </el-dialog>

        </el-dialog>
    </div>
</template>

<script>
    import Loading from "./loading";
    import FavoriteList from "./favoriteList";
    export default {
        name: "decoratorDia",
        components: {FavoriteList, Loading},
        props : ["imageId" , "dialogVisible","imageInfo"],
        data() {
            return {
                vis: this.dialogVisible,
                _id : this.imageId,
                imageUrl : "",
                width : "400",
                height : "800",
                baseLength : 1200,
                // 点赞收藏盒子相关
                isStar : false, // 是否点赞
                isFavorite : false, // 是否收藏
                // 加载是否完成
                isLoadingOver : false,
                innerVisible : false,
                // 用户收藏夹
                folderList : [],
                //加载动画控制
                isLoading : false
            };
        },
        methods: {
            closeDia(){
                this.vis = false;
                this.imageUrl = "";
                this._id = "";
                this.isStar = false;
                this.isFavorite = false;
                this.isLoadingOver = false;
                this.$emit("update:dialogVisible" , false);
                this.$emit("update:imageId","");
            },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             done();
            //         })
            //         .catch(_ => {});
            // }
            closeTwoDia(){
                this.innerVisible = false;
            },
            requestHighImage(id){
                this.isLoading = true;
                this._id = id;
                let qs = this.$qs.stringify({
                    imageId : id,
                    token : sessionStorage.getItem("token")
                })
                this.$axios({
                    url : "photo/search/highQuaImage?"+qs,
                    method : "get"
                })
                .then(res => {
                    console.log(res.data);
                    let resData = res.data;
                    this.imageUrl = resData.data.url[0];
                    let imageWidth = Number(resData.data.width);
                    let imageHeight = Number(resData.data.height);
                    this.isStar = resData.data.isStar;
                    this.isLoadingOver = true;
                    this.isLoading = false;
                    this.width = (imageWidth  / (imageWidth + imageHeight)) * this.baseLength ;
                    this.height = (imageHeight / (imageWidth + imageHeight)) * this.baseLength ;
                })
                .catch(err => {
                    console.log(err);
                })
            },

            RStar(){
                let standTag = this.isStar ? "/cancel" : ""; // 判断现在图片是否点赞
                let imageId = this._id;
                // console.log("图片id",that._id);
                let qs = this.$qs.stringify({
                    token : sessionStorage.getItem("token"),
                    imageId : imageId
                })
                this.$axios({
                    method : "POST",
                    url : "/user/star"+standTag,
                    data : qs
                })
                .then(res => {
                    this.isStar = !this.isStar;
                    if(this.isStar){
                        this.$message.success("成功点赞");
                    }else{
                        this.$message.success("取消点赞")
                    }
                }).catch(err => {

                })
            },

            // 收藏请求
            Rfavo(){
                console.log("Hello")

                this.$axios({
                    method : "GET",
                    url : "user/follow/folder/list?token="+sessionStorage.getItem("token")
                })
                .then(res => {
                    let resData = res.data;
                    let folders = resData.data.slice(0,);
                    this.folderList = folders;
                    // console.log('父组件',resData.data.slice(0,));
                    this.innerVisible = true;
                })
                .catch(err => {
                    console.log(err);
                })
            },

            goPs(){
                let routerUrl = this.$router.resolve({
                    name : "psPage",
                    query : {
                        imageUrl : this.imageUrl
                    }
                })
                // this.$router.push({name : "psPage", params : {imageUrl : this.imageUrl}})
                window.open(routerUrl.href,"_blank");
            }
        },
        watch:{
            dialogVisible : function(val){
                this.vis = val;
            },

            imageId : function(val){
                // 这个里面来请求
                if(val !== ""){ // 由于退出弹窗时，会启动一次触发器，防止无效请求
                    this.requestHighImage(val);
                }
                this._id = val;
            }
        }
    }
</script>

<style scoped>
    .dialog-my{
        width: 100%;
    }
    #window{
        /*position: relative;*/
    }

    .star-fav{
        z-index: 1;
        position: absolute;
        top: 200px;
        right: 75px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .high-image-box > img{
        width: 100%;
        height: 100%;
    }
    
    .icon-box{
        cursor: pointer;
    }
</style>