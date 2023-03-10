import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
  qId:any;
  qtitle:any;
  questions=[
    {
      quiz:{
        
      },
      quesId:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:''
    }
  ];
  constructor(private _route:ActivatedRoute,private _question:QuestionService,
              private _snack:MatSnackBar) { }

  ngOnInit(): void {

    this.qId =  this._route.snapshot.params['qid'];
    this.qtitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },(error)=>{

        console.log(error);
      }
    );
  }

  //delete question

  deleteQuestion(qid:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure , want to delete this question?'
    }).then((result)=>{

      if(result.isConfirmed){
       
        //confirm

        this._question.deleteQuestion(qid).subscribe(
          (data)=>{

            this._snack.open('Question Deleted','',{

              duration:3000,
            });

            this.questions=this.questions.filter((q)=>q.quesId != qid);

          },(error)=>{

            this._snack.open('Error in deleting questions','',{

              duration:3000,
            });
            console.log(error)
          }
        );

      }
    })
  }

}
