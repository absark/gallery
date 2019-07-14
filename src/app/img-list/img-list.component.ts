import { Component, OnInit } from "@angular/core";
import { ImgService } from "../img.service";

@Component({
  selector: "app-img-list",
  templateUrl: "./img-list.component.html",
  styleUrls: ["./img-list.component.sass"]
})
export class ImgListComponent implements OnInit {
  imgs: any[];
  constructor(private service: ImgService) {}

  ngOnInit() {
    this.service.getImgs().subscribe(arr => {
      console.log(arr);
      this.imgs = arr.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as any;
      });
    });
  }
}
