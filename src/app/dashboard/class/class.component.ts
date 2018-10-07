import { Component, OnInit ,Input} from '@angular/core';
import * as Chart from 'chart.js';
import { colorCodes } from '@shared/config/colorCodes';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    
  }

	addDevice(id, name,categorytype) {

    console.log("s");
    

		// if (this.validate_Device(id, name,categorytype)) {
		// 	let deviceproperty = {
		// 		"did": id,
    //     "dname": name
		// 	}
		// 	this.showMultiDevices = true;
		// 	for (var i = 0; i < this.deviceArray.length; i++) {
		// 		if (this.deviceArray[i].schoolname === this.SchoolName) {
		// 			this.deviceArray[i].devices.push(deviceproperty);
		// 			// console.log(this.deviceArray);
		// 			this.showdevices = this.deviceArray[i].devices;
		// 		}
		// 	}
		// }
  }
  


  

 
}


