import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserProfile } from '../dto/user-profile';
import { catchError, map } from 'rxjs/operators';
import { URLs } from './urls';

@Injectable()
export class UserProfileService {
    public userProfile: any;
    public updateProfileData: any;

    profileData: UserProfile = new UserProfile();
    myAppUrl: string = new URLs().APIURL;

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(public http: HttpClient) {
        this.myAppUrl = new URLs().APIURL;
    }

    // Get LoggedIn User Data
    getLoggedInUserDetails(userID) {
        return this.http.get(this.myAppUrl + "UserProfile/getLoggedInUserDetails/" + userID)
            .pipe((map((res: Response) => {
                this.userProfile = res;
            })),
                catchError(this.errorHandler)
            );
    }

    // Update LoggedIn User Data
    updateLoggedInUserDetails(userProfileData) {
        this.profileData.Company = userProfileData.Company;
        this.profileData.UserName = userProfileData.UserName;
        this.profileData.Email = userProfileData.Email;
        this.profileData.Name = userProfileData.Name;
        this.profileData.SurName = userProfileData.Surname;
        this.profileData.Address = userProfileData.Address;
        this.profileData.Gender = userProfileData.Gender;
        this.profileData.Birthday = userProfileData.Birthday;
        this.profileData.Phone = userProfileData.Phone;

        return this.http.put(this.myAppUrl + 'UserProfile/updateLoggedInUserDetails/', this.profileData)
            .pipe(map(res => {
                this.updateProfileData = res;
            }));
    }

    errorHandler(error: Response) {
        return throwError(error);
    }
}