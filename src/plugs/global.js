/*
SMALL_BLACK_CONFIG为window全局变量在html以script接入防止被webpack打包
By Yuri Zhang   2018-1-2
 */
// console.log(window['SMALL_BLACK_CONFIG']);

export let URILIST=[],_URILIST=[];
//let DomainName='http://10.10.30.117:21001/tnp';  // SST
//let DomainName="http://public-api.tnp.pdl.tuniu-sit.org/tnp"; //SIT
//let DomainName="http://public-api.tnp.pdl.tuniu.org/tnp"; //product

let DomainName1=window["SMALL_BLACK_CONFIG"]._DomainName1;
let DomainName2=window["SMALL_BLACK_CONFIG"]._DomainName2;
let DomainName3=window["SMALL_BLACK_CONFIG"]._DomainName3;
//let _clientType="h5";
export let _DEBUG=window["SMALL_BLACK_CONFIG"]._DEBUG;
export let _PRODUCT=window["SMALL_BLACK_CONFIG"]._PRODUCT;  //DEV or PRD   //开发环境或是生产环境



URILIST[0]=DomainName1+'/ola/api/merchant/queryList';  //查询商户列表 post
_URILIST[0]='/api/merchant/queryList/';

URILIST[1]=DomainName1+'/ola/api/merchant/delete/';  //删除商户
_URILIST[1]='/api/merchant/common/';

URILIST[2]=DomainName1+'/ola/merchant/queryById/';  //查询商户信息
_URILIST[2]='/api/merchant/queryById/';


URILIST[3]=DomainName1+'/ola/api/merchant/update/';  //更新商户
_URILIST[3]='/api/merchant/common/';

URILIST[4]=DomainName1+'/ola/api/merchant/add';  //新增加商户
_URILIST[4]='/api/merchant/common/';



URILIST[5]=DomainName2+'/olf/api/contract/queryList/';  //合同列表
_URILIST[5]='/api/contract/queryList/';

URILIST[6]=DomainName2+'/olf/api/loan/queryList';  //贷款列表
_URILIST[6]='/api/loan/queryList/';

URILIST[7]=DomainName2+'/olf/api/repay/queryList';  //还款列表
_URILIST[7]='/api/repay/queryList';

URILIST[8]=DomainName2+'/olf/api/repay/queryList';  //还款计划
_URILIST[8]='/api/repaymentPlan/queryList';

URILIST[9]=DomainName1+'/ola/api//merchant/status';  //商户状态
_URILIST[9]='/api/merchant/common/';


//帐户管理

URILIST[10]=DomainName3+'/account/main/view';  //商户查询 GET
_URILIST[10]='./static/data/account.json';

URILIST[11]=DomainName3+'/margin/account/query';  //保证金账户GET
_URILIST[11]='./static/data/bail.json';

URILIST[12]=DomainName3+'/interestfee/account/query';  //息费查询列表账户GET
_URILIST[12]='./static/data/repayment.json';


URILIST[13]=DomainName3+'/margin/account/recharge';  //保证金充值  
_URILIST[13]='./static/data/recharge.json';

URILIST[14]=DomainName3+'/margin/account/postal';  //保证金提现
_URILIST[14]='./static/data/postal.json';


URILIST[15]=DomainName3+'/interestfee/account/postal';  //息费提现
_URILIST[15]='./static/data/interestfee_postal.json';

URILIST[16]=DomainName3+'/account/change/record/query';  //历史记录
_URILIST[16]='./static/data/history.json';




if(_PRODUCT=='DEV'){
	URILIST=_URILIST;
}
// export default  URILIST;
