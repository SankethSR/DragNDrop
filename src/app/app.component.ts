import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("generalDialog", { static: true })
  generalDialog!: TemplateRef<any>;
  dialogData: any = {
    title: "Change Organization Image",
    content: "",
    note: "",
    imagePath: "",
    yes: "Save Changes",
    no: "Cancel",
  };
  files: File[] = [];
  isValidImage: boolean = false;
  temp: string = "";

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.files = [];
    this.temp = "";
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.generalDialog, {
      disableClose: true,
      autoFocus: false,
      height: "auto",
      width: "auto",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result === "Save Changes") {
            // alert("save changes")
            this._snackBar.open(
              "Please click on Upload Images to save new images",
              "",
              {
                duration: 2000,
                horizontalPosition: "center",
                verticalPosition: "bottom",
              }
            );
    this.isValidImage = false;
            this.ngOnInit();
        }else if(result === "Cancel") {
          // alert("Cancecl")
        }
      }

    });
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);

    if(!this.ValidFormat(this.files)) {
      this._snackBar.open(
        "Only jpeg, png, tiff files allowed!",
        "",
        {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        }
      );
    } else {
      this.isValidImage = true;
      if(this.files[0].name.length > 14) {
      this.temp = this.files[0].name.split(".")[0].substring(0, 8) + '...' + this.files[0].name.split(".")[0].substring(this.files[0].name.split(".")[0].length - 3) + "." + this.files[0].name.split(".")[1];;
      } else {
        this.temp = this.files[0].name;
      }

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
