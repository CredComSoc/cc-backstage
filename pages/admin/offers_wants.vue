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
						{{ offer.uploadDate }}
					</v-col>
					<v-col cols="2" class="row-text">
						{{ offer.title }}
					</v-col>
					<v-col cols="2" class="row-text">
						{{ offer.price }}
					</v-col>
					<v-col cols="3" class="row-text">
						{{ offer.longDesc }}
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
			memberName: this.$route.params.name
		}

	},
	methods: {

		/*
		 title
		 uploadDate
		 longDesc
		 price
		*/

		async updateOffers() {
			var articles = await getUserArticles(this.memberName)
			articles = JSON.parse(articles)

			this.offers = articles.filter(function (article) {
				return (article.status == "offer")
			})
			this.wants = articles.filter(function (article) {
				return (article.status == "want")
			})

			for (var ii = 0; ii < this.offers.length; ii++) {
				var date = new Date(this.offers[ii].uploadDate * 1000)
				this.offers[ii].uploadDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
			}
			for (var entry in this.wants) {
				alert("Before: " + entry.uploadDate + "\n After: " + new Date(entry.uploadDate * 1000))
				entry.uploadDate = new Date(entry.uploadDate * 1000)
			}

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
