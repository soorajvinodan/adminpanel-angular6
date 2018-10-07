## Follow these steps to install chart library (d3.js) in Angular6 

### 1. Install through npm 
```html
 npm i --save d3@4.3.0 
 npm i --save ng6-o2-chart
```

### 2. Add css in src/scss.
Add chart css into your css file. <a href="style.css">Chart Style</a>

### 3. Integrate Node Modules.
Add in <b>app.module.ts</b>

```html
import { Ng6O2ChartModule } from 'ng6-o2-chart';
```
Add 'Ng6O2ChartModule' in imports

Add in <b>app.component.ts</b>

```html
import { Ng6O2ChartModule } from 'ng6-o2-chart';
import * as  ChartConst from 'ng6-o2-chart';
```

### 3. Set Variable and Initialise in ts.file.

Add variables and initialise the chart. Check the structure <a href="code_structure.md"> here</a>

### 4. HTML Code.

Add in <b>app.component.html File</b>

```html
<lib-Ng6O2Chart [chartType]="barTypeName" [configData]="configData"  [graphData]="barDataJson" [svgWidth]="'600'" [svgHeight]="'400'"></lib-Ng6O2Chart>
```