import { Component } from '@angular/core';

import { student_profile } from './../../models/student-profile.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent   {
  dataSource! : any;
  constructor() { 
    this.dataSource = new student_profile (
      {"first_name" : "Soleh Firdous", "last_name" : "asime"},
      "soolleh",
      "male",
      25,
      {"country" : "india", "state" : "jammu & kashmir", "locality" : "eid gah"},
      "MCA",
      "soleh@gmail.com",
      8825081604,
      "https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg" 
    )
    console.log(this.dataSource);
  }
  displayedColumns: string[] = ['Name', 'User Name', 'Gender', 'Age','Address','Qualification','email','phone','image'];

}
