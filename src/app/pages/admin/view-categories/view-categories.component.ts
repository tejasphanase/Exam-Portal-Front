import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
 
  categories=[
    {
      title:'',
      description:''
    }]
  
  
  constructor(private _category:CategoryService) { }

  ngOnInit(): void {

    this._category.categories().subscribe((data:any)=>{

      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{

      console.log(error);
      Swal.fire('Error !!','Error in loading data','error');
    }
    )
  }

}
