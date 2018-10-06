import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import * as ChartConst from 'ng6-o2-chart';


import {
	Ng6O2ChartModule
}
from 'ng6-o2-chart';
 
import {
	Router
}
from '@angular/router';
import {
	NgStyle
}
from '@angular/common';
import {
	DomSanitizer, SafeHtml
}
from '@angular/platform-browser';
import PerfectScrollbar from 'perfect-scrollbar';
import {
	getInfoService
}
from '../getClassInfo.service';
import {
	UserInfoService
}
from './../user-info.service'; 
import {
	environment
}
from '../../environments/environment';
import {
	Message
}
from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-charts',
	styleUrls: ['./charts.component.scss', '../app.component.scss'],
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {

  exampleChartType = 'line';
  exampleChart;
  exampleDataSet1;
  exampleDataSet2;
  exampleData;
  exampleChartCanvas;




	getData: any;
	postData: any;
	wikiData: any;
	classes: any[] = [];
	subjects: any[] = [];
	boardName: string = 'CBSE';
	selectedClass: string = this.boardName + ': Class 1';
	selectedClassVal: string = 'Class 1';
	classesOpen: boolean = false;
	showContainer: boolean = false;
	showMyNoteBooksContainer: boolean = false;
	showSerachedContent: boolean = false;
	classAndUnit: any;
	noteBookClassAndUnit: any;
	searchTermResults: any[];
	height: string;
	sbHeight: string;
	currentUnit: any;
	currentSubject: string;
	selectedTermResult: any;
	selectedTermImgResults: any;
	selectedImages: any;
	selectedVideos: any;
	selectedTermVidResults: any;
	unitTitle: string;
	baseUrl: string = environment.serverUrl;
	showModal: boolean = false;
	modalTextWiki: string;
	usrName: string;
	usrInitials: string;
  usrEm: string;
  instituteNm : string;
	unit: string;
	loginData: any;
	noteboookRes: any;
	content_type: string = "image";
	currentImg: string;
	showImage: boolean = false;
	showTooltip: boolean = false;
	showTooltipResult: boolean = false;
	showActionTooltip: boolean = false;
	showActionTooltipResult: boolean = false;
	selected_text_array: any[] = [];
	copytooltip: any;
	hidetooltiptimer: any;
	hidecopytooltiptimer: any;
	hideactiontooltiptimer: any;
	copysuccess: any;
	dataToEnableBtns: any[] = [];
	showNmPopup: boolean = false;
	notebookCreated: boolean = false;
	validationError: string = "";
	selectedContentErr: string = "";
	classTabText: string = "Add School";
	noteBookTxt: string = "My Notebooks";
	tabSelected: string = this.classTabText;
	noteBookName: string;
	notebookObj: any;
	template1: boolean = false;
	contentIndex: number = 0;
	firstContent: any;
	secondContent: any;
	singleContent: any;
	firstContentType: any;
	secondContentType: any;
	singleContentType: any;
	maxLen: number = 0;
	name = 'Pigeon Admin Web';



	title = 'app';
	chartType: string;
	configData: any;
	barDataJson: any;
	geoMapDataJson: any;
	geoOrthographicDataJson: any;
	choroplethDataJson: any;
	scatterPlotDataJson: any;
	lineDataJson: any;
	histogramDataJson: any;
	pieDataJson: any;
	packLayoutDataJson: any;
	treeMapDataJson: any;
	stackBarDataJson: any;
	treeDataJson: any;
	forceDataJson: any;
	DataSetJson: string;
	lineTypeName: string;
	barTypeName: string;
	pieTypeName: string;
	scatterPlotTypeName: string;
	histogramTypeName: string;
	stackBarTypeName: string;
	geoMapTypeName: string;
	geoOrthographicTypeName: string;
	treeMapTypeName: string;
	packLayoutTypeName: string;
	choroplethTypeName: string;
	treeTypeName: string;
	forceTypeName: string;
	devices: any = [];
	private initilizeData() {
		// ConfigData = this.httpClient.get('assets/json/ConfigData.json');
		this.configData = {
			// tslint:disable-next-line:quotemark
			"className": {
				'axis': 'axis',
				'axisXBorder': 'axis_x',
				'axisXText': 'axis-x-text',
				'bar': 'bar',
				'barValue': 'bar-value',
				'line': 'line',
				'multiLinePrefix': 'line-',
				'grid': 'grid',
				'pie': 'pie',
				'pieInnerTitle': 'pie-inner-title',
				'pieInnerRadius': 'total',
				'histogram': 'histogram',
				'histogramBar': 'histogram-bar',
				'treemap': 'treemap',
				'treemapLabel': 'treemap-label',
				'packlayout': 'packlayout',
				'packlayoutLabel': 'packlayout-label',
			},
			'label': {
				'display': true,
			},
			'title': {
				'display': true,
				'name': 'Title',
				'className': 'chart-title',
				'height': 30,
				'leftMargin': -20,
				'bottomMargin': 10
			},
			'maxValue': {
				'auto': true,
				'x': 100,
				'y': 100,
			},
			'legend': {
				'display': true,
				'position': 'right',
				'totalWidth': 80,
				'initXPos': 5,
				'initYPos': 10,
				'rectWidth': 10,
				'rectHeight': 10,
				'xSpacing': 2,
				'ySpacing': 2
			},
			'color': {
				'auto': true, //
				'defaultColorNumber': 10,
				'opacity': 1.0,
				'userColors': ['blue', 'red', 'green', 'yellow', 'PaleGoldenrod', 'Khaki', 'DarkKhaki', 'Gold', 'Cornsilk', 'BlanchedAlmond', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan', 'RosyBrown', 'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate'],
				'focusColor': 'red',
			},
			'pie': {
				'innerRadius': {
					'percent': 20,
					'title': 'Total'
				},
				'value': {
					'display': true,
				},
				'percent': {
					'display': false,
				}
			},
			'line': {
				'legend': 'lineEnd',
				'interpolate': 'linear',
			},
			'grid': {
				'x': {
					'display': true,
				},
				'y': {
					'display': true,
				},
			},
			'margin': {
				'top': 30,
				'left': 30,
				'right': 10,
				'bottom': 20,
				'between': 5
			},
			'axis': {
				'rotation': 0,
				'borderLineWidth': 1,
				'xLabel': {
					'leftMargin': 0,
					'bottomMargin': 5
				},
				'yLabel': {
					'leftMargin': 0,
					'bottomMargin': 0
				},
			},
			'animation': {
				'enable': true,
				'duration': 4000,
			},
		};
		this.barDataJson = {
			'series': ['English', 'Math'],
			'data': [{
				'x': 'suzuki',
				'y': [92, 73],
			}, {
				'x': 'inoue',
				'y': [69, 45],
			}, {
				'x': 'sato',
				'y': [70, 100],
			}, {
				'x': 'tanaka',
				'y': [43, 66],
			}, {
				'x': 'ida',
				'y': [60, 70],
			}, {
				'x': 'kato',
				'y': [55, 63],
			}, ],
		};
		this.lineDataJson = {
			'series': ['year', 'sell', ],
			'data': [{
				'name': 'software',
				'value': [{
					'x': '2010',
					'y': 18
				}, {
					'x': '2011',
					'y': 22
				}, {
					'x': '2012',
					'y': 30
				}, {
					'x': '2013',
					'y': 31
				}, ]
			}, {
				'name': 'hardware',
				'value': [{
					'x': '2010',
					'y': 15
				}, {
					'x': '2011',
					'y': 16
				}, {
					'x': '2012',
					'y': 10
				}, {
					'x': '2013',
					'y': 21
				}, ]
			}, {
				'name': 'device',
				'value': [{
					'x': '2010',
					'y': 25
				}, {
					'x': '2011',
					'y': 26
				}, {
					'x': '2012',
					'y': 30
				}, {
					'x': '2013',
					'y': 31
				}, ]
			}, {
				'name': 'others',
				'value': [{
					'x': '2010',
					'y': 100
				}, {
					'x': '2011',
					'y': 16
				}, {
					'x': '2012',
					'y': 20
				}, {
					'x': '2013',
					'y': 41
				}, ]
			}, ],
		};
		this.pieDataJson = {
			'data': [{
				'name': 'software',
				'value': 30,
			}, {
				'name': 'hardware',
				'value': 25
			}, {
				'name': 'device',
				'value': 16
			}, {
				'name': 'others',
				'value': 4
			}, ],
		};
 
	}

	constructor(private GetInfoService: getInfoService, private sanitizer: DomSanitizer, private router: Router, private userInfoService: UserInfoService) {
 
		this.barTypeName = ChartConst.LINE_CHART_TYPE_NAME;
		this.lineTypeName = ChartConst.LINE_CHART_TYPE_NAME;
		this.barTypeName = ChartConst.BAR_CHART_TYPE_NAME;
		this.pieTypeName = ChartConst.PIE_CHART_TYPE_NAME;
		this.scatterPlotTypeName = ChartConst.SCATTER_PLOT_CHART_TYPE_NAME;
		this.histogramTypeName = ChartConst.HISTOGRAM_CHART_TYPE_NAME;
		this.stackBarTypeName = ChartConst.STACK_BAR_CHART_TYPE_NAME;
		this.geoMapTypeName = ChartConst.GEO_MAP_CHART_TYPE_NAME;
		this.geoOrthographicTypeName = ChartConst.GEO_ORTHOGRAPHIC_CHART_TYPE_NAME;
		this.treeMapTypeName = ChartConst.TREE_MAP_CHART_TYPE_NAME;
		this.packLayoutTypeName = ChartConst.PACK_LAYOUT_CHART_TYPE_NAME;
		this.choroplethTypeName = ChartConst.CHOROPLETH_CHART_TYPE_NAME;
		this.treeTypeName = ChartConst.TREE_CHART_TYPE_NAME;
		this.forceTypeName = ChartConst.FORCE_CHART_TYPE_NAME;
		this.initilizeData();
     
	}

  ngOnInit() {
    // Bar chart
    this.barChart();
    // Line Chart
    this.lineChart();
    // Doughnut Chart
    this.doughnutChart();
    // Mixed Chart
    this.mixedChart();
    // Bubble Chart
    this.bubbleChart();
    // Radar Chart
    this.radarChart();
    // example
    this.setExample();
    // randomize chart data
    this.randomizeData();
  }

  private radarChart() {
    const radar = new Chart(document.getElementById('radar-chart'), {
      type: 'radar',
      data: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: '1950',
            fill: true,
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            data: [8.77, 55.61, 21.69, 6.62, 6.82]
          }, {
            label: '2050',
            fill: true,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            data: [25.48, 54.16, 7.61, 8.06, 4.45]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Distribution in % of world population'
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  private bubbleChart() {
    const bubble = new Chart(document.getElementById('bubble-chart'), {
      type: 'bubble',
      data: {
        labels: 'Africa',
        datasets: [
          {
            label: ['China'],
            backgroundColor: 'rgba(255,221,50,0.2)',
            borderColor: 'rgba(255,221,50,1)',
            data: [{
              x: 21269017,
              y: 5.245,
              r: 15
            }]
          }, {
            label: ['Denmark'],
            backgroundColor: 'rgba(60,186,159,0.2)',
            borderColor: 'rgba(60,186,159,1)',
            data: [{
              x: 258702,
              y: 7.526,
              r: 10
            }]
          }, {
            label: ['Germany'],
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderColor: '#000',
            data: [{
              x: 3979083,
              y: 6.994,
              r: 15
            }]
          }, {
            label: ['Japan'],
            backgroundColor: 'rgba(193,46,12,0.2)',
            borderColor: 'rgba(193,46,12,1)',
            data: [{
              x: 4931877,
              y: 5.921,
              r: 15
            }]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Happiness'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'GDP (PPP)'
            }
          }]
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  private mixedChart() {
    const mixed = new Chart(document.getElementById('mixed-chart'), {
      type: 'bar',
      data: {
        labels: ['1900', '1950', '1999', '2050'],
        datasets: [{
          label: 'Europe',
          type: 'line',
          borderColor: '#8e5ea2',
          data: [408, 547, 675, 734],
          fill: false
        }, {
          label: 'Africa',
          type: 'line',
          borderColor: '#3e95cd',
          data: [133, 221, 783, 2478],
          fill: false
        }, {
          label: 'Europe',
          type: 'bar',
          backgroundColor: 'rgba(0,0,0,0.2)',
          data: [408, 547, 675, 734],
        }, {
          label: 'Africa',
          type: 'bar',
          backgroundColor: 'rgba(0,0,0,0.2)',
          backgroundColorHover: '#3e95cd',
          data: [133, 221, 783, 2478]
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Population growth (millions): Europe & Africa'
        },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  private doughnutChart() {
    const doughnut = new Chart(document.getElementById('doughnut-chart'), {
      type: 'doughnut',
      data: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
            data: [2478, 5267, 734, 784, 433]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  private lineChart() {
    const line = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: 'Africa',
          borderColor: '#3e95cd',
          fill: false
        }, {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: 'Asia',
          borderColor: '#8e5ea2',
          fill: false
        }, {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
          label: 'Europe',
          borderColor: '#3cba9f',
          fill: false
        }, {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
          label: 'Latin America',
          borderColor: '#e8c3b9',
          fill: false
        }, {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
          label: 'North America',
          borderColor: '#c45850',
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  private barChart() {
    const bar = new Chart(document.getElementById('bar-chart'), {
      type: 'bar',
      data: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#3ebb8c', '#9092a5', '#f36b56', '#39a8d0', '#fed33d'],
            data: [2478, 5267, 734, 784, 433]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  private setExample() {
    // Define data set for all charts
    this.exampleDataSet1 = [1, 10, 5, 2, 20, 30, 45];
    this.exampleDataSet2 = [20, 30, 15, 12, 21, 30, 40];
    this.exampleData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'DataSet1!',
          fill: false,
          backgroundColor: 'rgba(144,146,165, 0.8)',
          borderColor: 'rgb(144,146,165)',
          data: this.exampleDataSet1,
        },
        {
          label: 'DataSet2!',
          fill: true,
          backgroundColor: 'rgb(62,187,140, 0.8)',
          borderColor: 'rgb(62,187,140)',
          data: this.exampleDataSet2,
        }]
    };
    // Default chart defined with type: 'line'
    this.exampleChartCanvas = document.getElementById('exampleChart');
    this.exampleChart = new Chart(this.exampleChartCanvas, {
      type: this.exampleChartType,
      data: this.exampleData,
      options: {
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
  // Function runs on chart type select update
  updateChartType() {
    // Since you can't update chart type directly in Charts JS you must destroy original chart and rebuild
    this.exampleChart.destroy();
    this.exampleChart = new Chart(this.exampleChartCanvas, {
      type: this.exampleChartType,
      data: this.exampleData,
      options: {
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
  // Randomize data button function
  randomizeData() {
    const newDataBaby = this.exampleDataSet1.map(x => Math.floor(Math.random() * 50));
    const newdataSet2Baby = this.exampleDataSet2.map(x => Math.floor(Math.random() * 40));
    this.exampleData.datasets[0].data = newDataBaby;
    this.exampleData.datasets[1].data = newdataSet2Baby;
    this.exampleChart.update();
  }

}
