import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  id:number;
  especialidad: Especialidad;
  form: FormGroup;
  edicion: boolean=false; 
  constructor(private especialidadService:EspecialidadService, private route:ActivatedRoute,private router:Router) { 

    this.especialidad=new Especialidad();
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
      this.especialidadService.getEspecialidadPorId(this.id).subscribe(data=>{
        let id=data.idEspecialidad;
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
  this.especialidad.idEspecialidad=this.form.value["id"];
  this.especialidad.nombre=this.form.value["nombre"];
  this.especialidad.descripcion=this.form.value["descripcion"];
  
  if(this.edicion){
    //modificar en caso que exista el idPaciente
    this.especialidadService.modificar(this.especialidad).subscribe(data=>{
      console.log(data);

      if (data===1){
        this.especialidadService.getlistarEspecialidad(0,100).subscribe(especialidades=>{
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensaje.next('se modifico');
        });
        //exito
      }else{ 
        //no se modifico
        this.especialidadService.mensaje.next('no se modifico');
      }
    });
  }else {
    //creara para un id, a paciente
    this.especialidadService.registrar(this.especialidad).subscribe(data=>{
      console.log(data);
      if (data===1){
        //exito
        this.especialidadService.getlistarEspecialidad(0,100).subscribe(especialidades=>{
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensaje.next('se registró');
        });
      }else{
        //no se registro
        this.especialidadService.mensaje.next('no se registró');

      }
    });
  }
  this.router.navigate(['especialidad']);
}
}

