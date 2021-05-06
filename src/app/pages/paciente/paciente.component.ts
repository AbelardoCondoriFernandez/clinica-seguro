import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

 
  lista: Paciente[] = [];
  displayedColumns = ['idPaciente', 'nombres', 'apellidos','fechadenacimiento', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad:number;
  mensaje:string;

  constructor(private pacienteService: PacienteService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    //crea la lista, asignara los valores y el paginador
    this.pacienteService.getlistarPaciente(0,100).subscribe(data=>{
      let pacientes=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(pacientes);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.pacienteService.pacienteCambio.subscribe(data=>{
      let pacientes=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;
      
      this.dataSource=new MatTableDataSource(pacientes);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.pacienteService.mensaje.subscribe(data=>{
      this.snackBar.open(data,null,{duration:2000});
    });

  }
  //recepciona el texto y busca ya sea en numeros o letras
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();//remove whitespace
    filterValue = filterValue.toLowerCase();//datasorurce defaults
    this.dataSource.filter = filterValue;
  }
  eliminar(paciente: Paciente):void{
    this.pacienteService.eliminar(paciente).subscribe(data=>{
      if(data===1){
        this.pacienteService.getlistarPaciente(0,100).subscribe(data=>{
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensaje.next("Se elimino correctamente");
        })
      }else {
        this.pacienteService.mensaje.next("no se pudo eliminar");
      }
      this.snackBar.open(this.mensaje,null,{
        duration:2000,
      })
    })
  }
  mostrarMas(e){
    //e.pageIndex e.pageSize e.length
    //console.log(e.pageIndex);
    //console.log(e.pageSize);
    this.pacienteService.getlistarPaciente(e.pageIndex, e.pageSize).subscribe(data=>{
      console.log(data);
      let pacientes=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(pacientes);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    
    });
  }
}
