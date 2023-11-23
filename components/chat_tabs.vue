<template>
	<v-row class="tab-row">
		<v-col cols="6">
			<div class="tab left_tab" @click="toggleToLeftTab" v-if="leftTabVisible">
				{{ leftTabTitle }}
			</div>
			<div class="tab left_tab_dimmed" @click="toggleToLeftTab" v-if="rightTabVisible">
				{{ leftTabTitle }}
			</div>



		</v-col>
		<v-col cols="6">
			<div class="tab right_tab" @click="toggleToRightTab" v-if="rightTabVisible">
				{{ rightTabTitle }}
			</div>
			<div class="tab right_tab_dimmed" @click="toggleToRightTab" v-if="leftTabVisible">
				{{ rightTabTitle }}
			</div>

		</v-col>
	</v-row>
</template>

<script>
export default {
	data() {
		return {
			leftTabVisible: true,
			rightTabVisible: false
		}
	},

	props: ['leftTabTitle', 'rightTabTitle'],

	methods: {
		toggleToLeftTab() {
			this.rightTabVisible = false;
			this.leftTabVisible = true;
			this.$emit('click', true);
		},

		toggleToRightTab() {
			this.rightTabVisible = true;
			this.leftTabVisible = false;
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
}

.left_tab {
	background-color: #FF4558;
}

.left_tab_dimmed {
	background-color: #FF4558;
	opacity: 30%;
}

.right_tab {
	background-color: #FFC000;
}

.right_tab_dimmed {
	background-color: #FFC000;
	opacity: 40%;
}
</style>
