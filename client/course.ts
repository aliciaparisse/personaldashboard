// Course Component
// Author : Alicia Parisse
// Description : 
//		This component is representin a course. 
//		It's composed of two things : 
//			- a diagram showing the global progression of the student on the course
//			- a list of exercises represented in weeks, with their status (completed,begun,todo)
// Last-comment date : 03/03/16

import {Component,Input, ChangeDetectorRef} from 'angular2/core';
import {courseCompDiagram, sepExInWeeks} from "libs/coursesTreatment.js";
import {getCorrColors, changeExercColor} from "libs/tools.js";


@Component({
	selector: 'course',
	template: `
	<div class="course {{aCourse.name}}">
		<h2>{{aCourse.title}}</h2>
		<div class='diag-container row'> 
			<div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 diagram' id="Completion{{aCourse.name}}">
			</div>			
			
			<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 parent" *ngFor="#week of weeks">
				Week {{week.weekNb}} 
				<div title="{{exo.newName}}" class="exerc {{exo.state}}" *ngFor="#exo of week.exercises"></div> 
			</div>
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	//Here we initialize the change detection so that we trigger it when it's needed
	constructor(cdr: ChangeDetectorRef) {
		this.cdr = cdr;
	}

	ngAfterViewInit(){
		//We get different shades of the colors we need to display it
		this.colors =  getCorrColors(this.aCourse.color);
		//This calls a function that changes the diagram with highcharts
		//But also returns all the exercises, so we can separate them in weeks
		this.weeks = sepExInWeeks(courseCompDiagram(this.aCourse, this.colors).exercises);
		//Now that we have all we need is stored, we can trigger the changes
		this.cdr.detectChanges();
		changeExercColor(this.aCourse.name, this.colors);
	}
	
	
}
