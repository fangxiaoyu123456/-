import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
var state = {
    name:"",
    type : ""
}
var mutations = {
    changeName(state,name){   
        state.name = name
    },
    changeType(state,type){
        state.type = type
    }
}
var actions = {
    changeName(context,name){
        context.commit('changeName',name)
    },
    changeType(context,type){
        context.commit('changeType',type)
    }
}
var getters = {

}

var store = new vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
export default store
