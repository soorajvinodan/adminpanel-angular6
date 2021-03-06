import { Component, OnInit ,Input} from '@angular/core';
import * as Chart from 'chart.js';
import { colorCodes } from '@shared/config/colorCodes';

import { myService } from '../../data.service';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {


	SharedData: string;
	

	categoriesArray = ["Pre Primary", "Primary", "Secondary", "Senior Secondary"];
	deviceArray: any[] = [];


  constructor(private _myService: myService) {
			
		  console.log(this._myService.getData());

			this.deviceArray = this._myService.getData();

  }

  ngOnInit() {
    
  }

	schoolname_message: string;
	error_box(input_id) {
		document.getElementById(input_id).focus();
	}
	no_error_box(input_id) {
		document.getElementById(input_id).style.border = "1px solid #ced4da";
	}

	SchoolName: string;
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
  


	addDevice(id, name,categorytype) {

		//forming array for new devices
		if (this.validate_Device(id, name,categorytype)) {
		
			this._myService.addDevice(id,name,categorytype);
		}
	}

}