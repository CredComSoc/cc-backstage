<!--
Load and display one user's offers and wants. The search box filters the list on date. Also has a chatbox and member details box (for this member) on the right.
-->

<template>
	<div>
		<member_header @keyup="onSearch" :title="memberName" />
		<v-row>
			<v-col cols="8">
				<member_tabs @click="setTabStatus" :blueTabTitle='"OFFERS"' :greenTabTitle='"WANTS"' />

				<div v-if="onBlueTab">
					<v-row class="row-headings">
						<v-col cols="2">
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
						<!-- Spinner while loading the list-->
						<div v-if="isLoadingOffersWants" class="spinner-holder">
							<img src="./admin_icons/Spinner-5.gif" class="spinner">
						</div>
						<div v-else> <!-- Display list-->
							<v-row class="top-border" v-for="offer in offers" :key="offer.id">
								<v-col cols="2" class="row-text">
									{{ offer.uploadDate }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ offer.title }}
								</v-col>
								<v-col cols="2" class="row-text">
									${{ offer.price }}
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
				</div>
				<div v-else>
					<v-row class="row-headings">
						<v-col cols="2">
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
						<!-- Spinner while loading the list-->
						<div v-if="isLoadingOffersWants" class="spinner-holder">
							<img src="./admin_icons/Spinner-5.gif" class="spinner">
						</div>
						<div v-else> <!-- Display list-->
							<v-row class="top-border" v-for="want in wants" :key="want.id">
								<v-col cols="2" class="row-text">
									{{ want.uploadDate }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ want.title }}
								</v-col>
								<v-col cols="2" class="row-text">
									${{ want.price }}
								</v-col>
								<v-col cols="3" class="row-text">
									{{ want.longDesc }}
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
			</v-col>
			<v-col cols="4">
				<chat_tabs @click="setChatboxTabStatus" :leftTabTitle='"MEMBER DETAILS"' :rightTabTitle='"MEMBER CHAT"' />
				<member_details_box v-if=onLeftChatboxTab :memberName="memberName" />
				<chatbox v-else />
			</v-col>
		</v-row>
	</div>
</template>



<script>
import { getUserArticles } from '/pages/gqlFetch.js'
import member_header from '/components/member_header.vue'
import member_tabs from '/components/member_tabs.vue'
import chat_tabs from '/components/chat_tabs.vue'
import chatbox from '/components/chatbox.vue'
import member_details_box from '/components/member_details_box.vue'

export default {

	components: {
		member_header, member_tabs, chat_tabs, chatbox, member_details_box
	},

	data() {
		return {
			offers: [],
			allOffers: [],
			wants: [{ date: "2023-11-01", title: "Frogs legs", amount: 4, description: "I want some frogs' legs." }],
			allWants: [],
			imgUrl: "",
			onBlueTab: true,
			onLeftChatboxTab: true,

			isLoadingOffersWants: false,

			id: this.$route.params.id,
			memberName: this.$route.params.name
		}

	},
	methods: {
		async updateOffers() {
			var articles = await getUserArticles(this.memberName)
			console.log(this.memberName)
			articles = JSON.parse(articles)

			this.offers = articles.filter(function (article) {
				return (article.status == "offer")
			})
			this.wants = articles.filter(function (article) {
				return (article.status == "want")
			})

			for (var ii = 0; ii < this.offers.length; ii++) {
				var date = new Date(Number(this.offers[ii].uploadDate)) // Unix time to Date
				this.offers[ii].uploadDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0')
			}
			for (var ii = 0; ii < this.wants.length; ii++) {
				var date = new Date(Number(this.wants[ii].uploadDate)) // Unix time to Date
				this.wants[ii].uploadDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0')
			}

			this.allOffers = this.offers
			this.allWants = this.wants
			this.isLoadingOffersWants = false // spinner off
		},

		onSearch(searchTerm) {
			// Filter both lists on date
			this.offers = this.allOffers.filter(offer => {
				return offer.uploadDate.toString().includes(searchTerm)
			})
			this.wants = this.allWants.filter(want => {
				return want.uploadDate.toString().includes(searchTerm)
			})
		},

		setTabStatus(onBlueTab) {
			this.onBlueTab = onBlueTab
		},
		setChatboxTabStatus(onLeftChatboxTab) {
			this.onLeftChatboxTab = onLeftChatboxTab
		},

	},
	mounted: function () {
		this.isLoadingOffersWants = true // spinner on
		this.updateOffers()
	}



}
</script>
