<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="cancelCreat">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {}
    };
  },
  methods: {
    // 修改文章,将文章id和新修改的数据传递给后端,让后端进行查询并且修改数据
    saveArticle() {
      this.$http.put(`articles/${this.$route.params.id}`, this.article).then(res => {
        this.$message({
          message: "文章修改成功",
          type: "success"
        });
        console.log(res.data)
        this.$router.push("/articles/list");
      });
    },
    fetch(){
      this.$http.get(`/articles/${this.$route.params.id}`).then(res=>{
        this.article=res.data
      })
    },
    cancelCreat(){
      this.$router.push("/articles/list")
    }
  },
  created() {
    this.fetch();
  },
};
</script>