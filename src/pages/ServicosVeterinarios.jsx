import '../styles/ServicosVeterinarios.css'

function ServicosVeterinarios() {
    return (
        <>
            <div className="textoInicial">
                <h1>Serviços Veterinários</h1>
                <p>Encontre aqui clínicas veterinárias e Pet-Shops próximas ou na sua região.</p>
            </div>

            <div className="textoAux">
                <p>Clínicas Próximas:</p>
            </div>

            <div className='filtroVet'>
                <form type='text'>Bairro
                    <select name="bairros" id="bairros">
                        <option value="aflitos">Aflitos</option>
                        <option value="afogados">Afogados</option>
                        <option value="agua-fria">Água Fria</option>
                        <option value="alto-jose-bonifacio">Alto José Bonifácio</option>
                        <option value="alto-jose-do-pinho">Alto José do Pinho</option>
                        <option value="alto-do-mandu">Alto do Mandu</option>
                        <option value="alto-do-pascoal">Alto do Pascoal</option>
                        <option value="alto-santa-teresinha">Alto Santa Teresinha</option>
                        <option value="apipucos">Apipucos</option>
                        <option value="areias">Areias</option>
                        <option value="arruda">Arruda</option>
                        <option value="barro">Barro</option>
                        <option value="beberibe">Beberibe</option>
                        <option value="benfica">Benfica</option>
                        <option value="boa-viagem">Boa Viagem</option>
                        <option value="boa-vista">Boa Vista</option>
                        <option value="bomba-do-hemeterio">Bomba do Hemetério</option>
                        <option value="bongi">Bongi</option>
                        <option value="brasilia-teimosa">Brasília Teimosa</option>
                        <option value="brejo-do-beberibe">Brejo do Beberibe</option>
                        <option value="brejo-da-guabiraba">Brejo da Guabiraba</option>
                        <option value="cabanga">Cabanga</option>
                        <option value="cacote">Caçote</option>
                        <option value="cajueiro">Cajueiro</option>
                        <option value="campina-do-barreto">Campina do Barreto</option>
                        <option value="campo-grande">Campo Grande</option>
                        <option value="casa-amarela">Casa Amarela</option>
                        <option value="casa-forte">Casa Forte</option>
                        <option value="caxanga">Caxangá</option>
                        <option value="cidade-universitaria">Cidade Universitária</option>
                        <option value="coelhos">Coelhos</option>
                        <option value="cohab">Cohab</option>
                        <option value="comunidade-do-pilar">Comunidade do Pilar</option>
                        <option value="coque">Coque</option>
                        <option value="coqueiral">Coqueiral</option>
                        <option value="cordeiro">Cordeiro</option>
                        <option value="corrego-do-jenipapo">Córrego do Jenipapo</option>
                        <option value="curado">Curado</option>
                        <option value="derby">Derby</option>
                        <option value="dois-irmaos">Dois Irmãos</option>
                        <option value="dois-unidos">Dois Unidos</option>
                        <option value="encruzilhada">Encruzilhada</option>
                        <option value="engenho-do-meio">Engenho do Meio</option>
                        <option value="entra-apulso">Entra Apulso</option>
                        <option value="espinheiro">Espinheiro</option>
                        <option value="estancia">Estância</option>
                        <option value="fundao">Fundão</option>
                        <option value="gracas">Graças</option>
                        <option value="guabiraba">Guabiraba</option>
                        <option value="hipodromo">Hipódromo</option>
                        <option value="ibura">Ibura</option>
                        <option value="ilha-joana-bezerra">Ilha Joana Bezerra</option>
                        <option value="ilha-do-leite">Ilha do Leite</option>
                        <option value="ilha-do-retiro">Ilha do Retiro</option>
                        <option value="imbiribeira">Imbiribeira</option>
                        <option value="ipsep">Ipsep</option>
                        <option value="iputinga">Iputinga</option>
                        <option value="jaqueira">Jaqueira</option>
                        <option value="jardim-sao-paulo">Jardim São Paulo</option>
                        <option value="jiquia">Jiquiá</option>
                        <option value="jordao">Jordão</option>
                        <option value="linha-do-tiro">Linha do Tiro</option>
                        <option value="macaxeira">Macaxeira</option>
                        <option value="madalena">Madalena</option>
                        <option value="mangabeira">Mangabeira</option>
                        <option value="mangueira">Mangueira</option>
                        <option value="monteiro">Monteiro</option>
                        <option value="morro-da-conceicao">Morro da Conceição</option>
                        <option value="mustardinha">Mustardinha</option>
                        <option value="nova-descoberta">Nova Descoberta</option>
                        <option value="paissandu">Paissandu</option>
                        <option value="parnamirim">Parnamirim</option>
                        <option value="passarinho">Passarinho</option>
                        <option value="pau-ferro">Pau Ferro</option>
                        <option value="peixinhos">Peixinhos</option>
                        <option value="pina">Pina</option>
                        <option value="poco-da-panela">Poço da Panela</option>
                        <option value="ponte-duchoa">Ponte d’Uchoa</option>
                        <option value="ponto-de-parada">Ponto de Parada</option>
                        <option value="porto-da-madeira">Porto da Madeira</option>
                        <option value="prado">Prado</option>
                        <option value="recife">Recife (bairro)</option>
                        <option value="rosarinho">Rosarinho</option>
                        <option value="san-martin">San Martin</option>
                        <option value="sancho">Sancho</option>
                        <option value="santana">Santana</option>
                        <option value="santo-amaro">Santo Amaro</option>
                        <option value="santo-antonio">Santo Antônio</option>
                        <option value="sao-jose">São José</option>
                        <option value="setubal">Setúbal</option>
                        <option value="sitio-dos-pintos">Sítio dos Pintos</option>
                        <option value="soledade">Soledade</option>
                        <option value="tamarineira">Tamarineira</option>
                        <option value="tejipio">Tejipió</option>
                        <option value="torre">Torre</option>
                        <option value="torreao">Torreão</option>
                        <option value="torroes">Torrões</option>
                        <option value="toto">Totó</option>
                        <option value="varzea">Várzea</option>
                        <option value="vasco-da-gama">Vasco da Gama</option>
                        <option value="vila-tamandare">Vila Tamandaré</option>
                        <option value="zumbi">Zumbi</option>
                    </select>

                </form>
                <form type='text'>Preço</form>
                <form typeof='text'>Atendimento</form>

                <form typeof='text'>Categoria de Animais</form>
            </div>
        </>
    )
}

export default ServicosVeterinarios