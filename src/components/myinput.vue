<template>
    <div class="search-container">
        <input type="text" id="search-bar" placeholder="你想要搜索的内容" @keydown="RequestImages" v-model="tag">
        <a href="#"><img class="search-icon" src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1/search-icon.png" alt="标识符"></a>
    </div>
</template>

<script>
    export default {
        name: "myInput",
        props: ["attr"],
        data(){
            return {
                value : this.attr, // 可以直接赋值
                tag : "",
                timeoutId : "" // 控制节流所用
            }
        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {
            console.log(this.value)
        },
        mounted() {
            console.log(this.value);
        },
        methods:{
            RequestImages(e){
                let that = this;
                if(this.timeoutId){
                    clearTimeout(that.timeoutId);
                }
                if(e.key === "Enter"){
                    that.timeoutId = setTimeout(() => {
                        console.log(that.tag);
                        that.$router.push({path : "/images" , query : {tags : this.tag}});
                    },200);
                }
            }
        }
    }
</script>

<style scoped>



    .search-container{
        width: 490px;
        display: block;
        margin: 0 auto;
    }

    #search-bar {
        border-radius: 10px;
        margin: 0 auto;
        width: 100%;
        height: 45px;
        padding: 0 20px;
        font-size: 1rem;
        border: 1px solid #D0CFCE;
        outline: none;
        transition: 0.35s ease;
        background-color: rgba(255,255,255,0.6);
    }
    #search-bar:focus{
        border: 1px solid #008ABF;
        background-color: rgba(255,255,255,1);
        color: #008ABF;
        box-shadow: 1px 1px 4px 1px ;
    }


    .search-icon{
        position: relative;
        float: right;
        width: 75px;
        height: 75px;
        top: -62px;
        right: -45px;
    }





</style>