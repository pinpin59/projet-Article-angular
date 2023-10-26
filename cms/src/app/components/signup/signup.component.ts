import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  username?: string;
  password?: string;
  bio?: string;
  registrationForm!: FormGroup;

  constructor(private dataService: DataService,private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      bio: [''],
    });
  }

  onSubmit() {
    if (this.registrationForm?.valid) {
      const { username, password, bio } = this.registrationForm.value;
      // Envoyez les données au service UserService pour l'inscription.
      console.log(password)
      this.dataService.createUser(username, password, bio).subscribe(
        (response) => {
          // Gérez la réponse de l'API (par exemple, affichez un message de confirmation)
          console.log('Utilisateur créé avec succès:', response);
        },
        (error) => {
          // Gérez les erreurs (par exemple, affichez un message d'erreur)
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
      );
    }else{
      console.log("error")
    }
  }
    
}
