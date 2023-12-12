

<template>
	<div>
		<h1>Edit offer or want</h1>


	</div>
</template>



<script>

export default {

	data() {
		return {
			offers:
				[  // Fake offers
					{ id: 1, offer: "water buffalo", price: 25 },
					{ id: 2, offer: "moon rocket", price: 12 },
					{ id: 3, offer: "heavy water", price: 50 },
				],

			wants:
				[  // Fake wants
					{ id: 1001, want: "spring", price: 25 },
					{ id: 1002, want: "suspension", price: 12 },
					{ id: 1003, want: "gearbox", price: 50 },
				],


			id: this.$route.params.id,
		}

	},



}
</script>
