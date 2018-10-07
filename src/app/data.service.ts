import { Injectable } from '@angular/core';

@Injectable()
export class myService {

  public sharedData = ["Pre Primary", "Primary", "Secondary", "Senior Secondary"];
  deviceArray: any[] = [];
  


  constructor(){
    for (let i in this.sharedData) {
			let obj = {
				name: this.sharedData[i],
				devices: [
					// {did:1, dname:"123"}
				]
			}
			this.deviceArray.push(obj);
		}
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
    
			let deviceproperty = {
				"did": id,
        "dname": name
			}
			// this.showMultiDevices = true;
			for (var i = 0; i < this.deviceArray.length; i++) {
				if (this.deviceArray[i].name === categorytype) {
					this.deviceArray[i].devices.push(deviceproperty);
					console.log(this.deviceArray);
					this.showdevices = this.deviceArray[i].devices;
				}
			}
  }
 
  

  // setData (data) {
  //   this.sharedData = data;
  // }




  getData () {
    return this.deviceArray;
  }

  

  getdevices () {
    return this.showdevices;
  }



}