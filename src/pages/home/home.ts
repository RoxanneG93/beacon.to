import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { UploadPage } from '../upload/upload';
import { AuthProvider } from "../../providers/auth/auth";
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from "@ionic-native/camera-preview";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public base64Image: string;
  v;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private auth: AuthProvider
  ) {}

  newUser = (email, pass) => {
    this.auth
      .signUp(email, pass)
      .then((data: any) => {
        console.log(data);
        this.auth.createUser(data.user.uid, data.user.email, "jaimemezatx");
      })
      .catch(err => console.log(err));
  };
  takePicture() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
        //      targetWidth: 1000,
        //      targetHeight: 1000
      })
      .then(
        imageData => {
          // imageData is a base64 encoded string
          this.base64Image = "data:image/jpeg;base64," + imageData;
        },
        err => {
          console.log(err);
        }
      );
  }

    // Routing Method
    routeToPostForm(){
      this.navCtrl.push(UploadPage);
    }
}


// const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   encodingType: this.camera.EncodingType.JPEG,
//   mediaType: this.camera.MediaType.PICTURE
// }

// this.camera.getPicture(options).then((imageData) => {
//   // imageData is either a base64 encoded string or a file URI
//   // If it's base64 (DATA_URL):
//   let base64Image = 'data:image/jpeg;base64,' + imageData;
// }, (err) => {
//   // Handle error
// });
