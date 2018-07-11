In angular if we want to generate a component without making a new folder then use --flat
flag -> ng g c message --flate

==========================================================

user.model.ts (or) message.model.ts-> Is a standard way of naming the model/DTO
 (instead of naming it as user.ts or message.ts)

============================================================

public firstsName?: string, 

? --(means)--> these properties is optional, we r not 
forcing the end-client to enter value for this property while creating object using C.I,
if end-client not define this prop then value will be undefined


============================================================

Angular v6-snippet -> by johnpapa
use this plugin for ZEN CODING (i.e- shortcut for generating code)
ex- a-component this zen code will completely generate componet structure

============================================================
Directives ->
*ngIf, *ngFor (built-in Directives) -> structural directive (which will change the structure of DOM)
  <my-message> (userdefine selector/ userdefine Directives) 
  <div [ngStyle]="{backgroundColor: 'red'}"></div> -> builtin attribute directive 

  So, components are Directives with views (template)
  Directives are template + logic(.ts file)

Directives uses 'selector' to let angular know which part of the HTML code represent instruction

============================================================

 pathMatch: 'full'  -> only redirect to specific component if the complete path matches

 ============================================================