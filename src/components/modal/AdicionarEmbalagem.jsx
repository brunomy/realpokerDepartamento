import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DataTableSelect from "~/components/DataTableSelect";
import { useUser } from "~/context/UserContext";

export default function AdicionarEmbalagem() {
    const { volumes, volumesOP, checklistOP, checklists } = useUser();

    const volumesNaoEmbalados = volumesOP.filter(
        (volume) => volume.id_embalagem === null
    );

    const [volumesCheckados, setVolumesCheckados] = useState([]);

    useEffect(() => {
        const novosCheckados = [];

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

    // Para teste, exibe no console
    useEffect(() => {
        console.log("Volumes checkados:", volumesCheckados);
    }, [volumesCheckados]);

    const [ids, setIds] = useState([]);

    const columns = [
        { field: "descricao", headerName: "Descrição", width: 340 },
        { field: "pedido", headerName: "Pedido", width: 80 },
        { field: "ordem", headerName: "Ordem", width: 80 },
    ];

    // Aqui você pode adaptar volumesCheckados para se tornar os rows

    const createData = (volume) => {
        const id = volume.id;
        const descricao = volumes.find((v) => v.id == volume.id_volume).title;
        const pedido = "5951";
        const ordem = "5951-1";

        return { id, descricao, pedido, ordem };
    };

    const rows = volumesCheckados.map((volume, index) => createData(volume));

    return (
        <Box className="adicionarEmbalagem">
            <DataTableSelect
                ids={ids}
                setIds={setIds}
                rows={rows}
                columns={columns}
            />
        </Box>
    );
}
