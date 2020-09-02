<template>
  <div>
      <v-row style="color:white">
         {{pageTitle}} {{pageId}}
      </v-row>
      <div>
        <v-row>
            <v-checkbox hide-details dark
            class="shrink mr-2 mt-0 inline" 
            v-model="isSelectAll"
            v-on:change="SelectAll()"></v-checkbox>Select All
        </v-row>
      </div>
      <div>
          <todoList/>
      </div>
  </div>
</template>

<script>
import todoList from './todo-list';

export default {
    data(){
        return{
            isSelectAll:false
        }
    },
    components:{
        todoList
    },
    computed:{
        pageTitle: function() {
            this.$store.commit('routerParams',this.$route.params.id);
            this.$store.commit('initialCreatePageList',{router:this.$route.params.id,id:0,name: '', color: 'grey-border', checkbox:false})
            return this.$route.params.listType;
        },
        pageId: function(){
            return this.$route.params.id;
        }
        
    },
    methods:{
        SelectAll(){
            if(this.isSelectAll){
                this.$store.commit('selectAllPageListCheckBox',this.GetPageIndex());
            }else{
                this.$store.commit('deselectAllPageListCheckBox',this.GetPageIndex());
            }
        },
        GetPageIndex(){
            var index = this.$store.state.pageList.findIndex(p => p.page == this.$route.params.id);
            return index;
        }
    }
}
</script>

<style>
.inline{
    display: inline;
}
</style>