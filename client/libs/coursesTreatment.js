// Student Information Treatment Javascript File
// Author : Alicia Parisse
// Description : 
//      This file contains multiple functions used to alter
//      and create content for the Courses/Course Component
// Last-comment date : 03/03/16


//Function createDisplayableData
//@param :  course, javascript object. This object contains all the information about a course.
//@param :  colors, array. This is an array of 3 colors. The color of the course, one darker and gray.
//@desc :   This function both creates a displayableData array and changes the exercises of
//          the studentCourse so that we can more easily show the state of each exercise
var createDisplayableData = function(course, colors){

	var dataToDisplay = [],
		finishedE = 0, 
		begunE = 0,
		//TODO : add a way to find the number of exercises to validate !
		leftE = 0,
		totalNbEx = 0,
		curExo;

	//For each exercise we update the corresponding counter 
	for (var i = 0 ; i < course.exercises.length ; i++){
		curExo = course.exercises[i];
		if(curExo.all_tests_passed && curExo.available_points != null) {
			finishedE+= curExo.awarded_points.length;
			curExo.state = "completed";
		}
		else if (!curExo.all_tests_passed && curExo.awarded_points != null){
			begunE+= curExo.awarded_points.length;
			curExo.state = "begun";
		}
		else{
			curExo.state = "todo";
		}

		if(curExo.available_points!= null){
			totalNbEx += curExo.available_points.length;
		}
	}
	leftE = totalNbEx - finishedE - begunE;

	//Now that all the numbers are calculated, we push the results into displayableData
	dataToDisplay.push({
		name:"Done exercises",
		color : colors[0],
		y:finishedE
	});
	dataToDisplay.push({
		name:"Begun exercises",
		color : colors[1],
		y:begunE
	});
	dataToDisplay.push({
		name:"Exercises left to do",
		color : colors[2],
		y:leftE
	});

	return dataToDisplay;
}

//Function sexExInWeeks
//@param : 	exercises, array. Is the array of the course's exercises.
//@desc : 	the goal of this function is to separate the exercises of a course into
//			the weeks they belong to, according to their names.
var sepExInWeeks = function(exercises){
	var weeks = [],
		i,
		exo,
		weekNumber,
		shiftValue = 0,
		firstWeek = true,
		foundWeek0 = false;
	//We iterate through the exercises to check of what week they're part
	for (i = 0 ; i < exercises.length ; i++){
		exo = exercises[i];
		if (exo.exercise_name.indexOf('-') != -1){
			dashIn = exo.exercise_name.indexOf('-');
			//I check if I have a week number
			if(!isNaN(exo.exercise_name[dashIn -1])){
				//I check if I have a week number with 2 digits
				if(!isNaN(exo.exercise_name.substring((dashIn-2), (dashIn-1)))){
					weekNumber = parseInt(exo.exercise_name.substr((dashIn-2), 2));
				}
				else {
					weekNumber =  parseInt(exo.exercise_name[dashIn-1]); 
				}

				
				//Because we assume that if there's a week 0, it will be first
				if(weekNumber ==0 && !foundWeek0){
					foundWeek0 = true;
				}


				if(firstWeek) {
					firstWeek = false;
					shiftValue = weekNumber;
				}
				if(weekNumber < shiftValue){
					shiftValue = weekNumber;
				}


				if(weeks[(weekNumber.toString())] != undefined){
					weeks[(weekNumber.toString())].exercises.push(exo);
				}
				else {
					weeks[(weekNumber.toString())] = {weekNb : (weekNumber.toString()), exercises:[exo]}
				}
			}
			 
		}
		//As the exercises are in order of week number, if I find a non number week, I just treat it in the end
		else {
			//I check if there is an Extra Week number
			if (weeks["Extra"] != undefined){
				weeks["Extra"].exercises.push(exo);
			}
			//2) If it doesn't I create a new week and add my exercise in it
			else{
				weeks["Extra"] ={weekNb:"Extra", exercises:[exo]};
			}
		}

	}

	for (var i = 0 ; i<shiftValue; i++){
		weeks.shift();
	}

	return weeks;
	
}

//Function courseCompDiagram
//@param : 	course, javascript object. The course object containing the exercises.
//@param : 	colors, array. This is an array of 3 colors. The color of the course, one darker and gray.
//@desc : 	this function displays the processed displayable data into a 3 color diagram.

var courseCompDiagram = function(course, colors){

	var dataToDisplay = [],
		courseName = course.name;

	
	//This creates an attribute "newName" for each exercise,
	//to display in the tooltip
	refactorExercises(course);
	
	//This create a dataToDisplay from the course
	//It contains the series that will be displayed by highcharts
	dataToDisplay = createDisplayableData(course, colors);

	
	//Here we check is the course is completed/finished
	if ((dataToDisplay[2].y == 0) && (dataToDisplay[1].y == 0)) {
		 $("#Completion"+ courseName).replaceWith('<img src="resources/compBadge.png" width="50%" >');
	}
	//If it's not we display normally
	else
	{
		$("#Completion"+ courseName).highcharts({
			chart: {
				type: 'pie'
			},
			exporting:{
				buttons:{
					contextButton:{
						enabled:false
					}
				}
			},
			credits:{
				enabled:false
			},       
			title:{
				text:''
			},
			subTitle:{
				text:''
			},
			yAxis: {
				title: {
					text: 'Number of exercises done'
				}
			},
			plotOptions: {
				pie: {
					shadow: false,
					center: ['50%', '50%']
				}
			},
			series: [{
				name: 'Exercises',
				data: dataToDisplay,
				size: '100%',
				innerSize : '60%',
				dataLabels: {
					formatter: function () {
						return this.y > 10 ? this.point.name : null;
					},
					color: '#ffffff',
					distance: -10
				}
			}]
		});
	}
	
	return course; 
	
 }

//Function refactorExercises
//@param : 	course, javascript object. The course we need to change
//@return : course, javascript object. The course when it's change
//@desc : 	the goal of the function is to create a add a new property to the course object.
//			The newName property is created from the existing name for every exercise.
function refactorExercises(course){
    var i,
        newName="";

    //We refactor every exercise name.
    for (i=0; i< course.exercises.length; i++) {
        exo = course.exercises[i];
        if (exo.exercise_name.indexOf('_') != -1){
            //We get only the characters that are after the underscore 
            newName = exo.exercise_name.slice(exo.exercise_name.indexOf('_'));
        }
        
        else if (exo.exercise_name.indexOf('-') != -1){
            //We get only the characters that are after the dash
            newName = exo.exercise_name.slice(exo.exercise_name.indexOf('-'));
        }

        //We pass from camel case to normal syntax with a reg ex
        newName = newName.replace(/([A-Z])/g, function($1){return " "+$1.toLowerCase();}).slice(1);
        newName = newName.charAt(0).toUpperCase() + newName.slice(1); 

        course.exercises[i].newName = newName;
    }
    return course;

}