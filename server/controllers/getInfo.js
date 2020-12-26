const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid} = ctx.request.query
  console.log("=============records=============:",ctx.request.query)
  try{
    const records = await mysql('register')
                              .select('id','date','problem')
                              .where("openid",openid)
                              .orderBy('date','desc')

    // 执行成功返回的数据
    ctx.state.data = {
      records
    }
  }catch(e){
    // 执行失败返回的数据
    ctx.state = {
      code: -1,
      data: {
        msg: '获取失败' + e.sqlMessage + ctx.request.query
      }
    }
  }
}