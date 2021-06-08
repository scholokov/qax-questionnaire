<template>
  <div class="area">
    <div class="container">
      <div class="main">
        <div class="panel">
          <div class="panel-body">
            <h3>Create a new user</h3>
            <hr>
            <span class="notif" v-if="success">Successfully created a new user</span>
            <span class="notif" v-if="error">Failed to create a new user</span>
            <form class="verform">
              <input type="text" name="Username" placeholder="Username" ref="username">
              <input type="password" name="Password" placeholder="Password" ref="password">
              <input type="submit" value="Submit" v-on:click.stop="addUser">
            </form>
          </div>
        </div>
        <div class="text-center">
          <router-link to="/area">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewUser',
  methods: {
    addUser(e) {
      e.preventDefault();
      e.stopPropagation();

      if(this.$refs.username.value != "" && this.$refs.password.value != "") {
        const requestOptions = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.$refs.username.value,
            password: this.$refs.password.value
          })
        };

        console.log("Sending: ", requestOptions);

        fetch(`http://localhost:3000/adduser`, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("Sent");

            if (data.success) {
              this.error = false;
              this.success = true;
            }
            else {
              this.error = true;
              this.success = false;
            }
          });
      }
      else {
          console.log("A username and password must be present");
      }
    }
  },
  data() {
    return {
      success: false,
      error: false
    }
  }
}
</script>

<style lang="scss" scoped>
  h1, h2, h3 {
    margin: 0px;
  }

  .notif {
    color:#656565;
    margin-bottom: 5px;
    display: inline-flex;
  }

  .text-center {
    padding: 10px;
    text-align: center;
  }

  hr {
    border: 1px solid #dedede;
  }

  .verform {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 10px;
    }

    &>input:last-child {
      margin-bottom: 0px;;
    }
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
    .panel {
      width: 100%;
    }
  }

  .container {
    width: 400px;
    max-width: calc(100% - 30px);
    margin: auto;
  }
</style>