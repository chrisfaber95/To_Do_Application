<template>
  <div id="app">
	<TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
	name: 'App',
	components: {
		TodoList
	},
	mounted() {
		if(localStorage.getItem('theme')){
			this.$store.commit('reloadTheme')
		}
		document.body.classList.add("app-background");
	},
	watch:{
		'$store.state.theme':{
			immediate: true,
			handler(){
				document.documentElement.setAttribute('theme', this.$store.state.theme)
			}
		}
	}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
