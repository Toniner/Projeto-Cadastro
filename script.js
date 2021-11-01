const masks = {
    cpf(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    },

    phone(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
    },

    celular(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
    },

}

document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)
})

class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null
    }


    salvar() {
        let produto = this.lerDados();
        let cadastros = localStorage.getItem("produtos");

        if (cadastros == null) cadastros = [];
        else cadastros = JSON.parse(cadastros);

        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                cadastros.push(produto)
                localStorage.setItem("produtos", JSON.stringify(cadastros));
            } else {
                this.atualizar(this.editId, produto);
            }
        }

        location.reload();
    }

    listaTabela() {
        let body = document.getElementById('body');

        tbody.innerText = '';

        let produtos = localStorage.getItem("produtos")

        if (produtos == null) produtos = [];
        else produtos = JSON.parse(produtos);

        this.arrayProdutos.push(...produtos);

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_email = tr.insertCell();
            let td_telefone = tr.insertCell();
            let td_celular = tr.insertCell();
            let td_sexo = tr.insertCell();
            let td_nascimento = tr.insertCell();
            let td_habilidades = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valor;
            td_email.innerText = this.arrayProdutos[i].email;
            td_telefone.innerText = this.arrayProdutos[i].telefone;
            td_celular.innerText = this.arrayProdutos[i].celular;
            td_sexo.innerText = this.arrayProdutos[i].sexo;
            td_nascimento.innerText = this.arrayProdutos[i].nascimento;
            td_habilidades.innerText = this.arrayProdutos[i].habilidades;


            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/edit.png'
            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")")


            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/delete.png'
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)
        }
    }

            atualizar(id, produto) {
                for (let i = 0; i < this.arrayProdutos.length; i++) {
                    if (this.arrayProdutos[i].id == id) {
                        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                        this.arrayProdutos[i].valor = produto.valor;
                        this.arrayProdutos[i].email = produto.email;
                        this.arrayProdutos[i].telefone = produto.telefone;
                        this.arrayProdutos[i].celular = produto.celular;
                        this.arrayProdutos[i].sexo = produto.sexo;
                        this.arrayProdutos[i].nascimento = produto.nascimento;
                        this.arrayProdutos[i].habilidades = produto.habilidades;
                    }
                }

    }




    preparaEdicao(dados) {
        this.editId = dados.id;
        document.getElementById('nome').value = dados.nomeProduto;
        document.getElementById('cpf').value = dados.valor;
        document.getElementById('email').value = dados.email;
        document.getElementById('telefone').value = dados.telefone;
        document.getElementById('celular').value = dados.celular;
        document.getElementById('sexo').value = dados.sexo;
        document.getElementById('nascimento').value = dados.nascimento;
        document.getElementById('habilidades').value = dados.habilidades;
        document.getElementById('btn1').innerText = 'Atualizar'
    }

    lerDados() {
        let produto = {}
        produto.id = this.arrayProdutos.length + 1;
        produto.nomeProduto = document.getElementById('nome').value;
        produto.valor = document.getElementById('cpf').value;
        produto.email = document.getElementById('email').value;
        produto.telefone = document.getElementById('telefone').value;
        produto.celular = document.getElementById('celular').value;
        produto.sexo = document.getElementById('sexo').value;
        produto.nascimento = document.getElementById('nascimento').value;
        produto.habilidades = document.getElementById('habilidades').value;


        return produto;

    }
    
    validaCampos(produto) {
        let msg = '';
        if (produto.nomeProduto == '') {
            msg += 'Digite seu nome\n';
        }

        if (produto.valor == '') {
            msg += 'Informe seu CPF\n';
        }

        if (produto.email == '') {
            msg += 'Informe seu e-mail\n';
        }

        if (produto.telefone == '') {
            msg += 'Informe seu telefone\n';
        }

        if (produto.celular == '') {
            msg += 'Informe seu celular\n';
        }

        if (produto.sexo == '') {
            msg += 'Informe seu sexo\n';
        }

        if (produto.nascimento == '') {
            msg += 'Informe sua data de nascimento\n';
        }

        if (msg != '') {
            alert(msg);
            return false
        }

        return true;


    }


    cancelar() {
        document.getElementById("nome").value = ''
        document.getElementById("cpf").value = ''
        document.getElementById("email").value = ''
        document.getElementById("telefone").value = ''
        document.getElementById("celular").value = ''
        document.getElementById("nascimento").value = ''
        document.getElementById("habilidades").value = ''


        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null;

    }


    deletar(id) {
        if (confirm('Deseja realmente deletar o produto do ID' + id)) {
            const produtos = JSON.parse(localStorage.getItem("produtos"))

            let deleteProdutos = produtos.filter(function (item) {
                return item.id !== id
            })

            localStorage.setItem("produtos", JSON.stringify(deleteProdutos));

            location.reload();

        }
    }
}

var produto = new Produto();

produto.listaTabela();

$('#meuModal').on('shown.bs.modal', function () {
    $('#meuInput').trigger('focus')
  })

