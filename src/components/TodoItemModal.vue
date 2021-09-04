<template>
	<div class="item-modal">
		<div class="modalheader">
			<div class="title">
				<h1>New Task</h1>
			</div>
			<div class="closebutton">
				<h1 @click="$parent.openModal = !$parent.openModal">X</h1>
			</div>
		</div>
		<div class="modalcontent">
		
			<b-form-group
				:invalid-feedback="invalidFeedback"
				:state="titleState">
				<label for="title">Title</label>
				<b-form-input 
					id="title" 
					type="text"
					v-model="title" 
					placeholder="Title" 
					:state="titleState" 
					aria-describedby="input-live-help input-live-feedback"
					trim
				/>
			</b-form-group>
			<label for="description">Omschrijving</label>
			<b-form-textarea 
				v-model="description"
				size="lg"
				id="description"
				placeholder="Description"
				rows="5"
				max-rows="8"
				no-auto-shrink>
			</b-form-textarea>
		</div>
		<div class="modalfooter">
			<button @click="addListItem">Toevoegen</button>
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
			title: '',
			description: ''
		}
	},
	methods: {
		addListItem(){
			console.log(this.$refs)
			var id = 0
			if(Object.keys(this.todos).length > 0){
				console.log()
				id = Math.max(...Object.keys(this.todos)) + 1
			}
			var item = {
				id: id,
				status: 0,
				date: new Date(),
				text: this.description,
				title: this.title
			}
			this.$store.commit('addListItem', item)			
		}
	},
	created(){
	},
	mounted(){
	},
	computed: {
		titleState() {
			return this.title.length >= 4
		},
		invalidFeedback() {
			if (this.title.length > 0) {
				return 'Enter at least 4 characters.'
			}
			return 'Please enter a title.'
		}
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
.item-modal{
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
.modalcontent label,input{
	display: block;
	width: 30%;
	height: 30%;
	margin: 5px;
	margin-left: auto;
	margin-right: auto;
}
.modalcontent textarea{
	width: 50%;
	height: 30%;
	margin-left: auto;
	margin-right: auto;
}
.modalfooter button{
	width: 40%;
	border: 1px solid #000000;
	background-color: #4350b2;
    color: var(--header-text-color);
	box-shadow: 0 5px 5px 0 #00000099, 0 1px 10px 0 #00000099;
    padding-left: 5px;
    padding-right: 5px;
	margin: 5px;
}
@media only screen and (max-width: 425px){	
	.item-modal{
		width: 90vw;
		height: 70vh;
		top: 15vh;
		left: 5vw;
	}
	.modalcontent label,input{
		width: 90%;
		margin-left: auto;
		margin-right: auto;
	}
	.modalcontent textarea{
		width: 90%;
		height: 50%;
		margin-left: auto;
		margin-right: auto;
	}
} 
</style>
