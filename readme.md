In angular if we want to generate a component without making a new folder then use --flat
flag -> ng g c message --flate

================================================================================================================

user.model.ts (or) message.model.ts-> Is a standard way of naming the model/DTO
 (instead of naming it as user.ts or message.ts)

================================================================================================================

public firstsName?: string, 

? --(means)--> these properties is optional, we r not 
forcing the end-client to enter value for this property while creating object using C.I,
if end-client not define this prop then value will be undefined


================================================================================================================

Angular v6-snippet -> by johnpapa
use this plugin for ZEN CODING (i.e- shortcut for generating code)
ex- a-component this zen code will completely generate componet structure

================================================================================================================
Directives ->
*ngIf, *ngFor (built-in Directives) -> structural directive (which will change the structure of DOM)
  <my-message> (userdefine selector/ userdefine Directives) 
  <div [ngStyle]="{backgroundColor: 'red'}"></div> -> builtin attribute directive 

  So, components are Directives with views (template)
  Directives are template + logic(.ts file)

Directives uses 'selector' to let angular know which part of the HTML code represent instruction

================================================================================================================

 pathMatch: 'full'  -> only redirect to specific component if the complete path matches

================================================================================================================
 
//MY_APP_ROUTES -> is the root route(which handles all routes for- 'localhost:3000/___')
//MY_AUTH_ROUTES -> is the child route for '/auth'(which handles all routes for- 'localhost:3000/auth/___')

================================================================================================================

In Angular we can build form in two-ways
1) Template driven approach(All the validation r written in Template(.html) file )
2) Reactive approach(data driven approach) (All the validation r written in Component (.ts) file)

Note:
Inside imports array in app.module.ts we shld add following ->
 imports[FormsModule] -> Template Driven approach
 imports[ReactiveFormsModule] -> Reactive approach

================================================================================================================
Http module has been depricated in angular v6, so start using HttpClient module instead
Note : -) Http module : imported from  @angular/http
       and in app.module.ts -> import  HttpModule in imports[]
       -) HttpClient module : imported from @angular/common/http
       and in app.module.ts -> import  HttpClientModule in imports[]
       
================================================================================================================  
In RxJs v6 -> many things have changed 
for ex-
The following operator names were changed because their dot-chained
names are reserved words in JavaScript:
do -> tap
catch -> catchError
switch -> switchAll
finally -> finalize

To convert dot-chained operators to pipeable operators, wrap all operators in the pipe()
method from the source observable, remove the dots, and add commas to pass each operation 
to pipe() as an argument.
for ex -
  //these dot-chanied technique has been depricated

         this.http.post<Message>()
                  .map((response : Response => {
                      response.json();
                  }))
                  .do()
                  .catch();

  //Now pipeable technique has been introduced in v6
          this.http.post<Message>()
                    .pipe(
                        map((response: Response) =>response),
                        catchError(err => of('error found')),
                          );

                        
Synchronous error handling (placing a call to the Observable.subscribe() 
method within a try/catch block) is no longer supported. If it is used, 
it must be replaced with asynchronous error handling, using the error
 callback in the Observable.subscribe() method.

================================================================================================================
  <b> EventEmitter</b> must be imported from "@angular/core" package but not from "event" package

================================================================================================================