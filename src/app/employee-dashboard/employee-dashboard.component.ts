import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  isUpdated = false;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      description: ['',[Validators.required]],
      title: ['',[Validators.required,Validators.maxLength(20)]],
      status: ['']
    })
    this.getAllEmployee()

  }
    
  postEmployeedetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.userid = this.formValue.value.userid;
    this.employeeModelObj.title = this.formValue.value.title;
    this.employeeModelObj.status = this.formValue.value.status;
    
    if(!this.formValue.valid){
      alert("Enter Valid Title");
      return ;
    }
    this.api.postEmploye(this.formValue.value)
    //console.log(this.employeeModelObj);
      .subscribe((res:any) => {
        console.log(res);
        alert("Employee Added Successfully")
        let ref= document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
       (err:any)  => {
          alert("Something Went Wrong");
        })
  }
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData = res;
      console.log(this.employeeData);

    })
  }
  deleteEmployee(row : any){
    console.log(row)
    let confirm = window.confirm("Are you sure you want to delete this employee data?")
    if(!confirm){
      return ;
    }
    this.api.deleteEmploye(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.isUpdated = true
    console.log(row)
    this.employeeModelObj.id = row.id;
    this.formValue.controls['description'].setValue(row.description);
    // this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['status'].setValue(row.status);
    // this.formValue.reset();
    // this.profileForm.patchValue(row)
  }
  UpdateEmployeedetails(){
    
    // this.employeeModelObj.id = this.formValue.value.id;
    // this.employeeModelObj.userid = this.formValue.value.userid;
    // this.employeeModelObj.title = this.formValue.value.title;
    // this.employeeModelObj.des = this.formValue.value.title;
    // this.employeeModelObj.status = this.formValue.value.status;
    if(!this.formValue.valid){
      alert("something went wromg!");
      return ;
    }
    this.api.updateEmploye(this.formValue.value,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref= document.getElementById('cancel')
        ref?.click();
        
        this.formValue.reset();
        console.log(this.formValue)
        this.getAllEmployee();
        
    })
  }
  formreset(){
    this.isUpdated = false
    this.formValue.reset();
  }
}
