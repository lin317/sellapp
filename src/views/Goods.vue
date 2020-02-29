<template>
  <div class="goods">
    <div class="left-div">
      <ul class="content">
        <div @click="clickLeftTitle(i)" v-for="(v,i) in data" :key="i" :class="{leftGoods:true,selected:i==curSelected}">
          <img style="width:12px" src="../assets/imgs/decrease_1@2x.png" v-show="v.type==1" />
          <img style="width:12px" src="../assets/imgs/discount_1@2x.png" v-show="v.type==2" />
          <img style="width:12px" src="../assets/imgs/invoice_1@2x.png" v-show="v.type==3" />
          <img style="width:12px" src="../assets/imgs/guarantee_1@2x.png" v-show="v.type==4" />
          <p>{{v.name}}</p>
        </div>
      </ul>
    </div>
    <div class="right-div">
      <ul class="content">
        <div v-for="(v,i) in data" :key="i" :id="i">
          <p class="title">{{v.name}}</p>
          <div class="goods-list" v-for="(val,index) in v.foods" :key="index">
            <img :src="val.image" />
            <div class="info">
              <h4>{{val.name}}</h4>
              <p>月售{{val.sellCount}}份 好评率{{val.rating}}%</p>
              <div class="line">
                <p>
                  <span class="price">￥{{val.price}}</span>
                  <span class="oldprice">{{val.oldPrice}}</span>
                </p>
                <p class="buy">
                  <span class="reduce">-</span>
                  <span class="num">{{val.num}}</span>
                  <span class="add">+</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis.js";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件

export default {
  data() {
    return {
      data: {},
      curSelected: 0
    };
  },
  created() {
    getGoods().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  mounted() {
    //左侧滚动板
    new BScroll(document.querySelector(".left-div"), {
      click: true
    });
    //右侧滚动板
    this.rightDiv=new BScroll(document.querySelector(".right-div"));
  },
  methods: {
    clickLeftTitle(i) {
      this.curSelected=i;
      this.rightDiv.scrollToElement(document.getElementById(i),600)
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 450px;
  .left-div {
    width: 80px;
    height: 100%;
    font-size: 12px;
    background: #f3f6f6;
    overflow: scroll;
    .leftGoods{
      height: 60px;
      margin: 0 8px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e1e3;
      
    }
  }
  .right-div {
    flex: 1;
    height: 100%;
    overflow: hidden;
    overflow: scroll;
    text-align: left;
    .title {
      padding: 5px;
      background: #f3f6f6;
    }
    .goods-list {
      display: flex;
      padding: 5px;
      border-bottom: 1px solid #dbdede;
      margin: 2px;
      img {
        width: 60px;
        height: 60px;
      }
      .info {
        padding-left: 5px;
        flex: 3;
        .line {
          display: flex;
          justify-content: space-between;
          .price {
            color: red;
          }
          .oldprice {
            margin-left: 10px;
            text-decoration: line-through;
          }
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
            .reduce,
            .num {
              display: none !important;
            }
          }
        }
      }
    }
  }
}
</style>