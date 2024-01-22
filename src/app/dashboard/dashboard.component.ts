import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chart: any = [];
  lineChart: any = [];
  doughNutChart: any = [];
  userTasks: any = JSON.parse(<any>localStorage.getItem('userTasks'));;

  ngOnInit() {
    console.log("The userTasks is : ", this.userTasks);
    let completedTasksCount : any = this.userTasks.filter((data : any)=> {
      return data.status === "Completed"
    })
    let createdTasksCount : any = this.userTasks.filter((data : any)=> {
      return data.status === "Created"
    })
    let assignedTasksCount : any = this.userTasks.filter((data : any)=> {
      return data.status === "Assigned"
    })
    let inProgressTasksCount : any = this.userTasks.filter((data : any)=> {
      return data.status === "In prgress"
    })
    let pendingTasksCount : any = this.userTasks.filter((data : any)=> {
      return data.status === "Pending"
    })
    console.log("The completedTasksCount : ", completedTasksCount, 
    " and createdTasksCount ", createdTasksCount, 
    " and assignedTasksCount : ", assignedTasksCount,
    " and inProgressTasksCount : ", inProgressTasksCount,
    " and pendingTasksCount : ", pendingTasksCount);
    // simple bar chart
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Total', 'Completed', 'Pending', 'Assinged','Created','To do'],
        datasets: [
          {
            label: 'Value',
            data: [
              this.userTasks.length, 
              completedTasksCount.length, 
              inProgressTasksCount.length, 
              assignedTasksCount.length, 
              createdTasksCount.length, 
              pendingTasksCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
    this.chart = new Chart('requestBar', {
      type: 'bar',
      data: {
        labels: ['Total', 'Completed', 'Pending', 'Assinged','Created','To do'],
        datasets: [
          {
            label: 'Value',
            data: [
              this.userTasks.length, 
              completedTasksCount.length, 
              inProgressTasksCount.length, 
              assignedTasksCount.length, 
              createdTasksCount.length, 
              pendingTasksCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
    // this.lineChart = new Chart("lineCharts", {
    //   type: 'line', //this denotes tha type of chart

    //   data: {// values on X-Axis
    //     labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
		// 						 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	  //      datasets: [
    //       {
    //         label: "Sales",
    //         data: ['467','576', '572', '79', '92',
		// 						 '574', '573', '576'],
    //         backgroundColor: 'blue'
    //       },
    //       {
    //         label: "Profit",
    //         data: ['542', '542', '536', '327', '17',
		// 							 '0.00', '538', '541'],
    //         backgroundColor: 'limegreen'
    //       }  
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }
      
    // });
  //   this.doughNutChart = new Chart("doughNutChart", {
  //     type: 'doughnut', //this denotes tha type of chart // User polarArea for another design

  //     data: {// values on X-Axis
  //       labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
	//        datasets: [{
  //   label: 'My First Dataset',
  //   data: [300, 240, 100, 432, 253, 34],
  //   backgroundColor: [
  //     'red',
  //     'pink',
  //     'green',
	// 		'yellow',
  //     'orange',
  //     'blue',			
  //   ],
  //   hoverOffset: 4
  // }],
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }

  //   });
  }
}
