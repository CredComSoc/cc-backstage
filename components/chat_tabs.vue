<!--
	A container component with two tabs. Toggle which tab is showing by setting leftTabVisible and
			rightTabVisible from the parent component. The parent needs to listen for the click event and switch tab content when it fires.
-->

<template>
	<v-row class="tab-row">
		<v-col cols="6">
			<div class="tab left-tab" @click="toggleToLeftTab" v-if="leftTabVisible">
				{{ leftTabTitle }}
			</div>
			<div class="tab left-tab-dimmed" @click="toggleToLeftTab" v-if="rightTabVisible">
				{{ leftTabTitle }}
			</div>



		</v-col>
		<v-col cols="6">
			<div class="tab right-tab" @click="toggleToRightTab" v-if="rightTabVisible">
				{{ rightTabTitle }}
			</div>
			<div class="tab right-tab-dimmed" @click="toggleToRightTab" v-if="leftTabVisible">
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

	props: ['leftTabTitle', 'rightTabTitle'], // Tab names from parent

	methods: {
		toggleToLeftTab() {
			this.rightTabVisible = false;
			this.leftTabVisible = true;
			this.$emit('click', true);
		},

		toggleToRightTab() {
			this.rightTabVisible = true;
			this.leftTabVisible = false;
			this.$emit('click', false); // Parent should listen for this
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
	overflow: hidden;
	white-space: nowrap;
	user-select: none;
	cursor: pointer;
}

.left-tab {
	background-color: #FF4558;
}

.left-tab-dimmed {
	background-color: #FF4558;
	opacity: 30%;
}

.right-tab {
	background-color: #FFC000;
}

.right-tab-dimmed {
	background-color: #FFC000;
	opacity: 40%;
}
</style>
