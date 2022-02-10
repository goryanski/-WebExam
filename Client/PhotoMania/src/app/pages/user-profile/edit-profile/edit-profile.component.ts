import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(params => {
  //     this.selectedPhotoId = Number(params.id);
  //
  //     this.photoGalleryApiService.getPhotoById(this.selectedPhotoId)
  //       .subscribe(photo =>
  //         this.form.patchValue({
  //           name: photo.name,
  //           description: photo.description,
  //           rating: photo.rating,
  //           author: photo.author,
  //           url: photo.url
  //         }, {emitEvent: false})
  //       );
  //   })
  // }
  // onEditPhotoClick() {
  //   if (this.form.valid) {
  //     const photo: PhotoInterface = this.form.value;
  //     photo.id = this.selectedPhotoId;
  //     this.photoGalleryApiService.editPhoto(photo)
  //       .pipe(
  //         tap(photo => alert('edited')),
  //         take(1)
  //       )
  //       .subscribe();
  //   }
  // }
}
