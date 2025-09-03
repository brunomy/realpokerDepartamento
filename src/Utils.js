export function formatarData(dataString) {
  if (!dataString) return "";

  // separa a parte da data e ignora o horário
  const [data] = dataString.split(" ");
  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

export function formatarDataHora(dataString) {
  if (!dataString) return "";

  // separa a data e hora
  const [data, hora] = dataString.split(" ");
  const [ano, mes, dia] = data.split("-");
  
  // Se não tem hora, retorna só a data
  if (!hora) {
    return `${dia}/${mes}/${ano}`;
  }
  
  // pega apenas horas e minutos (ignora segundos)
  const [horas, minutos] = hora.split(":");
  
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

// Função para converter data de dd/mm/yyyy para yyyy-mm-dd
export function converterDataParaBanco(dataString) {
  if (!dataString) return "";
  
  // Se já está no formato yyyy-mm-dd, retorna como está
  if (dataString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dataString;
  }
  
  // Se está no formato dd/mm/yyyy, converte para yyyy-mm-dd
  if (dataString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    const [dia, mes, ano] = dataString.split("/");
    return `${ano}-${mes}-${dia}`;
  }
  
  return dataString;
}

export function formatCEP(value) {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 2) {
      return cleanValue;
  } else if (cleanValue.length <= 5) {
      return cleanValue.slice(0, 2) + '.' + cleanValue.slice(2);
  }
  return cleanValue.slice(0, 2) + '.' + cleanValue.slice(2, 5) + '-' + cleanValue.slice(5, 8);
};

export function formatTelefone(value) {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 2) {
    return cleanValue;
  } else if (cleanValue.length <= 6) {
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
  } else if (cleanValue.length <= 10) {
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`;
  } else {
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`;
  }
};

export function formatCpfCnpj(value) {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 11) {
    // Formato CPF: 999.999.999-99
    if (cleanValue.length <= 3) {
      return cleanValue;
    } else if (cleanValue.length <= 6) {
      return cleanValue.slice(0, 3) + '.' + cleanValue.slice(3);
    } else if (cleanValue.length <= 9) {
      return cleanValue.slice(0, 3) + '.' + cleanValue.slice(3, 6) + '.' + cleanValue.slice(6);
    } else {
      return cleanValue.slice(0, 3) + '.' + cleanValue.slice(3, 6) + '.' + cleanValue.slice(6, 9) + '-' + cleanValue.slice(9, 11);
    }
  } else {
    // Formato CNPJ: 99.999.999/9999-99
    if (cleanValue.length <= 2) {
      return cleanValue;
    } else if (cleanValue.length <= 5) {
      return cleanValue.slice(0, 2) + '.' + cleanValue.slice(2);
    } else if (cleanValue.length <= 8) {
      return cleanValue.slice(0, 2) + '.' + cleanValue.slice(2, 5) + '.' + cleanValue.slice(5);
    } else if (cleanValue.length <= 12) {
      return cleanValue.slice(0, 2) + '.' + cleanValue.slice(2, 5) + '.' + cleanValue.slice(5, 8) + '/' + cleanValue.slice(8);
    } else {
      return cleanValue.slice(0, 2) + '.' + cleanValue.slice(2, 5) + '.' + cleanValue.slice(5, 8) + '/' + cleanValue.slice(8, 12) + '-' + cleanValue.slice(12, 14);
    }
  }
};

// Funções de validação
export function validarCEP(cep) {
  if (!cep) return false;
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8 && /^\d{8}$/.test(cleanCEP);
}

export function validarTelefone(telefone) {
  if (!telefone) return false;
  const cleanTelefone = telefone.replace(/\D/g, '');
  // Aceita telefone fixo (10 dígitos) ou celular (11 dígitos)
  return cleanTelefone.length === 10 || cleanTelefone.length === 11;
}

export function validarCPF(cpf) {
  if (!cpf) return false;
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto < 2 ? 0 : resto;
  
  if (parseInt(cleanCPF.charAt(9)) !== digito1) return false;
  
  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = resto < 2 ? 0 : resto;
  
  return parseInt(cleanCPF.charAt(10)) === digito2;
}

export function validarCNPJ(cnpj) {
  if (!cnpj) return false;
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
  
  // Validação do primeiro dígito verificador
  let tamanho = cleanCNPJ.length - 2;
  let numeros = cleanCNPJ.substring(0, tamanho);
  let digitos = cleanCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  
  // Validação do segundo dígito verificador
  tamanho = tamanho + 1;
  numeros = cleanCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado === parseInt(digitos.charAt(1));
}

export function validarCpfCnpj(documento) {
  if (!documento) return false;
  const cleanDoc = documento.replace(/\D/g, '');
  
  if (cleanDoc.length === 11) {
    return validarCPF(documento);
  } else if (cleanDoc.length === 14) {
    return validarCNPJ(documento);
  }
  
  return false;
}

export function calcularTempoAtividade(atividade) {
  if (!atividade) return "00:00:00";

  const { tempo = 0, inicio, pausa, fim, id_status } = atividade;
  
  // Converte tempo armazenado (segundos) para base
  let tempoTotal = parseInt(tempo) || 0;
  
  if (id_status === 2) { // Em andamento
    if (inicio && !pausa) {
      const agora = new Date();
      const dataInicio = new Date(inicio);
      const tempoDecorrido = Math.floor((agora - dataInicio) / 1000);
      tempoTotal = tempoDecorrido;
    } else {
      const agora = new Date();
      const dataInicio = new Date(pausa);
      const tempoDecorrido = Math.floor((agora - dataInicio) / 1000);
      tempoTotal = tempoTotal + tempoDecorrido;
    }
  }
  
  // Converte segundos para formato HH:MM:SS
  return formatarSegundos(tempoTotal);
}

// Função auxiliar para formatar segundos em HH:MM:SS
export function formatarSegundos(segundos) {
  if (segundos < 0) segundos = 0;
  
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = segundos % 60;
  
  // Se houver horas, retorna HH:MM:SS
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
}