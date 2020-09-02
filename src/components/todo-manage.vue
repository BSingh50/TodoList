<template>
  <div id="app">
    <v-list-item>
        <v-list-item-content>
            <div class="text-color"><input type="text"  class="input" v-model="listtype" />&nbsp;
            <v-icon small class="add-icon" @click="displayList()">{{addIcon}}</v-icon></div>
        </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(list,index) in lists" 
    :key="index"
    :to="{name: 'list', params: {listType: list.name, id: list.id }}"
    style="color:white;text-decoration:none"
    >
        <v-list-item-content>
            <v-list-item-title v-text="list.name"></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { mdiPlusCircle } from '@mdi/js';

export default {
    name:'todo-manage',
    data(){
        return{
            listtype:'',
            typeId:0,
            addIcon: mdiPlusCircle

        }
    },

    computed:{
        lists:{
            set(value){
                this.$store.commit('updateList',value);
            },
            get(){
                return this.$store.state.lists;
            }
        }
        
    },
    methods:{
        displayList(){
            this.typeId += 1;
            this.$store.commit('updateList', {type: this.listtype, typeId: this.typeId});
            console.log(this.lists, " ", this.typeId)
        }
    },
    
}
</script>

<style>
.text-color, .input{
    color:white
}
.input{
    border-bottom:1px solid white;
    width:200px;
    text-decoration: none;
    outline:none;
}
</style>