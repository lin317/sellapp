<template>
  <div class="main">
    <div class="title" :style="{backgroundImage:'url('+data.avatar+')' }">
      <div class="header">
        <Row>
          <i-col span="6">
            <i-col span="22">
              <img :src="data.avatar" width="75px" height="75px" />
            </i-col>
          </i-col>
          <i-col span="18">
            <i-col span="21" class="header-right">
              <Row>
                <i-col span="4">
                  <img src="../assets/imgs/brand@2x.png" width="33px" height="20px" />
                </i-col>
                <i-col span="20">{{data.name}}</i-col>
              </Row>
              <p>{{data.description}} / {{data.deliveryTime}}分钟送达</p>
              <Row>
                <i-col span="20">
                  <i-col span="3">
                    <img src="../assets/imgs/decrease_1@2x.png" width="17px" height="17px" />
                  </i-col>
                  <i-col span="20">{{data.supports[0].description}},满50减10</i-col>
                </i-col>
              </Row>
            </i-col>
            <i-col span="3">
              <p>5个 ></p>
            </i-col>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <i-col span="2">
              <img src="../assets/imgs/bulletin@2x.png" width="90%" />
            </i-col>
            <i-col span="21">{{data.bulletin}}</i-col>
            <i-col span="1">></i-col>
          </i-col>
        </Row>
      </div>
    </div>
    <!-- 路由出口 -->
    <div class="router-link-div">
      <router-link to="/goods">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchart">商家</router-link>
    </div>
    <div class="fixed">
      </div>
    <router-view/>
    
    <!-- 购物车 -->
    <transition name="slide-fade">
      <div class="shopcar-board" v-show="shopcarShow">
        <shopCar></shopCar>
      </div>
    </transition>
    <div class="shop-car-bar" @click="shopcarShow= !shopcarShow">
      <Row>
        <i-col span="6">
          <div class="imgs">
            <img src="../assets/imgs/shopCar.png" width="50%" />
          </div>
        </i-col>
        <i-col span="12">
          <i-col span="6">￥{{getTotal}}</i-col>
          <i-col span="18">| 另需要配送费￥{{data.deliveryPrice}}元</i-col>
        </i-col>
        <i-col span="6">￥{{data.minPrice}}起送</i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import { getSeller } from "../api/apis";
import shopCar from "./Shopcar";
export default {
  data() {
    return {
      data: { supports: [{ description: "" }] },
      shopcarShow: false
    };
  },
  components: {
    shopCar
  },
  created() {
    //发送初始化请求
    //var obj =getSeller()
    //obj===req.get('/api')
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  computed: {
     getTotal(){
      let total = 0
      for(let food of this.$store.getters.getShopGoods){
        total += food.num * food.price
      }

      return total
    }  
  },
};
</script>
<style lang="less" scoped>
.fixed {
  position: fixed;
  bottom: 50px;
  left: 0;
}
.main {
  flex: 1;
  .title {
    height: 148px;
    background-size: cover;
    background-position: center;
    font-size: 14px;
    color: #ece7e1;
    position: relative;
    .header {
      color: #fff;
      font-size: 12px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);

      p {
        margin-bottom: 5px;
      }
      .ivu-col-span-6 {
        padding: 20px 0px 0px 20px;
      }
      .ivu-col-span-18 {
        .ivu-col-span-3 {
          p {
            width: 40px;
            height: 20px;
            background-color: rgba(0, 0, 0, 0.7);
            line-height: 20px;
            border-radius: 25%;
            text-align: center;
            margin: 65px 10px 0px -30px;
          }
        }
        .ivu-col-span-21 {
          padding: 20px 0px 0px 10px;
        }
      }
      .ivu-row:nth-child(1) {
        .ivu-col-span-18 {
          .ivu-col-span-2 {
            display: flex;
            align-items: center;
          }
        }
      }
      .ivu-row:nth-child(2) {
        margin-top: 10px;
        background-color: rgba(0, 0, 0, 0.3);
        .ivu-col-span-24 {
          padding: 10px 0px 5px 10px;
          .ivu-col-span-2 {
            padding-top: 2px;
          }
          .ivu-col-span-21 {
            max-width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .router-link-div {
    display: flex;
    justify-content: space-around;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    border: 1px solid #f3f6f6;

    a {
      color: #000;
    }
    a.router-link-exact-active {
      color: #f60;
    }
  }
 
  .shopcar-board {
    position: fixed;
    width: 100%;
    bottom: 50px;
    background-color:#fff;
  }
  .shop-car-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #131d27;
    color: #9da2a3;
    .ivu-row {
      .ivu-col-span-12 {
        margin-left: 25%;
        line-height: 50px;
      }
      .ivu-col-span-6:nth-child(1) {
        position: relative;
        .imgs {
          position: absolute;
          top: -25px;
          left: 0px;
          border-radius: 50%;
          img {
            margin: 10px 0px 0px 25px;
          }
        }
      }
      .ivu-col-span-6:nth-child(3) {
        background-color: #2a353a;
        text-align: center;
        line-height: 50px;
        height: 50px;
      }
    }
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translatey(10px);
  opacity: 0;
}
</style>