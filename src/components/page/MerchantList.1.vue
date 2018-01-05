<template>
    <div class="table">
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
            <el-input v-model="select_word" placeholder="姓名或是商户名称搜索" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>


        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="商户名称" :formatter="formatter"></el-table-column>
            <el-table-column prop="phonenumber" label="手机号码"></el-table-column>

            <el-table-column prop="service_charge" label="服务费"></el-table-column>
            <el-table-column prop="deposit_charge" label="保证金"></el-table-column>
            <el-table-column prop="threshold" label="保证金阀值"></el-table-column>


            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
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
                multipleSelection: [], //多选中的值          
                select_word: '',  //搜索关键字
                del_list: [],    //{ "date": "1978-06-18",   "name": "魏强",   "address": "广东省 韶关市 始兴县"}   里面是对象
                total:20,  //共多少条记录
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){  //把列表里要不是要删除 的留下来,搜索是根据名称和地址
                        if((d.name.indexOf(self.select_word) > -1 ||d.address.indexOf(self.select_word) > -1)){
                            //console.log(d);
                            return d;
                        }
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
                self.$axios.post(__URILIST[0], {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                    console.log(this.tableData);
                })
            },
            search(){
                this.is_search = true;
                
            },
            formatter(row, column) {
                //格式 化数据
                return row.name;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                console.log(row);
                this.del_list.push(row);  //把要删除 的东西加到删除列表， 然后在把删除列表从整个数据中移出
                //this.$message.error('删除第'+(index+1)+'行');
                this.$message.error('删除了'+row.name);
               // this.tableData.splice(index,1); //删除 一个元素
                //console.log(this.tableData);
            },
            delAll(){
                const self = this,  length = self.multipleSelection.length;
                if(length==0){
                    self.$message.error('至少选择一行.');
                    return;
                }
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                //console.log(self.del_list);

                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addMerchant(){
                //新增加用户
                this.$router.push('/merchant');
            }
        }
    }
</script>

