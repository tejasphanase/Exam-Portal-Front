import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashbordComponent } from './pages/admin/dashbord/dashbord.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashbordComponent } from './pages/user/user-dashbord/user-dashbord.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';



const routes: Routes = [
 
  
  { path:'signup',component:SignupComponent},
  { path:'login',component:LoginComponent},
  { path:'',component:HomeComponent},
  { path:'admin',component:DashbordComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path: 'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:qid/:title',
        component:ViewQuizQuestionComponent
      },
      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent
      },
      {
        path:'question/:quesId',
        component:UpdateQuestionComponent
      }


    ]
    },
  { path:'user-dashbord',
  component:UserDashbordComponent,
  canActivate:[NormalGuard],

  children:[
    
    {
      
    path:':catId',
    component:LoadQuizComponent

  },
  {
    path:'instruction/:qid',
    component:InstructionsComponent
  },
 


]


   },

   {
    path:'start/:qid',
    component:StartComponent,
    canActivate:[NormalGuard],
  }
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
