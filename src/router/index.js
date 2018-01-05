import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/merchant',
                    component: resolve => require(['../components/page/Merchant.vue'], resolve)
                },
                {
                    path: '/merchantlist',
                    component: resolve => require(['../components/page/MerchantList.vue'], resolve)
                },               
                {
                    path: '/merchantinfo',
                    component: resolve => require(['../components/page/Merchantinfo.vue'], resolve)
                },  
                
                {
                    path: '/bail',  //保证金帐户
                    component: resolve => require(['../components/page/Bail.vue'], resolve)
                }, 
                {
                    path: '/repayment',  //还款利息
                    component: resolve => require(['../components/page/Repayment.vue'], resolve)
                }, 

                {
                    path: '/loanrecord',  //代款记录
                    component: resolve => require(['../components/page/LoanRecord.vue'], resolve)
                }, 
                {
                    path: '/repayrecord',  //还款记录
                    component: resolve => require(['../components/page/RepayRecord.vue'], resolve)
                }, 

                {
                    path: '/repayschedule',  //还款计划记录
                    component: resolve => require(['../components/page/RepaySchedule.vue'], resolve)
                },               
                {
                    path: '/filedownload',  //文件下载
                    component: resolve => require(['../components/page/FileDownload.vue'], resolve)
                },                  
                {
                    path: '/contract',  //合同查询
                    component: resolve => require(['../components/page/Contract.vue'], resolve)
                } 




                // {
                //     path: '/vuetable',
                //     component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                // },
                // {
                //     path: '/baseform',
                //     component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                // },
                // {
                //     path: '/vueeditor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                // },
                // {
                //     path: '/basecharts',
                //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                // },
                // {
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
