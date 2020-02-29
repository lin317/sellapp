<template>
  <div class="evaluate">
    <div style="background:#f3f6f6;padding-bottom: 20px">
      <Card :bordered="false">
        <Row>
          <i-col span="10">
            <i-col span="20">
              <p>3.9</p>
              <p>综合评分</p>
              <p>高于周边商家69.2%</p>
            </i-col>
          </i-col>
          <i-col span="14">
            <i-col span="22">
              <Row>
                <i-col span="8">服务态度</i-col>
                <i-col span="16">
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_off@2x.png" alt />
                </i-col>
              </Row>
              <Row>
                <i-col span="8">服务态度</i-col>
                <i-col span="16">
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_on@2x.png" alt />
                  <img src="../assets/imgs/star24_off@2x.png" alt />
                </i-col>
              </Row>
              <p>
                送达时间
                <span>38分钟</span>
              </p>
            </i-col>
          </i-col>
        </Row>
      </Card>
    </div>
    <div class="card">
      <Card :bordered="false">
        <Row slot="title">
          <i-col span="4">
            全部
            <span>57</span>
          </i-col>
          <i-col span="4">
            满意
            <span>47</span>
          </i-col>
          <i-col span="14">
            不满意
            <span>10</span>
          </i-col>
        </Row>

        <Row>
          <i-col span="4">✔</i-col>
          <i-col span="14">只看有内容的评价</i-col>
        </Row>
      </Card>
    </div>
    <div class="user">
      <div class="user-list" v-for="(v,i) in data" :key="i">
        <Row class="list">
          <i-col span="4">
            <img :src="v.avatar" alt width="40px" height="40px" />
          </i-col>
          <i-col span="20">
            <Row>
              <i-col span="12">{{v.username}}</i-col>
              <i-col span="10">{{v.rateTime|dateFormat('YYYY-MM-DD HH:mm')}}</i-col>
            </Row>
            <p class="time">
              <Rate disabled v-model="v.score" />
              <span v-show="v.deliveryTime!=''&&v.deliveryTime>0">{{v.deliveryTime}}分钟送达</span>
            </p>
            <p class="text">{{v.text}}</p>
            <p class="rate">
              <img src="../assets/imgs/thumb_up.svg" alt v-show="v.rateType==1" width="10px" />
              <img src="../assets/imgs/thumb_down.svg" alt v-show="v.rateType==0" width="10px" />
              <span v-for="(value,i) in v.recommend" :key="i">{{value}}</span>
            </p>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "../api/apis";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    getRatings().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.evaluate {
  height: 400px;
  overflow: scroll;
  
  .ivu-card {
    .ivu-card-body {
      .ivu-row {
        .ivu-col-span-10 {
          .ivu-col-span-20 {
            text-align: center;
            margin-left: 20px;
            border-right: 1px solid #9da2a3;
            p:nth-child(1) {
              color: #ff9e00;
              font-size: 20px;
            }
            p:nth-child(2) {
              font-weight: bold;
              color: #000;
            }
            p:nth-child(3) {
              color: #9da2a3;
            }
          }
        }
        .ivu-col-span-14 {
          .ivu-col-span-22 {
            color: #000;
            .ivu-col-span-8 {
              margin-bottom: 10px;
            }
            .ivu-col-span-16 {
              img {
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
  }
  .card {
    .ivu-card {
      .ivu-card-head {
        .ivu-row {
          line-height: 30px;
          .ivu-col-span-4:nth-child(1) {
            width: 50px;
            height: 30px;
            text-align: center;
            background: #2d8cf0;
            color: #fff;
          }
          .ivu-col-span-4:nth-child(2) {
            width: 50px;
            height: 30px;
            text-align: center;
            background: #cceef7;
            margin: 0px 10px;
          }
          .ivu-col-span-14 {
            width: 80px;
            height: 30px;
            text-align: center;
            background: #c5c8ce;
          }
          span {
            font-size: 10px;
          }
        }
      }
      .ivu-card-body {
        .ivu-row {
          .ivu-col-span-4 {
            width: 18px;
            height: 18px;
            background-color: #c5c8ce;
            text-align: center;
            border-radius: 50%;
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
  .user {
    margin-top: 10px;
    height: 100%;

    .user-list {
      .list {
        margin-bottom: 20px;
        .ivu-col-span-4 {
          text-align: right;
          img {
            border-radius: 50%;
          }
        }
        .ivu-col-span-20 {
          padding-left: 5px;
          .ivu-row {
            .ivu-col-span-10 {
              color: #c5c8ce;
              text-align: right;
            }
          }

          .time {
            font-size: 10px;
            color: #c5c8ce;
            .ivu-rate {
              font-size: 12px;
            }
          }
          .text {
            font-size: 12px;
            padding-right: 20px;
          }
          .rate {
            padding-right: 20px;
            span {
              width: 50px;
              border: 1px solid #e5e5e5;
              display: inline-block;
              max-width: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 5px;
              font-size: 12px;
              color: #c5c8ce;
            }
          }
        }
      }
    }
  }
}
</style>