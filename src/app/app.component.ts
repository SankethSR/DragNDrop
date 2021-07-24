import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('generalDialog', { static: true })
  generalDialog!: TemplateRef<any>;
  dialogData: any = {
    title: 'Change Organization Image',
    content: '',
    note: '',
    imagePath: '',
    yes: 'Save Changes',
    no: 'Cancel',
  };
  files: File[] = [];
  isValidImage: boolean = false;
  temp: string = '';
  imageChangedEvent: string = '';
  croppedImage: any;
  isSaveChangesClicked: boolean = false;

  constructor(public dialog: MatDialog, public _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.files = [];
    this.temp = '';
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  fileChangeEvent(event: any): void {
    this.isSaveChangesClicked = false;
    this.imageChangedEvent = event;
    this.temp = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
    this._snackBar.open('Failed to load image! Please try again', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  openDialog() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.temp = '';
    const dialogRef = this.dialog.open(this.generalDialog, {
      disableClose: true,
      autoFocus: false,
      height: 'auto',
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result === 'Save Changes') {
          // alert("save changes")
          this.isSaveChangesClicked = true;
          // this._snackBar.open(
          //   "Please click on Upload Images to save new images",
          //   "",
          //   {
          //     duration: 2000,
          //     horizontalPosition: "center",
          //     verticalPosition: "bottom",
          //   }
          // );
          this.isValidImage = false;
          // this.ngOnInit();
        } else if (result === 'Cancel') {
          // alert("Cancecl")
        }
      }
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.imageChangedEvent = event.source._fileInput.nativeElement;

    this.files.push(...event.addedFiles);

    if (!this.ValidFormat(this.files)) {
      this._snackBar.open('Only jpeg, png, tiff files allowed!', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.isValidImage = false;
    } else {
      this.isValidImage = true;
    }
  }

  ValidFormat(files: any) {
    var imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
    var isValid = imageReg.test(files[0].name);
    return isValid;
  }

  reUploadImage(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.isValidImage = false;
  }
}
