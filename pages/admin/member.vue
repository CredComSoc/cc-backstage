<template>
	<div>
		<member_header :title="memberName" />
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
						<v-row class="top-border" v-for="transaction in transactions">
							<v-col cols="2" class="row-text">
								{{ transaction.state }}
							</v-col>
							<v-col cols="2" class="row-text">
								{{ transaction.written.split(" ")[0] }}
							</v-col>
							<v-col cols="2" class="row-text">
								<!-- {{ transaction.entries[0].payer }} -->
							</v-col>
							<v-col cols="2" class="row-text">
								{{ transaction.entries[0].metadata.quantity }}
							</v-col>
							<v-col cols="2" class="row-text">


							</v-col>
							<v-col class="button-row">
								<NuxtLink :to="{ name: '', params: {} }">
									<div class="white-button">Revert</div>
								</NuxtLink>
							</v-col>
						</v-row>
					</div>
				</div>
				<div v-else>
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
						<v-row class="top-border" v-for="transaction in transactions">
							<v-col cols="2" class="row-text">
								{{ transaction.state }}
							</v-col>
							<v-col cols="2" class="row-text">
								<!-- {{ transaction.written.split(" ")[0] }} -->
							</v-col>
							<v-col cols="2" class="row-text">

							</v-col>
							<v-col cols="2" class="row-text">
								{{ transaction.amount_kr }}
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
			</v-col>
			<v-col cols="4">
				<chat_tabs @click="setChatboxTabStatus" :leftTabTitle='"MEMBER DETAILS"' :rightTabTitle='"MEMBER CHAT"' />
				<member_details_box v-if=onLeftChatboxTab :memberName="johansson" />
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



			transactions: {},

			onBlueTab: true,
			onLeftChatboxTab: true,
		}
	},
	/*
	 {
		accountName: 'testdev1',
		description: 'description',
		address: 'address',
		city: 'city',
		phone: 'phone',
		billing:
		{
			name: 'billingName',
			box: 'billingBox',
			address: 'billingAddress',
			orgNumber: 'orgNumber'
		},
		is_admin: false,
		email: 'testdev1@gmail.com',
		id: new ObjectId('65128694f2d0b4af4c6c2513'),
		last_online: 'Invalid Date'



		A transaction:

		[{"uuid":"74b267cc-6d01-4314-b542-645addde305f",
		"written":"2023-10-25 18:49:02",
		"state":"completed",
		"type":"credit",
		"version":2,
		"entries":[
			{"payer":"650c251a911cc0132256925b",
			"payee":"651285ae87ae5ff2d0d16e13",
			"quantity":null,
			"description":"",
			"metadata":
				{"id":"0",
				"quantity":1}}]},



	*/

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
		async updateTransactions() {
			//console.log("Updating transactions")
			this.transactions = await getUserTransactions(this.memberId)
			/*
			for (transaction in transactions) {
				//console.log("Adding counterpart")
				var counterpart = await extractCounterpart(transaction)
				transaction.entries[0].$set("counterpart", counterpart);
			}
			*/
		},


		/*
		async extractCounterpart(transaction) {
			if (transaction.entries[0].payer == this.memberId) {
				var member = await getMemberById(transaction.entries[0].payee)
				return member.accountName
			}
			else {
				var member = await getMemberById(transaction.entries[0].payer)
				return member.accountName
			}
		}
*/
	},
	mounted: function () {
		this.updateMember()
		this.updateTransactions()
	}
}
</script>
