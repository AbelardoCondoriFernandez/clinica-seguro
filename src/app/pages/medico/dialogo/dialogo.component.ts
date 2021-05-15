import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  id: number;
  medico: Medico;
  form: FormGroup;
  fechadenacimiento: Date = new Date();
  fechadeingreso: Date = new Date();
  maxFecha: Date = new Date();
  edicion: boolean = false;
  constructor(private medicoService: MedicoService, private route: ActivatedRoute, private router: Router) {

    this.medico = new Medico();
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'direccion': new FormControl(''),
      'cmp': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl(''),
      'fechadenacimiento': new FormControl(this.fechadenacimiento),
      'fechadeingreso': new FormControl(this.fechadeingreso),
      'estado': new FormControl('')

    });
  }

  ngOnInit() {
    //para obtener informacion, se debe inscribir
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();

    });
    this.fechadenacimiento.setHours(0);
    this.fechadenacimiento.setMinutes(0);
    this.fechadenacimiento.setSeconds(0);
    this.fechadenacimiento.setMilliseconds(0);
    this.fechadeingreso.setHours(0);
    this.fechadeingreso.setMinutes(0);
    this.fechadeingreso.setSeconds(0);
    this.fechadeingreso.setMilliseconds(0);

  }
  private initForm() {
    if (this.edicion) {
      this.medicoService.getMedicoPorId(this.id).subscribe(data => {
        let id = data.idMedico;
        let nombres = data.nombres;
        let apellidos = data.apellidos;
        let dni = data.dni;
        let direccion = data.direccion;
        let cmp = data.cmp;
        let telefono = data.telefono;
        let email = data.email;
        let fechadenacimiento = data.fechadenacimiento;
        let fechadeingreso = data.fechadeingreso;
        let estado = data.estado;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombres': new FormControl(nombres),
          'apellidos': new FormControl(apellidos),
          'dni': new FormControl(dni),
          'direccion': new FormControl(direccion),
          'cmp': new FormControl(cmp),
          'telefono': new FormControl(telefono),
          'email': new FormControl(email),
          'fechadenacimiento': new FormControl(fechadenacimiento),
          'fechadeingreso': new FormControl(fechadeingreso),
          'estado': new FormControl(estado)

        });
      });
    }
  }
  operar() {
    this.medico.idMedico = this.form.value["id"];
    this.medico.nombres = this.form.value["nombres"];
    this.medico.apellidos = this.form.value["apellidos"];
    this.medico.dni = this.form.value["dni"];
    this.medico.direccion = this.form.value["direccion"];
    this.medico.cmp = this.form.value["cmp"];
    this.medico.telefono = this.form.value["telefono"];
    this.medico.email = this.form.value["email"];
    this.medico.fechadenacimiento = this.form.value["fechadenacimiento"];
    this.medico.fechadeingreso = this.form.value["fechadeingreso"];
    this.medico.estado = this.form.value["estado"];
    if (this.edicion) {
      //modificar en caso que exista el idPaciente
      this.medicoService.modificar(this.medico).subscribe(data => {
        console.log(data);

        if (data === 1) {
          this.medicoService.getlistarMedico(0, 100).subscribe(medicos => {
            this.medicoService.medicoCambio.next(medicos);
            this.medicoService.mensaje.next('se modifico');
          });
          //exito
        } else {
          //no se modifico
          this.medicoService.mensaje.next('no se modifico');
        }
      });
    } else {
      //creara para un id, a paciente
      this.medicoService.registrar(this.medico).subscribe(data => {
        console.log(data);
        if (data === 1) {
          //exito
          this.medicoService.getlistarMedico(0, 100).subscribe(medicos => {
            this.medicoService.medicoCambio.next(medicos);
            this.medicoService.mensaje.next('se registró');
          });
        } else {
          //no se registro
          this.medicoService.mensaje.next('no se registró');

        }
      });
    }
    this.router.navigate(['medico']);
  }

}