<template>
  <div>
    <div id="searchArticle">
      <el-input v-model="input" placeholder="请输入文章标题" @input="newPush()"></el-input>
      <el-button type="primary"  size="medium" @click="handleSearch()">搜索</el-button>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="140"></el-table-column>
      <el-table-column prop="body" label="内容" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- scope代表的这行的数据信息  -->
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [], //文章相关信息
      input:''     //搜索框中的关键字
    };
  },
  created() {
    this.fetch(); 
  },
  methods: {
      // 通过后台获取这个文章表的全部信息,赋值给articles
      fetch(){
        this.$http.get("/articles",this.articles).then(res => {
            this.articles = res.data;
        });
      },
      // 点击编辑进行跳转
      edit(id){
          this.$router.push(`/articles/${id}/edit`)
      },
      //进行删除操作
      remove(id){
          this.$http.delete(`articles/${id}`).then(res=>{
            this.$message({
                message: "文章删除成功",
                type: "success"
            });
            // 删除之后还需要重新获取下数据库最新的信息
            this.fetch();
            console.log(res.data)
        })
      },
      // 搜索,模糊查询
      handleSearch(){
        this.$http.get(`/article/search/${this.input}`).then((res)=>{
          this.articles=res.data;
        })
      },
      // 如果搜索框为空,再进行一次数据请求
      newPush(){
        if(!this.input){
          this.fetch();
        }
      }
  },
};
</script>
<style>
  #searchArticle{
    display: flex;
    justify-content: space-between;
    width: 30%;
  }
</style>
