import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {UploadService} from "../../api/services/upload.service";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  // name of image folder on server (if we upload img for avatar - it will be in folder "avatars" otherwise - in "images"). we set it where we define component (<app-upload [saveImgFolder]="'avatars'"></app-upload>)
  @Input() saveImgFolder: string = '';
  // to show the upload progress
  public progress: number = 0;
  // the message when upload action is finished
  public message: string = '';
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private readonly uploadService: UploadService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    // if there's any file in the files parameter
    if (files.length === 0) {
      return;
    }
    // otherwise we extract the file from the files parameter
    let fileToUpload = <File>files[0];

    // check file extension
    let fileExt = fileToUpload.name.split('.').pop();
    if(fileExt != 'jpg' && fileExt != 'png' && fileExt != 'jpeg') {
      this.message = 'Wrong file type, try again';
      return;
    }

    // create a formData object and append our file that we want to upload
    const formData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);

    // formData (=body param), param2 - JSON object which states that we want to track changes of our HTTP request progress
    this.uploadService.uploadImage(formData, {reportProgress: true, observe: 'events'}, this.saveImgFolder)
      .subscribe(event => {
        // As long as the upload is in progress, we will update the progress variable and show that percentage on the screen
        if (event.type === HttpEventType.UploadProgress && event.total != undefined)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          // but as soon as the upload is finished, we are going to write a message on the screen and emit a new event.
          this.message = 'Upload success.';
          // This event contains the body of our response, which is simply the database path of our uploaded file
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
