<template>
    <div class="header">
        <div class="logo">消费金融-小贷通道后台<i  @click="Collapse" class="el-icon-menu"></i>
                    
               
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import BUS from '../../plugs/bus'
    export default {
        // data() {
        //     return {
        //         name: 'Yuri Zhang'               
        //     }
        // },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            //收起打开按钮
            Collapse(){                
                BUS.$emit('isCollapse'); //调用兄弟sidebar里的事件                
                //console.log("调用sidebar里的事件 :isCollapse:");
                console.log(this.$parent)
                this.$parent.changeContentPostion();//调用爸爸修改content的大小，使用contentcCollapse样式   
            }
        }
    }
</script>

