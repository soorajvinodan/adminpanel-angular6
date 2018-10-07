import { Component ,Input} from '@angular/core';
import { CommonService } from '../../shared/services/common.service';


import { classdashboardComponent} from '../../components/classdashboard/classdashboard.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {



  @Input() message: string;


  categoriesArray = ["Pre Primary", "Primary", "Secondary", "Senior Secondary"];
  deviceArray: any[] = [];
  



  constructor(public cmnSrv: CommonService) {

    for (let i in this.categoriesArray) {
			let obj = {
				name: this.categoriesArray[i],
				devices: [
					// {did:1, dname:"123"}
				]
			}
			this.deviceArray.push(obj);
    }
    

  }

 
  sidebarItems = [
    {link: '/', label: 'Dashboard', icon: 'dashboard'},

    {label: 'ClassRooms', icon: 'class', subItem: [   
      { label: 'Pre-Primary', icon: 'l1' , subItem: [
        {link: '/components/class', label: 'Class 1', icon: 'l2'},
        {link: '', label: 'Class 2', icon: 'l2'},
      ]},
      { label: 'Primary', icon: 'l1' , subItem: [
        {link: 'void()', label: 'Sub Menu L2', icon: 'l2'},
        {link: 'void()', label: 'Sub Menu L2', icon: 'l2'},
      ]},
      { label: 'Secondary', icon: 'l1' , subItem: [
        {link: 'void()', label: 'Sub Menu L2', icon: 'l2'},
        {link: 'void()', label: 'Sub Menu L2', icon: 'l2'},
      ]},
      { label: 'Senior-Secondary', icon: 'l1' , subItem: [
        {link: 'void()', label: 'Sub Menu L2', icon: 'l2'},
        {link: 'void()', label: 'Sub Menu L2', icon: 'l2'},
      ]}

    ]},

    {link: '/calendar', label: 'Calendar', icon: 'date_range'},
    {link: '/settings', label: 'Settings', icon: 'settings'},

    {label: 'Components', icon: 'apps', subItem: [
      {link: '/components/buttons', label: 'buttons', icon: 'b'},
      {link: '/components/grids', label: 'grid System', icon: 'gs'},
      {link: '/components/panels', label: 'panels', icon: 'p'},
      // {link:'/components/alerts',label:'alerts',icon:'a'},
      {link:'/components/notifications',label:'notifications',icon:'n'},
      {link: '/components/icons', label: 'icons', icon: 'i'},
      {link: '/components/typography', label: 'typography', icon: 't'},
    ]},
    {label: 'Forms', icon: 'ballot', subItem: [
      {link: '/forms/basic', label: 'basic form', icon: 'bf'},
      {link: '/forms/advance', label: 'advanced form', icon: 'af'},
      {link: '/forms/custom', label: 'custom form', icon: 'cf'},
      // {link:'/forms/validations',label:'Form Validation',icon:'fv'}
    ]},
    {label: 'Pages', icon: 'pages', subItem: [
      {link: '/pages/notfound', label: 'Not Found', icon: 'nf'},
      {link: '/pages/auth', label: 'Auth', icon: 'A'}
    ]},
    { label: 'Tables', icon: 'grid_on', subItem: [
      {link: '/tables/basic', label: 'Basic Table', icon: 'BT'},
      {link: '/tables/smart', label: 'smart table', icon: 'ST'}
    ]},
    {link: '/charts', label: 'Charts', icon: 'show_chart'},
    {link: '/maps', label: 'Maps', icon: 'place'},
    {link: '/editors', label: 'Editors', icon: 'edit'},
  

  ];

}
