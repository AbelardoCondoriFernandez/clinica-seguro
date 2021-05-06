import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

 
  id:number;
  paciente: Paciente;
  form: FormGroup;
  fechadenacimiento:Date=new Date();
  maxFecha:Date=new Date();
  edicion: boolean=false; 
  constructor(private pacienteService:PacienteService, private route:ActivatedRoute,private router:Router) { 

    this.paciente=new Paciente();
    this.form=new FormGroup({
      'id':new FormControl(0),
      'nombres':new FormControl(''),
      'apellidos':new FormControl(''),
      'dni':new FormControl(''),
      'direccion':new FormControl(''),
      'telefono':new FormControl(''),
      'email':new FormControl('')
//      'fechadenacimiento':new FormControl('')

    }) ;
  }

  ngOnInit() {
    //para obtener informacion, se debe inscribir
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edicion=params['id']!=null;
      this.initForm();

    });
    this.fechadenacimiento.setHours(0);
    this.fechadenacimiento.setMinutes(0);
    this.fechadenacimiento.setSeconds(0);
    this.fechadenacimiento.setMilliseconds(0);
    
  }
  private initForm(){
    if(this.edicion){
      this.pacienteService.getPacientePorId(this.id).subscribe(data=>{
        let id=data.idPaciente;
        let nombres=data.nombres;
        let apellidos=data.apellidos;
        let dni=data.dni;
        let direccion=data.direccion;
        let telefono=data.telefono;
        let email=data.email;
        let fechadenacimiento=data.fechadenacimiento;

        this.form=new FormGroup({
          'id':new FormControl(id),
          'nombres':new FormControl(nombres),
          'apellidos':new FormControl(apellidos),
          'dni':new FormControl(dni),
          'direccion':new FormControl(direccion),
          'telefono':new FormControl(telefono),
          'email':new FormControl(email),
          'fechadenacimiento':new FormControl(fechadenacimiento)
        });
      });
    }
  }
operar(){
  this.paciente.idPaciente=this.form.value["id"];
  this.paciente.nombres=this.form.value["nombres"];
  this.paciente.apellidos=this.form.value["apellidos"];
  this.paciente.dni=this.form.value["dni"];
  this.paciente.direccion=this.form.value["direccion"];
  this.paciente.telefono=this.form.value["telefono"];
  this.paciente.email=this.form.value["email"];
  this.paciente.fechadenacimiento=this.fechadenacimiento;
  if(this.edicion){
    //modificar en caso que exista el idPaciente
    this.pacienteService.modificar(this.paciente).subscribe(data=>{
      console.log(data);

      if (data===1){
        this.pacienteService.getlistarPaciente(0,100).subscribe(pacientes=>{
          this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensaje.next('se modifico');
        });
        //exito
      }else{ 
        //no se modifico
        this.pacienteService.mensaje.next('no se modifico');
      }
    });
  }else {
    //creara para un id, a paciente
    this.pacienteService.registrar(this.paciente).subscribe(data=>{
      console.log(data);
      if (data===1){
        //exito
        this.pacienteService.getlistarPaciente(0,100).subscribe(pacientes=>{
          this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensaje.next('se registró');
        });
      }else{
        //no se registro
        this.pacienteService.mensaje.next('no se registró');

      }
    });
  }
  this.router.navigate(['paciente']);
}

}
