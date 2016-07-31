var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var time = 30;
var questionIndex = 1;
var gameOver = false;
var correct = false;

var questions = {
	question1: {
		question: 'What later Star Wars actress had an early role in the movie Leon: The Professional?',
		choices: ['Carrie Fisher', 'Natalie Portman', 'Harrison Ford', 'Daisy Ridley'],
		answer: ['Natalie Portman']
	},
	question2: {
		question: 'Tom Hanks played Captain Miller in what legendary World War II movie?',
		choices: ['Toy Story', 'Black Hawk Down', 'Saving Private Ryan', 'Tropical Storm'],
		answer: ['Saving Private Ryan']
	},
	question3: {
		question: 'BB-8 is an astromech droid from what film franchise?',
		choices: ['Star Trek', 'Star Wars', 'Pacific Rim', 'Oblivion'],
		answer: ['Star Wars']
	},
	question4: {
		question: 'Which actor that once played James Bond previously competed in the Mr.Universe bodybuilding competition?',
		choices: ['Sean Connery', 'Daniel Craig', 'Pierce Brosnan', 'The Rock'],
		answer: ['Sean Connery']
	},
	question5: {
		question: 'Who played the fictional anti hero Deadpool in the 2016 movie?',
		choices: ['Robert Downey Jr', 'Ryan Reynolds', 'Chris Evans', 'Hugh Jackman'],
		answer: ['Ryan Reynolds']
	},
	question6: {
		question: 'Superman is a fictional superhero from what fictional planet?',
		choices: ['Zoness', 'Lexx', 'Athas', 'Krypton'],
		answer: ['Krypton']
	},
	question7: {
		question: 'Who played Batman in the 1989 Tim Burton version of the film?',
		choices: ['Michael Keaton', 'Christian Bale', 'Ben Affleck', 'George Clooney'],
		answer: ['Michael Keaton']
	},
	question8: {
		question: 'Which Teenage Mutant Ninja Turtle always wears red bandanas?',
		choices: ['Donatello', 'Leonardo', 'Raphael', 'Michaelangelo'],
		answer: ['Raphael']
	},
	question9: {
		question: 'Which Olympic sport was featured in the movie Cool Runnings?',
		choices: ['Swimming', 'Skiing', 'Bobsled', 'Snowboarding'],
		answer: ['Bobsled']
	},
	question10: {
		question: 'In what year was the original Jurassic Park film released?',
		choices: ['1992', '1998', '2001', '1993'],
		answer: ['1993']
	},
};

//THE TITLE
var title = $('<h1>').addClass('title').text('TRIVIA GAME!');

function startScreen() {
	//display start screen

	//html elements to display
	var startDiv = $('<div>').addClass('startScreen');
	var startBtn = $('<button>').addClass('start').text('START');
	startDiv.append(title).append(startBtn);
	$('.main').html(startDiv);
}

function questionScreen() {
	//display question screen

	//variables change to next question after choice click
	question = questions["question" + questionIndex].question;
	choices = questions["question" + questionIndex].choices;
	answer = questions["question" + questionIndex].answer;

	//html elements to display
	var questionDiv = $('<div>').addClass('questionScreen');
	var innerDiv = $('<div>').addClass('innerDiv');
	var timeElement = $('<p>').addClass('timeRemaining').html('Time Remaining: <span class="time">' + time + '</span> Seconds');
	var questionElement = $('<p>').addClass('question').html(question);
	var choiceDiv = $('<div>').addClass('choices');

	//iterate through choices and make a button for each one
	for (var i = 0; i < choices.length; i++) {
		var choiceBtn = $('<button>').addClass('choice').html(choices[i]);
		$(choiceDiv).append(choiceBtn);
	}

	//time remaining counter
	timer = setInterval(function(){timeDecrease()}, 1000);

	//function decreases time each second
	function timeDecrease () {
		time--;
		$('.time').html(time);
		if(!time) {
			unanswered++;
			showCorrectScreen();
		}
	}
	

	$(innerDiv).append(questionElement).append(choiceDiv);
	$(questionDiv).append(timeElement).append(innerDiv);
	$('.main').html(questionDiv);

	//move to next question in questions object
	questionIndex++;
}

function showCorrectScreen() {
	//display whether right or wrong

	//stop timer
	clearInterval(timer);

	//after 3 seconds, either show next question or game over screen
	timeout = setTimeout(function(){
		if(!gameOver){
			questionScreen();
		} else {
			endScreen();
		}
		reset();
	}, 1000);

	//html elements to display
	var answerDiv = $('<div>').addClass('answer');
	var correctElement = $('<h2>').addClass('correct');

	if(!time) {
		correctElement.html('You ran out of time!');
		$(answerDiv).append(correctElement);
	} else {
		if(correct) {
			correctElement.html('CORRECT!');
			$(answerDiv).append(correctElement);
		} else {
			correctElement.html('NOPE!');
			var showCorrectElement = $('<p>').addClass('showCorrect').html('The Correct Answer was: ' + answer);
			$(answerDiv).append(correctElement).append(showCorrectElement);
		}
	}
	
	$('.innerDiv').html(answerDiv);
}

function endScreen() {
	//display end screen

	//html elements to display
	var endDiv = $('<div>').addClass('theEnd');
	var gameOverHeader = $('<h2>').html('All done, heres how you did!');
	var correctScore = $('<p>').html('Correct Answers: ' + correctAnswers);
	var incorrectScore = $('<p>').html('Incorrect Answers: ' + incorrectAnswers);
	var unansweredScore = $('<p>').html('Unanswered: ' + unanswered);
	var restartBtn = $('<button>').addClass('restart').html('Start Over?');
	$(endDiv).append(gameOverHeader)
				.append(correctScore)
				.append(incorrectScore)
				.append(unansweredScore)
				.append(restartBtn);
	$('.innerDiv').html(endDiv);
}

function reset() {
	correct = false;
	time = 30;
	if(gameOver) {
		correctAnswers = 0;
		incorrectAnswers = 0;
		unanswered = 0;
		questionIndex = 1;
		gameOver = false;
	}
}

//click events for each button
$(document).on('click', '.start', function(){
	questionScreen();
});

$(document).on('click', '.choice', function(){
	if(questionIndex-1 >= Object.keys(questions).length){
		gameOver = true;
		console.log('Thats it');
	}

	if($(this).text() == answer) {
		correct = true;
		correctAnswers++;
	} else {
		correct = false;
		incorrectAnswers++;
	}

	showCorrectScreen();
});

$(document).on('click', '.restart', function(){
	questionScreen();
});

startScreen();