<template>
	<div class="login">
		<div class="panel">
			<div class="panel-body">
				<form>
					<p>Login</p>
					<input type="text" name="username" v-model="input.username" placeholder="Username">
					<input type="password" name="password" v-model="input.password" placeholder="Password">
					<input type="submit" name="submit" value="Submit" v-on:click.prevent="login()">
				</form>
			</div>
		</div>
		<div class="url-back">
			<router-link to="/">Home</router-link>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
				  	const requestOptions = {
					    method: "POST",
					    headers: {
					      'Accept': 'application/json',
					      'Content-Type': 'application/json'
					    },
					    body: JSON.stringify({
					    	username: this.input.username,
					    	password: this.input.password
					    })
				  	};

			    	console.log("Sending: ", requestOptions);

					fetch(`http://localhost:3000/auth`, requestOptions)
					    .then(response => response.json())
					    .then(data => {
					    	console.log("Sent");

					    	if (data.success == 1 && data.token) {
					    		//save token
					    		sessionStorage.setItem('authenticated', data.token);

					    		this.$router.push({ name: 'area' })
					    	}
					    });
                }
                else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style lang="scss">
	.login {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		form {
			display: inline-flex;
			flex-direction: column;
			width: 350px;
			max-width: 100%;

			p {
				margin: 0 0 10px;
				text-align: center;
			}

			input {
				margin-bottom: 5px;
			}

			&>input:last-child {
				margin-bottom: 0px;
			}
		}

		.url-back {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px;
      		font-size: 14px;
		}
	}
</style>