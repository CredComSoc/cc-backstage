<template>
	<div>
		<h1>Offer & Wants for {{ name }} </h1>
		<br>
		<h2>Offers</h2>
		<button @click="registerUser">Object</button>
		<ul>
			<div v-for="offer in offers">
				<li>
					<!-- < NuxtLink : to = "{ name: 'admin-member', params: { id: member.id, name: member.name } }" > Member: {
					{
						member.name }}</NuxtLink> <a v-bind:href="`mailto:${member.email}`">Email</a> -->
					{{ offer.title }} - {{ offer.price }} <NuxtLink
						:to="{ name: 'admin-edit_offer_want', params: { id: id } }">
						<v-btn>Edit</v-btn>
					</NuxtLink>
				</li>
			</div>
		</ul>
		<br>
		<h2>Wants</h2>
		<ul>
			<div v-for="want in wants">
				<li>
					<!-- < NuxtLink : to = "{ name: 'admin-member', params: { id: member.id, name: member.name } }" > Member: {
					{
						member.name }}</NuxtLink> <a v-bind:href="`mailto:${member.email}`">Email</a> -->
					{{ want.title }} - {{ want.price }}
				</li>
			</div>
		</ul>

	</div>
</template>



<script>
import {getUserArticles} from '/pages/gqlFetch.js'
import {register} from '/pages/expressFetch.js'
export default {

	data() {
		return {
			offers: [],

			wants: [],


			id: this.$route.params.id,
			name: this.$route.params.name
		}

	},
	methods: {
		async updateOffers(){
			var user = this.name
			var articles = await getUserArticles(this.name)
			articles = JSON.parse(articles)

			this.offers = articles.filter(function (article){
				return (article.status == "offer")
			})
			this.wants = articles.filter(function (article){
				return (article.status == "want")
			})
			console.log(articles)
		},
		async registerUser(){
			var response = await register(true, "test", "password", "a test user", "teststreet 10", "testcity", "billing", "box", "billingaddress", "org 10", "testorg@test.com", "1912214")
			console.log(response)
		}
	},
	mounted: function(){
		this.updateOffers()
	}



}
</script>
