var myChart;
var requestURL2="https://www.data.corsica/api/records/1.0/analyze/?q=date+%3C+%272018-1-1T00:00:00%2B00:00%27&dataset=observation-meteorologique-historiques-france-synop&x=date.year&x=date.month&sort=x.date.year,x.date.month&maxpoints=&y.serie1-1.expr=tc&y.serie1-1.func=AVG&y.serie1-1.cumulative=false&y.serie1-2.expr=rr24&y.serie1-2.func=AVG&y.serie1-2.cumulative=false&y.serie1-3.expr=ff&y.serie1-3.func=AVG&y.serie1-3.cumulative=false&timezone=Europe%2FBerlin&lang=fr";
var response2;
var values=["temperature","precipitation","vent","surface_feu"];
values["temperature"]=[];
values["precipitation"]=[];
values["vent"]=[];

var labels=[];
var visu;
for (var i = 2010; i <= 2017; i++) {
    for (var j = 0; j <= 11; j++) {
        labels.push(new Date(null, i + j, null).toLocaleDateString("fr", {month: "long"})+" "+i);
    }
}
$(document).ready(function () {

    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
        },
        options: {
            
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false, 
                }
              },y2: {
                type: 'linear',
                display: true,
                position: 'right',

                grid: {
                  drawOnChartArea: false, 
                }
              },y3: {
                type: 'linear',
                display: true,
                position: 'right',

                grid: {
                  drawOnChartArea: false, 
                }
              }
            }
        }
    });

    $.ajax({
        url: requestURL2,
        success: function(data) {
            visu = data;
             for(var i = 0; i < data.length; i++){
                 values["temperature"].push(data[i]["serie1-1"]);
                 values["precipitation"].push(data[i]["serie1-2"]);
                 values["vent"].push(data[i]["serie1-3"]);
             }
             myChart.data.datasets.push({
                label: 'Températue °C',
                data: values["temperature"],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                yAxisID: 'y1'
            });
            myChart.data.datasets.push({
                label: 'Précipitations mm',
                data: values["precipitation"],
                fill: false,
                borderColor: 'rgb(148, 37, 89)',
                tension: 0.1,
                yAxisID: 'y2'
            });
            myChart.data.datasets.push({
                label: 'Vitesse du vent m/s',
                data: values["vent"],
                fill: false,
                borderColor: 'rgb(244, 231, 8)',
                tension: 0.1,
                yAxisID: 'y3'
            });
            myChart.update();
         }
       });
});
 


var commune="";
var nb=0;
function change(){
    var response;
    values["surface_feu"]=[];
    var requestURL = 'https://www.data.corsica/api/records/1.0/analyze/?q=annee%20%3E2009';
    if(commune!=""){
        requestURL +='%20AND%20commune=%27'+commune+'%27';
    }
    requestURL+='&dataset=incendies-de-forets-en-corse-de-1973-a-2017-base-promethee&x=alerte.year&x=alerte.month&sort=serie1-2&maxpoints=&y.serie1-1.expr=surface_parcourue_m2&y.serie1-1.func=SUM&y.serie1-1.cumulative=false&timezone=Europe/Berlin&lang=fr';

    
    $.ajax({
        url: requestURL,
        success: function(data) {
            visu = data;
            j=1;
            k=2010;
             for(var i = 0; i < data.length; i++){
                 if(data[i]['x']['month']==j&&data[i]['x']['year']==k){
                     values["surface_feu"].push(data[i]["serie1-1"]);
                 }
                 else{
                     var nb_0=(data[i]['x']['year']-k)*12+data[i]['x']['month']-j;
                     for(var l=0;l<nb_0;l++){
                         values["surface_feu"].push(0);
                     }
                     
                 }
                j=data[i]['x']['month'];
                j++;
                 k=data[i]['x']['year'];
                 if(j==13){
                     j=1;
                     k++;
                 }
             }
             if(nb!=0){
                myChart.data.datasets = myChart.data.datasets.filter(function(obj) {
                    return (obj.label != 'Surface brûlée m²'); 
                });
            }
             myChart.data.datasets.push({
                label: 'Surface brûlée m²',
                data: values["surface_feu"],
                fill: false,
                borderColor: 'rgb(237, 112, 32)',
                tension: 0.1,
                yAxisID: 'y'
            });
            myChart.update();
            
            nb++;
         }
    });

    
}


change();

