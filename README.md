# 🛡️ Guardian: Intranet de Comando e Resposta a Desaparecidos

O **Guardian** é um protótipo de plataforma de gestão de crises e inteligência geográfica, projetado para uso **exclusivo das forças de segurança pública** em âmbito municipal. O sistema funciona como uma central de comando fechada, focada na coordenação tática e na comunicação segura entre a central e os agentes de campo.

---

## 🔒 Modelo de Operação e Segurança
Para garantir o sigilo das operações e a integridade das informações, o projeto adota um modelo de **Circuito Fechado**:

* **Acesso Restrito (Intranet):** O sistema não possui visualização pública. O acesso é exclusivo para terminais autorizados, garantindo a privacidade das vítimas e das estratégias policiais.
* **Governança de Perfis:** Uma conta Administradora Master faz a gestão das credenciais. Agentes de campo utilizam logins gerados oficialmente para acessar o painel de operações.
* **Comunicação Controlada (Whitelist):** O motor de alertas via WhatsApp opera estritamente com uma lista de números autorizados. Isso garante que as notificações de busca sejam enviadas apenas para os telemóveis dos policias em serviço, eliminando riscos de pânico social ou disseminação de *fake news*.

---

## 🚀 Funcionalidades do Protótipo

### 1. Gestão de Ocorrências e Ciclo de Vida
* **Registo Técnico:** Cadastro de desaparecidos com descrição física detalhada, fotos, roupas e cronómetro de tempo de resposta.
* **Fluxo de Dados (JSON):** Sistema de movimentação dinâmica entre bases. Ao localizar uma pessoa, o registo é transferido de `desaparecidos.json` para `encontrados.json`, mantendo o histórico para fins de auditoria.

### 2. Inteligência Geográfica Tática
* **Ponto Zero e Área Probável:** Marcação no mapa da última localização conhecida e desenho de um raio de busca baseado no tempo transcorrido.
* **Monitorização de Setores:** Visualização do mapa da cidade dividido por áreas, com coloração diferenciada para indicar o estado da busca:
    * 🔴 **Zona Crítica:** Ponto de origem do desaparecimento.
    * 🟡 **Setor em Varredura:** Área com equipas de busca ativas no momento.
    * 🟢 **Setor Concluído:** Área já vistoriada e libertada pela coordenação.

### 3. Notificações de Comando (WhatsApp)
* **Despacho Imediato:** Envio automático da ficha do desaparecido para os policias da Whitelist assim que a ocorrência é aberta.
* **Atualizações em Tempo Real:** Notificações de encerramento de caso ou novas pistas para coordenação ágil das equipas de rua.

---

## 🛠️ Especificações Técnicas
Este projeto foi desenvolvido como Prova de Conceito (PoC) para a disciplina de **Desenvolvimento de Sistemas 2**:

* **Linguagem:** JavaScript / Node.js
* **Base de Dados:** Persistência em arquivos estruturados **JSON** (Simulação de NoSQL).
* **Interface de Mapas:** Leaflet.js com delimitação de coordenadas (Bounding Box).
* **Integração de Mensagens:** API de comunicação para WhatsApp (Modo Restrito/Whitelist).

---

## 📂 Estrutura de Ficheiros do Sistema
* `/data/agentes.json`: Credenciais e números de telefone autorizados.
* `/data/desaparecidos.json`: Casos ativos e dados de localização.
* `/data/encontrados.json`: Histórico de casos resolvidos.
* `/public`: Interface da Intranet Policial.

---

## 📝 Autor
* **[TEU NOME AQUI]**
* Disciplina: Desenvolvimento de Sistemas 2
* Instituição: [NOME DA INSTITUIÇÃO]