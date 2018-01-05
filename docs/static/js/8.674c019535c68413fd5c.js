webpackJsonp([8],{518:function(t,a,e){var n=e(200)(e(538),e(562),null,null);t.exports=n.exports},524:function(t,a,e){"use strict";e.d(a,"a",function(){return n});var n=[],i=[],r=window.SMALL_BLACK_CONFIG._DomainName1,o=window.SMALL_BLACK_CONFIG._DomainName2,l=window.SMALL_BLACK_CONFIG._DomainName3,c=(window.SMALL_BLACK_CONFIG._DEBUG,window.SMALL_BLACK_CONFIG._PRODUCT);n[0]=r+"/ola/api/merchant/queryList",i[0]="/api/merchant/queryList/",n[1]=r+"/ola/api/merchant/delete/",i[1]="/api/merchant/common/",n[2]=r+"/ola/merchant/queryById/",i[2]="/api/merchant/queryById/",n[3]=r+"/ola/api/merchant/update/",i[3]="/api/merchant/common/",n[4]=r+"/ola/api/merchant/add",i[4]="/api/merchant/common/",n[5]=o+"/olf/api/contract/queryList/",i[5]="/api/contract/queryList/",n[6]=o+"/olf/api/loan/queryList",i[6]="/api/loan/queryList/",n[7]=o+"/olf/api/repay/queryList",i[7]="/api/repay/queryList",n[8]=o+"/olf/api/repay/queryList",i[8]="/api/repaymentPlan/queryList",n[9]=r+"/ola/api//merchant/status",i[9]="/api/merchant/common/",n[10]=l+"/account/main/view",i[10]="./static/data/account.json",n[11]=l+"/margin/account/query",i[11]="./static/data/bail.json",n[12]=l+"/interestfee/account/query",i[12]="./static/data/repayment.json",n[13]=l+"/margin/account/recharge",i[13]="./static/data/recharge.json",n[14]=l+"/margin/account/postal",i[14]="./static/data/postal.json",n[15]=l+"/interestfee/account/postal",i[15]="./static/data/interestfee_postal.json",n[16]=l+"/account/change/record/query",i[16]="./static/data/history.json","DEV"==c&&(n=i)},538:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e(524),i=n.a;a.default={data:function(){return{tableData:[],cur_page:1,select_word:"",total:0,is_loading:!1}},created:function(){var t=parseInt(this.$route.query.cur_page,10)||1;this.cur_page=t,this.getData()},methods:{handleCurrentChange:function(t){this.cur_page=t,this.getData()},getData:function(){var t=this,a=this,e={merchantName:a.select_word,start:10*(a.cur_page-1),limit:10};a.$axios.post(i[0],e).then(function(t){a.tableData=t.data.data.rows,a.total=t.data.count||0,a.is_loading=!1}).catch(function(a){t.$alert(a,"错误提示",{confirmButtonText:"确定",callback:function(t){}})})},search:function(){this.is_loading=!0,this.getData()},formatter:function(t,a){return t.channelRate},handleEdit:function(t,a){this.$router.push({path:"/merchant",query:{id:a.id,cur_page:this.cur_page}})},handleDeleteWarning:function(t,a){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.handleDelete(t,a)}).catch(function(){})},handleDelete:function(t,a){var e=this;this.is_loading=!0;var n={id:a.id};this.$axios.post(i[1],n).then(function(n){e.$message.success("删除了"+a.merchantName),e.tableData.splice(t,1),e.is_loading=!1}).catch(function(t){e.is_loading=!0})},addMerchant:function(){this.$router.push("/merchant")},handleEnable:function(t,a){var e=this;console.log(a);var n=Math.abs(a.state-1),r=0==n?"启用:":"停用:",o={id:a.id,state:n};this.$axios.post(i[9],o).then(function(i){n?e.$message.error(r+a.merchantName):e.$message.success(r+a.merchantName),e.tableData[t].state=n}).catch(function(t){e.$message.error("操作失败请稍后再试:"+t)})}}}},562:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.is_loading,expression:"is_loading"}],staticClass:"table",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[e("div",{staticClass:"crumbs"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[e("i",{staticClass:"el-icon-menu"}),t._v("商户管理")]),t._v(" "),e("el-breadcrumb-item",[t._v("商户信息管理")])],1)],1),t._v(" "),e("div",{staticClass:"handle-box"},[e("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addMerchant}},[t._v("新增")]),t._v(" "),e("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"姓名或是商户名称搜索"},model:{value:t.select_word,callback:function(a){t.select_word=a},expression:"select_word"}}),t._v(" "),e("el-button",{attrs:{type:"primary",icon:"search"},on:{click:t.search}},[t._v("搜索")])],1),t._v(" "),e("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[e("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"contactName",label:"姓名",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"merchantName",label:"商户名称"}}),t._v(" "),e("el-table-column",{attrs:{prop:"contactPhone",label:"手机号码"}}),t._v(" "),e("el-table-column",{attrs:{label:"启用状态",width:"120"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n              "+t._s(0==a.row.state?"停用":"启用")+"\n              ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"channelRate",label:"服务费",width:"120",formatter:t.formatter}}),t._v(" "),e("el-table-column",{attrs:{prop:"bail",label:"保证金",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"bailThreshold",label:"保证金阀值",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"small"},on:{click:function(e){t.handleEdit(a.$index,a.row)}}},[t._v("编辑")]),t._v(" "),e("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){t.handleDeleteWarning(a.$index,a.row)}}},[t._v("删除")]),t._v(" "),e("el-button",{attrs:{size:"small",type:0==a.row.state?"warning":"success"},on:{click:function(e){t.handleEnable(a.$index,a.row)}}},[t._v(t._s(0==a.row.state?"停用":"启用"))])]}}])})],1),t._v(" "),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{layout:"prev, pager, next","page-size":10,total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]}}});