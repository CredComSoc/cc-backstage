<template>
	<div>
		<h1>{{ name }}</h1>
		<v-btn>Barterkronor</v-btn>
		<v-btn>Kronor</v-btn>

		<v-container>
			<v-row>
				<v-col>

				</v-col>
			</v-row>
		</v-container>
		<!--
				<v-col>
					{{ member.balance }} SEK
				</v-col>

				<v-col>
					{{ member.status }}
				</v-col>

				<v-col>
					{{ member.phone }}
				</v-col>

				<v-col>
					<NuxtLink :to="{
						name: 'admin-member',
						params: { id: member.id, name: member.name }
					}">
						<v-btn>Account</v-btn>
					</NuxtLink>
				</v-col>

				<v-col>
					<NuxtLink :to="{
						name: 'admin-member',
						params: { id: member.id, name: member.name }
					}">
						<v-btn>Transact</v-btn>
					</NuxtLink>
				</v-col>

				<v-col>
					<a v-bind:href="`mailto:${member.email}`">
						<v-btn>Email</v-btn>
					</a>
				</v-col>

				<v-col>
					<NuxtLink :to="{ name: 'admin-offers_wants', params: { id: member.id, name: member.name } }">
						<v-btn>Offers & Wants</v-btn>
					</NuxtLink>
				</v-col>
			</v-row>
		</v-container>
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
