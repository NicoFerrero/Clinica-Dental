import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-estadisticas-turnos",
  templateUrl: "./estadisticas-turnos.component.html",
  styleUrls: ["./estadisticas-turnos.component.css"]
})
export class EstadisticasTurnosComponent implements OnInit {
  chart: any;
  constructor() {}

  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "doughnut",
      data: {
        labels: ["Data1", "Data2"],
        datasets: [
          {
            data: [55, 78],
            backgroundColor: ["rgba(255, 0, 0, 1)", "rgba(255, 0, 0, 0.1)"]
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Turnos por especialidad"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
      /*options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }*/
    });

    /*this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });*/
  }
}
