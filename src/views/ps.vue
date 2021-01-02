<template>
    <div class="edit">

    </div>
</template>

<script>
    export default {
        name: "ps",
        data() {
            return {
                ImageEditor: ""
            };
        },
        mounted: function() {
            let imageUrl = this.$route.query.imageUrl;
            const imageE = new FilerobotImageEditor();
            imageE.open(imageUrl);
        }
    }
</script>

<style scoped>

</style>