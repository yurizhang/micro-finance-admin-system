<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>合同查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addMerchant">新增</el-button> -->
            <!-- <el-button type="danger" icon="e-icon-remove" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <el-input v-model="select_word" placeholder="用户ID,订单号" class="handle-input mr10"></el-input>
            <el-input v-model="select_word2" placeholder="手机号搜索" class="handle-input mr10"></el-input>
            <el-select v-model="select_cate" placeholder="合同类型" class="handle-select mr10">
                <el-option key="" label="全部" value=""></el-option>
                <el-option key="1" label="贷款合同" value="1"></el-option>
                <el-option key="2" label="代扣合同" value="2"></el-option>
            </el-select>
            
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>







        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="memberId" label="会员ID" sortable width="100">
            </el-table-column>
            <el-table-column prop="merchantId" label="商户ID" sortable width="100">
            </el-table-column>
            <el-table-column prop="orderId" label="订单号" width="120">
            </el-table-column>
            <el-table-column prop="contractType" label="合同类型"  :formatter="formatter"></el-table-column>
            <el-table-column prop="contactPhone" label="添加时间"></el-table-column>

            <el-table-column prop="contractUrl" label="合同URL">
                <template slot-scope="scope">
                   <a :href="scope.row.contractUrl" target="_blank">查看</a>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            


        </el-table>

        
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="10" 
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import  * as _global from '../../plugs/global';
    const __URILIST=_global.URILIST;
    export default {
        data() {
            return {
                //url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                select_cate:'',
               // multipleSelection: [], //多选中的值          
                select_word: '',  //搜索关键字
                select_word2:'',
                //del_list: [],    //{ "date": "1978-06-18",   "name": "魏强",   "address": "广东省 韶关市 始兴县"}   里面是对象
                total:0,  //共多少条记录
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                // if(process.env.NODE_ENV === 'development'){
                //     self.url = '/ms/table/list';
                // };
                //console.log(this.url);
                const request={
                    // merchantId:10000, //商户号 整形
                    // memberId:"1000010", // 会员号
                    // orderId:"201708180000000011", // 订单号
                    contractType:self.select_cate,
                    select_word:self.select_word,
                    select_word2:self.select_word2,
                    start:(self.cur_page-1)*10,
                    limit:10  //每页显示10条
                }
                self.$axios.post(__URILIST[5], request).then((res) => {
                    self.tableData = res.data.data.rows;
                    self.total=res.data.count || 0;
                   // console.log(this.tableData);
                })
            },
            search(){
                this.is_search = true;
                this.getData();
            },
            formatter(row, column) {
                //格式 化数据
                return row.contractType==0 ? '贷款合同' : '代扣合同';
            },
              formatter2(row, column) {
                //格式 化数据
                return '<a href="'+row.contractUrl+'">查看</a>';
            }
 
        }
    }
</script>

