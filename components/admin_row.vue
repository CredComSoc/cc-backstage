<template>
	<v-row>
		<v-col cols="2" class="admin-row-text">
			{{ accountName }}
		</v-col>
		<v-col cols="2" class="admin-row-text">
			{{ balance }} SEK
		</v-col>
		<v-col class="button-row">
			<NuxtLink :to="{
				name: 'admin-member',
				params: { id: id, name: accountName }
			}">
				<div class="member-button">Account</div>
			</NuxtLink>

			<NuxtLink :to="{
				name: 'admin-member',
				params: { id: id, name: accountName }
			}">
				<div class="member-button">Transact</div>
			</NuxtLink>

			<NuxtLink :to="{ name: 'admin-offers_wants', params: { id: id, name: accountName } }">
				<div class="member-button">Offers & Wants</div>
			</NuxtLink>
		</v-col>
	</v-row>
</template>


<script>
export default {

	data() {
		return {

		}
	},

	props: ["id", "accountName", "balance"]
}
</script>


<style scoped>
.top-border {
	border-top: 1px solid #ffffff;
}

.button-row {
	text-align: right;
	flex-basis: 16%;
}

.admin-row-text {
	margin: auto;
	font-weight: bolder;
}

.member-button {
	/*background-color: #464646;*/
	background-color: #f5f5f5;
	height: 36px;
	/*min-width: 64px;*/
	padding: 0 10px;
	margin: 0 5px 0 0px;
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

.colorbutton {
	/*
	padding-left: 0px;
	padding-right: 0px;
	*/
	width: 120px;
	margin: 0px;
	background-color: chartreuse;
}
</style>
