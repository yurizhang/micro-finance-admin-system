<template>
    <div class="table" v-loading="is_loading"   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>账户管理</el-breadcrumb-item>
                <el-breadcrumb-item>商户账户查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
           
            <!-- <el-button type="danger" icon="e-icon-remove" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select> -->
            
            <el-input v-model="select_word" placeholder="输入商户ID或商户名称搜索" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>


        <el-table :data="tableData" border style="width: 90%" ref="multipleTable" >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->

            <el-table-column label="序号" sortable width="100">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="merchantId" sortable label="商户ID" width="100"></el-table-column>
            <el-table-column prop="merchantName" sortable label="商户名称"></el-table-column>

            <el-table-column prop="totalMarginAmount" label="保证金总额"></el-table-column>
            <el-table-column prop="totalPrincipalAmount" label="账户余额"></el-table-column>
            <el-table-column prop="totalInterestFeeAmount" label="息费账户总额"></el-table-column>
   
            <!-- <el-table-column label="操作" width="180">
                <template slot-scope="scope">                                       
                    <el-button size="small" :type="scope.row.state==0? '' : 'danger'" @click="handleDelete(scope.$index, scope.row)">{{scope.row.state==0? '停用' : '启用'}}</el-button>                     
                </template>
            </el-table-column> -->
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
                tableData: [],
                cur_page: 1,      
                select_word: '',  //搜索关键字0
                total:0,  //共多少条记录，由后台返回
                is_loading: false
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
                let request={
                    selectWord:self.select_word,
                    //merchantId:self.select_word,
                    start:(self.cur_page-1)*10,
                    limit:10  //每页显示10条
                }
                self.$axios.get(__URILIST[10], {params: request }).then((res) => {
                    self.tableData = res.data.data.rows;
                    self.total=res.data.data.count || 0;
                    self.is_loading = false;
                }).catch(err=>{
                    this.$alert(err, '错误提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            // this.$message({
                            // type: 'info',
                            // message: `action: ${ action }`
                            // });
                        }
                    });
                })
            },
            search(){
                this.is_loading = true;
                this.getData();
            },
            formatter(row, column) {
                //格式 化数据
                return row.name;
            }
        }
    }
</script>

