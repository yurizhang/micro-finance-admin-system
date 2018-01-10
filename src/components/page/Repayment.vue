<template>
    <div class="table" v-loading="is_loading"   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>账户管理</el-breadcrumb-item>
                <el-breadcrumb-item>还款息费账户管理</el-breadcrumb-item>
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


        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->

            <el-table-column label="序号" sortable width="100">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="merchantId" label="商户ID" width="120"></el-table-column>
            <el-table-column prop="merchantName" label="商户名称"></el-table-column>         
            <el-table-column prop="totalAmount" label="息费账户总额" width="120"></el-table-column>        
            <el-table-column prop="updateTime" label="更新时间" width="160"></el-table-column>           

            <el-table-column label="操作" width="280">
                <template slot-scope="scope">                                       
                    <el-button size="small" type="danger" @click="handleButton(scope.$index, scope.row,1)">提现</el-button>               
                    <el-button size="small" type="default" @click="handleButton(scope.$index, scope.row,3)">历史记录</el-button>                       
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




        <el-dialog title="提现" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="form">
                <el-form-item label="提现金额：" :label-width="formLabelWidth" prop="amount" :rules="[ { type: 'number', message: '提现金额必须为数字值'} ]">
                    <el-input v-model.number="form.amount" auto-complete="off" :blur="CheckAmount()"></el-input>
                </el-form-item>
                <el-form-item label="原息费账户总额：" :label-width="formLabelWidth">{{form.totalAmount}}</el-form-item>
                <el-form-item label="提现后息费总额：" :label-width="formLabelWidth">{{form.totalAmount-form.amount}}</el-form-item>             
        
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="rechargeOrPostal()">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="历史记录" :visible.sync="dialogHistoryVisible" width="70%">
            <el-table :data="gridData" height="450" width="100%"  border v-loading="is_loading2"   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">
                <el-table-column property="id" label="序号" width="80"></el-table-column>
                <el-table-column property="merchantName" label="商户名称" width="100"></el-table-column>
                <el-table-column property="changeAmount" label="提现金额"></el-table-column>
                <el-table-column property="amountAfter" label="息费账户余额"></el-table-column>
                <el-table-column property="updateTime" label="提现时间"></el-table-column>
                <el-table-column property="operatorName" label="提现操作人"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
                <el-table-column property="supplySerialNum" label="流水"></el-table-column>

                <el-table-column label="操作" width="200" fixed="right">
                    <template slot-scope="scope">                                       
                         
                         <el-button size="small" type="danger" @click="serialBumber(scope.$index, scope.row,1)">添加备注</el-button>                                        
                         <el-button size="small" type="danger" @click="serialBumber(scope.$index, scope.row,2)">录入流水</el-button>                                      
                                         
                    </template>
                </el-table-column>
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
                url: './static/data/infolist.json',
                tableData: [],
                cur_page: 1,                      
                select_word: '',  //搜索关键字               
                total:0,  //共多少条记录，由后台返回
                is_loading: false,  //表示当前是不是正在搜索 
                is_loading2: false,  //表示当前是不是正在搜索历史  

                //以下是dialog
                dialogFormVisible: false,  //提现 
              
                dialogHistoryVisible: false, //历史记录
                form: {
                   "amount": 0,
                   "merchantId":0,
                   "totalAmount":0  //金总额
                                   
                },

                //表单字段宽度
                formLabelWidth: '150px',
                // 表格
                gridData: []


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
                self.$axios.get(__URILIST[12], {params: request }).then((res) => {
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
            },       
     
            handleButton(index, row, dtype) {
                console.log(row, dtype);
                this.form.amount= 0;
                this.form.merchantId=row.merchantId;
                this.form.totalAmount=row.totalAmount;
             
     
                if(dtype==1){
                    this.dialogFormVisible = true;
                }else if(dtype==3){
                    this.dialogHistoryVisible = true;
                    //:open="historyInfo"不起作用
                    this.historyInfo(this.form.merchantId);
                }
            },
            serialBumber(index, row, dtype) {
                let tempString=dtype==1? '备注' : '流水';
                this.$prompt('请输入'+row.merchantName+tempString, '提示', {
                    confirmButtonText: '确定',
                    inputPlaceholder:"流水号由数字组成",
                    cancelButtonText: '取消',
                   // inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,20}$/,
                    inputErrorMessage: '格式不正确，应该由2-20位数字和字符组成'
                }).then(({ value }) => {

                    const request={
                        "id":row.id, //记录id Integer
                        "remark": dtype==1? value :'', //追加备注
                        "supplySerialNum": dtype==2? value :'', //追加流水号  //留空表示不修改
                    }
                    this.$axios.post(__URILIST[17],request).then((res) => {                        
                        
                        if(dtype==1){
                            this.gridData[index].remark=value;
                        }else{
                            this.gridData[index].supplySerialNum=value;
                        }                   
                        this.$message({
                            type: 'success',
                            message: '恭喜您操作成功! '   // + value   //考虑成功后写到的数据，反应到view里
                        });

                    }).catch(error=>{
                        this.$alert(error, '错误提示', {
                            confirmButtonText: '确定'                    
                        });
                    });



                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '您取消了操作'
                    });       
                });
           },          
      
            CheckAmount(){
                
                    //console.log('提取后：' ,  this.form.totalAmount-this.form.amount);
                    if(this.dialogFormVisible && this.form.amount && this.form.totalAmount-this.form.amount<0 ){
                        this.$message({
                            type: 'error',
                            message: '提取额度过大，产生负数了.'
                        });   
                    }
                
            },
            //充值或是提现 处理
            rechargeOrPostal(){
                //dtype 1提现，2充值               
                this.dialogFormVisible = false;                  
                if(!this.form.amount){return;}
                const request={
                    "merchantId":this.form.merchantId, //商户号 Integer
                    "amount":this.form.amount , //金额 BigDecimal
                   // "operateType":2, //操作类型 1-充值，2-提现

                    "operatorId": 0,//操作人id   Integer
                    "operatorName": localStorage.getItem('ms_username') //操作人名称 String
                }
                
                this.$axios.post(__URILIST[15],request).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '恭喜，操作成功.'
                    }); 
                    //刷新数据
                    this.getData(); 
                }).catch(err=>{
                    this.$alert(err, '错误提示', {
                        confirmButtonText: '确定'                        
                    });
                })              

            },
            historyInfo(merchantId){
                this.is_loading2 = true;
                const request={
                        "merchantId":merchantId, //商户号 Integer
                        "accountType":3 //账户类型 1-保证金账户 2-本金账户 3-息费账户
                }
                let self=this;
                self.$axios.get(__URILIST[16], {params: request }).then((res) => {
                    self.gridData = res.data.data.rows;  
                    this.is_loading2 = false;         
                }).catch(err=>{
                    this.is_loading2 = false;   
                    this.$alert(err, '错误提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });
                })
            }
        
                
        
        }
    }
</script>

