<template>
	<v-row>
		<v-col cols="2">
			{{ accountName }}
		</v-col>
		<v-col cols="1">
			{{ balance }} SEK
		</v-col>

		<v-col cols="1">
			status {{ status }}
		</v-col>

		<v-col>
			{{ phone }}
		</v-col>
		<v-col>
			<NuxtLink :to="{
				name: 'admin-member',
				params: { id: id, name: accountName }
			}">
				<v-btn>Account</v-btn>
			</NuxtLink>
		</v-col>
		<v-col>
			<NuxtLink :to="{
				name: 'admin-member',
				params: { id: id, name: accountName }
			}">
				<v-btn>Transact</v-btn>
			</NuxtLink>
		</v-col>
		<v-col>
			<a v-bind:href="`mailto:${email}`">
				<v-btn>Email</v-btn>
			</a>
		</v-col>
		<v-col>
			<NuxtLink :to="{ name: 'admin-offers_wants', params: { id: id, name: accountName } }">
				<v-btn>Offers & Wants</v-btn>
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

	props: ["id", "accountName", "balance", "status", "phone", "email"]
}
</script>


<style scoped>
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
