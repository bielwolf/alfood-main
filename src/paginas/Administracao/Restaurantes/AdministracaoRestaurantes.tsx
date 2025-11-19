import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://0.0.0.0:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    return (
        <TableContainer  component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restautente => <TableRow key={restautente.id}>
                         <TableCell>
                            {restautente.nome}
                         </TableCell>
                         </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes