<template>
	<div>
		<h1>Offer & Wants for {{ name }} </h1>
		<br>
		<h2>Offers</h2>
		<ul>
			<div v-for="offer in offers">
				<li>
					<!-- < NuxtLink : to = "{ name: 'admin-member', params: { id: member.id, name: member.name } }" > Member: {
					{
						member.name }}</NuxtLink> <a v-bind:href="`mailto:${member.email}`">Email</a> -->
					{{ offer.offer }} - {{ offer.price }} <NuxtLink
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
					{{ want.want }} - {{ want.price }}
				</li>
			</div>
		</ul>

	</div>
</template>



<script>
import {getUserArticles} from '/pages/gqlFetch.js'
export default {

	data() {
		return {
			offers:
				[  // Fake offers
					{ id: 1, offer: "water buffalo", price: 25 },
					{ id: 2, offer: "moon rocket", price: 12 },
					{ id: 3, offer: "heavy water", price: 50 },
				],

			wants:
				[  // Fake wants
					{ id: 1001, want: "spring", price: 25 },
					{ id: 1002, want: "suspension", price: 12 },
					{ id: 1003, want: "gearbox", price: 50 },
				],


			id: this.$route.params.id,
			name: this.$route.params.name
		}

	},
	methods: {
		async updateOffers(){
			var articles = await getUserArticles(this.$route.params.name)
			articles = JSON.parse(articles)
			this.offers = articles.filter(function (article){
				return article.status == "offer"
			})
			this.wants = articles.filter(function (article){
				return article.status == "want"
			})
		}
	},
	mounted: function(){
		this.updateOffers()
	}



}
</script>
