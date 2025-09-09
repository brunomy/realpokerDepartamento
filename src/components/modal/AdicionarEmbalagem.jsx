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
    volumesSelecionados, setVolumesSelecionados,
    volumes
}) {

    useEffect(() => {
        setVolumesSelecionados([]);
        setAltura('');
        setLargura('');
        setComprimento('');
        setPeso('');
        setDescricao('');
    }, []);
    
    const columns = [
        { field: "descricao", headerName: "Volume", width: 420 },
        { field: "pedido", headerName: "Pedido", width: 80 },
    ];

    const createData = (volume) => {
        const id = volume.id;
        const descricao = volume.volume;
        const pedido = volume.id_pedido;

        return { id, descricao, pedido };
    };

    const rows = volumes.map((volume, index) => createData(volume));

    return (
        <Box className="adicionarEmbalagem">
            <form action="">
                <div>
                    <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)}
                        label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="half">
                    <TextField value={comprimento} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d+$/.test(value)) {
                                setComprimento(value);
                            }
                        }} 
                        label="Comprimento" variant="outlined" sx={{width: '100%'}} slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            },
                    }} />
                </div>
                <div className="half">
                    <TextField value={largura} onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d+$/.test(value)) {
                                setLargura(value);
                            }
                        }} label="Largura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="half">
                    <TextField value={altura} onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d+$/.test(value)) {
                                setAltura(value);
                            }
                        }} label="Altura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="half">
                    <TextField value={peso} onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d+$/.test(value)) {
                                setPeso(value);
                            }
                        }} label="Peso" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">gramas</InputAdornment>,
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
