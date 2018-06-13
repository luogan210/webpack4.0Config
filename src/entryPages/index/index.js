import Vue from "vue";
import Hello from "../../components/Hello.vue"

new Vue({
    template:"<Hello/>",
    el:"#root",
    components:{
        Hello:Hello
    }
})