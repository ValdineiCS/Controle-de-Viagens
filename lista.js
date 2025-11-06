let lista=document.getElementById('lista');
let filtro=document.getElementById('filtro');
let btnBuscar=document.getElementById('btnBuscar');
let btnResetar=document.getElementById('btnResetar');

let viagens=JSON.parse(localStorage.getItem('viagens')) ||[];

function renderizar(viagensParaMostrar = viagens){
    if(viagensParaMostrar.length==0){
        lista.textContent='Nenhuma viagem cadastrada'
        return;
    }

    lista.textContent=''

    viagensParaMostrar.forEach((v, index) => {
        const card=document.createElement('div');
        card.className='card'

        card.innerHTML=`<p><strong>Origem:</strong> ${v.origem}</p>
        <p><strong>Destino:</strong> ${v.destino}</p>
        <p><strong>Valor:</strong> R$ ${v.valor.toFixed(2)}</p>
        <button class="excluir" data-index="${index}"> Excluir</button>`;

       lista.appendChild(card);

    });

    document.querySelectorAll('.excluir').forEach(btn=>{
        btn.addEventListener('click', e=>{
            const i=e.target.dataset.index;
            viagens.splice(i, 1);
            localStorage.setItem('viagens', JSON.stringify(viagens));
            renderizar();
        })
    })
}

btnBuscar.addEventListener('click', ()=>{
    let termo=filtro.value.toLowerCase().trim();
    let filtradas=viagens.filter(v=> v.origem.toLowerCase().includes(termo)||v.destino.toLowerCase().includes(termo)

)
    renderizar(filtradas);
});

btnResetar.addEventListener('click', ()=>{
    filtro.value="";
    renderizar();
})

renderizar()