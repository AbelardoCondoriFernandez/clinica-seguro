import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

 
  lista: Medico[] = [];
  displayedColumns = ['idMedico', 'nombres', 'apellidos','fechadeingreso', 'acciones'];
  dataSource: MatTableDataSource<Medico>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad:number;
  mensaje:string;

  constructor(private medicoService: MedicoService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    //crea la lista, asignara los valores y el paginador
    this.medicoService.getlistarMedico(0,100).subscribe(data=>{
      let medicos=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(medicos);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.medicoService.medicoCambio.subscribe(data=>{
      let medicos=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;
      
      this.dataSource=new MatTableDataSource(medicos);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
    this.medicoService.mensaje.subscribe(data=>{
      this.snackBar.open(data,null,{duration:2000});
    });

  }
  //recepciona el texto y busca ya sea en numeros o letras
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();//remove whitespace
    filterValue = filterValue.toLowerCase();//datasorurce defaults
    this.dataSource.filter = filterValue;
  }
  eliminar(medico: Medico):void{
    this.medicoService.eliminar(medico).subscribe(data=>{
      if(data===1){
        this.medicoService.getlistarMedico(0,100).subscribe(data=>{
          this.medicoService.medicoCambio.next(data);
          this.medicoService.mensaje.next("Se elimino correctamente");
        })
      }else {
        this.medicoService.mensaje.next("no se pudo eliminar");
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
    this.medicoService.getlistarMedico(e.pageIndex, e.pageSize).subscribe(data=>{
      console.log(data);
      let medicos=JSON.parse(JSON.stringify(data)).content;
      this.cantidad=JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource=new MatTableDataSource(medicos);
      //this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    
    });
  }
}
