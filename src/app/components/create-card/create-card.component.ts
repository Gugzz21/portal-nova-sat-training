import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Importante para o preview
import { CardService } from '../../service/card.service';
import { CommonModule } from '@angular/common'; // Caso precise de diretivas comuns

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule], // Adicione MatIconModule
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent {
  cardForm: FormGroup;
  iconPreview: string | ArrayBuffer | null = null;

  // Controla qual input está visível
  inputType: 'image' | 'icon' = 'image';

  constructor(private fb: FormBuilder, private cardService: CardService) {
    this.cardForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      // Adicionamos um campo para salvar se é 'image' ou 'icon'
      role: ['image', Validators.required]
    });
  }

  // Função para trocar o modo de input
  switchInputType(role: 'image' | 'icon') {
    this.inputType = role;
    this.cardForm.get('role')?.setValue(role);

    // Limpa o valor anterior do ícone para evitar erros
    this.cardForm.get('imagem')?.setValue('');
    this.iconPreview = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.iconPreview = reader.result;
        this.cardForm.patchValue({ imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  createCard() {
    if (this.cardForm.valid) {
      // Envia o objeto completo (agora inclui o campo 'type')
      this.cardService.criarCard(this.cardForm.value).subscribe({
        next: () => {
          this.cardForm.reset({ role: 'image' }); // Reseta mantendo o padrão imagem
          this.inputType = 'image';
          this.iconPreview = null;
          alert('Card criado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao criar card:', err);
          alert('Erro ao criar card: ' + JSON.stringify(err));
        }
      });
    }
  }
}
