document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        data: {
            nomeInput: "",
            telefoneInput: "",
            nomes: [],
            editando: false,
            editandoIndex: -1,
            novoNome: "",
            novoTelefone: "",
        },
        mounted() {
            // Carrega os contatos ao inicializar o aplicativo
            this.carregarContatos();
        },
        methods: {
            carregarContatos() {
                // Faz uma solicitação GET ao servidor para obter todos os contatos
                axios.get("/contatos").then((response) => {
                    this.nomes = response.data;
                });
            },

            createItem() {
                if (this.nomeInput.trim() !== "" && this.telefoneInput.trim() !== "") {
                    // Faz uma solicitação POST ao servidor para adicionar um novo contato
                    axios.post("/contatos", { nome: this.nomeInput, telefone: this.telefoneInput }).then((response) => {
                        this.nomes.push(response.data.contato);
                        this.nomeInput = "";
                        this.telefoneInput = "";
                    });
                }
            },

            async editarNome(index) {
                // Define as variáveis de edição
                this.editando = true;
                this.editandoIndex = index;
                this.novoNome = this.nomes[index].nome;
                this.novoTelefone = this.nomes[index].telefone;
            },

            async confirmarEdicao() {
                // Executa a lógica de edição no servidor
                const contatoId = this.nomes[this.editandoIndex].id;
                await axios.put(`/contatos/${contatoId}`, { nome: this.novoNome, telefone: this.novoTelefone });

                // Recarrega a lista de contatos
                this.carregarContatos();

                // Reseta as variáveis de edição
                this.editando = false;
                this.editandoIndex = -1;
                this.novoNome = "";
                this.novoTelefone = "";
            },

            cancelarEdicao() {
                // Reseta as variáveis de edição
                this.editando = false;
                this.editandoIndex = -1;
                this.novoNome = "";
                this.novoTelefone = "";
            },

            async excluirNome(index) {
                // Faz uma solicitação DELETE ao servidor para excluir um contato
                const contatoId = this.nomes[index].id;
                await axios.delete(`/contatos/${contatoId}`);

                // Recarrega a lista de contatos
                this.carregarContatos();
            },
        },
    });
});