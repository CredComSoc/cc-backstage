<template>
	<v-container>
		<v-row>
			<v-col xs="4">
				<div class="tab_barterkronor" @click="toggleToBarterTab" v-if="barterkronorTabVisible">
					BARTERKRONOR
				</div>
				<div class="tab_barterkronor_dimmed" @click="toggleToBarterTab" v-if="kronorTabVisible">
					BARTERKRONOR
				</div>



			</v-col>
			<v-col>
				<div class="tab_sek" @click="toggleToKronorTab" v-if="kronorTabVisible">
					KRONOR
				</div>
				<div class="tab_sek_dimmed" @click="toggleToKronorTab" v-if="barterkronorTabVisible">
					KRONOR
				</div>

			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			barterkronorTabVisible: true,
			kronorTabVisible: false
		}
	},

	methods: {
		toggleToBarterTab() {
			this.kronorTabVisible = false;
			this.barterkronorTabVisible = true;
			this.$emit('click', true);
		},

		toggleToKronorTab() {
			this.kronorTabVisible = true;
			this.barterkronorTabVisible = false;
			this.$emit('click', false);
		}
	}
}
</script>

<style scoped>
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
</style>
