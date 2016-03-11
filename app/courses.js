// Courses Component
// Author : Alicia Parisse
// Description : 
//		This component is a component that's mainly composed of a list of courses
//		The only directive is a course, repeated as many times as there are courses in the list  
// Last-comment date : 03/03/16
System.register(["angular2/core", "../js/studentInfoTreatment.js", './course', "../js/tools.js"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, studentInfoTreatment_js_1, course_1, tools_js_1;
    var Courses;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (studentInfoTreatment_js_1_1) {
                studentInfoTreatment_js_1 = studentInfoTreatment_js_1_1;
            },
            function (course_1_1) {
                course_1 = course_1_1;
            },
            function (tools_js_1_1) {
                tools_js_1 = tools_js_1_1;
            }],
        execute: function() {
            Courses = (function () {
                function Courses() {
                    var self = this;
                    this.noCourses = true;
                    //This gets courses from the API and stores it in this.courses
                    studentInfoTreatment_js_1.getAllStudentCourses(true, function (coursesRev) {
                        self.colors = tools_js_1.getColors(coursesRev.length);
                        for (var i = 0; i < coursesRev.length; i++) {
                            coursesRev[i].color = self.colors[i];
                        }
                        self.courses = coursesRev;
                        if (self.courses == undefined || self.courses.length == 0) {
                            self.noCourses = true;
                        }
                        else {
                            self.noCourses = false;
                        }
                    });
                }
                Courses = __decorate([
                    core_1.Component({
                        selector: "courses",
                        directives: [course_1.Course],
                        template: "\n\t<div *ngIf = \"!noCourses\"> \n\t\t<div *ngFor=\"#aCourse of courses\">\n\t\t\t<course\u00A0\n\t\t\t[aCourse]=\"aCourse\"></course>\n\t\t</div>\t\n\t</div>\n\t<div [hidden] = \"!noCourses\">\n\t\tYou currently have no courses you registered in.<br>\n\t\tIn order to see information displayed here, please register to at least one course.\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Courses);
                return Courses;
            }());
            exports_1("Courses", Courses);
        }
    }
});
//# sourceMappingURL=courses.js.map