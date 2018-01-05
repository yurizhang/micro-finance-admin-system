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


        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" height="600">
         

            <el-table-column prop="date" label="序号" sortable width="80" fixed>
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单ID" width="100"></el-table-column>           
            <el-table-column prop="memberId" label="贷款人ID"></el-table-column>
            <el-table-column prop="memberName" label="贷款人姓名"></el-table-column>
            <el-table-column prop="merchantId" label="商户名称"></el-table-column>
            <el-table-column prop="termCapital" label="贷款金额"></el-table-column>
            <el-table-column prop="-" label="贷款利率"></el-table-column>
            <el-table-column prop="planStartDate" label="贷款时间"></el-table-column>
            <el-table-column prop="-" label="贷款期限"></el-table-column>
            <el-table-column prop="state" label="还款状态"></el-table-column>
            <el-table-column prop="-" label="还款更新时间"></el-table-column>
            <el-table-column prop="repaymentCapital" label="累计已还本金"></el-table-column>
            <el-table-column prop="repaymentInterest" label="累计已还利息"></el-table-column>          
            <el-table-column prop="remainCapital" label="剩余未还本金"></el-table-column>
            <el-table-column prop="remainInterest" label="剩余未还利息"></el-table-column>


<!-- [
            id:10000 ,  //id
            merchantId:10000, //商户号 整形
            planDetailId:"",//还款计划id
            outPlanDetailId:"",//外部还款计划id
            memberId:"1000010", // 会员号
            orderId:"201708180000000011", // 订单号
            memberName:"会员姓名", //会员姓名
            termTotal:1100.00, // 应还金额
            termCapital:1000.00， // 本金
            termInterest:20.00, //利息
            termCharge:80.0,//手续费
            state:1, //1 成功 2 失败
            remainTotal:1100.00, // 剩余应还金额
            remainCapital:1000.00， //剩余本金
            remainInterest:20.00, //剩余利息
            remainCharge:80.0,//剩余手续费
            repaymentTotal:1100.00, // 已还金额
            repaymentCapital:1000.00， //已还本金
            repaymentInterest:20.00, //已还利息
            repaymentCharge:80.0,//已还手续费
            planStartDate:"", //计划开始时间
            planEndDate:"" //计划结束时间
        ] -->


            <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">                                       
                    <el-button size="small" type="default" @click="handleButton(scope.$index, scope.row)">历史记录</el-button>                      
                </template>
            </el-table-column>
        </el-table>

        
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next" 
                    :page-size="10"
                    :total="total">
            </el-pagination>
        </div>



        <el-dialog title="历史记录" :visible.sync="dialogHistoryVisible">
            <el-table :data="gridData" height="450"  border>
                <el-table-column property="date" label="还款ID" width="80"></el-table-column>
                <el-table-column property="name" label="期次" width="100"></el-table-column>
                <el-table-column property="address" label="起始时间"></el-table-column>
                <el-table-column property="address" label="应还时间"></el-table-column>
                <el-table-column property="address" label="还款状态"></el-table-column>
                <el-table-column property="address" label="实际还款时间"></el-table-column>
                <el-table-column property="address" label="应还本金"></el-table-column>
                <el-table-column property="address" label="应还利息"></el-table-column>
                <el-table-column property="address" label="实还本金"></el-table-column>
                <el-table-column property="address" label="实还利息"></el-table-column>
                <el-table-column property="address" label="期末余额"></el-table-column>
                <el-table-column property="address" label="备注"></el-table-column>

            </el-table>
        </el-dialog>



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
                loanDate: '',  //放款时间搜索,

                // 表格
                dialogHistoryVisible:false,
                gridData: [
                    {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 

                {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                },         {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                },         {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                },         {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, 

                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }]

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

                self.$axios.post(__URILIST[8], request).then((res) => {
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
                return row.name;
            },
                 
            handleButton(index, row) {

                this.dialogHistoryVisible = true;
            }

 
        }
    }
</script>
