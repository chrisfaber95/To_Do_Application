<template>
  <div class="card">
	<div class="content">
		<h1>{{info.title}}</h1>
		<p>{{formatDate(info.date)}}</p>
		<p v-if="info.text" v-html="unescape(newline(info.text))"></p>
	</div>
	<div class="buttons">
		<select v-model="cardinfo.status">
			<option v-for="option in status" v-bind:value="option.id">
				{{ option.name }}
			</option>
		</select>
		<button @click="deleteItem">Delete</button>
	</div>
  </div>
</template>

<script>
import moment from 'moment'
import $ from 'jquery'
export default {
  name: 'TodoCard',
  props: {
    listitem: Number
  },
  data: function () {
		return {
			cardinfo:{},
			status:[
				{id: 0, name: 'Backlog'},
				{id: 1, name: 'To Do'},
				{id: 2, name: 'In Progress'},
				{id: 3, name: 'Done'}
			]
		}
	},
	methods: {
		unescape: function(html){
			var txt = document.createElement('textarea');
			txt.innerHTML = html;
			return txt.value;
		},
		newline:function(html){
			html = html.replace(new RegExp('\r?\n','g'), '<br />');
			return html;
		},
		getCard(id){
			this.cardinfo = this.$store.getters.getCard(id)
		},
		updateCard(){			
			this.$store.commit('updateListItem', this.cardinfo)
		},
		deleteItem(){			
			this.$store.commit('deleteListItem', this.cardinfo)
		},
		formatDate(date){
			return moment(date).format('MMMM Do YYYY, HH:mm')
		},
		postitsize(){
			var cw = $('.card').width()*1.2;
			$('.card').css({'height':cw+'px'});
		}
	},
	created(){
	},
	mounted(){
		this.getCard(this.listitem)
		this.postitsize()
	},
	computed: {
		info(){
			return this.cardinfo
		}
	},
	watch:{
		cardinfo:{
			immediate: true,
			deep: true,
			handler(){
				this.updateCard()
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card{
	background-color: var(--item-block-background-color);
	color: var(--item-block-text-color);
	border: 1px solid var(--item-block-text-color);
	margin: 10px;
	box-shadow: 0 5px 5px 0 #00000099, 0 1px 10px 0 #00000099;
	display: flex;
    justify-content: space-between;
}
.card .buttons select, button{
	width: 40%;
	border: 1px solid #000000;
	background-color: #4350b2;
    color: var(--header-text-color);
	box-shadow: 0 5px 5px 0 #00000099, 0 1px 10px 0 #00000099;
    padding-left: 5px;
    padding-right: 5px;
	margin: 5px;
}
.card:hover{
	background-color: var(--item-block-hover-background-color);
	cursor:pointer;
}
.content{
	overflow: scroll;
	max-height: 90%;
	scrollbar-width: none;
}
.content::-webkit-scrollbar{
	display: none;	
}
[theme="whiteboard"] {
	.card{
		background-color: #feff9c;
		color: var(--item-block-text-color);
		border: unset;
		margin: 10px;
		box-shadow: 0 5px 5px 0 #00000099, 0 1px 10px 0 #00000099;
	}
	.card:hover{
		background-color: #edee8b;
	}
}
</style>
