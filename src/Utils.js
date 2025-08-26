export function formatarData(dataString) {
  if (!dataString) return "";

  // separa a parte da data e ignora o horário
  const [data] = dataString.split(" ");
  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
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