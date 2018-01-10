<template>
    <div class="table"  v-loading="is_loading"   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>商户信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addMerchant">新增</el-button>
            <!-- <el-button type="danger" icon="e-icon-remove" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select> -->
            <el-input v-model="select_word" placeholder="ID或是商户名称搜索" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>


        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="id" label="ID" sortable width="150">
            </el-table-column>
            <el-table-column prop="contactName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="merchantName" label="商户名称"></el-table-column>
            <el-table-column prop="contactPhone" label="手机号码"></el-table-column>
            <el-table-column label="启用状态" width="120">
                  <template slot-scope="scope">
                  {{scope.row.state==0? '停用' : '启用'}}
                  </template>
            </el-table-column>
            <el-table-column prop="channelRate" label="服务费" width="120"  :formatter="formatter"></el-table-column>
            <el-table-column prop="bail" label="保证金" width="120"></el-table-column>
            <el-table-column prop="bailThreshold" label="保证金阀值" width="120"></el-table-column>


            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDeleteWarning(scope.$index, scope.row)">删除</el-button>
                    <el-button size="small" :type="scope.row.state==0? 'warning' : 'success'" @click="handleEnable(scope.$index, scope.row)">{{scope.row.state==0? '停用' : '启用'}}</el-button>  
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
               // multipleSelection: [], //多选中的值          
                select_word: '',  //搜索关键字
                //del_list: [],    //{ "date": "1978-06-18",   "name": "魏强",   "address": "广东省 韶关市 始兴县"}   里面是对象
                total:0,  //共多少条记录
                is_loading: false
            }
        },
        created(){
            let cur_page=parseInt(this.$route.query.cur_page,10)||1;   //当前页
            this.cur_page=cur_page;
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

                let request={
                   // merchantName:self.select_word,
                    selectWord:self.select_word,
                    start:(self.cur_page-1)*10,
                    limit:10  //每页显示10条
                }
                self.$axios.post(__URILIST[0], request).then((res) => {
                    self.tableData = res.data.data.rows;
                    self.total=res.data.data.count || 0;
                    self.is_loading = false;
                   // console.log(this.tableData);
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
                return row.channelRate;
            },
            handleEdit(index, row) {
                 this.$router.push({ path: '/merchant', query: { id: row.id,cur_page:this.cur_page }})
                //this.$message('编辑第'+(index+1)+'行');
                //传入相关参数，成功后返回
            },
            handleDeleteWarning(index, row){
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.handleDelete(index, row);
                }).catch(() => {
                        // this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        // });          
                });
                
            },
            handleDelete(index, row) {
                //console.log(row);
                //this.del_list.push(row);  //把要删除 的东西加到删除列表， 然后在把删除列表从整个数据中移出
                //this.$message.error('删除第'+(index+1)+'行');

                this.is_loading = true;
                const request={
                    id:row.id
                }
                this.$axios.post(__URILIST[1], request).then((res) => {
                    this.$message.success('删除了'+row.merchantName);
                    this.tableData.splice(index,1); //删除 这个元素
                    this.is_loading = false;
                   // console.log(this.tableData);
                }).catch((error) =>{
					//console.log(error);
					this.is_loading = true;
				}); 

            },      
  
            addMerchant(){
                //新增加用户
                this.$router.push('/merchant');
            },
             handleEnable(index, row) {
                console.log(row);
                //this.del_list.push(row);  //把要删除 的东西加到删除列表， 然后在把删除列表从整个数据中移出
                //this.$message.error('删除第'+(index+1)+'行');
                let newState=Math.abs(row.state-1);
                let infostring=newState==0? '启用:':'停用:'
                //ajax后台发送修改状态~
               const request={
                    id:row.id,                   
                    state: newState,  // 0 生效 1 失效
               } 
               this.$axios.post(__URILIST[9], request).then((res) => {
                    if(newState){
                        this.$message.error(infostring+row.merchantName);
                    }else{
                        this.$message.success(infostring+row.merchantName);
                    }
                    this.tableData[index].state=newState; 
                   
                }).catch((error) =>{					
					this.$message.error('操作失败请稍后再试:'+error);
				}); 
            },
        }
    }
</script>

