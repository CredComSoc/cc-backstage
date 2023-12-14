<template>
	<v-row class="tab-row">
		<v-col cols="6">
			<div class="tab blue_tab" @click="toggleToBlueTab" v-if="blueTabVisible">
				{{ blueTabTitle }}
			</div>
			<div class="tab blue_tab_dimmed" @click="toggleToBlueTab" v-if="greenTabVisible">
				{{ blueTabTitle }}
			</div>



		</v-col>
		<v-col cols="6">
			<div class="tab green_tab" @click="toggleToGreenTab" v-if="greenTabVisible">
				{{ greenTabTitle }}
			</div>
			<div class="tab green_tab_dimmed" @click="toggleToGreenTab" v-if="blueTabVisible">
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
.tab-row {
	height: 94px;
}

.tab {
	height: fit-content;
	padding: 8px 10px;
	margin: 10px 0 20px 0;
	color: #ffffff;
	font-weight: bold;
	border-radius: 8px;
	user-select: none;
	cursor: pointer;
}

.blue_tab {
	background-color: #00abe0;
}

.blue_tab_dimmed {
	background-color: #00ace0da;
	opacity: 30%;
}

.green_tab {
	background-color: #00d282;
}

.green_tab_dimmed {
	background-color: #00d282dc;
	opacity: 30%;
}
</style>
