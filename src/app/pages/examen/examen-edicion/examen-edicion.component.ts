import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  id:number;
  examen: Examen;
  form: FormGroup;
  edicion: boolean=false; 
  constructor(private examenService:ExamenService, private route:ActivatedRoute,private router:Router) { 

    this.examen=new Examen();
    this.form=new FormGroup({
      'id':new FormControl(0),
      'nombre':new FormControl(''),
      'descripcion':new FormControl('')

    }) ;
  }

  ngOnInit() {
    //para obtener informacion, se debe inscribir
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edicion=params['id']!=null;
      this.initForm();

    });
  }
  private initForm(){
    if(this.edicion){
      this.examenService.getExamenPorId(this.id).subscribe(data=>{
        let id=data.idExamen;
        let nombre=data.nombre;
        let descripcion=data.descripcion;
      
        this.form=new FormGroup({
          'id':new FormControl(id),
          'nombre':new FormControl(nombre),
          'descripcion':new FormControl(descripcion)
         
        });
      });
    }
  }
operar(){
  this.examen.idExamen=this.form.value["id"];
  this.examen.nombre=this.form.value["nombre"];
  this.examen.descripcion=this.form.value["descripcion"];
 
  
  if(this.edicion){
    //modificar en caso que exista el idPaciente
    this.examenService.modificar(this.examen).subscribe(data=>{
      console.log(data);

      if (data===1){
        this.examenService.getlistarExamen(0,100).subscribe(examenes=>{
          this.examenService.examenCambio.next(examenes);
          this.examenService.mensaje.next('se modifico');
        });
        //exito
      }else{ 
        //no se modifico
        this.examenService.mensaje.next('no se modifico');
      }
    });
  }else {
    //creara para un id, a paciente
    this.examenService.registrar(this.examen).subscribe(data=>{
      console.log(data);
      if (data===1){
        //exito
        this.examenService.getlistarExamen(0,100).subscribe(examenes=>{
          this.examenService.examenCambio.next(examenes);
          this.examenService.mensaje.next('se registró');
        });
      }else{
        //no se registro
        this.examenService.mensaje.next('no se registró');

      }
    });
  }
  this.router.navigate(['examen']);
}
}
