<template>
	<div>
		<member_header @keyup="onSearch" :title="memberName" />
		<v-row>
			<v-col cols="8">
				<member_tabs @click="setTabStatus" :blueTabTitle='"BARTERKRONOR"' :greenTabTitle='"KRONOR"' />
				<div v-if="onBlueTab">
					<v-row class="row-headings">
						<v-col cols="2">
							<h1>Status</h1>
						</v-col>
						<v-col cols="2">
							<h1>Date</h1>
						</v-col>
						<v-col cols="2">
							<h1>Counterpart</h1>
						</v-col>
						<v-col cols="2">
							<h1>Amount</h1>
						</v-col>
						<v-col cols="2">
							<h1>Description</h1>
						</v-col>
					</v-row>
					<div class="fixed-box fixed-box-no-admin">
						<div v-if="isLoadingTransactionData" class="spinner-holder">
							<img src="./admin_icons/Spinner-5.gif" class="spinner">
						</div>
						<div v-else>
							<v-row class="top-border" v-for="transaction in transactions">
								<v-col cols="2" class="row-text">
									{{ transaction.state }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.date }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.counterpart }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.amount }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.description }}
								</v-col>
								<v-col class="button-row">
									<NuxtLink :to="{ name: '', params: {} }">
										<div class="white-button">Revert</div>
									</NuxtLink>
								</v-col>
							</v-row>
						</div>
					</div>
				</div>
				<div v-else> <!-- Green tab-->
					<v-row class="row-headings">
						<v-col cols="2">
							<h1>Status</h1>
						</v-col>
						<v-col cols="2">
							<h1>Date</h1>
						</v-col>
						<v-col cols="2">
							<h1>Counterpart</h1>
						</v-col>
						<v-col cols="2">
							<h1>Amount</h1>
						</v-col>

						<v-col cols="2">
							<h1>Description</h1>
						</v-col>
					</v-row>

					<div class="fixed-box fixed-box-no-admin">
						<div v-if="isLoadingTransactionData" class="spinner-holder">
							<img src="./admin_icons/Spinner-5.gif" class="spinner">
						</div>
						<div v-else>
							<v-row class="top-border" v-for="transaction in transactions">
								<v-col cols="2" class="row-text">
									{{ transaction.state }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.date }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.counterpart }}
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.amount_kr }} kr
								</v-col>
								<v-col cols="2" class="row-text">
									{{ transaction.description }}
								</v-col>
								<v-col class="button-row">
									<NuxtLink :to="{ name: '', params: {} }">
										<div class="white-button">Revert</div>
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
import member_header from '/components/member_header.vue'
import { getMember, getUserTransactions } from '/pages/gqlFetch.js'
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
			memberId: this.$route.params.id,
			memberName: this.$route.params.name,
			member: {},

			conversionRate: 1.25, // Dummy conversion rate SEK:Bartercrowns

			isLoadingTransactionData: false,

			allTransactions: [],
			transactions: [],
			/*transactions: [
				{ status: "Finished", date: "2023-09-12", counterpart: "Ben Johnson", description: "Shoes", amount: "110", amount_kr: "400", type: "invoice" },
				{ status: "Pending", date: "2023-09-12", counterpart: "John Benson", description: "Hat", amount: "22", amount_kr: "100", type: "credit" },
				{ status: "Pending", date: "2020-01-10", counterpart: "Sune Mangs", description: "Shirt", amount: "220", amount_kr: "640", type: "credit" }
			],*/
			unformattedTransactions: [],

			onBlueTab: true,
			onLeftChatboxTab: true,
		}
	},

	methods: {
		setTabStatus(onBlueTab) {
			this.onBlueTab = onBlueTab
		},
		setChatboxTabStatus(onLeftChatboxTab) {
			this.onLeftChatboxTab = onLeftChatboxTab
		},
		async updateMember() {
			this.member = await getMember(this.memberName)
		},
		onSearch(searchTerm) {
			this.transactions = this.allTransactions.filter(transaction => {
				return transaction.date.toString().includes(searchTerm)
			})
		},

		async extractCounterpart(transaction) {
			if (transaction.entries[0].payer == this.member.accountName) {
				var member = await getMember(transaction.entries[0].payee)
				return member.accountName
			}
			else {
				var member = await getMember(transaction.entries[0].payer)
				return member.accountName
			}
		},
		async updateTransactions() {
			this.transactions = await getUserTransactions(this.memberId)
			this.unformattedTransactions = this.transactions
			this.transactions = []
			this.unformattedTransactions.forEach(async (transaction) => {
				var transactionRow = {}
				transactionRow.state = transaction.state
				transactionRow.date = transaction.date.split(" ")[0] // Extract YYYY-MM-DD
				transactionRow.counterpart = await this.extractCounterpart(transaction)
				transactionRow.amount = transaction.entries[0].quantity
				transactionRow.amount_kr = Number(transactionRow.amount.substring(1)) * this.conversionRate // substring removes the $ sign
				transactionRow.description = transaction.entries[0].description
				this.transactions.push(transactionRow)
			})
			this.allTransactions = this.transactions
			this.isLoadingTransactionData = false
		},


	},
	mounted: function () {
		this.updateMember()
		this.isLoadingTransactionData = true
		this.updateTransactions()
	}
}
</script>
