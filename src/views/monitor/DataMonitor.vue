<template>
  <GlobalContainer>
    <div class="datacontainer">
      <div class="div1">
        <div class="div1son1">
          <Div1-Son1></Div1-Son1>
        </div>
        <div class="div1son2">
          <Div2-Son2></Div2-Son2>
        </div>
      </div>
      <div class="div2">
        <div class="div2son1">
          <Div3-Son3></Div3-Son3>
        </div>
        <div class="div2son2">
          <Div4-Son4></Div4-Son4>
        </div>
      </div>
    </div>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Div1Son1 from '../../components/datamonitor/Div1Son1.vue';
import Div2Son2 from '../../components/datamonitor/Div2Son2.vue';
import Div3Son3 from '../../components/datamonitor/Div3Son3.vue';
import Div4Son4 from '../../components/datamonitor/Div4Son4.vue';
</script>

<style lang="scss" scoped>
.datacontainer {
  background-color: #001834;
  width: 100%;
  height: 100%;
  display: flex;
  .div1, .div2 {
    height: 100%;
    width: 50%;
  }
  .div1 {
    .div1son1, .div1son2 {
      width: 100%;
      height: 50%;
    }
  }
  .div2 {
    .div2son1, .div2son2{
      width: 100%;
      height: 50%;
    }
  }
}
</style>
