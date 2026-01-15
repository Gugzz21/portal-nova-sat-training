import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CardService } from '../../service/card.service';
import { CommonModule } from '@angular/common'; // Caso precise de diretivas comuns
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, MatFormFieldModule, MatSelectModule], // Adicione MatIconModule
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  cardForm: FormGroup;
  iconPreview: string | ArrayBuffer | null = null;
  isEditing = false;
  cardId: number | null = null;

  // Controla o tipo de input para a imagem (apenas UI)
  inputType: 'image' | 'icon' = 'image';

  // Opções de Role para o select
  roleOptions = [
    { value: 'ROLE_ABERTO', label: 'Aberto' },
    { value: 'ROLE_FINALIZADO', label: 'Finalizado' },
    { value: 'ROLE_CANCELADO', label: 'Cancelado' }
  ];

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cardForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      // Regra de negócio: Card sempre nasce como ROLE_ABERTO
      role: ['ROLE_ABERTO', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verifica se há um ID na rota para edição
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.cardId = +id;
        this.loadCardData(this.cardId);
      }
    });
  }

  loadCardData(id: number) {
    this.cardService.obterCardPorId(id).subscribe({
      next: (card) => {
        this.cardForm.patchValue({
          titulo: card.titulo,
          descricao: card.descricao,
          imagem: card.imagem,
          role: card.role
        });

        // Tenta inferir o tipo de imagem
        if (card.imagem && (card.imagem.includes('/') || card.imagem.includes('data:'))) {
          this.inputType = 'image';
          this.iconPreview = card.imagem;
        } else {
          this.inputType = 'icon';
          this.iconPreview = null; // Ícones Material não usam preview de imagem
        }
      },
      error: (err) => {
        console.error('Erro ao carregar card:', err);
        alert('Erro ao carregar dados do card.');
      }
    });
  }

  // Alterna entre upload de imagem e texto para ícone (apenas UI)
  switchInputType(type: 'image' | 'icon') {
    this.inputType = type;
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

  saveCard() {
    if (this.cardForm.valid) {
      const cardData = this.cardForm.value;

      if (this.isEditing && this.cardId) {
        // Atualizar
        const updatedCard = { ...cardData, id: this.cardId };
        this.cardService.atualizarCard(updatedCard).subscribe({
          next: () => {
            alert('Card atualizado com sucesso!');
            this.router.navigate(['/cards']);
          },
          error: (err) => {
            console.error('Erro ao atualizar card:', err);
            alert('Erro ao atualizar card: ' + JSON.stringify(err));
          }
        });
      } else {
        // Criar
        this.cardService.criarCard(cardData).subscribe({
          next: () => {
            alert('Card criado com sucesso!');
            this.router.navigate(['/cards']);
          },
          error: (err) => {
            console.error('Erro ao criar card:', err);
            alert('Erro ao criar card: ' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
