import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  lista: Examen[] = [];
  displayedColumns = ['idExamen', 'nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad:number;
  mensaje:string;

  constructor(private examenService: ExamenService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    //crea la lista, asignara los valores y el paginador
    this.examenService.getlistarExamen(0,100).subscribe(data=>{
      let examenes=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(examenes);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.examenService.examenCambio.subscribe(data=>{
      let examenes=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;
      
      this.dataSource=new MatTableDataSource(examenes);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.examenService.mensaje.subscribe(data=>{
      this.snackBar.open(data,null,{duration:2000});
    });

  }
  //recepciona el texto y busca ya sea en numeros o letras
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();//remove whitespace
    filterValue = filterValue.toLowerCase();//datasorurce defaults
    this.dataSource.filter = filterValue;
  }
  eliminar(examen: Examen):void{
    this.examenService.eliminar(examen).subscribe(data=>{
      if(data===1){
        this.examenService.getlistarExamen(0,100).subscribe(data=>{
          this.examenService.examenCambio.next(data);
          this.examenService.mensaje.next("Se elimino correctamente");
        })
      }else {
        this.examenService.mensaje.next("no se pudo eliminar");
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
    this.examenService.getlistarExamen(e.pageIndex, e.pageSize).subscribe(data=>{
      console.log(data);
      let examenes=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(examenes);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    
    });
  }
}
