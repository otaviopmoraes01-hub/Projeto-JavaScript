const form = document.getElementById("form");
const input = document.getElementById("inputTarefa");
const lista = document.getElementById("lista");

// estado da aplicação
let tarefas = carregarTarefas();

function carregarTarefas() {
  try {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
  } catch {
    return [];
  }
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    lista.innerHTML = `<p class="vazio">Nenhuma tarefa ainda 👀</p>`;
    return;
  }

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    li.className = tarefa.concluida ? "concluida" : "";

    // container do texto
    const span = document.createElement("span");
    span.textContent = tarefa.texto;

    span.addEventListener("click", () => {
      alternarStatus(index);
    });

    // botão remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "X";

    btnRemover.addEventListener("click", () => {
      removerTarefa(index);
    });

    li.appendChild(span);
    li.appendChild(btnRemover);

    lista.appendChild(li);
  });
}

function adicionarTarefa(texto) {
  tarefas.push({
    texto,
    concluida: false
  });

  salvarTarefas();
  renderizar();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  renderizar();
}

function alternarStatus(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarTarefas();
  renderizar();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = input.value.trim();

  if (!texto) {
    mostrarErro("Digite uma tarefa válida!");
    return;
  }

  adicionarTarefa(texto);
  input.value = "";
});

function mostrarErro(msg) {
  const erro = document.createElement("div");
  erro.className = "erro";
  erro.textContent = msg;

  document.body.appendChild(erro);

  setTimeout(() => {
    erro.remove();
  }, 2000);
}


renderizar();