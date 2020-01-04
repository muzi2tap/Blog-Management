<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">提交</el-button>
      <el-button @click="cancelCreat">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {}   //article存储文章相关内容
    };
  },
  methods: {
    // 表单提交事件(阻止表单默认行为,将提交按钮类型改成submit)
    saveArticle() {
      this.$http.post("/articles", this.article).then(res=> {
        // 弹框提示文章添加成功
        this.$message({
          message: "文章添加成功",
          type: "success"
        });
        console.log(res.data)
        // 提交后跳转到文章列表页
        this.$router.push("/articles/list");
      });   
    },
    // 点击取消按钮跳转回文章列表页
    cancelCreat(){
      this.$router.push("/articles/list")
    }
  }
};
</script>