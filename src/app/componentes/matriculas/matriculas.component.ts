import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SEOService } from 'src/app/service/seo.service';
import { ToastService } from 'src/app/service/ToastService';


@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit {

  ver: any;
  cargardo: boolean = false;
  url: string = "https://script.google.com/macros/s/AKfycbxheOeAfdCDRAOWHNabiCEycqXvhKQl6ZynWJ4Ty6jSagAQNXbAxtdpuWLgDX_PIfZN/exec";
  telefonoNumero: any = null;
  otro: string = "value";

  form: FormGroup;
  validado: boolean = false;
  rutApoderado: FormControl = new FormControl("", [Validators.required]);
  nombreApoderado: FormControl = new FormControl("", [Validators.required]);
  apellidoApoderado: FormControl = new FormControl("", [Validators.required]);
  parentescoApoderado: FormControl = new FormControl("", [Validators.required]);
  otroParentesco: FormControl = new FormControl("",[Validators.required]);
  telefono: FormControl = new FormControl("", [Validators.required, Validators.maxLength(8), Validators.minLength(8)]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);

  rutAlumno: FormControl = new FormControl("", [Validators.required]);
  nombreAlumno: FormControl = new FormControl("", [Validators.required]);
  apellidoAlumno: FormControl = new FormControl("", [Validators.required]);
  fechaNacimientoAlumno: FormControl = new FormControl("", [Validators.required]);

  honeypot: FormControl = new FormControl("");
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage: string = ''; // the response message to show to the user

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    public toastService: ToastService, private router: Router, private seoService: SEOService) {
    this.form = this.formBuilder.group({
      rutApoderado: this.rutApoderado,
      nombreApoderado: this.nombreApoderado,
      apellidoApoderado: this.apellidoApoderado,
      parentescoApoderado: this.parentescoApoderado,
      otroParentesco: this.otroParentesco,
      telefono: this.telefono,
      email: this.email,

      rutAlumno: this.rutAlumno,
      nombreAlumno: this.nombreAlumno,
      apellidoAlumno: this.apellidoAlumno,
      fechaNacimientoAlumno: this.fechaNacimientoAlumno,
      honeypot: this.honeypot
    });
    this.form.get("otroParentesco")?.setValue(this.otro);
  }

  ngOnInit(): void {
    this.seoService.createLinkForCanonicalURL();
  }

  validarOtro(): boolean {
    let value = this.form.get("parentescoApoderado")?.value


    if(value ==="o")
    {
      if(this.form.get("otroParentesco")?.value === this.otro){
        this.form.get("otroParentesco")?.setValue(null);
      }
      return true;
    }
    this.form.get("otroParentesco")?.setValue(this.otro);
    return false;
  }

  validate(event: Event) {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.validado = true;
    form.classList.add('was-validated');
  }


  validarPhone(): boolean {

    var form = document.getElementsByName('telefono')[0] as HTMLFormElement;
    let numer: number = parseInt(this.form.get("telefono")?.value);
    if (isNaN(numer)) {
      this.telefonoNumero = null;
      this.telefono.setValue("");
      if (this.validado) {
        form.classList.add('is-invalid')
        form.classList.remove('numero')
      }
      return false;
    }

    this.telefono.setValue(numer);

    if (numer < 100000000) {
      if (this.validado) {
        form.classList.add('is-invalid')
        form.classList.add('numero')
      }
      return false;
    } else {
      form.classList.remove('is-invalid');
      form.classList.remove('numero')
      return true;
    }
  }

  obtenerDatos(): any {
    var formData: any = new FormData();

    formData.append("Rut Apoderado", this.form.get("rutApoderado")?.value);
    formData.append("Nombre Apoderado", this.form.get("nombreApoderado")?.value);
    formData.append("Apellido Apoderado", this.form.get("apellidoApoderado")?.value);

    let valueParentesco = this.form.get("parentescoApoderado")?.value
    if(valueParentesco === "o"){
      valueParentesco = this.form.get("otroParentesco")?.value
    }
    formData.append("Parentesco Apoderado", valueParentesco);

    formData.append("Telefono", this.form.get("telefono")?.value);
    formData.append("Correo", this.form.get("email")?.value);

    formData.append("Rut Alumno", this.form.get("rutAlumno")?.value);
    formData.append("Nombre Alumno", this.form.get("nombreAlumno")?.value);
    formData.append("Apellido Alumno", this.form.get("apellidoAlumno")?.value);
    formData.append("Fecha Nacimiento", this.form.get("fechaNacimientoAlumno")?.value);


    return formData;
  }

  onSubmit() {
    if (this.form.status == "VALID" && this.honeypot.value == "" && this.validarPhone()) {
      this.cargardo = true;
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = this.obtenerDatos()
      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      this.http.post(this.url, formData).subscribe(
        (response: any) => {
          // choose the response message
          if (response["result"] == "success") {
            this.responseMessage = "Thanks for the message! I'll get back to you soon!";
            this.toastService.show('Su solicitud fue enviada con éxito', { classname: 'bg-success mt-3 fw-bold text-light', delay: 5000 });
            this.redirecciona()
          } else {
            this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
            this.toastService.show('Error al enviar la informacion favor intentelo nuevamente', { classname: 'bg-danger mt-3 fw-bold text-light', delay: 5000 });
            this.form.enable();
          }
          // re enable the form after a success
          this.cargardo = false;
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(response);
        },
        (error) => {
          this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          this.cargardo = false;
          this.toastService.show('Error al conectarce con el servidor, favor intentelo mas tarde', { classname: 'bg-danger mt-3 fw-bold text-light', delay: 5000 });
          console.log(error);
        }
      );
    }
  }

  async redirecciona() {
    await new Promise(f => setTimeout(f, 5000));
    this.router.navigateByUrl('/home');
  }

}
