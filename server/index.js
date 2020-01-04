const express=require("express");
const app=express();
// 跨域
app.use(require("cors")());
// json数据转化
app.use(express.json())

const mongoose=require("mongoose");
// 连接数据库
mongoose.connect("mongodb://localhost:27017/element-admin",{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
})
// 建立文章模型,定义字段类型
const Article = mongoose.model("Article",new mongoose.Schema({
    title:{type:String},
    body:{type:String},
}))

//新增文章
app.post("/api/articles",async(req,res)=>{
    const article=await Article.create(req.body);
    res.send(article);
})
// 文章列表
app.get("/api/articles",async(req,res)=>{
    const articles=await Article.find()
    res.send(articles)
})
// 删除文章
app.delete("/api/articles/:id",async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})
// 文章详情
app.get("/api/articles/:id",async(req,res)=>{
    const article=await Article.findById(req.params.id);
    res.send(article);
})
// 修改文章
app.put("/api/articles/:id",async(req,res)=>{
    const article=await Article.findByIdAndUpdate(req.params.id,req.body);
    res.send(article);
})

// 查询文章
app.get("/api/article/search/:name",async (req,res)=>{
    const Aname=req.params.name;
    const article=await Article.find({"title":new RegExp(Aname)})
    res.send(article);
})


// 监听端口号
app.listen(3001,()=>{
    console.log("http://localhost:3001/")
})
