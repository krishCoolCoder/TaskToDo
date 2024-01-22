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
  userTasks: any = JSON.parse(<any>localStorage.getItem('userTasks'));
  userRequest: any = JSON.parse(<any>localStorage.getItem('requestList'));
  userQuery: any = JSON.parse(<any>localStorage.getItem('queryList'));
  userList: any = JSON.parse(<any>localStorage.getItem('userList'));
  
  ngOnInit() {
    console.log("The user list is this : ", this.userList);
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
    // User request data fetch operation
    console.log("The userTasks is : ", this.userRequest);
    let pendingRequestCount : any = this.userRequest.filter((data : any)=> {
      return data.requestStatus === "Request Raised"
    })
    let acceptedRequestCount : any = this.userRequest.filter((data : any)=> {
      return data.requestStatus === "Request Accepted"
    })
    let rejectedRequestCount : any = this.userRequest.filter((data : any)=> {
      return data.requestStatus === "Request Rejected"
    })
    let accessControlPendingCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Access control" && data.requestStatus == "Request Raised")
    })
    let accessControlAcceptedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Access control" && data.requestStatus == "Request Accepted")
    })
    let accessControlRejectedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Access control" && data.requestStatus == "Request Rejected")
    })
    let accessControlTotalCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Access control")
    })
    let taskControlBreakDownPendingCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task break down" && data.requestStatus == "Request Raised")
    })
    let taskControlBreakDownAcceptedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task break down" && data.requestStatus == "Request Accepted")
    })
    let taskControlBreakDownRejectedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task break down" && data.requestStatus == "Request Rejected")
    })
    let taskControlBreakDownTotalCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task break down")
    })
    let taskRequestPendingCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task request" && data.requestStatus == "Request Raised")
    })
    let taskRequestAcceptedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task request" && data.requestStatus == "Request Accepted")
    })
    let taskRequestRejectedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task request" && data.requestStatus == "Request Rejected")
    })
    let taskRequestTotalCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Task request")
    })
    let requestingTaskUpdatePedingCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting Task updation" && data.requestStatus == "Request Raised")
    })
    let requestingTaskUpdateAcceptedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting Task updation" && data.requestStatus == "Request Accepted")
    })
    let requestingTaskUpdateRejectedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting Task updation" && data.requestStatus == "Request Rejected")
    })
    let requestingTaskUpdateTotalCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting Task updation")
    })
    let requestingDeadlineExtentionPendingCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting deadline extention" && data.requestStatus == "Request Raised")
    })
    let requestingDeadlineExtentionAcceptedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting deadline extention" && data.requestStatus == "Request Accepted")
    })
    let requestingDeadlineExtentionRejectedCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting deadline extention" && data.requestStatus == "Request Rejected")
    })
    let requestingDeadlineExtentionTotalCount : any = this.userRequest.filter((data : any)=> {
      return (data.requestType === "Requesting deadline extention")
    })

    // User role
    let userAdminTotalCount : any = this.userList.filter((data : any)=> {
      return data.userRole === "Admin";
    })
    let userRoleTotalCount : any = this.userList.filter((data : any)=> {
      return data.userRole === "User";
    })
    let premiumUserTotalCount : any = this.userList.filter((data : any)=> {
      return data.userRole === "Premium User"
    })
    let annonymousUserTotalCount : any = this.userList.filter((data : any)=> {
      return data.userRole === "Annonymous User"
    })
    
    // user Query count operation 
    let userQueryDoubtStatusCount : any = this.userQuery.filter((data : any)=> {
      return (data.queryStatus === "Doubt")
    })
    let userQueryClarityStatusCount : any = this.userQuery.filter((data : any)=> {
      return (data.queryStatus === "Clarity")
    })
    let userQueryConfirmationStatusCount : any = this.userQuery.filter((data : any)=> {
      return (data.queryStatus === "Confirmation")
    })
    console.log("The pendingRequestCount : ", pendingRequestCount, 
    " and acceptedRequestCount ", acceptedRequestCount, 
    " and rejectedRequestCount : ", rejectedRequestCount);
    console.log("The completedTasksCount : ", completedTasksCount, 
    " and createdTasksCount ", createdTasksCount, 
    " and assignedTasksCount : ", assignedTasksCount,
    " and inProgressTasksCount : ", inProgressTasksCount,
    " and pendingTasksCount : ", pendingTasksCount);
    // simple bar chart
    this.chart = new Chart('taskBar', {
      type: 'bar',
      data: {
        labels: ['Total', 'Completed', 'Pending', 'Assinged','Created','To do'],
        datasets: [
          // {
          //   label: 'Dataset 1',
          //   data: [
          //     this.userTasks.length, 
          //     completedTasksCount.length, 
          //     inProgressTasksCount.length, 
          //     assignedTasksCount.length, 
          //     createdTasksCount.length, 
          //     pendingTasksCount.length
          //   ],borderWidth: 1,
          //   borderRadius: 10
          // }, // This just adds another bar in the bar chart.
          {
            label: 'Count',
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
        indexAxis: 'y',
      },
    });
    this.chart = new Chart('requestBar', {
      type: 'bar',
      data: {
        labels: ['Total request count','Pending request', 'Request Accepted', 'Request Rejected'],
        datasets: [
          {
            label: 'Access control',
            data: [
              accessControlTotalCount.length, 
              accessControlPendingCount.length, 
              accessControlAcceptedCount.length, 
              accessControlRejectedCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
          {
            label: 'Task break down',
            data: [
              taskControlBreakDownTotalCount.length, 
              taskControlBreakDownPendingCount.length, 
              taskControlBreakDownAcceptedCount.length, 
              taskControlBreakDownRejectedCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
          {
            label: 'Requesting tasks',
            data: [
              taskRequestTotalCount.length, 
              taskRequestPendingCount.length, 
              taskRequestAcceptedCount.length, 
              taskRequestRejectedCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
          {
            label: 'Requesting Task updation',
            data: [
              requestingTaskUpdateTotalCount.length, 
              requestingTaskUpdatePedingCount.length, 
              requestingTaskUpdateAcceptedCount.length, 
              requestingTaskUpdateRejectedCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
          {
            label: 'Requesting deadline extention',
            data: [
              requestingDeadlineExtentionTotalCount.length, 
              requestingDeadlineExtentionPendingCount.length, 
              requestingDeadlineExtentionAcceptedCount.length, 
              requestingDeadlineExtentionRejectedCount.length
            ],
            borderWidth: 1,
            borderRadius: 10
          },
          {
            label: 'Request count',
            data: [
              this.userTasks.length, 
              completedTasksCount.length, 
              inProgressTasksCount.length, 
              assignedTasksCount.length, 
              createdTasksCount.length, 
              pendingTasksCount.length
            ],borderWidth: 1,
            borderRadius: 10
          }, // This just adds another bar in the bar chart.
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
    this.chart = new Chart('queryBar', {
      type: 'bar',
      data: {
        labels: ['Total', 'Doubt', 'Clarity', 'Confirmation'],
        datasets: [
          {
            label: 'Value',
            data: [
              this.userQuery.length, 
              userQueryDoubtStatusCount.length, 
              userQueryClarityStatusCount.length, 
              userQueryConfirmationStatusCount.length
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
    this.chart = new Chart('userBar', {
      type: 'bar',
      data: {
        labels: ['Total Users', 'Admin', 'User', 'Premium User','Annonymous'],
        datasets: [
          // {
          //   label: 'Dataset 1',
          //   data: [
          //     this.userTasks.length, 
          //     completedTasksCount.length, 
          //     inProgressTasksCount.length, 
          //     assignedTasksCount.length, 
          //     createdTasksCount.length, 
          //     pendingTasksCount.length
          //   ],borderWidth: 1,
          //   borderRadius: 10
          // }, // This just adds another bar in the bar chart.
          {
            label: 'Count',
            data: [
              this.userList.length, 
              userAdminTotalCount.length, 
              userRoleTotalCount.length, 
              premiumUserTotalCount.length, 
              annonymousUserTotalCount.length
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
        indexAxis: 'y',
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
