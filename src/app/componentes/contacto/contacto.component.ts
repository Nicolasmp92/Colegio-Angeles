import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SEOService } from 'src/app/service/seo.service';
import { ToastService } from 'src/app/service/ToastService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, OnDestroy{

  telefonoNumero: any = null;

  validado: boolean = false;

  cargardo: boolean = false;

  urlCorreo: string = "https://script.google.com/macros/s/AKfycbwM8hDD0a-n4cSAF_Hncyd-aOKbKgbxzCyZE3nYVlP4FE9Mk7BNf45-I5_XbsYB_LCy/exec";

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required]);
  telefono: FormControl = new FormControl("", [Validators.required, Validators.maxLength(8), Validators.minLength(8)]);
  empresa: FormControl = new FormControl("", [Validators.required]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage: string = ''; // the response message to show to the user

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    public toastService: ToastService, private router: Router, private seoService: SEOService) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      telefono: this.telefono,
      empresa: this.empresa,
      honeypot: this.honeypot
    });
  }

  ngOnInit(): void {
    this.seoService.createLinkForCanonicalURL();
  }

  ngOnDestroy(): void {
  }

  validate(event: Event) {
    
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    console.log(form);
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

  onSubmit() {

    if (this.form.status == "VALID" && this.honeypot.value == "" && this.validarPhone()) {
      this.cargardo = true;
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("name", this.form.get("name")?.value);
      formData.append("Asunto", this.form.get("empresa")?.value);
      formData.append("telefono", this.form.get("telefono")?.value);
      formData.append("email", this.form.get("email")?.value);
      formData.append("message", this.form.get("message")?.value);
      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      this.http.post(this.urlCorreo, formData).subscribe(
        (response: any) => {
          // choose the response message
          if (response["result"] == "success") {
            this.responseMessage = "Thanks for the message! I'll get back to you soon!";
            this.toastService.show('Su solicitud fue enviada con éxito', { classname: 'bg-success mt-3 fw-bold text-light', delay: 4000 });
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
    this.ngOnDestroy()
    this.router.navigateByUrl('/matriculas', {skipLocationChange: true}).then(()=> this.router.navigate(["/home"]));
  }

}
