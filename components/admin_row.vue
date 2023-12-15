<!--
	For displaying the logged-in admin's data.
-->
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
				<div class="white-button">Account</div>
			</NuxtLink>

			<NuxtLink :to="{
				name: 'admin-member',
				params: { id: id, name: accountName }
			}">
				<div class="white-button">Transact</div>
			</NuxtLink>

			<NuxtLink :to="{ name: 'admin-offers_wants', params: { id: id, name: accountName } }">
				<div class="white-button">Offers & Wants</div>
			</NuxtLink>
		</v-col>
	</v-row>
</template>


<script>
export default {
	props: ["id", "accountName", "balance"]
}
</script>


<style scoped>
.admin-row-text {
	margin: auto;
	font-weight: bolder;
	font-size: 90%;
}
</style>
