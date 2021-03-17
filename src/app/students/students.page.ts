import { Student } from './../models/student';
import { StudentsService } from './../services/students.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
    studentsData: any;
  constructor( public studentService: StudentsService,  private nav:NavController) 
  { 
     this.studentsData = [];
  }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllStudents();
}
  getAllStudents() {
    //Get saved list of students
    this.studentService.getStudents().subscribe(response => {
      console.log(response);
      this.studentsData = response;
    })
  }

  addStudent() {
    this.nav.navigateForward('/add');
  }

  edit(id: number) {
    this.nav.navigateForward(['update/' + id]);
  }

  delete(student) {
    //Delete item in Student data
    this.studentService.deleteStudent(student.id).subscribe(response => {
      //Update list after delete is successful
      this.getAllStudents();
      this.nav.pop();
    });
  }

}
