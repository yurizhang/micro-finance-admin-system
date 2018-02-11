<template>

    <div class="sidebar">
            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->


<!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#324157"  text-color="#fff"  active-text-color="#20a0ff">

    <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
    </el-submenu>

  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>

  <el-menu-item index="3">
    <i class="el-icon-setting"></i>
    <span slot="title">导航三</span>
  </el-menu-item>

</el-menu> -->
         <!-- unique-opened:是否只保持一个子菜单的展开  router:	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router  background-color="#324157"  text-color="#fff"  active-text-color="#20a0ff" :collapse="isCollapse">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title"><i :class="item.icon"></i><span slot="title">{{ item.title }}</span></template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"><span slot="title">{{ subItem.title }}</span></el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>



    </div>
</template>

<script>
    import BUS from '../../plugs/bus'
    export default {
        //props: ['isCollapse'],  //从父亲home转来
        data() {
            return {
                isCollapse:false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '控制台'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '商户管理',
                        subs: [
                            {
                                index: 'merchantlist', 
                                title: '商户信息管理'
                            },
                            // {
                            //     index: 'merchant', 
                            //     title: '商户信息录入'
                            // },                            
                            {
                                index: 'contract',
                                title: '合同查询'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '账务管理',
                        subs: [
                            {
                                index: 'merchantinfo',
                                title: '商户账户查询'
                            },
                            {
                                index: 'bail',
                                title: '保证金账户管理'
                            },
                            {
                                index: 'repayment',
                                title: '还款息费账户管理'
                            }
                
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '4',
                        title: '财务管理',
                        subs: [
                            {
                                index: 'loanrecord',
                                title: '放款记录'
                            },
                            {
                                index: 'repayrecord',
                                title: '还款记录'
                            },
                            {
                                index: 'repayschedule',
                                title: '还款计划查询'
                            },
                            {
                                index: 'filedownload',
                                title: '对账文件下载'
                            }
                        ]
                    }
                              

    
                ]
            }
        },
        created(){
            BUS.$on("isCollapse",()=>{   
                 this.isCollapse = !this.isCollapse;
            })
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            } 
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

