<template>
	<div class="area">
		<div class="container">
			<div class="main">
				<div class="panel">
					<div class="panel-body">
						<h3>Tests</h3>
						<hr>
						I'm here now!
						<br><br>
						<h3>Users</h3>
						<hr>
					</div>
				</div>
			</div>
			<div class="sidebar">
				<div class="panel">
					<div class="panel-body">
						<h3>Actions</h3>
						<hr>
						<div>
							<a>New test</a>
						</div>
						<div>
							<router-link to="/newuser">New user</router-link>
						</div>
						<div>
							<router-link to="/logout">Logout</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
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
	h1, h2, h3 {
		margin: 0px;
	}

	hr {
		border: 1px solid #dedede;
	}

	.area {
		display: flex;
		padding: 10px;

		.container {
			display: flex;
		}

		.main {
			flex-grow: 1;
			margin-right: 10px;
		}

		.sidebar {
			width: 200px;
		}

		.panel {
			width: 100%;
		}
	}

	.container {
		width: 900px;
		max-width: calc(100% - 30px);
		margin: auto;
	}
</style>