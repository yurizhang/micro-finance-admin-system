<template>

    <div class="sidebar">
            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router  background-color="#324157"
      text-color="#fff"
      active-text-color="#20a0ff" :collapse="isCollapse">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
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
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }

</style>
