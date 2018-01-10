<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>账户管理</el-breadcrumb-item>
                <el-breadcrumb-item>对账文件下载</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box handle-box-form">
            <el-form ref="form" label-width="80px">
           <el-form-item label="对账类型">
             <el-select v-model="select_cate" placeholder="对账类型" class="handle-select mr10">
                <el-option key="1" label="全部" value="0"></el-option>
                <el-option key="2" label="放贷" value="1"></el-option>
                <el-option key="3" label="代扣" value="2"></el-option>                
            </el-select>
           </el-form-item>
            <!-- <el-input v-model="select_word" placeholder="订单ID" class="handle-input mr10"></el-input>
            <el-input v-model="select_word" placeholder="商户ID或名称,手机号搜索" class="handle-input mr10"></el-input> -->
            <el-form-item label="下载时间">
            <el-date-picker
                    v-model="loanDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-mm-dd"
                    :picker-options="pickerOptions2">
                </el-date-picker>
                </el-form-item>
            <el-button type="primary" icon="search" @click="search">下载</el-button>
            </el-form>
        </div>


      



    </div>
</template>

<script>
    export default {
        data() {
            return {                
                tableData: [],                            
                select_cate: '',  //搜索关键字             
                 is_search: false,  //表示当前是不是正在搜索 
                //表单字段宽度
                loanDate: '',
                // 表格
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


            }
        },
        created(){
           // this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                        if((d.name.indexOf(self.select_word) > -1 ||d.address.indexOf(self.select_word) > -1)){
                            //console.log(d);
                            return d;
                        }                    
                })
            }
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
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            search(){
                //this.is_search = true;
                 this.$alert('功能暂未开放', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
          
                    }
                });



            },
            formatter(row, column) {
                //格式 化数据
                return row.name;
            }     
     

   
        
        }
    }
</script>

