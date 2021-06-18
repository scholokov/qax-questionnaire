<template>
	<div class="loader" :class="{ hide : hideLoader }">
		<div v-if="testDone">
			The test is complete!
		</div>
		<div v-else>Loading...</div>
	</div>
	<div class="test" v-if="hideLoader">
		<div class="container">
			<div class="panel">
				<div class="panel-body">
					<ul class="questions">
						<li :class="{ active: currentQuestion+1 == question.question_id }" v-for="(question, i) in test.questions" :key="question" v-on:click="goTo(i)">{{ i+1 }}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="panel">
				<div class="panel-body">
					<div>
						<div>
							<b>Q: {{ current_question.question_name }}</b>

							<ul class="question_options">
								<li v-for="(option, index) in current_question.options" :key="option">
									<label>
										<input type="checkbox" v-model="checkedItems['box_' + current_question.question_id + '_' + option.id]" :value="'box_' + current_question.question_id + '_' + option.id"> <span> {{ option.name }}</span>
									</label>
								</li>
							</ul>
						</div>
						<div class="next_question">
							<span>
								<button v-if="currentQuestion>0" v-on:click.stop="previousQuestion">Previous</button>
							</span>
							<span>
								<button v-if="currentQuestion<test.questions.length-1"  v-on:click.stop="nextQuestion" class="next">Next</button>
								<button v-else  v-on:click.stop="submitAnswers" class="next">Submit</button>
							</span>
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
        	goTo(id) {
        		this.currentQuestion = id;
        	},
        	previousQuestion() {
        		if (this.currentQuestion > 0) this.currentQuestion--;
        	},
        	nextQuestion() {
        		if (this.currentQuestion < this.test.questions.length) this.currentQuestion++;

        		console.log(this.checkedItems);
        	},
        	submitAnswers() {
        		let userToken = sessionStorage.getItem('authenticated');
        		//check if all questions are answered
        		let submitObject = {
        			"student" : userToken,
        			"test_id" : this.test.test_id,
        			"answers" : {}
        		};

        		for(let answer in this.checkedItems) {
        			let props = answer.split("_");

        			console.log(typeof submitObject.answers[props[1]]);

        			if (typeof submitObject.answers[props[1]] == "object") {
        				submitObject.answers[props[1]].push(props[2]);
        			}
        			else {
        				submitObject.answers[props[1]] = [props[2]];
        			}
        		}

			  	const requestOptions = {
				    method: "POST",
				    headers: { "Content-Type": "application/json" },
			        body: JSON.stringify(submitObject)
			  	};

				fetch(`http://localhost:3000/answer`, requestOptions)
				    .then(response => response.json())
				    .then(data => {
				    	console.log("Submitted!", data);
				    	this.hideLoader = false;
				    	this.testDone = true;
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
			    	console.log("Loaded");
			    	this.test = data;
			    	this.hideLoader = true;
			    	this.currentQuestion = 0;

			    	console.log(data);

			    	/*

			    	for (var i = 0; i < this.test.questions.length; i++) {
			    		let optionSlots = {};

				    	for (var j = 0; j < this.test.questions.options.length; j++) {
				    		optionSlots[this.test.questions.options.id] = 0;
				    	}


			    	}*/
			    });
		},
		data: function () {
		    return {
		    	answers: [],
		    	currentQuestion: 0,
		    	hideLoader: false,
		    	testDone: false,
		    	test: {},
		    	checkedItems: []
		    }
	  	},
		computed: {
		    // a computed getter
		    current_question: function () {
		      return this.test.questions[this.currentQuestion];
		    },
		    example_prop: function() {
		    	return "hi!";
		    }
		}
    }
</script>

<style lang="scss">
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;

		&.hide {
			display: none;
		}
	}

	.test {
		padding: 10px;

		.container {
			width: 900px;
			max-width: calc(100% - 30px);
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
		      	cursor: pointer;

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