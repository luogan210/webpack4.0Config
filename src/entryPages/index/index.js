import Vue from "vue";
import Hello from "../../components/Hello.vue"
import '../../assets/styles/style.css'
new Vue({
    template:"<Hello/>",
    el:"#root",
    components:{
        Hello:Hello
    }
})