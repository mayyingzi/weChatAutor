<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{curEnv}}</h2>
   
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '测试跳转,当前环境是：',
      curEnv: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
