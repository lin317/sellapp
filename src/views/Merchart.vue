<template>
  <div class="merchart">
    <ul class="content">
      <div style="background:#eee;padding-bottom: 20px">
        <Card :bordered="false">
          <Row>
            <i-col span="16">
              <Row>
                <i-col span="24">
                  <p>{{data.name}}</p>
                </i-col>
              </Row>
              <Row>
                <i-col span="16">
                  <Rate disabled v-model="data.score" />
                </i-col>
                <i-col span="8">
                  ({{data.sellCount}})
                  月售{{data.sellCount}}份
                </i-col>
              </Row>
            </i-col>
            <i-col span="6">
              <img src="../assets/imgs/favorite.svg" alt width="20px" height="20px" />
              <p>已收藏</p>
            </i-col>
          </Row>

          <p class="description">
            <Row>
              <i-col span="8">
                <p>起送价</p>
                <p>{{data.minPrice}}元</p>
              </i-col>
              <i-col span="8">
                <p>商家配送</p>
                <p>{{data.deliveryPrice}}元</p>
              </i-col>
              <i-col span="8">
                <p>平均配送时间</p>
                <p>{{data.deliveryTime}}分钟</p>
              </i-col>
            </Row>
          </p>
        </Card>
      </div>
      <div class="notice">
        <p class="active">公告与活动</p>
        <p class="descriptions">{{data.bulletin}}</p>
        <Row v-for="(v,i) in data.supports" :key="i">
          <i-col span="24">
            <i-col span="2">
              <img style="width:20px" src="../assets/imgs/decrease_1@2x.png" v-show="v.type==0" />
              <img style="width:20px" src="../assets/imgs/discount_1@2x.png" v-show="v.type==1" />
              <img style="width:20px" src="../assets/imgs/special_1@2x.png" v-show="v.type==2" />
            </i-col>
            <i-col span="22">{{v.description}}</i-col>
          </i-col>
        </Row>
      </div>
      <div style="background:#eee;padding: 20px 0px" class="pics">
        <Card :bordered="false">
          <p slot="title">商家实景</p>
          <Row>
            <i-col span="4" v-for="(val,item) in data.pics" :key="item">
              <img :src="val" width="81px" height="80px" />
            </i-col>
          </Row>
        </Card>
      </div>
      <div class="infos">
        <Card :bordered="false">
          <p slot="title">商家信息</p>
          <Row v-for="(value,item) in data.infos" :key="item">
            <i-col span="24">{{value}}</i-col>
          </Row>
        </Card>
      </div>
    </ul>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件

export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".merchart"));
  }
};
</script>

<style lang="less" scoped>
.merchart {
  height: 400px;
  overflow: scroll;
  .ivu-card {
    .ivu-card-body {
      .ivu-row {
        .ivu-col-span-16 {
          .ivu-row {
            .ivu-col-span-24 {
              p {
                font-size: 14px;
                font-weight: bold;
                padding-left: 10px;
              }
            }
            .ivu-col-span-8 {
              font-size: 12px;
            }
          }

          .ivu-rate {
            padding-left: 8px;
          }
        }
        .ivu-col-span-6 {
          text-align: right;
          img {
            margin-right: 10px;
          }
        }
      }
      .description {
        text-align: center;
        .ivu-col-span-8:not(:last-child) {
          border-right: 1px solid #e5e5e5;
        }
        .ivu-col-span-8 {
          font-size: 18px;
          p:nth-child(1) {
            color: #c0bebe;
          }
        }
      }
    }
  }
  .notice {
    padding: 20px;
    .active {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .descriptions {
      margin-left: 10px;
      margin-bottom: 20px;
      color: red;
    }
    .ivu-row {
      padding: 15px 0px;
      border-top: 1px solid #e5e5e5;
    }
  }
  .pics {
    .ivu-card-head {
      p {
        font-weight: bold;
      }
    }
    .ivu-card-body {
      .ivu-row {
        .ivu-col-span-4:not(:first-child) {
          margin-left: 25px;
        }
      }
    }
  }
  .infos {
    .ivu-card {
      .ivu-card-head {
        p {
          font-weight: bold;
        }
      }
      .ivu-card-body {
        .ivu-row:not(:last-child) {
          border-bottom: 1px solid #e5e5e5;
        }
        .ivu-row {
          padding: 12px 0px;
        }
      }
    }
  }
}
</style>