<template>
	<div>
		<member_header :title="memberName" />
		<v-row>
			<v-col cols="8">
				<member_tabs @click="setTabStatus" :blueTabTitle='"BARTERKRONOR"' :greenTabTitle='"KRONOR"' />

				<div v-if="onBlueTab">
					<v-row class="row-headings">
						<v-col cols="1">
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

						<v-col cols="3">
							<h1>Description</h1>
						</v-col>
					</v-row>
					<div class="fixed-box fixed-box-no-admin">
						<v-row class="top-border" v-for="transaction in transactions">
							<v-col cols="1" class="row-text">
								{{ transaction.status }}
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
							<v-col cols="3" class="row-text">
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
				<div v-else>
					<v-row class="row-headings">
						<v-col cols="1">
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

						<v-col cols="3">
							<h1>Description</h1>
						</v-col>
					</v-row>

					<div class="fixed-box fixed-box-no-admin">
						<v-row class="top-border" v-for="transaction in transactions">
							<v-col cols="1" class="row-text">
								{{ transaction.status }}
							</v-col>
							<v-col cols="2" class="row-text">
								{{ transaction.date }}
							</v-col>
							<v-col cols="2" class="row-text">
								{{ transaction.counterpart }}
							</v-col>
							<v-col cols="2" class="row-text">
								{{ transaction.amount_kr }}
							</v-col>
							<v-col cols="3" class="row-text">
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
                <chat_tabs @click="setChatboxTabStatus" :leftTabTitle='"MEMBER DETAILS"'
                    :rightTabTitle='"MEMBER CHAT"' />
                <member_details_box v-if=onLeftChatboxTab />
                <chatbox v-else />
            </v-col>
        </v-row>
	</div>
</template>



<script>
import member_header from '/components/member_header.vue'
import { getMember } from '/pages/gqlFetch.js'
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
			id: this.$route.params.id,
			memberName: this.$route.params.name,
			member: {},


			transactions: [
				{ status: "Finished", date: "2023-09-12", counterpart: "Ben Johnson", description: "Shoes", amount: "110", amount_kr: "400", type: "invoice" },
				{ status: "Pending", date: "2023-09-12", counterpart: "John Benson", description: "Hat", amount: "22", amount_kr: "100", type: "credit" },
				{ status: "Pending", date: "2020-01-10", counterpart: "Sune Mangs", description: "Shirt", amount: "220", amount_kr: "640", type: "credit" }
			],

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
			var response = await getMember(this.memberName)
			console.log(response)
		}
	},
	mounted: function () {
		this.updateMember()
	}
}
</script>
