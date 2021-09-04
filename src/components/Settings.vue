<template>
	<div class="setting-modal">
		<div class="modalheader">
			<div class="title">
				<h1>Settings</h1>
			</div>
			<div class="closebutton">
				<h1 @click="$parent.openSettings = !$parent.openSettings">X</h1>
			</div>
		</div>
		<div class="modalcontent">
			<div class="block">
				<h2>Theme</h2>
				<hr/>
				<h3>Dark Mode</h3>
					<label class="switch">
					  <input type="checkbox" v-model="theme" true-value="dark" false-value="light" v-on:change="changeTheme()">
					  <span class="slider round"></span>
					</label>
				</hr>
			</div>
		</div>
		<div class="modalfooter">
		</div>
	</div>
</template>

<script>
export default {
  name: 'TodoCard',
  props: {
    listitem: Number
  },
  data: function () {
		return {
			todos: {},
			theme: 'dark'
		}
	},
	methods: {
		changeTheme(){			
			this.$store.commit('updateTheme', this.theme)
		}
	},
	created(){
	},
	mounted(){
	},
	computed: {
	},
	watch:{
		'$store.state.theme':{
			immediate: true,
			handler(){
				this.theme = this.$store.state.theme
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.setting-modal{
	position: absolute;
	display: block;
	width: 50vw;
	height: 50vh;
	top: 30vh;
	left: 25vw;
	border: 1px solid black;
	margin: 10px;
	background-color: var(--modal-background-color);
	box-shadow: 0 5px 5px 0 #00000099, 0 1px 10px 0 #00000099;
}

@media only screen and (max-width: 425px){	
	.setting-modal{
		width: 90vw;
		height: 70vh;
		top: 15vh;
		left: 5vw;
	}
} 
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
