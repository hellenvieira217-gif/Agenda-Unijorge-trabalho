import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';
import {
  validarTitulo,
  validarData,
  validarLocal,
  validarEmailResponsavel,
  validarVagas
} from '../../models/evento.validacao';

type CampoEvento = 'titulo' | 'data' | 'local' | 'emailResponsavel' | 'vagas';

@Component({
  selector: 'app-cadastro-evento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento {
  evento: Evento = this.criarEventoVazio();

  tocado: Record<CampoEvento, boolean> = {
    titulo: false,
    data: false,
    local: false,
    emailResponsavel: false,
    vagas: false
  };

  erros: Record<CampoEvento, string | null> = {
    titulo: null,
    data: null,
    local: null,
    emailResponsavel: null,
    vagas: null
  };

  eventos: Evento[] = [];
  private proximoId = 1;

  readonly locaisDisponiveis: string[] = [
    'Auditório',
    'Laboratório 1',
    'Laboratório 2',
    'Sala 101'
  ];

  criarEventoVazio(): Evento {
    return {
      id: 0,
      titulo: '',
      data: '',
      local: '',
      emailResponsavel: '',
      vagas: null
    };
  }

  validarCampo(campo: CampoEvento): void {
    switch (campo) {
      case 'titulo':
        this.erros.titulo = validarTitulo(this.evento.titulo);
        break;
      case 'data':
        this.erros.data = validarData(this.evento.data);
        break;
      case 'local':
        this.erros.local = validarLocal(this.evento.local);
        break;
      case 'emailResponsavel':
        this.erros.emailResponsavel = validarEmailResponsavel(this.evento.emailResponsavel);
        break;
      case 'vagas':
        this.erros.vagas = validarVagas(this.evento.vagas);
        break;
    }
  }

  aoSairCampo(campo: CampoEvento): void {
    this.tocado[campo] = true;
    this.validarCampo(campo);
  }

  aoAlterarCampo(campo: CampoEvento): void {
    if (this.tocado[campo]) {
      this.validarCampo(campo);
    }
  }

  formularioValido(): boolean {
    return (
      validarTitulo(this.evento.titulo) === null &&
      validarData(this.evento.data) === null &&
      validarLocal(this.evento.local) === null &&
      validarEmailResponsavel(this.evento.emailResponsavel) === null &&
      validarVagas(this.evento.vagas) === null
    );
  }

  salvar(): void {
    if (!this.formularioValido()) {
      return;
    }

    const novoEvento: Evento = {
      ...this.evento,
      id: this.proximoId++
    };

    this.eventos.push(novoEvento);
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.evento = this.criarEventoVazio();
    this.tocado = {
      titulo: false,
      data: false,
      local: false,
      emailResponsavel: false,
      vagas: false
    };
    this.erros = {
      titulo: null,
      data: null,
      local: null,
      emailResponsavel: null,
      vagas: null
    };
  }
}
