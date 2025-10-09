'use strict'

const container = document.getElementById('container')


async function criarLiturgiaDiaDesejado() {
    const inputData = document.getElementById('inputData').value
    const partesDaData = inputData.split('-')

    const ano = partesDaData[0]
    const mes = partesDaData[1]
    const dia = partesDaData[2]
    const url = `https://liturgia.up.railway.app/v2/?dia=${dia}&mes=${mes}&ano=${ano}`
    const response = await fetch(url)
    const dados = await response.json()

    criarTextos(dados)

}



async function buscarLiturgiaAtual() {
    const url = `https://liturgia.up.railway.app/v2/`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarTextos(informacoes) {
    container.textContent = ''
    try {
        const dados = await informacoes

        const data = document.createElement('h2')
        data.textContent = dados.data
        container.appendChild(data)


        const semana = document.createElement('h2')
        semana.textContent = dados.liturgia
        container.appendChild(semana)

        const corLiturgica = document.createElement('h2')
        corLiturgica.textContent = `Cor litúrgica: ${dados.cor}`
        container.appendChild(corLiturgica)

        const coleta = document.createElement('p')
        coleta.textContent = dados.oracoes.coleta
        const tituloColeta = document.createElement('h3')
        tituloColeta.textContent = 'Oração coleta:'
        container.appendChild(tituloColeta)
        container.appendChild(coleta)

        const oferendas = document.createElement('p')
        oferendas.textContent = dados.oracoes.oferendas
        const tituloOferendas = document.createElement('h3')
        tituloOferendas.textContent = 'Sobre as oferendas:'
        container.appendChild(tituloOferendas)
        container.appendChild(oferendas)

        const posComunhao = document.createElement('p')
        posComunhao.textContent = dados.oracoes.comunhao
        const tituloPosComunhao = document.createElement('h3')
        tituloPosComunhao.textContent = 'Oração pós comunhão:'
        container.appendChild(tituloPosComunhao)
        container.appendChild(posComunhao)

        if (dados.oracoes.extras.length > 0) {
            dados.oracoes.extras.forEach(oracoesExtras => {
                const tituloOracaoExtra = document.createElement('h3')
                tituloOracaoExtra.textContent = oracoesExtras.titulo

                const textoOracaoExtra = document.createElement('p')
                textoOracaoExtra.textContent = oracoesExtras.texto

                container.appendChild(tituloOracaoExtra)
                container.appendChild(textoOracaoExtra)

            })
        }

        if (dados.leituras.primeiraLeitura) {
            dados.leituras.primeiraLeitura.forEach(dadosPrimeiraLeitura => {
                const primeiraLeitura = document.createElement('p')
                primeiraLeitura.textContent = dadosPrimeiraLeitura.texto
                const referenciaPrimeiraLeitura = document.createElement('h3')
                referenciaPrimeiraLeitura.textContent = `Primeira Leitura (${dadosPrimeiraLeitura.referencia})`
                const tituloPrimeiraLeitura = document.createElement('h3')
                tituloPrimeiraLeitura.textContent = dadosPrimeiraLeitura.titulo
                container.appendChild(referenciaPrimeiraLeitura)
                container.appendChild(tituloPrimeiraLeitura)
                container.appendChild(primeiraLeitura)

            })
        }


        if (dados.leituras.salmo.length > 0) {
            dados.leituras.salmo.forEach(dadosSalmo => {
                const salmo = document.createElement('p')
                salmo.textContent = dadosSalmo.texto
                const referenciaSalmo = document.createElement('h3')
                referenciaSalmo.textContent = `Salmo (${dadosSalmo.referencia})`
                const refraoSalmo = document.createElement('h3')
                refraoSalmo.textContent = dadosSalmo.refrao
                container.appendChild(referenciaSalmo)
                container.appendChild(refraoSalmo)
                container.appendChild(salmo)

            })
        }

        if (dados.leituras.segundaLeitura.length > 0) {
            dados.leituras.segundaLeitura.forEach(dadosSegundaLeitura => {
                const tituloSegundaLeitura = document.createElement('h3')
                tituloSegundaLeitura.textContent = dadosSegundaLeitura.titulo

                const referenciaSegundaLeitura = document.createElement('h3')
                referenciaSegundaLeitura.textContent = `Segunda Leitura (${dadosSegundaLeitura.referencia})`

                const textoSegundaLeitura = document.createElement('p')
                textoSegundaLeitura.textContent = dadosSegundaLeitura.texto

                container.appendChild(referenciaSegundaLeitura)
                container.appendChild(tituloSegundaLeitura)
                container.appendChild(textoSegundaLeitura)
            })
        }

        if (dados.leituras.extras.length > 0) {
            dados.leituras.extras.forEach(dadosLeiturasExtras => {
                //const tipoLeituraExtra = document.createElement('h3')
                //tipoLeituraExtra.textContent = dadosLeiturasExtras.tipo

                const tituloLeituraExtra = document.createElement('h3')
                tituloLeituraExtra.textContent = dadosLeiturasExtras.titulo

                const referenciaTipoLeituraExtra = document.createElement('h3')
                referenciaTipoLeituraExtra.textContent = dadosLeiturasExtras.tipo && dadosLeiturasExtras.referencia

                const textoLeituraExtra = document.createElement('p')
                textoLeituraExtra.textContent = dadosLeiturasExtras.texto

                if (referenciaTipoLeituraExtra) {
                    container.appendChild(referenciaTipoLeituraExtra)
                }
                container.appendChild(tituloLeituraExtra)
                container.appendChild(textoLeituraExtra)
            })

        }

        dados.leituras.evangelho.forEach(dadosEvangelho => {
            const tituloEvangelho = document.createElement('h3')
            tituloEvangelho.textContent = dadosEvangelho.titulo

            const referenciaEvangelho = document.createElement('h3')
            referenciaEvangelho.textContent = `Evangelho (${dadosEvangelho.referencia})`

            const textoEvangelho = document.createElement('p')
            textoEvangelho.textContent = dadosEvangelho.texto

            container.appendChild(referenciaEvangelho)
            container.appendChild(tituloEvangelho)
            container.appendChild(textoEvangelho)
        })

        if (dados.antifonas) {

            const tituloAntifonaEntrada = document.createElement('h3')
            tituloAntifonaEntrada.textContent = 'Antífona de Entrada:'
            const textoAntifonaEntrada = document.createElement('p')
            textoAntifonaEntrada.textContent = dados.antifonas.entrada
            container.appendChild(tituloAntifonaEntrada)
            container.appendChild(textoAntifonaEntrada)

            const tituloAntifonaComunhao = document.createElement('h3')
            tituloAntifonaComunhao.textContent = 'Antífona de Comunhão:'
            const textoAntifonaComunhao = document.createElement('p')
            textoAntifonaComunhao.textContent = dados.antifonas.comunhao
            container.appendChild(tituloAntifonaComunhao)
            container.appendChild(textoAntifonaComunhao)
        }


    } catch (error) {
        const erro = document.createElement('h3')
        erro.textContent = 'Liturgia não encontrada'
        container.appendChild(erro)
    }
}

criarTextos(buscarLiturgiaAtual())