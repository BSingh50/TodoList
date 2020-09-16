<template>
  <v-app>
       <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <Manage/>
    </v-navigation-drawer>
     <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>To Do List</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container
        fluid
      >
        <v-layout
          align-center
          justify-center
        >

                  <router-view></router-view>
               
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Manage from './components/todo-manage';
export default {
  name: 'App',
  data(){
    return{
      drawer: null,
    }
  },
  components: {
    Manage
  },
  created () {
      this.$vuetify.theme.dark = true
    },

};
</script>

<style></style>