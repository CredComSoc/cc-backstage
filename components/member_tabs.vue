<template>
	<v-row>
		<v-col cols="6">
			<div class="blue_tab" @click="toggleToBlueTab" v-if="blueTabVisible">
				{{ blueTabTitle }}
			</div>
			<div class="blue_tab_dimmed" @click="toggleToBlueTab" v-if="greenTabVisible">
				{{ blueTabTitle }}
			</div>



		</v-col>
		<v-col cols="6">
			<div class="green_tab" @click="toggleToGreenTab" v-if="greenTabVisible">
				{{ greenTabTitle }}
			</div>
			<div class="green_tab_dimmed" @click="toggleToGreenTab" v-if="blueTabVisible">
				{{ greenTabTitle }}
			</div>

		</v-col>
	</v-row>
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
	background-color: #00abe0;
	padding: 8px 10px;
	margin: 10px 0 20px 0;
	color: #ffffff;
	font-weight: bold;
	border-radius: 8px;
}

.blue_tab_dimmed {
	background-color: #00ace0da;
	padding: 8px 10px;
	margin: 10px 0 20px 0;
	opacity: 30%;
	color: #ffffff;
	font-weight: bold;
	border-radius: 8px;
}

.green_tab {
	color: black;
	background-color: #00d282;
	padding: 8px 10px;
	color: #ffffff;
	margin: 10px 0 20px 0;
	font-weight: bold;
	border-radius: 8px;
}

.green_tab_dimmed {
	background-color: #00d282dc;
	padding: 8px 10px;
	margin: 10px 0 20px 0;
	opacity: 30%;
	color: #ffffff;
	font-weight: bold;
	border-radius: 8px;
}
</style>
