<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        
        <div class="content" :class="Collapse?'contentcCollapse':''">
            <!-- <div>abcdefg.....</div> -->
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        data(){
            return {
                Collapse:false
            }
        },
        methods:{
            changeContentPostion(){
                this.Collapse=!this.Collapse;
            }

        },
        components:{
            vHead, vSidebar
        }
    }
</script>
