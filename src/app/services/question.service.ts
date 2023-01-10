import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

//get all questions 

  public getQuestionsOfQuiz(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }


//get question for Test
  public getQuestionsOfQuizForTest(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }


  //add question
  public addQuestion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`,question)
  }

  //get the single question 

  public getQuestion(quesId:any)
  {
      return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //update question 




  //delete question

  public deleteQuestion(questionId:any)
  {
     return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
  
}
