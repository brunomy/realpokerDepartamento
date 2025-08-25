export function formatarData(dataString) {
  if (!dataString) return "";

  // separa a parte da data e ignora o horário
  const [data] = dataString.split(" ");
  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}