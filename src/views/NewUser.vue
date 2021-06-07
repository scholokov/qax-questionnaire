<template>
  <div class="area">
    <div class="container">
      <div class="main">
        <div class="panel">
          <div class="panel-body">
            <h3>Create a new user</h3>
            <hr>
            <span></span>
            <form class="verform">
              <input type="text" name="Username" placeholder="Username">
              <input type="text" name="Password" placeholder="Password">
              <input type="submit" value="Submit">
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
    login() {
    }
  }
}
</script>

<style lang="scss" scoped>
  h1, h2, h3 {
    margin: 0px;
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