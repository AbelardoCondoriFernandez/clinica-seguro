import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  lista: Especialidad[] = [];
  displayedColumns = ['idEspecialidad','nombre', 'descripcion','acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad:number;
  mensaje:string;

  constructor(private especialidadService: EspecialidadService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    //crea la lista, asignara los valores y el paginador
    this.especialidadService.getlistarEspecialidad(0,100).subscribe(data=>{
      let especialidades=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(especialidades);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.especialidadService.especialidadCambio.subscribe(data=>{
      let especialidades=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;
      
      this.dataSource=new MatTableDataSource(especialidades);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.especialidadService.mensaje.subscribe(data=>{
      this.snackBar.open(data,null,{duration:2000});
    });

  }
  //recepciona el texto y busca ya sea en numeros o letras
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();//remove whitespace
    filterValue = filterValue.toLowerCase();//datasorurce defaults
    this.dataSource.filter = filterValue;
  }
  eliminar(especialidad: Especialidad):void{
    this.especialidadService.eliminar(especialidad).subscribe(data=>{
      if(data===1){
        this.especialidadService.getlistarEspecialidad(0,100).subscribe(data=>{
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.mensaje.next("Se elimino correctamente");
        })
      }else {
        this.especialidadService.mensaje.next("no se pudo eliminar");
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
    this.especialidadService.getlistarEspecialidad(e.pageIndex, e.pageSize).subscribe(data=>{
      console.log(data);
      let especialidades=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(especialidades);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    
    });
  }
}
