<template>
  <div class="area">
    <div class="container">
      <div class="main">
        <div class="panel">
          <div class="panel-body">
            <h3>Create a new test</h3>
            <hr>
            <span class="notif" v-if="success">Successfully created a new test</span>
            <span class="notif" v-if="error">Failed to create a new test</span>
            <form class="verform">
              <input type="text" name="Title" placeholder="Title" v-model="test.title">
              <div class="question" v-for="(question, i) in test.questions">
                <input type="text" name="Question title" placeholder="Question title" v-model="test.questions[i].title">
                <ul>
                  <li v-for="(option, j) in test.questions[i].options">
                    <input type="text" name="Option title" placeholder="Option title" v-model="test.questions[i].options[j].title">
                  </li>
                </ul>
                <button v-on:click.stop="addOption($event, i)">Add option</button>
              </div>
              <button v-on:click.stop="addQuestion">Add question</button>

              <input type="submit" value="Submit" v-on:click.stop="addTest">
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
  name: 'NewTest',
  methods: {
    addOption(e, i) {
      e.preventDefault();
      e.stopPropagation();

      this.test.questions[i].options.push({
        title: ""
      });

    },
    addQuestion(e) {
      e.preventDefault();
      e.stopPropagation();

      this.test.questions.push({
        title: "",
        options: []
      });
    },
    addTest(e) {
      e.preventDefault();
      e.stopPropagation();

      if(this.test.title && this.test.questions.length > 0) {
        const requestOptions = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.test)
        };

        console.log("Sending: ", requestOptions);

        fetch(`http://localhost:3000/addtest`, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("Sent", data);

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
        console.log("Fill out the form");
      }
    }
  },
  data() {
    return {
      success: false,
      error: false,
      test: {
        title: "",
        questions: []
      }
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

  .question {
    input, button {
      width: 100%;
      margin-bottom: 5px;
    }
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