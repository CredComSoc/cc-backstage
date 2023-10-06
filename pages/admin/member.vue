<template>
	<div>
		<h1>{{ name }}</h1>

		<v-container>
			<v-row>
				<v-col xs="4">
					<div class="tab_barterkronor" @click="toggleToBarterTab" v-if="barterkronorTabVisible">
						Barterkronor
					</div>
					<div class="tab_barterkronor_dimmed" @click="toggleToBarterTab" v-if="kronorTabVisible">
						Barterkronor
					</div>



				</v-col>
				<v-col>
					<div class="tab_sek" @click="toggleToKronorTab" v-if="kronorTabVisible">
						Kronor
					</div>
					<div class="tab_sek_dimmed" @click="toggleToKronorTab" v-if="barterkronorTabVisible">
						Kronor
					</div>

				</v-col>
			</v-row>
		</v-container>



		<v-container v-if="barterkronorTabVisible">
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
			</v-row>
		</v-container>
		<v-container v-if="kronorTabVisible">
			<v-row>
				<v-col>
					Fakturor
				</v-col>
			</v-row>
			<!--
				<v-col>
					<NuxtLink :to="{
						name: 'admin-member',
						params: { id: member.id, name: member.name }
					}">
						<v-btn>Account</v-btn>
					</NuxtLink>
				</v-col>

				<v-col>
					<NuxtLink :to="{
						name: 'admin-member',
						params: { id: member.id, name: member.name }
					}">
						<v-btn>Transact</v-btn>
					</NuxtLink>
				</v-col>

				<v-col>
					<a v-bind:href="`mailto:${member.email}`">
						<v-btn>Email</v-btn>
					</a>
				</v-col>

				<v-col>
					<NuxtLink :to="{ name: 'admin-offers_wants', params: { id: member.id, name: member.name } }">
						<v-btn>Offers & Wants</v-btn>
					</NuxtLink>
				</v-col>

			</v-row>
			-->
		</v-container>

	</div>
</template>



<script>

export default {


	data() {
		return {
			id: this.$route.params.id,
			name: this.$route.params.name,

			transactions: [
				{ status: "Finished", date: "2023-09-12", counterpart: "Ben Johnson", description: "Shoes", amount: "110" },
				{ status: "Pending", date: "2023-09-12", counterpart: "John Benson", description: "Hat", amount: "22" },
				{ status: "Pending", date: "2020-01-10", counterpart: "Sune Mangs", description: "Shirt", amount: "220" }
			],

			barterkronorTabVisible: true,
			kronorTabVisible: false

		}
	},

	methods: {
		toggleToBarterTab() {
			this.kronorTabVisible = false;
			this.barterkronorTabVisible = true;
		},

		toggleToKronorTab() {
			this.kronorTabVisible = true;
			this.barterkronorTabVisible = false;
		}
	}
}
</script>


<style scoped>
* {
	font-family: Ubuntu;
	font-style: normal;
	font-weight: normal;
	letter-spacing: 0.05em;
	font-weight: 500;
	font-size: 12px;
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
	background-color: red;
	padding: 5px;
	margin-right: 0%;
}

.tab_barterkronor_dimmed {
	background-color: red;
	padding: 5px;
	margin-right: 0%;
	opacity: 50%;
}

.tab_sek {
	color: white;
	background-color: blue;
	padding: 5px;
	margin-left: 0%;
}

.tab_sek_dimmed {
	color: white;
	background-color: blue;
	padding: 5px;
	margin-left: 0%;
	opacity: 50%;
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
