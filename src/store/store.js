import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currentPage:null,
        lists: [],
        pageList: [{
            page: null,
            items:[{
                id: 0,
                name:'',
                color: 'grey-border',
                checkbox: false
            }]
        }],
    },
    getters:{
        getPageList(state){
            var index = state.pageList.findIndex(l => l.page == state.currentPage);
            console.log("fancy array: ",index);
            console.log(state.currentPage);
            return state.pageList[index].items;
        }
    },
    mutations:{
        routerParams(state,router){
            state.currentPage = router;
        },
        updateList(state,data){
            console.log("from store", data.typeId)
            state.lists.push({name:data.type, id:data.typeId})
        },
        createPageList(state,data){
            console.log("from store", data.name)
            state.pageList[data.pageIndex].items.push({id:data.id,name:data.name, color:data.color, checkbox: data.checkbox})
        },
        initialCreatePageList(state,data){
            console.log("from store", data.name)
            //let index = dispatch('GetIndex');
            //state.pageList.push({page:data.router});
            console.log(state.pageList);
            var isPageRouterExists = state.pageList.some(p => p.page == state.currentPage);
            console.log(isPageRouterExists);
            if(state.pageList[0].page != null && !isPageRouterExists){
                state.pageList.push({page: data.router,items:[{id:data.id,name:data.name, color:data.color, checkbox: data.checkbox}]});
            }else if(state.pageList[0].page == null){
                state.pageList[0].page = data.router;
            }

            console.log(state.pageList);
        },
        updateBorder (state, data) {
            //state.pageList[data.index].name = data.name
            //var index =  dispatch("GetIndex");
            state.pageList[data.pageIndex].items.find(l => l.id == data.id).color = data.color; 
            console.log(state.pageList)
        },
        updateCheckbox (state, data) {
            state.pageList[data.pageIndex].items[data.index].checkbox = data.name 
            console.log(state.pageList)
        },
        removePageList(state,data){
            var index = state.pageList[data.pageIndex].items.findIndex(l => l.id == data.id);
            //console.log("id: ",id," index: ",index);
            state.pageList[index].items.splice(index,1);
        },
        selectAllPageListCheckBox(state,pageIndex){
            state.pageList[pageIndex].items.forEach(c => {
                if(!c.color.includes("grey-border")){
                    c.checkbox = true
                }
            })
        },
        deselectAllPageListCheckBox(state,pageIndex){
            state.pageList[pageIndex].items.forEach(c =>{
                c.checkbox = false
            })
        }
    },
    actions:{

    }
})