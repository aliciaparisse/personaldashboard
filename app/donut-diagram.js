System.register(["angular2/core", "../js/highDonut.js"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, highDonut_js_1;
    var DonutDiagram;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (highDonut_js_1_1) {
                highDonut_js_1 = highDonut_js_1_1;
            }],
        execute: function() {
            DonutDiagram = (function () {
                function DonutDiagram() {
                    highDonut_js_1.donutCourses();
                }
                DonutDiagram = __decorate([
                    core_1.Component({
                        selector: "donut-diagram",
                        template: "\n\t\t<div class='diag-container'> \n\t\t\t<div class='diagram' id=\"donutCoursesTaken\"></div>\n\t\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DonutDiagram);
                return DonutDiagram;
            })();
            exports_1("DonutDiagram", DonutDiagram);
        }
    }
});
//# sourceMappingURL=donut-diagram.js.map