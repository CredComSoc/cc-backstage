<template>
	<div>
		<member_header :title="memberName" />
		<member_tabs @click="setTabStatus" :blueTabTitle='"BARTERKRONOR"' :greenTabTitle='"KRONOR"' />

		<v-container v-if="onBlueTab">
			<v-row v-for="transaction in transactions">
				<v-col>
					{{ transaction.status }}
				</v-col>
				<v-col>
					{{ transaction.date }}
				</v-col>
				<v-col>
					{{ transaction.counterpart }}
				</v-col>
				<v-col>
					{{ transaction.description }}
				</v-col>

				<v-col>
					{{ transaction.amount }}
				</v-col>
				<v-col>
					<NuxtLink :to="{ name: '', params: {} }">
						<v-btn>Revert</v-btn>
					</NuxtLink>
				</v-col>
			</v-row>
		</v-container>
		<v-container v-else>
			<v-row v-for="transaction in transactions">
				<v-col>
					{{ transaction.status }}
				</v-col>
				<v-col>
					{{ transaction.date }}
				</v-col>
				<v-col>
					{{ transaction.type }}
				</v-col>
				<v-col>
					{{ transaction.description }}
				</v-col>
				<v-col>
					{{ transaction.amount_kr }}
				</v-col>
				<v-col>
					<NuxtLink :to="{ name: '', params: {} }">
						<v-btn>Revert</v-btn>
					</NuxtLink>
				</v-col>
			</v-row>
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
/** {
 	font-family: Ubuntu;
	font-style: normal;
	font-weight: normal;
	letter-spacing: 0.05em;
	font-weight: 500;
	font-size: 12px;
} */

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
