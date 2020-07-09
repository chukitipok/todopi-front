import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'todolist', component: TodoListComponent, },
  { path: '**', component: NotFoundComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
