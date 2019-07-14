import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ImgService {
  constructor(private db: AngularFirestore) {}
  getImgs() {
    return this.db.collection("imgs").snapshotChanges();
  }
}
