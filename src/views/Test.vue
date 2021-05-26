<template>
	<div>hi</div>
</template>

<script>
    export default {
        name: 'Test',
		mounted() {
		  	const requestOptions = {
			    method: "GET",
			    headers: { "Content-Type": "application/json" }
		  	};

			fetch(`http://localhost:3000/test/${this.$route.params.slug}`, requestOptions)
			    .then(response => response.json())
			    .then(data => {
			    	console.log("Data", data);
			    });
		}
    }
</script>

<style lang="scss">

</style>