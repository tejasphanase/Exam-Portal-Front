import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
 
  isSubmit=false;
  option:any;
  givanAnswer='';
  qid:any;
  question:any;

  timer:any;

  marksGot=0;
  correctAnswer=0;
  attempted=0;

  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _ques:QuestionService) { }

  ngOnInit(): void {

    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid)
    this.loadQuestions();

  }

  loadQuestions(){

    this._ques.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.question=data;

        this.timer=this.question.length* 2* 60;

        this.question.forEach((q:any)=>{
            q['givanAnswer'] ='';

            });
            console.log(this.question);
            this.startTimer();

      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loding question of quiz",'error')
      }
    );
  }



  preventBackButton(){

    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
        history.pushState(null ,location.href)
      });
    
  }
  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to submit the test?',
      
      showCancelButton: true,
      confirmButtonText: 'submit',
     
      icon:'info'
    }).then((e)=>{

    

      if(e.isConfirmed)
      {

        this.evalQuiz();
        // this.evalQuiz();
        // //calculation
        // this.isSubmit=true;

        // this.question.forEach((q: any)=>{

        //   if(q.givanAnswer==q.answer)
        //   {
        //         this.correctAnswer++
        //        let markSingle= this.question[0].quiz.maxMark/this.question.length
        //        this.marksGot +=markSingle;
        //   }

        //   if(q.givanAnswer.trim()!='')
        //   {
        //     this.attempted++
        //   }

         
        // });


        // console.log('correct answers:'+this.correctAnswer);
        // console.log('marks Got:'+this.marksGot);
        // console.log('attempted:'+this.attempted);


      }
    })

  }
  startTimer()
  {
    let t:any = window.setInterval(()=>{
     
      if(this.timer<=0)
      {
        this.evalQuiz();
        this.submitQuiz()
        clearInterval(t);
      }else{

        this.timer--;
      }

    },1000)
  }

  getFormattedTime()
  {
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60
    return `${mm} min : ${ss} sec`
  }

  evalQuiz()
  {  
        //calculation
        this.isSubmit=true;

        this.question.forEach((q: any)=>{

          if(q.givanAnswer==q.answer)
          {
               this.correctAnswer++
               let markSingle= this.question[0].quiz.maxMark/this.question.length
               this.marksGot +=markSingle;
          }

          if(q.givanAnswer.trim()!='')
          {
            this.attempted++
          }

         
        });


        console.log('correct answers:'+this.correctAnswer);
        console.log('marks Got:'+this.marksGot);
        console.log('attempted:'+this.attempted);


  }

  printPage()
  {
    window.print();
  }
  

}
