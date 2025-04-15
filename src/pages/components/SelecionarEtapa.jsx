import '~/assets/scss/SelecionarEtapa.scss';
import { useEffect, useState } from 'react';
import { Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useUser } from '~/context/UserContext';

export default function SelecionarEtapa({ etapas, selecionadas, setSelecionadasModal }) {
  const [selecionadasLocal, setSelecionadasLocal] = useState([]);
  const { atividadesOP } = useUser();

  // sincroniza quando o modal abre
  useEffect(() => {
    setSelecionadasLocal(selecionadas || []);
  }, [selecionadas]);

  const handleChange = (event, id) => {
    const checked = event.target.checked;

    const atualizado = checked
      ? [...selecionadasLocal, id]
      : selecionadasLocal.filter(item => item !== id);

    setSelecionadasLocal(atualizado);
    setSelecionadasModal(atualizado); // <== Isso é o que atualiza o estado no componente pai!
  };

  return (
    <Box className="selecionar_etapa_modal">
      <FormGroup>
        {etapas.map((etapa) => (
          <FormControlLabel
            key={etapa.id}
            control={
              <Checkbox
                disabled={!!atividadesOP.find(item => item.id_etapa === etapa.id && item.ativo === 1)}
                checked={selecionadasLocal.includes(etapa.id)}
                onChange={(e) => handleChange(e, etapa.id)}
              />
            }
            label={etapa.title}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
