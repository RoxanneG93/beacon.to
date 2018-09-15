import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

// camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'rear',
  tapPhoto: true,
  previewDrag: true,
  toBack: true,
  alpha: 1
};



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private camera: Camera, private cameraPreview: CameraPreview) { }

  cameraFunc() {
    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });

    // Set the handler to run every time we take a picture
    this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
      console.log(result);
      // do something with the result
    });


    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    // take a picture
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

    // Switch camera
    this.cameraPreview.switchCamera();

    // set color effect to negative
    this.cameraPreview.setColorEffect('negative');

    // Stop the camera preview
    this.cameraPreview.stopCamera();,
  }





  // const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: 1, // this.camera.DestinationType.FILE_URI,
  //   encodingType: 0, // this.camera.EncodingType.JPEG,
  //   mediaType: 0 //this.camera.MediaType.PICTURE
  // }

  // this.camera.getPicture(options).then((imageData) => {
  //   // imageData is either a base64 encoded string or a file URI
  //   // If it's base64 (DATA_URL):
  //   let base64Image = 'data:image/jpeg;base64,' + imageData;
  // }, (err) => {
  //   // Handle error
  // });
}
