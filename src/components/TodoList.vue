<template>
	<div class="list">
		<header>			
			<div class="modalbutton left">
				<h1 @click="fadesetting">&#9881;</h1>
			</div>
			<div class="head title">
				<h1>To Do</h1>
			</div>
			<div class="modalbutton right">
				<h1 @click="fade">+</h1>
			</div>
		</header>
		<div class="content">
			<div class="status">
				<div class="block" v-for="s in status" v-bind:key="s.id">
					<h1 class="dynamic-title">{{s.name}}</h1>
					<div class="items" v-for="item in filteredItems(s.id)" v-bind:key="item.id">
						<TodoItem v-bind:listitem="item.id" />
					</div>
				</div>
			</div>
		</div>
		<div class="overlay" v-if="openModal" @click="openModal = !openModal"></div>				
		<div class="overlay" v-if="openSettings" @click="openSettings = !openSettings"></div>				
		<transition name="fade" v-on:enter="enter">	
			<TodoItemModal v-if="openModal"/>
		</transition>			
		<transition name="fadesetting" v-on:enter="entersettings">	
			<Settings v-if="openSettings"/>
		</transition>
	</div>
</template>

<script>
import _ from 'lodash'
import TodoItem from '@/components/TodoItem.vue'
import TodoItemModal from '@/components/TodoItemModal.vue'
import Settings from '@/components/Settings.vue'

export default {
  name: 'TodoList',
  props: {
    id: Number
  },
  components: {
	TodoItem,
	TodoItemModal,
	Settings
  },
  data: function () {
		return {
			filter: '',
			todos: {},
			status:[
				{id: 0, name: 'Backlog'},
				{id: 1, name: 'To Do'},
				{id: 2, name: 'In Progress'},
				{id: 3, name: 'Done'}
			],
			openModal: false,
			openSettings: false
		}
	},
	methods: {
		fade() {
		  this.openModal = !this.openModal
		},
		fadesetting(){
		  this.openSettings = !this.openSettings
		},
		enter(el, done) {
			setTimeout(function() {
				this.openModal = false;
				}, 1500);
		},
		entersettings(el, done) {
			setTimeout(function() {
				this.openSettings = false;
				}, 1500);
		},
		listIsEmpty(){
			console.log(this.todos)
			if(this.todos.length == 0){
				return false
			}
			else{
				return true
			}
		},
		reloadItems(){
			if(localStorage.getItem('listitems')){
				this.$store.commit('reloadListItems')
			}
		},		
		filteredItems(id){
			var listarr = Object.keys(this.todos).map((key) => this.todos[key])
			return _.filter(listarr, function(o) { 
				return o.status == id;
			})
		}
	},
	created(){
	},
	mounted(){
		this.reloadItems()
	},
	computed: {
	},
	watch:{	
		'$store.state.todo':{
			immediate: true,
			deep: true,
			handler(){
				this.todos = this.$store.state.todo
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overlay{
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: #99999999;	
}
header{
	background-color: var(--app-header-background-color);
	color: var(--header-text-color);
	padding: 5px;
}
.head.title{
	margin-left: auto;
	margin-right: auto;
    font-size: xx-large;
    color: var(--header-text-color);
}
.modalbutton{
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
}
.left{
    left: 0;
    top: 0;
    position: absolute;
}
.right{
    right: 0;
    top: 0;
    position: absolute;
	margin-right: 5px;
}
header .modalbutton h1{
	height: 100%;
	max-height: 5vh;
	border: 1px solid #000000;
	background-color: #4350b2;
    color: var(--header-text-color);
	box-shadow: 0 5px 5px 0 #00000099, 0 1px 10px 0 #00000099;
    padding-left: 10px;
    padding-right: 10px;
    font-size: xx-large;

}
.content{
	overflow-y: scroll;
	max-height: 95vh;
}
.status{
	display: flex;
	width: 80vw;
	margin-left: auto;
	margin-right: auto;
}
.status .block{
	width: 25%;
	display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s
}

.fade-enter,
.fade-leave-to
{
  opacity: 0
}

@media only screen and (max-width: 1024px){	
	.status{
		margin-left: unset;
		margin-right: unset;
		display: -webkit-inline-box;
		overflow-x: scroll;
	}
	.status .block{
		width: 40%;
	}
} 
@media only screen and (max-width: 425px){	
	.status{
		margin-left: unset;
		margin-right: unset;
		display: -webkit-inline-box;
		overflow-x: scroll;
	}
	.status .block{
		width: 80%;
	}
} 
</style>
