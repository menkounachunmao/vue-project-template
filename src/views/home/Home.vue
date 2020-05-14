<template>
  <div class="home">
    <el-container>
      <el-header a="" b="" c="">
        <home-header />
      </el-header>
      <el-main>
        <home-main />
      </el-main>
      <el-footer>
        <home-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import HomeHeader from './HomeHeader';
import HomeMain from './HomeMain';
import HomeFooter from './HomeFooter';
export default {
  name: 'Home',
  components: { HomeHeader, HomeMain, HomeFooter },
  data() {
    return {
      title: 'cs',
    };
  },
};
</script>
<style lang="scss">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 160px;
}
</style>
