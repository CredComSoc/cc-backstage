<!--
One row of data in the member table. Takes as parameters and displays a user's name, balance, status, phone number, and buttons to go to its user, transactions, or offers & wants page, and a button for emailing the user.
-->

<template>
	<v-row class="top-border">
		<v-col cols="2" class="row-text">
			{{ accountName }}
		</v-col>
		<v-col cols="2" class="row-text">
			{{ balance }} SEK
		</v-col>

		<v-col cols="1" class="row-text">
			{{ status }}
		</v-col>

		<v-col cols="1" class="row-text">
			{{ phone }}
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

			<a v-bind:href="`mailto:${email}`">
				<div class="white-button">Email</div>
			</a>

			<NuxtLink :to="{ name: 'admin-offers_wants', params: { id: id, name: accountName } }">
				<div class="white-button">Offers & Wants</div>
			</NuxtLink>
		</v-col>
	</v-row>
</template>


<script>
export default {
	props: ["id", "accountName", "balance", "status", "phone", "email"]
}
</script>
