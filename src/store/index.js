import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//1.创建一个vuex的数据仓库，用来存放所以需要交互的数据
var store = new Vuex.Store({
        //存放所有交互数据
        state: {
            goodslist: [], //所有商品数组
        },
        //改变，它是改变state的唯一方式
        mutations: {
            //只有mutation里的小函数才可以直接改变state数据
            //每一个mutation都会接受一个形参state，指向上面的state
            inintGoodsList(state, newArr) {
                state.goodslist = newArr
            },

            //商品数量的改变
            changeGoodsNum(state, i) {
                // console.log(state.goodslist)
                for (let typeObj of state.goodslist) {
                    for (let food of typeObj.foods) {
                        if (food.name == i.name) {
                            food.num += i.val
                        }
                    }
                }
            }

        },
        getters: {
            getShopGoods(state) {
                let arr = [] //空数组
                let shopGoodsname = [] //商品名字数组
                for (let typeObj of state.goodslist) {
                    for (let food of typeObj.foods) {
                        if (food.num > 0) {
                            if (!shopGoodsname.includes(food.name)) {
                                arr.push(food)
                                shopGoodsname.push(food.name)
                            }
                        }
                    }
                }
                return arr
            }
        }
    })
    //mutation函数必须手动触发
    //参数1：要触发的mutation的名字，参数2:要传入的参数
    // store.commit('changeName', '伦伦肥')
export default store