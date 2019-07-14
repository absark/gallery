import { Component, OnInit } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { ImgService } from "../img.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
@Component({
  selector: "app-img",
  templateUrl: "./img.component.html",
  styleUrls: ["./img.component.sass"]
})
export class ImgComponent implements OnInit {
  imgSrc = "./assets/img/default.png";
  selectedImg: any = null;
  isSubmitted: boolean;
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: string;
  formTemplate = new FormGroup({
    caption: new FormControl("", Validators.required),
    category: new FormControl(""),
    imgUrl: new FormControl("", Validators.required)
  });
  constructor(
    private storage: AngularFireStorage,
    private router: Router,
    private service: ImgService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {}
  onSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = "./assets/img/default.png";
      this.selectedImg = null;
    }
  }
  onSubmit(formValue) {
    console.log(formValue);
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const path = `${formValue.category}/${
        this.selectedImg.name
      }_${new Date().getTime()}`;
      const ref = this.storage.ref(path);
      this.task = this.storage.upload(path, this.selectedImg);
      this.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(url => {
              console.log(url); // <-- do what ever you want with the url..
              this.downloadURL = url;

              this.db.collection(`imgs`).add({
                getDownloadURL: this.downloadURL,
                caption: formValue.caption
              });
              this.reset();
            });
          })
        )
        .subscribe();
    }
  }
  get formControls() {
    return this.formTemplate["controls"];
  }
  reset() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: "",
      imgUrl: "",
      category: "Animal"
    });
    this.imgSrc = "./assets/img/default.png";
    this.selectedImg = null;
    this.isSubmitted = false;
  }
}
