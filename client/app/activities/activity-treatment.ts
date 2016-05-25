/**
 * Created by parisse on 19.4.2016.
 */



/// <reference path="../../libs/jquery/jquery.d.ts"/>
/// <reference path="../../libs/highcharts/highcharts.d.ts"/>
/// <reference path="../../libs/moment/moment.d.ts"/>
/// <reference path="../../libs/highcharts/highcharts.d.ts"/>


export class ActivityTreatment {

    static createDisplayableWeekData(userId, callback) {

        var today = new Date();
        //var today = new Date(2016,2,1);
        //userId = "bertron";

        var self = this,
            dates = self.getLastNDates(today,365).reverse();

        var url_base = window.location.origin;
        (<any>$).ajax({
            url: url_base + '/mongo/activity/userActivity',
            method: "get",
            data: {userId : userId},
            success : function(activityResult){
                var dataToDisplay=[],
                    userActivity = {};

                for(var j = 0 ; j < activityResult.length ; j++){
                    userActivity[activityResult[j].date] = activityResult[j].nbEx;
                }

                for (var i=0 ; i < dates.length ; i++){
                    var year = dates[i].slice(0,4),
                        month = dates[i].slice(5,7),
                        day = dates[i].slice(8,10);
                    var curDate = Date.UTC(year, month-1, day);
                    if(userActivity[dates[i]] != undefined){
                        dataToDisplay.push([
                            curDate,
                            userActivity[dates[i]]
                        ])
                    }
                    else{
                        dataToDisplay.push([
                            curDate,
                            0]);
                    }

                }

                callback(dataToDisplay)
            }
        });


    }

    static displayExerciseActivity(userId, callback){
        var self = this;

        self.createDisplayableWeekData(userId, (dataToDisplay) => {
            self.createDisplayableWeekData("averageUser", (averageDataToDisplay) => {

                (<any>$)('#weekExerciseActivity').highcharts({
                    title: {
                        text: 'Week Activity',
                        x: -20 //center
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        title: {
                            text: 'Date'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of points per day'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: 'Your number of points',
                        data: dataToDisplay.slice(-7)
                    },  {
                        name: 'Average number of points',
                        data: averageDataToDisplay.slice(-7)
                    }]
                });

                (<any>$)("#zoomExerciseActivity").highcharts({
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Yearly Activity'
                    },
                    subtitle: {
                        //Responsive design
                        text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Number of points per day'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        type:'area',
                        name: 'Your number of points',
                        data: dataToDisplay
                        }, {
                        name: 'Average number of points',
                        data: averageDataToDisplay
                    }
                    ]
                });
            })
        });

        callback();

    }

    static getLastNDates(startDate, nbOfDays) {
        var dateArray = [];
        var currentDate = moment(startDate);
        for (var i=0; i<nbOfDays; i++){
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).subtract(1, 'days');
        }
        return dateArray;
    }
}
