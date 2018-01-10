<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{breadcrump}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="merchantinfo" label-width="120px">
                <el-form-item label="商户名称" prop="merchantName">
                    <el-input v-model="form.merchantName" placeholder="商户名称"></el-input>
                </el-form-item>
                
                <el-form-item label="联系信息">
                    <el-col :span="10">
                        <el-form-item prop="contactName">
                        <el-input placeholder="联络人姓名" v-model="form.contactName"></el-input>
                        </el-form-item>                        
                    </el-col>
                    <el-col class="line" :span="4">手机号码</el-col>
                    <el-col :span="10">
                        <el-form-item prop="contactPhone">
                        <el-input placeholder="手机号码" v-model="form.contactPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="咨询服务费">
                    <el-col :span="11">
                    <el-input v-model="form.channelRate" placeholder="咨询服务费"></el-input>
                    </el-col>
                </el-form-item>
                
                <el-form-item label="初始保证金金额">
                    <el-col :span="11">
                        <el-input placeholder="初始保证金金额" v-model="form.bail"></el-input>                        
                    </el-col>
                  
                </el-form-item>

                            
                <el-form-item label="商户保证金阀值">
           
                    <el-col :span="11">
                        <el-input placeholder="商户保证金阀值设置" v-model="form.bailThreshold"></el-input>
                    </el-col>
                </el-form-item>


                <!-- <el-form-item label="文本框">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="calcelMerchant">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import  * as _global from '../../plugs/global';
    const __URILIST=_global.URILIST;
    export default {
        data: function(){
            return {
                breadcrump:'商户信息录入',
                form: {
                    id:0,                   
                    contactName:'',
                    contactPhone:'',
                    merchantName:"",  // 商户名称
                    bailThreshold:0.00,  //保证金阈值
                    channelRate:0.00, //通道费
                    bail:0.00 //保证金
                },
                rules: {
                        merchantName: [
                            { required: true, message: '请输入商户名称', trigger: 'blur' },
                            { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }
                        ],              
                        contactName: [
                            { required: true, message: '请输入姓名', trigger: 'blur' }
                        ],
                        contactPhone: [
                                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                                    ]                       
                            }

            }
        },
        created(){
                // this.$router.push({ path: '/', query: { from: 'list' }})
                let id=parseInt(this.$route.query.id,10) || 0;   //0表示 显示全部   
                this.form.id=id;       
                if(id>0){
                    this.breadcrump='商户信息修改';
                    this.$axios.post(__URILIST[2], {id:id}).then((res) => {
                        this.form = res.data.data;      //id也盖掉           
                    }).catch(error=>{

                        this.$alert('无法加载初始化数据', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // this.$message({
                                // type: 'error',
                                // message: `action: ${ action }`
                                // });
                                history.back();
                            }
                        });

                        
                    })    
                }
          
        },
        methods: {
            onSubmit() {
               this.$refs['merchantinfo'].validate((valid) => {
                    if (valid) {
                    //    const request={
                    //         id:1000, //商户号
                    //         merchantName:"颜值公司",  // 商户名称
                    //         bailThreshold:1000.00,  //保证金阈值
                    //         channelRate:0.08, //通道费
                    //         bail:1000000.00, //保证金
                    //         contactPhone:"18116152145", //商户联系人号码
                    //         contactName:"xxxx" //商户联系人姓名
                    //     }
                        let cur_page=parseInt(this.$route.query.cur_page,10)||0;   //当前页
                        let url=this.form.id==0 ?__URILIST[4]:__URILIST[3];  //3 update 4 add
                        this.$axios.post(url, this.form).then((res) => {
                            this.$message.success('数据操作成功！'); 
                            this.$router.push({ path: '/merchantlist', query: { cur_page: cur_page }})   
                        })   



                        
                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                })

                
            },
            calcelMerchant(){
                //新增加用户
                this.$router.push('/merchantlist');
            }            
        }
    }
</script>