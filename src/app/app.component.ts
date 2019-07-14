import { Component, OnInit } from "@angular/core";
import { ImgService } from "./img.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "gallery";
  constructor(private service: ImgService) {}
  ngOnInit() {
   
  }
}
