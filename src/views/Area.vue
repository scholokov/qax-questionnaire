<template>
	<div>
		I'm here now!
	</div>
</template>

<script>
    export default {
        name: 'Area',
        mounted() {
        	let userToken = sessionStorage.getItem('authenticated');

		  	const requestOptions = {
			    method: "GET",
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    }
		  	};

	    	console.log("Sending: ", requestOptions, `http://localhost:3000/checkAuth/${userToken}`);

			fetch(`http://localhost:3000/checkAuth/${userToken}`, requestOptions)
			    .then(response => response.json())
			    .then(data => {
			    	console.log("Sent");

			    	if (data.authenticated == 1) {
			    		console.log("We're authenticated");
			    	}
			    	else {
			    		console.log("Get out");
			    		this.$router.push({ name: 'login' })
			    	}
			    });
        }
    }
</script>

<style lang="scss">
</style>