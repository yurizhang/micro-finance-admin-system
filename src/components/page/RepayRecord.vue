<template>
    <div class="table" v-loading="is_loading"   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>财务管理</el-breadcrumb-item>
                <el-breadcrumb-item>还款记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
           
            <!-- <el-button type="danger" icon="e-icon-remove" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <el-select v-model="select_cate" placeholder="还款状态" class="handle-select mr10">
                <el-option key="1" label="全部" value="0"></el-option>
                <el-option key="2" label="还款中" value="1"></el-option>
                <el-option key="3" label="已还款" value="2"></el-option>
                <el-option key="4" label="还款失败" value="3"></el-option>
            </el-select>

            <el-input v-model="select_word" placeholder="订单ID或商户ID" class="handle-input mr10"></el-input>
            <el-input v-model="select_word" placeholder="商户名称,手机号搜索" class="handle-input mr10"></el-input>
       
            <el-date-picker
                    v-model="loanDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="还款开始日期"
                    end-placeholder="还款结束日期"
                    value-format="yyyy-mm-dd"
                    :picker-options="pickerOptions2">
                </el-date-picker>



            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>


        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
         

            <el-table-column prop="date" label="序号" sortable width="80">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单ID" width="120"></el-table-column>
            <el-table-column prop="id" label="还款ID"></el-table-column>
            <el-table-column prop="memberId" label="贷款人ID" :formatter="formatter"></el-table-column>
            <el-table-column prop="memberName" label="贷款人姓名"></el-table-column>
            <el-table-column prop="merchantName" label="商户名称"></el-table-column>
            <el-table-column prop="outOrderId" label="还款流水号"></el-table-column>
            <el-table-column prop="repaymentState" label="还款状态" :formatter="formatter"></el-table-column>
            <el-table-column prop="-" label="应还本金"></el-table-column>
            <el-table-column prop="-" label="应还利息"></el-table-column>
            <el-table-column prop="repaymentCapital" label="已还本金"></el-table-column>
            <el-table-column prop="repaymentInterest" label="已还利息"></el-table-column>
            <el-table-column prop="-" label="实际还款时间"></el-table-column>          
            <el-table-column prop="-" label="备注"></el-table-column>


           <!-- rows: [
            id:10000 ,  //id
            merchantId:10000, //商户号 整形
            merchantName:"商户名称", //商户名称
            memberId:"1000010", // 会员号
            orderId:"201708180000000011", // 订单号
            repaymentId:"201708260000000012", // 还款单号
            outOrderId:"xxxxxxxxx", // 外部订单号
            memberName:"会员姓名", //会员姓名
            repaymentState:1, //1 成功 2 失败 3处理中
            repaymentTotal:1100.00, // 已还金额
            repaymentCapital:1000.00， //已还本金
            repaymentInterest:20.00, //已还利息
            repaymentCharge:80.00,//已还手续费
            repaymentForfeit:0.00 //已还罚息
        ] -->

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
                select_cate: '',                      
                select_word: '',  //搜索关键字
                select_word2: '',
                total:0,  //共多少条记录，由后台返回
                is_loading: false,

                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                loanDate: ''  //放款时间搜索
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
                    select_word:self.select_word, //订单ID或是商户ID
                    select_word2:self.select_word2, //商户名称,手机号搜索
                    loanDate:self.loanDate,
                    start:(self.cur_page-1)*10,
                    limit:10,  //每页显示10条               
                    start:0,
                    limit:10
                }

                self.$axios.post(__URILIST[7], request).then((res) => {
                    self.tableData = res.data.data.rows;
                    self.total=res.data.data.count || 0;
                    self.is_loading = false;
                }).catch(()=>{
                    self.is_loading = true;
                });
            },
            search(){
                this.is_loading = true;
                console.log(this.loanDate);
            },
            formatter(row, column) {
                //格式 化数据
                ////1 成功 2 失败 3处理中
                //console.log(row)
               // console.log(column)
               // row.name='xxxxxxxxxxxxxxxxx';
                //row.repaymentState='成功';
                if(column.property=='repaymentState'){
                    return '成功'
                }else if(column.property=='memberId'){
                    return row.memberId;
                }
            }

 
        }
    }
</script>
