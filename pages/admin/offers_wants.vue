<template>
	<div>
		<member_header :title="memberName" />
		<member_tabs @click="setTabStatus" :blueTabTitle='"OFFERS"' :greenTabTitle='"WANTS"' />

		<div v-if="onBlueTab">
			<v-row class="row-headings">
				<v-col cols="1">
					<h1>Date</h1>
				</v-col>
				<v-col cols="2">
					<h1>Title</h1>
				</v-col>
				<v-col cols="2">
					<h1>Amount</h1>
				</v-col>
				<v-col cols="3">
					<h1>Description</h1>
				</v-col>
			</v-row>
			<div class="fixed-box fixed-box-no-admin">
				<v-row class="top-border" v-for="offer in offers">
					<v-col cols="1" class="row-text">
						{{ offer.date }}
					</v-col>
					<v-col cols="2" class="row-text">
						{{ offer.title }}
					</v-col>
					<v-col cols="2" class="row-text">
						{{ offer.amount }}
					</v-col>
					<v-col cols="3" class="row-text">
						{{ offer.description }}
					</v-col>
					<v-col class="button-row">
						<NuxtLink :to="{ name: '', params: {} }">
							<div class="white-button">Buy</div>
						</NuxtLink>
					</v-col>
				</v-row>
			</div>
		</div>
		<div v-else>
			<v-row class="row-headings">
				<v-col cols="1">
					<h1>Date</h1>
				</v-col>
				<v-col cols="2">
					<h1>Title</h1>
				</v-col>
				<v-col cols="2">
					<h1>Amount</h1>
				</v-col>
				<v-col cols="3">
					<h1>Description</h1>
				</v-col>
			</v-row>
			<div class="fixed-box fixed-box-no-admin">
				<v-row class="top-border" v-for="want in wants">
					<v-col cols="1" class="row-text">
						{{ want.date }}
					</v-col>
					<v-col cols="2" class="row-text">
						{{ want.title }}
					</v-col>
					<v-col cols="2" class="row-text">
						{{ want.amount }}
					</v-col>
					<v-col cols="3" class="row-text">
						{{ want.description }}
					</v-col>
					<v-col class="button-row">
						<NuxtLink :to="{ name: '', params: {} }">
							<div class="white-button">Sell</div>
						</NuxtLink>
					</v-col>
				</v-row>
			</div>
		</div>
	</div>
</template>



<script>
import { getUserArticles, getMember } from '/pages/gqlFetch.js'
import { updateUserProfile } from '/pages/expressFetch.js'
import member_header from '/components/member_header.vue'
import member_tabs from '/components/member_tabs.vue'

export default {

	components: {
		member_header, member_tabs
	},

	data() {
		return {
			offers: [],
			wants: [{ date: "2023-11-01", title: "Frogs legs", amount: 4, description: "I want some frogs' legs." }],

			onBlueTab: true,

			id: this.$route.params.id,
			name: this.$route.params.name
		}

	},
	methods: {
		async updateOffers() {
			var user = this.name
			var articles = await getUserArticles(this.name)
			articles = JSON.parse(articles)

			this.offers = articles.filter(function (article) {
				return (article.status == "offer")
			})
			this.wants = articles.filter(function (article) {
				return (article.status == "want")
			})
			console.log(articles)
			// var member = await getMember(this.name)
			// console.log(member)
			// await updateUserProfile(this.name, "editnametest", member.description, member.address, member.city, member.billing.name, member.billing.box, member.billing.address, member.billing.orgNumber, member.email, member.phone)
		},

		setTabStatus(onBlueTab) {
			this.onBlueTab = onBlueTab
		}

	},
	mounted: function () {
		this.updateOffers()
	}



}
</script>
