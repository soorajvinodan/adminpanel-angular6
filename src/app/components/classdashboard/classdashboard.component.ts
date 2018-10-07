import {
	Ng6O2ChartModule
}
from 'ng6-o2-chart';
import {
	Component, OnInit, Input
}
from '@angular/core';
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
from '../../getClassInfo.service';
import {
	UserInfoService
}
from './../../user-info.service';
import * as ChartConst from 'ng6-o2-chart';
import {
	environment
}
from '../../../environments/environment';
import {
	Message
}
from '@angular/compiler/src/i18n/i18n_ast';@
Component({
	selector: 'app-classdashboard',
	templateUrl: './classdashboard.component.html'
})
export class classdashboardComponent implements OnInit{


  message = "hello"; 


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
	//Variables for d3js charts
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
		this.geoMapDataJson = {
			'map': {
				'baseGeoDataUrl': 'https://raw.githubusercontent.com/Ohtsu/data/master/o2-chart/world.geojson',
				'scale': 75,
				'keyDataName': 'features',
				'targetPropertyName': 'properties.name',
			},
			'data': [{
				'name': 'Australia',
				'color': 'red'
			}, {
				'name': 'Antarctica',
				'color': 'white'
			}, {
				'name': 'Japan',
				'color': 'blue'
			}, ],
		};
		this.stackBarDataJson = {
			'config': {
				'timeFormat': '%Y',
			},
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
					'y': 5
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
		this.scatterPlotDataJson = {
			'series': ['seriesA', 'seriesB', 'seriesC'],
			'data': [{
				'name': 'suzuki',
				'value': [{
					'x': 30,
					'y': 40,
					'r': 5
				}, {
					'x': 120,
					'y': 115,
					'r': 10
				}, {
					'x': 125,
					'y': 90,
					'r': 2
				}, {
					'x': 150,
					'y': 160,
					'r': 1
				}, {
					'x': 150,
					'y': 160,
					'r': 3
				}, {
					'x': 128,
					'y': 215,
					'r': 5
				}, {
					'x': 130,
					'y': 40,
					'r': 15
				}, {
					'x': 220,
					'y': 115,
					'r': 25
				}, ]
			}, {
				'name': 'inoue',
				'value': [{
					'x': 130,
					'y': 140,
					'r': 5
				}, {
					'x': 20,
					'y': 15,
					'r': 10
				}, {
					'x': 25,
					'y': 190,
					'r': 2
				}, {
					'x': 250,
					'y': 60,
					'r': 1
				}, {
					'x': 50,
					'y': 60,
					'r': 3
				}, {
					'x': 28,
					'y': 15,
					'r': 5
				}, {
					'x': 230,
					'y': 140,
					'r': 15
				}, {
					'x': 20,
					'y': 215,
					'r': 25
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
		this.forceDataJson = {
			'groups': [{
				'id': 1,
				'name': 'Hokkaido'
			}, {
				'id': 2,
				'name': 'Tohoku'
			}, {
				'id': 3,
				'name': 'Kanto'
			}, {
				'id': 4,
				'name': 'Chubu'
			}, {
				'id': 5,
				'name': 'kinki'
			}, {
				'id': 6,
				'name': 'Chugoku'
			}, {
				'id': 7,
				'name': 'Shikoku'
			}, {
				'id': 8,
				'name': 'Kyushu'
			}, ],
			'nodes': [{
				'id': 'Sapporo',
				'group': 1
			}, {
				'id': 'Sendai',
				'group': 2
			}, {
				'id': 'Morioka',
				'group': 2
			}, {
				'id': 'Akita',
				'group': 2
			}, {
				'id': 'Fukushima',
				'group': 2
			}, {
				'id': 'Mito',
				'group': 3
			}, {
				'id': 'Utsunomiya',
				'group': 3
			}, {
				'id': 'Saitama',
				'group': 3
			}, {
				'id': 'Chiba',
				'group': 3
			}, {
				'id': 'Tokyo',
				'group': 3
			}, {
				'id': 'Kofu',
				'group': 4
			}, {
				'id': 'Nagano',
				'group': 4
			}, {
				'id': 'Niigata',
				'group': 4
			}, {
				'id': 'Toyama',
				'group': 4
			}, {
				'id': 'Kanazawa',
				'group': 4
			}, {
				'id': 'Fukui',
				'group': 4
			}, {
				'id': 'Shizuoka',
				'group': 4
			}, {
				'id': 'Nagoya',
				'group': 4
			}, {
				'id': 'Gifu',
				'group': 4
			}, {
				'id': 'Otsu',
				'group': 5
			}, {
				'id': 'Kyoto',
				'group': 5
			}, {
				'id': 'Osaka',
				'group': 5
			}, {
				'id': 'Kobe',
				'group': 5
			}, {
				'id': 'Nara',
				'group': 5
			}, {
				'id': 'Kyoto',
				'group': 5
			}, {
				'id': 'Tottori',
				'group': 6
			}, {
				'id': 'Hiroshima',
				'group': 6
			}, {
				'id': 'Matsue',
				'group': 6
			}, {
				'id': 'Matsuyama',
				'group': 7
			}, {
				'id': 'Tokushima',
				'group': 7
			}, {
				'id': 'Kochi',
				'group': 7
			}, {
				'id': 'Fukuoka',
				'group': 8
			}, {
				'id': 'Nagasaki',
				'group': 8
			}, {
				'id': 'Kumamoto',
				'group': 8
			}, {
				'id': 'Naha',
				'group': 8
			}, ],
			'links': [{
				'source': 'Sendai',
				'target': 'Sapporo',
				'value': 1
			}, {
				'source': 'Morioka',
				'target': 'Sapporo',
				'value': 1
			}, {
				'source': 'Akita',
				'target': 'Sapporo',
				'value': 1
			}, {
				'source': 'Fukushima',
				'target': 'Sapporo',
				'value': 1
			}, {
				'source': 'Morioka',
				'target': 'Sendai',
				'value': 10
			}, {
				'source': 'Akita',
				'target': 'Sendai',
				'value': 10
			}, {
				'source': 'Fukushima',
				'target': 'Sendai',
				'value': 10
			}, {
				'source': 'Chiba',
				'target': 'Tokyo',
				'value': 20
			}, {
				'source': 'Utsunomiya',
				'target': 'Tokyo',
				'value': 20
			}, {
				'source': 'Mito',
				'target': 'Tokyo',
				'value': 20
			}, {
				'source': 'Saitama',
				'target': 'Tokyo',
				'value': 30
			}, {
				'source': 'Kofu',
				'target': 'Tokyo',
				'value': 30
			}, {
				'source': 'Nagano',
				'target': 'Tokyo',
				'value': 30
			}, {
				'source': 'Naha',
				'target': 'Tokyo',
				'value': 30
			}, {
				'source': 'Osaka',
				'target': 'Tokyo',
				'value': 40
			}, {
				'source': 'Sendai',
				'target': 'Tokyo',
				'value': 40
			}, {
				'source': 'Hiroshima',
				'target': 'Tokyo',
				'value': 20
			}, {
				'source': 'Shizuoka',
				'target': 'Nagoya',
				'value': 10
			}, {
				'source': 'Tokyo',
				'target': 'Nagoya',
				'value': 40
			}, {
				'source': 'Osaka',
				'target': 'Nagoya',
				'value': 40
			}, {
				'source': 'Kyoto',
				'target': 'Nagoya',
				'value': 40
			}, {
				'source': 'Kyoto',
				'target': 'Osaka',
				'value': 30
			}, {
				'source': 'Hiroshima',
				'target': 'Osaka',
				'value': 20
			}, {
				'source': 'Toyama',
				'target': 'Kanazawa',
				'value': 10
			}, {
				'source': 'Fukui',
				'target': 'Kanazawa',
				'value': 10
			}, {
				'source': 'Niigata',
				'target': 'Kanazawa',
				'value': 10
			}, {
				'source': 'Tottori',
				'target': 'Kobe',
				'value': 10
			}, {
				'source': 'Tottori',
				'target': 'Hiroshima',
				'value': 10
			}, {
				'source': 'Matsue',
				'target': 'Hiroshima',
				'value': 10
			}, {
				'source': 'Matsuyama',
				'target': 'Hiroshima',
				'value': 10
			}, {
				'source': 'Tokushima',
				'target': 'Kochi',
				'value': 10
			}, {
				'source': 'Matsuyama',
				'target': 'Kochi',
				'value': 10
			}, {
				'source': 'Nagasaki',
				'target': 'Fukuoka',
				'value': 10
			}, {
				'source': 'Kumamoto',
				'target': 'Fukuoka',
				'value': 10
			}, {
				'source': 'Naha',
				'target': 'Fukuoka',
				'value': 10
			}, ]
		};
	}
	showaddSchoolName: boolean = false;
	categoriesArray = ["Pre Primary", "Primary", "Secondary", "Senior Secondary"];
	deviceArray: any[] = [];
	constructor(private GetInfoService: getInfoService, private sanitizer: DomSanitizer, private router: Router, private userInfoService: UserInfoService) {
		for (let i in this.categoriesArray) {
			let obj = {
				name: this.categoriesArray[i],
				devices: [
					// {did:1, dname:"123"}
				]
			}
			this.deviceArray.push(obj);
		}
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
    // this.GetInfoService.checkUserLogin().subscribe(data => this.loginData = data, error => console.log(error), () => {
    // var resultObj = JSON.parse(this.loginData['_body']);
    // if (resultObj['status'] == 'ok') {
    //     //Saving user name and email in user info.
    //     userInfoService.usrName = resultObj['una'];
    //     userInfoService.uEm = resultObj['uEm'];
    //     userInfoService.instituteNm = resultObj['instnm'];
        this.usrName = userInfoService.usrName;
        this.usrEm = userInfoService.uEm;
        this.instituteNm = userInfoService.instituteNm;
        this.usrInitials = "EA";
        let nmSplit = this.usrName.split(' ');
        if (nmSplit.length > 1) {
          let init = nmSplit[0][0];
          if (nmSplit[1][0]) init = nmSplit[0][0] + nmSplit[1][0];
          this.usrInitials = init.toString().toUpperCase();
        } else if (nmSplit.length == 1) {
          let init = nmSplit[0][0];
          if (nmSplit[0][1]) init = nmSplit[0][0] + nmSplit[0][1];
          this.usrInitials = init.toString().toUpperCase();
        }
        this.GetInfoService.getClasses(this.boardName).subscribe(data => this.getData = data, error => console.log(error), () => {
          var resultObj = JSON.parse(this.getData['_body'])['result'][0];
          var classAndUnit = resultObj['classes'];
          this.classAndUnit = classAndUnit;
          this.classes = [];
          let classesLength = 0;
          for (var i in classAndUnit) {
            if (i !== '_id' && i.indexOf(' Science') < 0) {
              classesLength += 1;
            }
          }
          for (let j = 1; j <= classesLength; j++) {
            this.classes.push(this.boardName + ': Class ' + j);
          }
          this.formSubjectsArray(classAndUnit);
        });
    //   } 
    //   else this.router.navigate(['/signup']);
    // })
	}
	ngOnInit() {
		
	}
	formSubjectsArray(classAndUnit) {
		this.subjects = [];
		var selectedClassObj = classAndUnit[this.selectedClassVal];
		//For some classes we have subjects inside Science folder. 
		//To get those subjects and units, have to check wheather we have Science folder for that class.
		if (this.selectedClassVal == 'Class 10' || this.selectedClassVal == 'Class 9' || this.selectedClassVal == 'Class 7') {
			let scienceObj = classAndUnit[this.selectedClassVal + " Science"];
			if (scienceObj) {
				for (let i in scienceObj) {
					selectedClassObj['Science - ' + i] = scienceObj[i];
				}
			}
		}
		for (var m in selectedClassObj) {
			let curObj = selectedClassObj[m];
			let pushObj = {
				"name": m,
				"devicesOpen": false,
				"units": []
			}
			for (var n in curObj) {
				let unitObj = {
						"unitname": n,
						"title": n,
						"searchTerms": []
					},
					curUnit = curObj[n];
				for (let k in curUnit) {
					if (k == 'notebooks') {
						let notebooks = curUnit[k];
						for (let m in notebooks) {
							unitObj['searchTerms'].push(notebooks[m]['name']);
						}
					} else if (typeof curUnit[k] == 'string') {
						unitObj['searchTerms'].push(curUnit[k]);
					} else {
						unitObj['unitname'] = n;
						if (curUnit[k]['name']) {
							unitObj['title'] = n + ": " + curUnit[k]['name'];
						}
					}
				}
				if (curUnit['title']) unitObj['title'] = n + ": " + curUnit['title'];
				pushObj.units.push(unitObj);
			}
			this.subjects.push(pushObj);
		}
	}
	showUnits(e) {
		if (!e.devicesOpen) {
			e.devicesOpen = true;
		} else e.devicesOpen = false;
	}
	showOrHideClasses() {
		if (this.classesOpen) this.classesOpen = false;
		else this.classesOpen = true;
	}
	selectClassToShow(e) {
		this.showOrHideClasses();
		this.selectedClass = e;
		let splited = this.selectedClass.split(this.boardName + ': ');
		if (splited && splited.length > 1) {
			this.selectedClassVal = splited[1];
		} else this.selectedClassVal = this.selectedClass;
		if (this.tabSelected == "All Classes") {
			this.formSubjectsArray(this.classAndUnit);
		} else {
			this.formSubjectsArray(this.noteBookClassAndUnit);
		}
	}
	/**
	 * Get results from ktd db for the selected unit form the sidebar.
	 * @param unit
	 * @param selectedSub
	 */
	getUnitContents(unit, selectedSub) {
		if (document.getElementById('sidebar').style.left == "0px") {
			document.getElementById('sidebar').style.left = "-250px";
		}
		this.showMyNoteBooksContainer = false;
		this.showContainer = false;
		this.currentSubject = selectedSub;
		this.unitTitle = unit.title;
		this.unit = unit;
		let title = this.unitTitle.split(':')[1].trim();
		let subjectToSend = this.currentSubject;
		if (this.currentSubject.indexOf('Science - ') == 0) {
			let splitedSub = this.currentSubject.split(' - ');
			if (splitedSub.length) {
				subjectToSend = splitedSub[0] + '/' + splitedSub[1];
			}
		}
		let searchTerm = "CBSE/" + this.selectedClassVal + "/" + subjectToSend + "/" + this.unit['unitname'] + "/" + title + ".txt";
		let getNoteBook = false;
		this.showMyNoteBooksContainer = false;
		if (this.tabSelected !== this.classTabText) {
			getNoteBook = true;
		}
		this.showContainer = true;
		// this.GetInfoService.getDetailsForUnit(unit.searchTerms,searchTerm, getNoteBook).subscribe(data => this.postData = data, error => console.log(error), () => {
		// 	this.showContainer = true;
		// 	let unitResults = JSON.parse(this.postData['_body'])['result'];
		// 	this.currentUnit = unitResults;
		// 	this.searchTermResults = [];
		// 	for (let i in unitResults) {
		// 		let curUnit = unitResults[i];
		// 		if (curUnit['images'] && curUnit['images'].length) {
		// 			this.searchTermResults.push({
		// 				"index": i,
		// 				"title": curUnit.title
		// 			})
		// 		} 
		// 		else if (curUnit['images'] && curUnit['images']['value'] && curUnit['images']['value'].length) {
		// 			if (curUnit.title.indexOf('CBSE ') == 0) {
		// 				curUnit.title = curUnit.title.split("CBSE ")[1];
		// 			}
		// 			this.searchTermResults.push({
		// 				"index": i,
		// 				"title": curUnit.title
		// 			});
		// 		}
		// 		else {
		// 			this.searchTermResults.push({ "index" : i, "title" : curUnit.title, 'imgUrl' : '../assets/img/notebook_white_icon.svg', "noImage" : true});
		// 		}
		// 	}
		// });
	}
	replaceWthRegex(str, matchString, replaceString) {
		return str.replace(matchString, replaceString);
	}
	scrollbar() {
		/**
		 * Add scrollbar for image and video tab body.
		 */
		setTimeout(() => {
			const ps3 = new PerfectScrollbar('#image_container', {
				wheelSpeed: 2,
				wheelPropagation: true,
				minScrollbarLength: 20
			});
			const ps4 = new PerfectScrollbar('#video_container', {
				wheelSpeed: 2,
				wheelPropagation: true,
				minScrollbarLength: 20
			});
			const ps5 = new PerfectScrollbar('#text_container', {
				wheelSpeed: 2,
				wheelPropagation: true,
				minScrollbarLength: 20
			});
		}, 1000);
	}
	/**
	 * Hide modal on clicking on close icon
	 */
	hideModal() {
		if (this.dataToEnableBtns && this.dataToEnableBtns.length > 0) {
			this.showNmPopup = true;
			this.selectedContentErr = "Please Reset or Save notebook before closing!";
		} else {
			this.showModal = false;
			this.resetContent();
		}
	}
	showSidebarOpt() {
		document.getElementById('sidebar').style.left = "0";
	}
	// Setting content type
	setcontent_type(type) {
		this.content_type = type;
	}
	// Function called when Reset Button is clicked
	resetContent() {
		let imgContent, vidContent;
		this.dataToEnableBtns = [];
		this.selected_text_array = [];
		this.modalTextWiki = "Resetting...";
		setTimeout(() => {
			this.modalTextWiki = this.selectedTermResult.webText;
		}, 0)
		if (this.selectedTermResult && this.selectedTermResult.images) {
			imgContent = this.selectedTermResult.images.value;
		}
		if (this.selectedTermResult && this.selectedTermResult.videos) {
			vidContent = this.selectedTermResult.videos.value;
		}
		for (let i = 0; i < 50; i++) {
			if (imgContent && imgContent[i] && imgContent[i]['isSelected'] == true) {
				imgContent[i]['isSelected'] = false;
			}
			if (vidContent && vidContent[i] && vidContent[i]['isSelected'] == true) {
				vidContent[i]['isSelected'] = false;
			}
		}
	}
	/**
	 * Function to show child popup.
	 */
	showNamePopup() {
		this.validationError = "";
		this.selectedContentErr = "";
		let imgVal = this.selectedTermResult.images.value;
		this.selectedImages = [];
		for (let i = 0; i < 50; i++) {
			if (imgVal[i] && imgVal[i]['isSelected'] == true) {
				this.selectedImages.push(imgVal[i]);
			}
		}
		let videoVal = this.selectedTermResult.videos.value;
		this.selectedVideos = [];
		for (let i = 0; i < 50; i++) {
			if (videoVal && videoVal[i] && videoVal[i]['isSelected'] == true) {
				this.selectedVideos.push(videoVal[i]);
			}
		}
		if (this.dataToEnableBtns && this.dataToEnableBtns.length > 0) {
			this.showNmPopup = true;
		} else {
			this.showNmPopup = true;
			this.selectedContentErr = "Please select some content to proceed!";
		}
	}
	//Close child popup
	closeChildPopup() {
		this.validationError = "";
		this.showNmPopup = false;
		this.notebookCreated = false;
	}
	// Show Next Content in My NoteBooks. 
	nextContentIndex() {
		if (this.contentIndex < this.maxLen - 1) {
			this.contentIndex++;
		}
	}
	// Show Previous Content in My NoteBooks.
	prevContentIndex() {
		if (this.contentIndex > 0) {
			this.contentIndex--;
		}
	}
	/**
	 * Selecting the content
	 */
	selectContent(event, obj) {
		if (obj['isSelected'] == true) {
			obj['isSelected'] = false;
			const index: number = this.dataToEnableBtns.indexOf(obj);
			if (index > -1) {
				this.dataToEnableBtns.splice(index, 1);
			}
		} else {
			obj['isSelected'] = true;
			this.dataToEnableBtns.push(obj);
		}
	}
	showInPopup(imageUrl) {
		this.currentImg = imageUrl;
		this.showImage = true;
	}
	closeImageModal() {
		this.showImage = false;
		this.currentImg = "";
	}
	selectPopup(e) {
		var selected = this.getSelectionText(); //selected Text
		if ((window.getSelection().baseNode.parentNode as HTMLElement).tagName === 'SPAN') {
			if (selected.length > 0) {
				this.showActionTooltipFunc(e);
			}
		} else if (selected.length > 0) {
			this.showToolTipFunc(e);
		}
	}
	// Show Copy Popup
	createTooltip() {
		this.showTooltip = true;
	}
	createCopyTooltip() {
		this.showTooltipResult = true;
	}
	createActionTooltip() {
		this.showActionTooltip = true;
	}
	createActionTooltipResult() {
		this.showActionTooltipResult = true;
	}
	showToolTipFunc(e) {
		this.showTooltip = true;
		var evt = e || event;
		clearTimeout(this.hidetooltiptimer);
		let el = document.getElementById("div_showTooltip");
		el.style.left = evt.pageX - 10 + 'px';
		el.style.top = evt.pageY + 15 + 'px';
		el.style.opacity = "1";
		this.hidetooltiptimer = setTimeout(() => {
			el.style.opacity = "0";
		}, 2000);
	}
	showCopiedTooltip(e) {
		var evt = e || event;
		this.showTooltipResult = true;
		clearTimeout(this.hidecopytooltiptimer);
		let el = document.getElementById("div_showTooltipResult");
		el.style.left = evt.pageX - 20 + 'px';
		el.style.top = evt.pageY + 15 + 'px';
		el.style.opacity = "1";
		this.hidecopytooltiptimer = setTimeout(() => {
			el.style.opacity = "0";
			this.showTooltip = true;
		}, 2000);
	}
	change_color(e) {
		let sel = window.getSelection();
		let range;
		if (sel.rangeCount && sel.getRangeAt) {
			range = sel.getRangeAt(0);
		}
		// Set design mode to on
		document.designMode = "on";
		if (range) {
			sel.removeAllRanges();
			sel.addRange(range);
		}
		// Colorize text
		document.execCommand("HiliteColor", false, "yellow");
		// Set design mode to off
		document.designMode = "off";
		var selected = this.getSelectionText(); //selected Text
		if (selected.length > 0) {
			this.copysuccess = this.copySelectionText();
			this.selected_text_array.push(selected);
			this.dataToEnableBtns.push(selected);
			//show copiedText
			console.log(this.copysuccess);
			//Show array
			console.log(this.selected_text_array);
			// showCopiedTooltip(e);
			this.showCopiedTooltip(e);
		}
	}
	showClasses() {
		//hide all my class
		this.tabSelected = this.classTabText;
		this.resetView();
		let classesLength = 0;
		let hobbiesFound = false;
		for (var i in this.classAndUnit) {
			if (i == 'Hobbies' && this.classes.indexOf('Hobbies') < 0) {
				hobbiesFound = true;
			} else if (i !== '_id' && i.indexOf(' Science') < 0) {
				classesLength += 1;
			}
		}
		for (let j = 1; j <= classesLength; j++) {
			this.classes.push(this.boardName + ': Class ' + j);
		}
		if (hobbiesFound) this.classes.push("Hobbies");
		this.selectedClass = this.boardName + ': Class 1';
		let splited = this.selectedClass.split(this.boardName + ': ');
		if (splited && splited.length > 1) {
			this.selectedClassVal = splited[1];
		} else this.selectedClassVal = this.selectedClass;
		this.formSubjectsArray(this.classAndUnit);
	}
	resetView() {
		this.showContainer = false;
		this.subjects = [];
		this.classes = [];
		this.searchTermResults = [];
		this.classesOpen = false;
		this.showSchoolDevices = false;
		this.showMyNoteBooksContainer = false;
		this.showContainer = false;
	}
	contentToSave() {
		return (this.dataToEnableBtns && this.dataToEnableBtns.length > 0);
	}
	getSelectionText() {
		var selectedText = "";
		if (window.getSelection) { // all modern browsers and IE9+
			selectedText = window.getSelection().toString();
		}
		return selectedText;
	}
	copySelectionText() {
		var copysuccess; // var to check whether execCommand successfully executed
		try {
			copysuccess = document.execCommand("copy"); // run command to copy selected text to clipboard
		} catch (e) {
			copysuccess = false;
		}
		return copysuccess;
	}
	delete_selected(e) {
		var selected = this.getSelectionText();
		if (selected.length > 0) {
			let span = window.getSelection().baseNode.parentNode;
			var text = span.textContent || (span as HTMLElement).innerText;
			var found = this.selected_text_array.indexOf(text);
			for (var i = this.selected_text_array.length; i--;) {
				if (this.selected_text_array[i] == text && (window.getSelection().baseNode.parentNode as HTMLElement).tagName === 'SPAN') {
					this.selected_text_array.splice(i, 1);
				}
			}
			var node = document.createTextNode(text);
			span.parentNode.replaceChild(node, span);
			this.showActionTooltipResultFunc(e);
		}
	}
	showActionTooltipFunc(e) {
		var evt = e || event;
		this.showActionTooltip = true;
		clearTimeout(this.hideactiontooltiptimer);
		let el = document.getElementById("div_showActionTooltip");
		el.style.left = evt.pageX - 20 + 'px';
		el.style.top = evt.pageY + 15 + 'px';
		el.style.opacity = "1";
		this.hideactiontooltiptimer = setTimeout(() => {
			el.style.opacity = "0";
			this.showTooltip = true;
		}, 2000);
	}
	showActionTooltipResultFunc(e) {
		var evt = e || event;
		this.showActionTooltipResult = true;
		clearTimeout(this.hidecopytooltiptimer);
		let el = document.getElementById("div_showActionTooltipResult");
		el.style.left = evt.pageX - 20 + 'px';
		el.style.top = evt.pageY + 15 + 'px';
		el.style.opacity = "1";
		this.hidecopytooltiptimer = setTimeout(() => {
			el.style.opacity = "0";
			this.showTooltip = true;
		}, 2000);
	}
	schoolnameValidationError: string;
	schoolname_message: string;
	error_box(input_id) {
		document.getElementById(input_id).focus();
	}
	no_error_box(input_id) {
		document.getElementById(input_id).style.border = "1px solid #ced4da";
	}
	login_validate_Form(schoolname) {
		if (schoolname == "") {
			this.schoolnameValidationError = "Please Enter the School Name";
			this.error_box("schoolname");
			return false;
		} else {
			this.schoolnameValidationError = "";
			this.no_error_box("schoolname");
		}
		return true;
	}

  
  
  showSchoolDevices: boolean = false;
  

	addschoolName() {
		var schoolname = (document.getElementById('schoolname') as HTMLInputElement).value;
		if (schoolname) schoolname.trim();
		for (var i = 0; i < this.deviceArray.length; i++) {
			if (this.deviceArray[i].schoolname === schoolname) {
				this.schoolnameValidationError = "School Name Already Exists";
				this.error_box("schoolname");
				return false;
			}
		}
		if (this.login_validate_Form(schoolname)) {
			this.deviceArray.push({
				"schoolname": schoolname,
				"devices": []
			});
			this.showmessage(schoolname);
			(document.getElementById('schoolname') as HTMLInputElement).value = '';
			this.showaddSchoolName = true;
		}
	}
	showmessage(schoolname) {
		this.schoolname_message = schoolname + " is added to your list";
		clearTimeout(this.hidecopytooltiptimer);
		this.hidecopytooltiptimer = setTimeout(() => {
			this.schoolname_message = "";
		}, 1500);
	}
	deleteschoolmessage(schoolname) {
		this.schoolname_message = schoolname + " is deleted from your list";
		clearTimeout(this.hidecopytooltiptimer);
		this.hidecopytooltiptimer = setTimeout(() => {
			this.schoolname_message = "";
		}, 1500);
	}
	deleteschoolName(e) {
		// console.log(e,this.deviceArray);
		var index = this.deviceArray.indexOf(e);
		if (index > -1) {
			this.deleteschoolmessage(e.schoolname);
			this.deviceArray.splice(index, 1);
		}
		// console.log(this.deviceArray);
	}
	SchoolName: string;
	adddevices(e) {
		this.showSchoolDevices = true;
		this.showMyNoteBooksContainer = true;
		this.showContainer = false;
		this.SchoolName = e.schoolname;
		for (var i = 0; i < this.deviceArray.length; i++) {
			if (this.deviceArray[i].schoolname === this.SchoolName) {
				this.showdevices = this.deviceArray[i].devices;
			}
		}
	}
	showMultiDevices: boolean = false;
  showdevices: any[] = [];
  



 // Basic Validation before Adding Devices
  deviceidValidationError: string;
  devicenameValidationError: string;
  categorytypeValidationError: string;
	validate_Device(id, name,categorytype) {
		if (id == "") {
			this.deviceidValidationError = "Please Enter the Device ID";
			this.error_box("deviceid");
			return false;
		} else if (isNaN(id)) {
			this.deviceidValidationError = "Device ID must be Number";
			this.error_box("deviceid");
			return false;
		} else {
			this.deviceidValidationError = "";
			this.no_error_box("deviceid");
    }
  
		if (name == "") {
			this.devicenameValidationError = "Please Enter the Device Name";
			this.error_box("devicename");
			return false;
		} else {
			this.devicenameValidationError = "";
			this.no_error_box("devicename");
		}

    if (categorytype == "") {
			this.categorytypeValidationError = "Please Enter the Device Name";
			this.error_box("categorytype");
			return false;
		} else {
			this.categorytypeValidationError = "";
			this.no_error_box("categorytype");
    }

    return true;
  }
  
	// Adding Devices to School List
	addDevice(id, name,categorytype) {

		//forming array for new devices
		if (this.validate_Device(id, name,categorytype)) {
			let deviceproperty = {
				"did": id,
        "dname": name
			}
			this.showMultiDevices = true;
			for (var i = 0; i < this.deviceArray.length; i++) {
				if (this.deviceArray[i].schoolname === this.SchoolName) {
					this.deviceArray[i].devices.push(deviceproperty);
					// console.log(this.deviceArray);
					this.showdevices = this.deviceArray[i].devices;
				}
			}
		}
	}
	//Remove Devices from School List
	removeDevice(device) {
		for (var i = 0; i < this.deviceArray.length; i++) {
			if (this.deviceArray[i].schoolname === this.SchoolName) {
				let index = this.deviceArray[i].devices.indexOf(device);
				this.deviceArray[i].devices.splice(index, 1);
			}
		}
	}
	//Show Stats
	deviceName: string;
	showstats(device) {
		this.deviceName = device.name;
		this.showModal = true;
	}
}