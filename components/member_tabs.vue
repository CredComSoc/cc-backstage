<template>
	<v-container>
		<v-row>
			<v-col xs="4">
				<div class="blue_tab" @click="toggleToBlueTab" v-if="blueTabVisible">
					{{ blueTabTitle }}
				</div>
				<div class="blue_tab_dimmed" @click="toggleToBlueTab" v-if="greenTabVisible">
					{{ blueTabTitle }}
				</div>



			</v-col>
			<v-col>
				<div class="green_tab" @click="toggleToGreenTab" v-if="greenTabVisible">
					{{ greenTabTitle }}
				</div>
				<div class="green_tab_dimmed" @click="toggleToGreenTab" v-if="blueTabVisible">
					{{ greenTabTitle }}
				</div>

			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			blueTabVisible: true,
			greenTabVisible: false
		}
	},

	props: ['blueTabTitle', 'greenTabTitle'],

	methods: {
		toggleToBlueTab() {
			this.greenTabVisible = false;
			this.blueTabVisible = true;
			this.$emit('click', true);
		},

		toggleToGreenTab() {
			this.greenTabVisible = true;
			this.blueTabVisible = false;
			this.$emit('click', false);
		}
	}
}
</script>

<style scoped>
.blue_tab {
	background-color: rgb(103, 135, 216);
	padding: 5px;
	margin-right: 0%;
	font-weight: bold;
}

.blue_tab_dimmed {
	background-color: rgb(103, 135, 216);
	padding: 5px;
	margin-right: 0%;
	opacity: 30%;
	color: #000000;
	font-weight: bold;
}

.green_tab {
	color: black;
	background-color: rgb(35, 221, 57);
	padding: 5px;
	margin-left: 0%;
	font-weight: bold;
}

.green_tab_dimmed {
	background-color: rgb(35, 221, 57);
	padding: 5px;
	margin-left: 0%;
	opacity: 30%;
	color: #000000;
	font-weight: bold;
}
</style>
