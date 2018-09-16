import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  cardItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
    this.getPosts();
  }


  

  routeToMapPage(){
    
  }
// Dummy data to display -- need to connect with Firebase
  getPosts(){
    return this.cardItems = [
      {
        postId: "001",
        username: "Alex05",
        title: "Nine Inch Nails Live",
        image: "IMAGE URL",
        caption: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience",
        location: "Austin, Tx, 78552",
        time: "time"
      },
      {
        postId: "002",
        username: "Jenny86",
        title: "Art.Work",
        image: "This place is great! The atmosphere is very inviting",
        caption: "dummy text",
        location: "411 Brazos St, #101, Austin, TX 78701-3698",
        date: "date",
        time: "time"
      },
      {
        postId: "003",
        username: "VictorCruz",
        title: "The Driskill - Haunted Evening Adventure",
        image: "../../assets/the-driskill-can-you.jpg",
        caption: "dummy text",
        location: "location",
        date: "date",
        time: "time"
      },
      {
        postId: "004",
        username: "Brianah_bear01",
        title: "Nine Inch Nails Live",
        image: "image url goes here",
        caption: "dummy text",
        location: "location",
        date: "date",
        time: "time"
      },
      {
        postId: "005",
        username: "bts_trash",
        title: "Nine Inch Nails Live",
        image: "image url goes here",
        caption: "dummy text",
        location: "FortWorth",
        date: "Texas",
        time: "time"
      },
    ]
  }



}
