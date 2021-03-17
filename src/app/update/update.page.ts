import { Student } from './../models/student';
import { StudentsService } from './../services/students.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  data: Student;
  id: number;
  public edit: FormGroup;

  constructor(public formbuilder: FormBuilder, 
              public studentService: StudentsService, 
              private nav: NavController, 
              public router: ActivatedRoute) {
    this.edit = formbuilder.group({
      id:[''],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ["", [Validators.required, Validators.email]],
      country: ["", Validators.required]
    })
  }

  ngOnInit() {
    
  } 

  ionViewWillEnter() {
    this.id = this.router.snapshot.params["id"];
    //get item details using id
    this.studentService.getStudent(this.id).subscribe(response => {
      this.data = response;
      this.edit.patchValue(this.data);
    })
}
 
 
  update(){
    const st = this.edit.value;
    this.studentService.updateStudent(this.id, st).subscribe(
      response => {
        this.edit.reset();
       console.log(response)
       this.nav.navigateForward('students')
    }) 
  }
  }



