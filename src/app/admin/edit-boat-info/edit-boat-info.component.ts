import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../sales/sales.service';
import { EditBoatInfoService } from './edit-boat-info.service';
import * as Notiflix from 'notiflix';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-boat-info',
  templateUrl: './edit-boat-info.component.html',
  styleUrls: ['./edit-boat-info.component.scss']
})
export class EditBoatInfoComponent implements OnInit {
  BASE_URI: string;
  boatInfoData: any;
  boat_id: any;
  editBoatInfoForm: FormGroup;
  url: any;
  format: any;

  constructor(
    private salesService: SalesService,
    public formbuilder: FormBuilder,
    private editBoatInfoService: EditBoatInfoService
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log('EditBoatInfoComponent ngOnInit()');
    this.editBoatInfoForm = this.formbuilder.group({
      tag_line: ["", Validators.required],
      heading_1: ["", Validators.required],
      description_1: ["", Validators.required],
      heading_2: ["", Validators.required],
      sub_heading_2: ["", Validators.required],
      description_2: ["", Validators.required],
      heading_3: ["", Validators.required],
      description_3: ["", Validators.required],
      landing_video: ["", Validators.required],
      image_1: ["", Validators.required],
    });

    this.salesService.getBoatInfoAll().subscribe(
      res => {
        // this.boat_id = res.data._id
        this.boatInfoData = res.data
        this.editBoatInfoForm.patchValue(res.data.content)        
        console.log('###edit-boat-info', this.boatInfoData);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {        
        Notiflix.Notify.failure(err.error?.message);
      }
    );
  }

  getControlValidation(key: string): boolean {
    const { invalid, touched, dirty } = this.editBoatInfoForm.get(key) as FormGroup;
    // console.log(key);
    return invalid && (touched || dirty);
  }

  onUpload(event: any) {
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )
    console.log('video', event.target.files);
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
    console.log(this.editBoatInfoForm.value);
    
    Notiflix.Loading.remove();
  }

  submitData() {
    if (this.editBoatInfoForm.invalid) {
      return;
    }

    const { value } = this.editBoatInfoForm;

    console.log(value);
    
    Notiflix.Loading.standard({
      cssAnimationDuration: 2000,
      backgroundColor: '0, 0, 0, 0.0',
    },
    )

    this.editBoatInfoService.updateBoatInfo(this.boat_id, value).subscribe(
      res => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.message);
        if (!res.success) { Notiflix.Notify.failure(res.error); }
      },
      err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error?.message);
      }
    )
  }

}
