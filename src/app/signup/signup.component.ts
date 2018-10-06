/**
 * My app component file.
 * Updated by : Shrabanee
 * Date : 28/09/2018
 */
import {
    Component,
    AfterViewInit
  } from '@angular/core';
  
  import {
    Router,
    ActivatedRoute
  } from '@angular/router';
  import aes from 'crypto-js/aes';
  import SHA256 from 'crypto-js/sha256';
  
  import {getInfoService} from './../getClassInfo.service';
  import {UserInfoService} from './../user-info.service';
  import {environment} from '../../environments/environment';
  
  @Component({
    selector: 'app-root',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss','./../app.component.scss'],
    providers: [getInfoService]
  })
  
  export class SignupComponent implements AfterViewInit {
    baseUrl: string = environment.serverUrl;
    registerData: any;
    loadComponent: boolean = false;
    returnUrl: any;
    loginData: any;
    unaErr : string;
    emErr : string;
    instituteErr : string;
    pwdErr : string;
    rpwdErr : string;
    registerErr : string;
    showsignupPopup: boolean = false;
    validationError: string = "";

    constructor(private GetInfoService: getInfoService, private route: ActivatedRoute,
        private router: Router, private userInfoService : UserInfoService) {
        this.GetInfoService.checkUserLogin()
        .subscribe(data => this.loginData = data,
            error => console.log(error),
            () => {
                var resultObj = JSON.parse(this.loginData['_body']);
                if (resultObj['status'] == 'ok') {
                    //Saving user name and email in user info.
                    userInfoService.usrName = resultObj['una'];
                    userInfoService.uEm = resultObj['uEm'];
                    userInfoService.instituteNm = resultObj['instnm'];
                    this.loadComponent = true;
                    this.router.navigate([this.returnUrl]); 
                }
            })
    }
  
    ngAfterViewInit() {}
    ngOnInit() {
        this.returnUrl = '/dashboard';
    }
  
   
  
    error_box(input_id) {
        // document.getElementById(input_id).classList.add("error-input");
        document.getElementById(input_id).focus();
    }
  
    no_error_box(input_id) {
        // document.getElementById(input_id).style.borderBottom = "1px solid #007bff";
        document.getElementById(input_id).classList.remove("error-input");
    }
  
    register_validate_Form(una, email, instituteNm, password, confirm_pwd) {
        
        //Username
        if (una == "") {
            this.unaErr = "Please Enter the Name";
            this.error_box("una");
            return false;
        } else {
            this.unaErr = "";
            this.no_error_box("una");
        }
  
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //eMail
        if (email && email.trim() == "") {
            this.emErr = "Please Enter the Email";
            this.error_box("email");
            return false;
        } else if (reg.test(email.trim()) == false) {
            this.emErr = "Invalid Email";
            this.error_box("email");
            return false;
        } else {
            this.emErr = "";
            this.no_error_box("email");
        }
  
        //instituteNm
        if (instituteNm == "") {
            this.instituteErr = "Please Enter institution name";
            this.error_box("instnm");
            return false;
        } else {
            this.instituteErr = "";
            this.no_error_box("instnm");
        }
  
        //password
        if (password == "") {
            this.pwdErr = "Please Enter the Password";
            this.error_box("pwd");
            return false;
        } else {
            this.pwdErr = "";
            this.no_error_box("pwd");
  
        }
  
        //confirmpassword
        if (password !== confirm_pwd || confirm_pwd == "") {
            this.rpwdErr = "Password Do not Match";
            this.error_box("confirm_pwd");
            return false;
        } else {
            this.rpwdErr = "";
            this.no_error_box("confirm_pwd");
        }
        return true;
    }
  
    /**
     * Register new record with given values from user, if all the validations are done.
     */
    registerNew() {
        
        this.registerErr = "";
        var una = (document.getElementById('una') as HTMLInputElement).value;
        var email = (document.getElementById('email') as HTMLInputElement).value;
        var instituteNm = (document.getElementById('instnm') as HTMLInputElement).value;
        var password = (document.getElementById('pwd') as HTMLInputElement).value;
        var confirm_pwd = (document.getElementById('confirm_pwd') as HTMLInputElement).value;

        if(email) email.trim();
        if(password) password.trim();
        if(confirm_pwd) password.trim();
        if(instituteNm) instituteNm.trim();
  
        if (this.register_validate_Form(una, email, instituteNm, password, confirm_pwd)) {
            var passHash = this.encryptPassword(email, password);

            this.GetInfoService.registerCustomer(email, instituteNm, una, passHash.toString())
                .subscribe(
                data => this.registerData = data,
                error => console.log(error),
                () => {
                    var resultObj = JSON.parse(this.registerData['_body']);
                    if (resultObj['status'] == 'Ok') {
                        //load dashboard-view component page
                        var returnData = resultObj['result'][0];
                        //Field to show user's name in the view;
                        //Saving user name and email in user info.
                        this.userInfoService.usrName = returnData['una'];
                        this.userInfoService.uEm = email;
                        this.userInfoService.instituteNm = resultObj['instnm'];
                        this.loadComponent = true;
                        this.router.navigateByUrl(this.returnUrl);
                    } else {
                        this.registerErr = resultObj['errMsg'];
                        this.showsignupPopup = true;
                       
                        if(resultObj["errMsg"]["msg"]== "@invalidEmOrKey"){
                            this.validationError = "Email is not valid";
                        }
                        else {
                            console.log("Register Customer Error : " + resultObj['errMsg']);
                        }

                    }
                });
        }
    }

    closesignupPopup() {
        this.validationError = "";
        this.showsignupPopup = false;
    }

    showLogin() {
      this.router.navigate(['login']); 
    }
  
    /**
     * Password encryption
     * @param email 
     * @param password 
     */
    encryptPassword(email, password) {
        var emailForHash = email.toLowerCase().trim();
        var passwordSalt = emailForHash + password + environment.secKey;
        var passHash = SHA256(passwordSalt);
        return passHash;
    }
  }
  
   
   
  
    
    
  