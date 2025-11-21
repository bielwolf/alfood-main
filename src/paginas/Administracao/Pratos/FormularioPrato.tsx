import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import http from "../../../http";
import { ITag } from "../../../interfaces/ITags";
import IRestaurante from "../../../interfaces/IRestaurante";


const FormularioPrato = () => {


    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')

    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([])

    const [imagem, setImagem] = useState<File | null>(null)

    const [restaurante, setRestaurante] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])


    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();
        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante) 

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                alert('Prato cadastrado com sucesso!')
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                setImagem(null)
            })
            .catch(erro => {
                console.log(erro)
                alert('Erro ao cadastrar prato.')
            })
    }
    return (


        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">Formulario de Pratos</Typography>
                        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomePrato}
                                onChange={evento => setNomePrato(evento.target.value)}
                                label="Nome do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                            />
                            <TextField
                                value={descricao}
                                onChange={evento => setDescricao(evento.target.value)}
                                label="Descrição do Prato"
                                variant="standard"
                                fullWidth
                                required
                            />

                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-tag">Tag</InputLabel>
                                <Select value={tag} onChange={evento => setTag(evento.target.value)} labelId="select-tag">
                                    {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                <Select value={restaurante} onChange={evento => setRestaurante(evento.target.value)} labelId="select-restaurante">
                                    {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <input type="file" onChange={selecionarArquivo} />

                            <Button
                                type="submit"
                                fullWidth variant="outlined"
                                sx={{ marginTop: 1 }}
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>


    )
}

export default FormularioPrato