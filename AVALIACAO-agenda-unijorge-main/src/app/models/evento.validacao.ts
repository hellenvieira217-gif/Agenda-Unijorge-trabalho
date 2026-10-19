export function validarTitulo(titulo: string): string | null {
  if (!titulo || titulo.trim().length < 5 || titulo.trim().length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }
  return null;
}

export function validarData(data: string): string | null {
  if (!data || data.trim() === '') {
    return 'A data não pode estar no passado.';
  }

  // Compara com a data atual no formato aaaa-mm-dd (hoje é aceito)
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  const hojeStr = `${ano}-${mes}-${dia}`;

  if (data < hojeStr) {
    return 'A data não pode estar no passado.';
  }

  return null;
}

export function validarLocal(local: string): string | null {
  if (!local || local.trim() === '') {
    return 'O local não pode ficar em branco.';
  }
  return null;
}

export function validarEmailResponsavel(emailResponsavel: string): string | null {
  if (!emailResponsavel || emailResponsavel.trim() === '') {
    return 'E-mail em formato inválido.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailResponsavel.trim())) {
    return 'E-mail em formato inválido.';
  }

  return null;
}

export function validarVagas(vagas: number | null): string | null {
  if (
    vagas === null ||
    vagas === undefined ||
    isNaN(Number(vagas)) ||
    !Number.isInteger(Number(vagas)) ||
    Number(vagas) < 1 ||
    Number(vagas) > 200
  ) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }

  return null;
}