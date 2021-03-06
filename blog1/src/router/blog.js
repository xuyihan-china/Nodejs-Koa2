//只管路由 命中路由 返回正确的格式
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const loginCheck =(req)=>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('没有登陆')
        )
    }
}
const handleBlogRouter=(req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id //拿到传入的值
    //获取博客列表
    if(method ==='POST'&& path==='/api/blog/list'){
        const author = req.body.author || ''   //author 和 keyword 是通过query 来获取
        const keyword = req.body.keyword || '' //获取query后面的数据 ? author=""&keyword=""
        const result =getList(author,keyword) //返回一个数组 假装是通过 author 和 keyword 来获取列表 controller 中获取再回来
        //result 返回的是一个新的promise
        return result.then(
            listData =>{
                console.log(listData)
                return new SuccessModel(listData)//传入listData是promise 那么后面处理的也要是promise
            }
        )
    }
    if(method==='GET'&& path ==='/api/blog/detail'){
        // const data =getDetail(id) //执行controller中的函数 为了拿到假数据
        // return new SuccessModel(data) //返回new xx
        const result = getDetail(id)
        return result.then(
            data =>{
                return new SuccessModel(data)
            }
        )
    }
    if(method==='POST'&& path ==='/api/blog/new'){
        // const blogData = req.body //拿到值
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        req.body.author= 'zhangsan'
        const loginCheckResult= loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }
        req.body.author= req.session.username
        const result = newBlog(req.body)
        return result.then(data =>{
            return new SuccessModel(data)
        })
    }
    if(method ==='POST'&& path ==='/api/blog/update'){
        const loginCheckResult= loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }
        const result = updateBlog(id,req.body)
        result.then(val =>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新博客失败')
            }
        })
    }
  
    if(method==='POST'&&path ==='/api/blog/delete'){
        req.body.author= req.session.username
        let author = req.session.username
       const result = delBlog(id,author)
       return result.then(val=>{//这里传入 true 或者false
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('失败了')
            }
       })
       
    }
}
module.exports=handleBlogRouter
