<template>
  <div id="outer-list-container" class="center">
    <v-row>
      <div>Todo:</div>
    </v-row>
    <transition-group name="run" tag="div">
          <div id="list-container"
    class="default-size"
     v-for="input in todoPageList()" :key="input.id">
      <v-row :class="input.color">
        <v-checkbox hide-details dark
                class="shrink mr-2 mt-0"
                v-model="input.checkbox"></v-checkbox>
        <input class="input-field"
          v-model="input.name"
          @input="updateAndCreate(input.name,input.id)"/>
        <v-icon small @click="remove(input.id)" 
          class="remove-icon">{{removeIcon}}
        </v-icon>
      </v-row>
    </div>
    </transition-group>

    <v-row>
      <div>Completed:</div>
    </v-row>
    <transition-group name="run">
      <div 
       v-for="input in completedPageList()" :key="input.id">
              <v-row :class="input.color">
        <v-checkbox hide-details dark
                class="shrink mr-2 mt-0"
                v-model="input.checkbox"></v-checkbox>
        <input class="input-field"
          v-model="input.name"/>
        <v-icon small @click="remove(input.id)" 
          class="remove-icon">{{removeIcon}}
        </v-icon>
      </v-row>
      </div>
    </transition-group>

  </div>
</template>

<script>
import { mdiCloseCircle } from '@mdi/js';
import {mapGetters} from 'vuex';
export default {
    name:'todo-list',
  data(){
    return{
      listName:'',
      id:0,
      removeIcon: mdiCloseCircle
    }
  },
  methods:{
      completedPageList(){
        return this.getPageList.filter(v => v.checkbox == true);
      },
      todoPageList(){
        return this.getPageList.filter(v => v.checkbox == false);
      },
      remove(id){
        console.log("before ", this.$store.state.pageList)
        this.$store.commit('removePageList',{pageIndex:this.GetPageIndex(),id:id});

      },
      updateAndCreate(name,id){
        console.log("id is ", id)
        console.log("Whole array: ", this.$store.state.pageList)
        console.log("filtered todo array: ", this.todoPageList())
        console.log("last position: ",this.GetLastPosition())

        this.$store.commit('updateBorder',{pageIndex:this.GetPageIndex(),id:id,color:'white-border'});
          if(this.GetLastPosition() == id){
          id+=1;
          this.$store.commit('createPageList',{pageIndex:this.GetPageIndex(),id:id,name: '', color: 'grey-border', checkbox:false})
        }
      },
      GetLastPosition(){
        return this.todoPageList()[this.todoPageList().length-1].id;
      },
      GetPageIndex(){
        var index = this.$store.state.pageList.findIndex(p => p.page == this.$route.params.id);
        return index;
      }
    },
    computed:{
      ...mapGetters({
        getPageList : 'getPageList'
      }),
      getlist () {
        return this.getPageList;
      }
  }
}
</script>

<style>
.colors{
  color:white;
}

.input-field{
  outline: none;
}
.white-border{
  border-bottom:1px solid white;
  width:15em;
}

.grey-border{
   border-bottom:1px solid grey;
   width:15em;
}

.remove-icon{
  cursor: pointer;
  padding-top: 0.6em;
  color:white;
}

.center{
  width: 20em;
}


.run-leave-to{
    padding-left:10em;
    transition: 300ms;
    opacity:0;
}



</style>