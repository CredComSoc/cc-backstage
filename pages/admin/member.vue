<!--
This page may cause weird errors in the console if the variable-names from listingObj
do not match the equivalent of the database.
-->
<template>
	<div>
		Hello, user {{ name }}!


		<!--
		<div class="button">
			<div class="element-container" @click="enterProfile">
				<div class="imgContainer">
	 --> <!-- <img v-if="this.listingObj.logo !== ''" :src='getImgURL()' /> -->
		<!-- <img v-if="this.listingObj.logo == ''" src='@/assets/list_images/user.png' /> -->
		<!-- 				</div>
				<h4 class="element-title"> {{ listingObj.accountName }} </h4>
				<h5 class="element-text one">Balance: <br />{{ '0Kr' }}</h5>
				<h5 class="element-text two">Online: <br />{{ getOnlineStatus() }}</h5>
				<h5 class="element-text tre"> {{ listingObj.phone }} </h5>
				<div class="button-container">
					<button @click="userselected">{{ $t('user.profile') }}</button>
					<button @click="null">{{ $t('transactions') }}</button>
					<button @click="null">{{ $t('user.email') }}</button>
					<button @click="null">{{ $t('user.purchase_requests') }}</button>
				</div>
			</div>

		</div>
	-->

		<!--
  <router-link :to="{ name: 'MemberUserprofile', params: { userprofile: listingObj.accountName }} ">

    </router-link>
-->
	</div>
</template>



<script>
// import { EXPRESS_URL } from '@/serverFetch'

export default {
	data() {
		return {
			id: this.$route.params.id,
			name: this.$route.params.name
		}
	}
}
</script>


<style scoped>
* {
	font-family: Ubuntu;
	font-style: normal;
	font-weight: normal;
	letter-spacing: 0.05em;
	font-weight: 500;
	font-size: 12px;
}

.element-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: auto;
	background: #FFFFFF;
	white-space: nowrap;
	padding: 4px;
	/* margin: 1rem;*/
}

.element-title {
	font-size: 120%;
	text-align: center;
	width: 15%;
	font-weight: bold;
}

/*class="element-text"*/
.element-text {
	font-size: 100%;
	text-align: center;
	word-wrap: break-word;
}

.one {
	width: 10%;
}

.two {
	width: 10%;
}

.tre {
	width: 10%;
}

.imgContainer {
	max-height: 2.5rem;
	max-width: 2.5rem;
	margin-top: 3px;
	margin-left: 3px;
}

img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}

h4 {
	margin: 0rem;
}

h5 {
	margin: 0rem;
}

.button {
	display: flex;
	flex-direction: column;
	color: inherit;
	text-decoration: none;
	outline: 0.1rem solid grey;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.button:hover {
	color: black;
	box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
}

.button-container {
	width: fit-content;
	height: 100%;
	display: flex;
	justify-content: center;
	gap: 4px;
}

.button-container>button {
	background-color: #585F66;
	font-weight: bold;
	font-size: 1em;
	color: #FFFFFF;
	border: 0px solid #585F66;
	border-radius: 4px;
	padding: 5px 10px;
}
</style>