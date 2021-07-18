import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dragndrop';
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

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
  ) {}

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
    }
  }

  ValidFormat(files: any) {
    var reg = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))+(.jpg|.jpeg|.png|.gif)$/
    var isValid = reg.test(files[0].value);
    return isValid;
  }
  
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
