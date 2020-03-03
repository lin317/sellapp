<template>
  <div class="shopCar" >
    <div class="title">
      <strong>购物车{{shopchargoods.length}}份</strong>
      <span>清空购物车</span>
    </div>
    <div v-for="item in shopchargoods" :key="item.name" class="shopCarContent">
      <Row>
        <i-col span="10">
          <i-col span="12">
          <img :src="item.image" alt="" width="40px" height="40px">
          </i-col>
          <i-col span="12">
          {{item.name}}

          </i-col>
          </i-col>
        <i-col span="6">￥{{item.price*item.num}}</i-col>
        <i-col span="8">
          <p class="buy">
            <span v-show="item.num>0" @click="clickNumChange(item.name,-1)" class="reduce">-</span>
          <span v-show="item.num>0" class="num">{{item.num}}</span>
          <span @click="clickNumChange(item.name,1)" class="add">+</span>
          </p>
        </i-col>
      </Row>
    
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      clickNumChange(name,val){
      this.$store.commit('changeGoodsNum',{
        name,val
      })
    }
  },
  computed: {
    shopchargoods() {
      return this.$store.getters.getShopGoods;
    }
  }
};
</script>
 
<style lang="less" scoped>
.shopCar {
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin-bottom: 15px;
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    
  }
  .ivu-row{
    margin-bottom:15px;
    .ivu-col-span-10,
    .ivu-col-span-8 {
      text-align: center;
      .buy {
        span:not(:nth-child(2)) {
          border-radius: 50%;
          display: inline-block;
          width: 20px;
          height: 20px;
          color: #fff;
          text-align: center;
          background: #00a1dc;
        }
        .num {
          display: inline-block;
          width: 30px;
          text-align: center;
        }
      }
    }
    .ivu-col-span-6 {
      text-align: right;
      color:red;
    }
  }
}
</style>