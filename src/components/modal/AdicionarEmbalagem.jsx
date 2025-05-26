import '~/assets/scss/AdicionarEmbalagem.scss'

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DataTableSelect from "~/components/DataTableSelect";
import { useUser } from "~/context/UserContext";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function AdicionarEmbalagem({
    descricao, setDescricao,
    comprimento, setComprimento,
    largura, setLargura,
    altura, setAltura,
    peso, setPeso,
    volumesSelecionados, setVolumesSelecionados
}) {
    const { volumes, volumesOP, checklistOP, checklists } = useUser();
    const [volumesCheckados, setVolumesCheckados] = useState([]);


    const volumesNaoEmbalados = volumesOP.filter(
        (volume) => volume.id_embalagem === null
    );

    useEffect(() => {
        setVolumesCheckados([]);
        const novosCheckados = [];

        setDescricao('')
        setComprimento('')
        setLargura('')
        setAltura('')
        setPeso('')

        volumesNaoEmbalados.forEach((volume) => {
            const volumeChecklists = checklists.filter(
                (checklist) => checklist.id_atividade === volume.id_atividade
            );
            const checklistsFinalizados = volumeChecklists.filter((item) => {
                const checkOP = checklistOP.find(
                    (c) => c.id_checklist === item.id
                );
                return checkOP?.status;
            });

            if (
                volumeChecklists.length > 0 &&
                checklistsFinalizados.length === volumeChecklists.length
            ) {
                novosCheckados.push(volume);
            }
        });

        setVolumesCheckados(novosCheckados);
    }, [volumesOP, checklistOP, checklists]);


    const columns = [
        { field: "descricao", headerName: "Volume", width: 420 },
        { field: "pedido", headerName: "Pedido", width: 80 },
    ];

    const createData = (volume) => {
        const id = volume.id;
        const descricao = volumes.find((v) => v.id == volume.id_volume).title;
        const pedido = "5951";

        return { id, descricao, pedido };
    };

    const rows = volumesCheckados.map((volume, index) => createData(volume));

    return (
        <Box className="adicionarEmbalagem">
            <form action="">
                <div>
                    <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)}
                        label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="half">
                    <TextField value={comprimento} onChange={(e) => setComprimento(e.target.value)} label="Comprimento" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="half">
                    <TextField value={largura} onChange={(e) => setLargura(e.target.value)} label="Largura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="half">
                    <TextField value={altura} onChange={(e) => setAltura(e.target.value)} label="Altura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="half">
                    <TextField value={peso} onChange={(e) => setPeso(e.target.value)} label="Peso" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        },
                    }} />
                </div>
            </form>
            <DataTableSelect
                ids={volumesSelecionados}
                setIds={setVolumesSelecionados}
                rows={rows}
                columns={columns}
            />
        </Box>
    );
}
