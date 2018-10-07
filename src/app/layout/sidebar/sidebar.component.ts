import { Component} from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { myService } from '../../data.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  categoriesArray = ["Pre Primary", "Primary", "Secondary", "Senior Secondary"];
  deviceArray: any[] = [];
  
  constructor(private _myService: myService, public cmnSrv: CommonService) {

  
  
    console.log(this._myService.getData());

    this.categoriesArray = this._myService.getdevices();

    this.deviceArray = this._myService.getData();

    for(var i = 0; i < this.deviceArray.length; i++) {
      var obj = this.deviceArray[i];
  
      console.log(obj.id);
      }




  }





 
  sidebarItems = [
    {link: '/', label: 'Dashboard', icon: 'dashboard'},

    {label: 'ClassRooms', icon: 'class', subItem: [   


      { label: 'Pre-Primary', icon: '' , subItem: [
        {link: '/components/class', label: 'Class 1', icon: 'l2'}
      
      ]},
      { label: 'Primary', icon: '' , subItem: [
        {link: 'void()', label: 'Sub Menu', icon: 'l2'}
      
      ]},
      { label: 'Secondary', icon: '' , subItem: [
        {link: 'void()', label: 'Sub Menu', icon: 'l2'}
      ]},
      { label: 'Senior-Secondary', icon: '' , subItem: [
        {link: 'void()', label: 'Sub Menu', icon: 'l2'}
       
      ]}

    ]},

    {link: '/calendar', label: 'Calendar', icon: 'date_range'},
    {link: '/settings', label: 'Settings', icon: 'settings'},

    // {label: 'Components', icon: 'apps', subItem: [
    //   {link: '/components/buttons', label: 'buttons', icon: 'b'},
    //   {link: '/components/grids', label: 'grid System', icon: 'gs'},
    //   {link: '/components/panels', label: 'panels', icon: 'p'},
    //   // {link:'/components/alerts',label:'alerts',icon:'a'},
    //   {link:'/components/notifications',label:'notifications',icon:'n'},
    //   {link: '/components/icons', label: 'icons', icon: 'i'},
    //   {link: '/components/typography', label: 'typography', icon: 't'},
    // ]},
    // {label: 'Forms', icon: 'ballot', subItem: [
    //   {link: '/forms/basic', label: 'basic form', icon: 'bf'},
    //   {link: '/forms/advance', label: 'advanced form', icon: 'af'},
    //   {link: '/forms/custom', label: 'custom form', icon: 'cf'}
    // ]},
    // {label: 'Pages', icon: 'pages', subItem: [
    //   {link: '/pages/notfound', label: 'Not Found', icon: 'nf'},
    //   {link: '/pages/auth', label: 'Auth', icon: 'A'}
    // ]},
    // { label: 'Tables', icon: 'grid_on', subItem: [
    //   {link: '/tables/basic', label: 'Basic Table', icon: 'BT'},
    //   {link: '/tables/smart', label: 'smart table', icon: 'ST'}
    // ]},
    // {link: '/charts', label: 'Charts', icon: 'show_chart'},
    // {link: '/maps', label: 'Maps', icon: 'place'},
    // {link: '/editors', label: 'Editors', icon: 'edit'},
  

  ];

}


 