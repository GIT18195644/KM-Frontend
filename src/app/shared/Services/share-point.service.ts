import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharePoint } from '../dto/share-point';
import { URLs } from './urls';
import { ValueScope } from 'ajv/dist/compile/codegen';

@Injectable()
export class SharePointService {
    myAppUrl: string = new URLs().APIURL;
    fileUploadUrl: string = new URLs().FILEAPIURL;

    fileData: SharePoint = new SharePoint();
    public SharedFiles: any;

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(public http: HttpClient) {
        this.myAppUrl = new URLs().APIURL;
    }

    upload(file): Observable<any> {
        const formData = new FormData();
        formData.append("file", file, file.name);
        return this.http.post(this.fileUploadUrl, formData)
    }

    addnewsharedata(values, user) {
        // console.log("api values: ", values)
        this.fileData.Topic = values.ctrltopic;
        this.fileData.RoleName = values.ctrlrole;
        this.fileData.Author = user;
        this.fileData.Abstract = values.ctrlabstract;
        this.fileData.Link = values.ctrlattachedfile;
        this.fileData.Downloads = 0;
        this.fileData.Status = 1;

        return this.http.post(this.myAppUrl + "ShareFiles/createFile", this.fileData, this.httpOptions)
            .pipe(map(res =>
                res),
                catchError(this.errorHandler)
            );
    }

    getAllSharedFiles(user) {
        return this.http.get(this.myAppUrl + "ShareFiles/getAllSharedFiles/" + user)
            .pipe(map((res: Response) =>
                this.SharedFiles = res
            ));
    }

    errorHandler(error: Response) {
        return throwError(error);
    }
}