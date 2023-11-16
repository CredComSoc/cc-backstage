<template>
	<div>
		<member_header :title="memberName" />
		<member_tabs @click="setTabStatus" :blueTabTitle='"BARTERKRONOR"' :greenTabTitle='"KRONOR"' />

		<v-container v-if="onBlueTab">
			<div class="fixed-box">
			<v-row class="top-border" v-for="transaction in transactions">
				<v-col class="row-text">
					{{ transaction.status }}
				</v-col>
				<v-col class="row-text">
					{{ transaction.date }}
				</v-col>
				<v-col cols="3" class="row-text">
					{{ transaction.counterpart }}
				</v-col>
				<v-col cols="3" class="row-text">
					{{ transaction.description }}
				</v-col>

				<v-col class="row-text">
					{{ transaction.amount }}
				</v-col>
				<v-col class="button-row">
					<NuxtLink :to="{ name: '', params: {} }">
						<div class="member-button">Revert</div>
					</NuxtLink>
				</v-col>
			</v-row>
			</div>
		</v-container>
		<v-container v-else>
			<div class="fixed-box">
			<v-row class="top-border" v-for="transaction in transactions">
				<v-col class="row-text">
					{{ transaction.status }}
				</v-col>
				<v-col class="row-text">
					{{ transaction.date }}
				</v-col>
				<v-col class="row-text">
					{{ transaction.type }}
				</v-col>
				<v-col cols="3" class="row-text">
					{{ transaction.description }}
				</v-col>
				<v-col class="row-text">
					{{ transaction.amount_kr }}
				</v-col>
				<v-col class="button-row">
					<NuxtLink :to="{ name: '', params: {} }">
						<div class="member-button">Revert</div>
					</NuxtLink>
				</v-col>
			</v-row>
			</div>
		</v-container>

	</div>
</template>



<script>
import member_header from '/components/member_header.vue'
import { getMember } from '/pages/gqlFetch.js'
import member_tabs from '/components/member_tabs.vue'

export default {
	components: {
		member_header, member_tabs
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

			onBlueTab: true
		}
	},

	methods: {
		setTabStatus(onBlueTab) {
			this.onBlueTab = onBlueTab
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


<style scoped>

.button-row {
	text-align: right;
	flex-basis: 16%;
}

.member-button {
	background-color: #f5f5f5;
	height: 36px;
  	/*min-width: 64px;*/
  	padding: 0 10px;
	margin: 0 10px 0 10px;
	font-size: 0.875rem;
	color: rgba(0, 0, 0, 0.87);
	box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  	border-radius: 4px;
	align-items: center;
  	display: inline-flex;
  	flex: 0 0 auto;
  	font-weight: 500;
  	letter-spacing: 0.0892857143em;
	text-transform: uppercase;
  	/*justify-content: center;*/
}

.element-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: auto;
	background: #FFFFFF;
	white-space: nowrap;
	padding: 4px;
	/* margin: 1rem;*/
}

.element-title {
	font-size: 120%;
	text-align: center;
	width: 15%;
	font-weight: bold;
}

/*class="element-text"*/
.element-text {
	font-size: 100%;
	text-align: center;
	word-wrap: break-word;
}

.one {
	width: 10%;
}

.two {
	width: 10%;
}

.tre {
	width: 10%;
}

.imgContainer {
	max-height: 2.5rem;
	max-width: 2.5rem;
	margin-top: 3px;
	margin-left: 3px;
}

img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}

h4 {
	margin: 0rem;
}

h5 {
	margin: 0rem;
}

.tab_barterkronor {
	background-color: rgb(103, 135, 216);
	padding: 5px;
	margin-right: 0%;
	font-weight: bold;
}

.tab_barterkronor_dimmed {
	background-color: rgb(103, 135, 216);
	padding: 5px;
	margin-right: 0%;
	opacity: 30%;
	color: #000000;
	font-weight: bold;
}

.tab_sek {
	color: black;
	background-color: rgb(35, 221, 57);
	padding: 5px;
	margin-left: 0%;
	font-weight: bold;
}

.tab_sek_dimmed {
	background-color: rgb(35, 221, 57);
	padding: 5px;
	margin-left: 0%;
	opacity: 30%;
	color: #000000;
	font-weight: bold;
}

.button {
	display: flex;
	flex-direction: column;
	color: inherit;
	text-decoration: none;
	outline: 0.1rem solid grey;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.button:hover {
	color: black;
	box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
}

.button-container {
	width: fit-content;
	height: 100%;
	display: flex;
	justify-content: center;
	gap: 4px;
}

.button-container>button {
	background-color: #585F66;
	font-weight: bold;
	font-size: 1em;
	color: #FFFFFF;
	border: 0px solid #585F66;
	border-radius: 4px;
	padding: 5px 10px;
}
</style>
