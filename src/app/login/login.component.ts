import {
    Component,
    AfterViewInit
  } from '@angular/core';
  
  import {
    Router,
    ActivatedRoute
  } from '@angular/router';
  
  import SHA256 from 'crypto-js/sha256';
  
  import {getInfoService} from './../getClassInfo.service';
  import {UserInfoService} from './../user-info.service';
  import {environment} from '../../environments/environment';
  
  @Component({
    selector: 'app-logins',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss','./../app.component.scss'],
    providers: [getInfoService]
  })
  
  export class LoginComponent implements AfterViewInit {
    baseUrl: string = environment.serverUrl;
    registerData: any;
    loadComponent: boolean = false;
    returnUrl: any;
    loginData: any;
    errorMessage : string;
    validationError : string = "";
    loginErr : string;
    passwordValidationError : string;
    showloginPopup: boolean = false;
  
    constructor(private GetInfoService: getInfoService, private route: ActivatedRoute,
        private router: Router, private userInfoService : UserInfoService) {
        this.GetInfoService.checkUserLogin()
          .subscribe(data => this.loginData = data,
              error => console.log(error),
              () => {
                  var resultObj = JSON.parse(this.loginData['_body']);
                  if (resultObj['status'] == 'ok') {
                      this.loadComponent = true;
                      //Saving user name and email in user info.
                      userInfoService.usrName = resultObj['una'];
                      userInfoService.uEm = resultObj['uEm'];
                      userInfoService.instituteNm = resultObj['instnm'];
                      this.router.navigate([this.returnUrl]); 
                  }
              })
    }
  
    ngAfterViewInit() {}
    ngOnInit() {
        this.returnUrl = '/dashboard';
    }
  
    error_box(input_id) {
        document.getElementById(input_id).focus();
    }
  
    no_error_box(input_id) {
        document.getElementById(input_id).style.borderBottom = "1px solid #007bff";
    }
  
    login_validate_Form(email, password) {
      
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //eMail
        if (email == "") {
            this.validationError = "Please Enter the Email";
            this.error_box("uEm");
            return false;
        } else if (reg.test(email) == false) {
            this.validationError = "Invalid Email";
            this.error_box("uEm");
            return false;
        } else {
            this.validationError = "";
            this.no_error_box("uEm");
        }
  
        //password
        if (password == "") {
            this.passwordValidationError = "Please Enter the Password";
            this.error_box("uPwd");
            return false;
        } else {
            this.passwordValidationError = "";
            this.no_error_box("uPwd");
        }
        return true;
    }
  
    /**
     * User login with input validations.
     */
    checkAndLogin() {
      this.errorMessage = "";
      var email =     (document.getElementById('uEm') as HTMLInputElement).value;
      var password = (document.getElementById('uPwd') as HTMLInputElement).value;
  
      if(email) email.trim();
      if(password) password.trim();
  
      if (this.login_validate_Form(email,password)) {
          var passHash = this.encryptPassword(email, password);
          this.GetInfoService.sendLoginRequest(email, passHash.toString())
          .subscribe(
              data => this.registerData = data,
              error => console.log(error),
              () => {
                  var resultObj = JSON.parse(this.registerData['_body']);
                  if (resultObj['status'] == 'ok') {
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
   
                      this.loginErr = resultObj['errMsg'];
                      this.showloginPopup = true;
                      
                      if(resultObj['errMsg'] == "@invalidLoginAttempt") {
                          this.errorMessage = "Unknown Email Id";
                      }
                      else if(resultObj['errMsg'] == "@invalidPassword") {
                          this.errorMessage = "Invalid Password";
                      }
                      else {
                          console.log("Login Customer Error : " + resultObj['errMsg']);
                      }
                  }
              });
      }
    }
  
    showSignup() {
      this.router.navigate(['signup']); 
    }
  
    closeloginPopup() {
      this.validationError = "";
      this.showloginPopup = false;
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
  