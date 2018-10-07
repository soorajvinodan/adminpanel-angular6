```html
import { Ng6O2ChartModule } from 'ng6-o2-chart';
import * as  ChartConst from 'ng6-o2-chart';

export class AppComponent {
  title = 'D3 Chart';
  chartType:string;
  configData:any;
  barDataJson:any;

  geoMapDataJson:any;
  geoOrthographicDataJson:any;
  choroplethDataJson:any;
  scatterPlotDataJson:any;
  lineDataJson:any;
  histogramDataJson:any;
  pieDataJson:any;
  packLayoutDataJson:any;
  treeMapDataJson:any;
  stackBarDataJson:any;
  treeDataJson:any;
  forceDataJson:any;
  DataSetJson:string;

  lineTypeName:string;
  barTypeName: string;
  pieTypeName:string;
  scatterPlotTypeName:string;
  histogramTypeName:string;
  stackBarTypeName:string;
  geoMapTypeName:string;
  geoOrthographicTypeName:string;
  treeMapTypeName:string;
  packLayoutTypeName:string;
  choroplethTypeName:string;
  treeTypeName:string;
  forceTypeName:string;

  constructor() {
    this.barTypeName     	= ChartConst.BAR_CHART_TYPE_NAME;
    this.initilizeData();
  }

  private initilizeData() {
    // ConfigData = this.httpClient.get('assets/json/ConfigData.json');
   this.barDataJson =
    {
      ....// Json Here
    };
  }
}
```



