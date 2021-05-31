<template>
	<div class="test">
		<div class="container">
			<div class="panel">
				<div class="panel-body">
					<ul class="questions" v-if="typeof test === 'object'">
						<li v-for="(item, index) in test.questions" :class="{ 'active' : index == activeID }">{{ index + 1 }} </li>
					</ul>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="panel">
				<div class="panel-body">
					<div v-if="typeof test === 'object' && test.questions != undefined">
						<div>
							<b>Q: {{ test.questions[activeID].question_name }}</b>

							<ul v-if="typeof options === 'object' && options.length > 0" class="question_options">
								<li v-for="(item, index) in options">
									<label>
										<input type="checkbox"> <span>{{ item.name }}</span>
									</label>
								</li>
							</ul>
						</div>
						<div class="next_question">
							<button v-on:click="prevQuestion" v-if="activeID > 0">Previous</button>
							<button v-on:click="nextQuestion" v-if="activeID < test.questions.length" class="next">Next</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'Test',
        methods: {
        	nextQuestion() {
        		if (this.activeID < this.test.questions.length) this.activeID++;

        		this.getQuestionOptions();
        	},
        	prevQuestion() {
        		if (this.activeID > 0) this.activeID--;

        		this.getQuestionOptions();
        	},
        	getQuestionOptions() {
        		let id = this.test.questions[this.activeID].question_id;

			  	const requestOptions = {
				    method: "GET",
				    headers: { "Content-Type": "application/json" }
			  	};

				fetch(`http://localhost:3000/options/${id}`, requestOptions)
				    .then(response => response.json())
				    .then(data => {
				    	console.log("Data_inner", data);
				    	this.options = data;
				    });
        	}
        },
		mounted() {
		  	const requestOptions = {
			    method: "GET",
			    headers: { "Content-Type": "application/json" }
		  	};

			fetch(`http://localhost:3000/test/${this.$route.params.slug}`, requestOptions)
			    .then(response => response.json())
			    .then(data => {
			    	console.log("Data", data);
			    	this.test = data;
			    	this.activeID = 0;
			    	
					this.getQuestionOptions();
			    });
		},
		data: function () {
		    return {
		      test: {},
		      activeID: 0,
		      options: {}
		    }
		  }
    }
</script>

<style lang="scss">
	.test {
		padding: 10px;

		.container {
			width: 900px;
			margin: auto;
		}

		.panel {
			width: 100%;
			margin-bottom: 10px;
		}

		.questions {
			list-style: none;
			padding: 0px;
			margin: 0px;
			display: flex;
			flex-direction: row;

			li {
				display: inline-flex;
				padding: 5px 10px;
				margin: 0 5px 0 0;
        		background: #e0e0e0;
		      	border:1px solid #cacaca;

		      	&.active {
		      		background: #d2d2d2;
		      	}
			}
		}

		.question_options {
			list-style: none;
			margin: 0px;
			padding: 5px 15px;

			label {
				cursor: pointer;
			}
		}

		.next_question {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 10px 0 0;
		}
	}
</style>