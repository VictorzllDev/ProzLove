# **PROZ EDUCAÇÃO**

**CURSO TÉCNICO EM DESENVOLVIMENTO DE SISTEMAS**

**EQUIPE:**  
**Victor Galvão**  
**Ermano**

**TCC — PROZ LOVE**

**2025 – MG**  

**TRABALHO DE CONCLUSÃO DE CURSO – PROZ LOVE**  
**DOCUMENTAÇÃO COMPLETA – ETAPA 1 (PLANEJAMENTO)**

---

## **1. IDENTIFICAÇÃO DO PROJETO**

### **1.1 Nome do Sistema**  
**Proz Love**

**Justificativa**  
O nome “**Proz Love**” foi escolhido para associar a instituição “Proz” à proposta central do sistema: um aplicativo de relacionamentos voltado para o público acadêmico e profissional. A palavra “Love” remete diretamente ao propósito de conexões afetivas, enquanto “Proz” confere credibilidade e identidade institucional. O nome é fácil de lembrar, possui apelo jovial e transmite confiança, sendo adequado para uma plataforma que busca aproximar pessoas de forma segura e contextualizada.

---

### **1.2 Integrantes e Funções**  
- **Joao Victor Galvao Lopes** – Full Stack Developer  
  Responsável pelo desenvolvimento integral do sistema: front-end (web e PWA), back-end (API, autenticação, banco de dados), lógica de matching, integração entre versões e deploy.

- **Ermanno** – UX/UI Designer e Auxiliar de Desenvolvimento  
  Responsável pela identidade visual, prototipação, design de telas, experiência do usuário, documentação visual e suporte no front-end (HTML/CSS/JS básico).

---

## **2. APRESENTAÇÃO DO PROJETO**

### **2.1 Objetivo Geral**  
Desenvolver um sistema de relacionamentos moderno e seguro, nas versões web e PWA, voltado para o público acadêmico e jovem adulto. O **Proz Love** permitirá que usuários criem perfis detalhados, visualizem sugestões de matches baseadas em interesses comuns, interajam por meio de likes e mensagens, e gerenciem conexões de forma intuitiva. A versão web oferece uma experiência completa para cadastro e exploração, enquanto a PWA possibilita acesso rápido, notificações em tempo real e uso em dispositivos móveis, garantindo sincronização total entre plataformas.

---

### **2.2 Problema Identificado**  
Atualmente, aplicativos de relacionamento genéricos não atendem adequadamente às necessidades de um público mais específico, como estudantes e jovens profissionais que buscam conexões com interesses acadêmicos, culturais e de carreira alinhados. Muitas plataformas são focadas apenas em aparência ou localização, sem oferecer filtros contextuais relevantes (como área de estudo, instituição de ensino, hobbies intelectuais ou objetivos de vida). Isso gera matches superficiais, baixa taxa de conversão em conversas significativas e insatisfação com a experiência.

Além disso, a falta de integração entre versões web e mobile limita a praticidade: usuários frequentemente utilizam o computador para criar perfis detalhados, mas precisam do celular para interações rápidas e notificações. A ausência de uma PWA funcional obriga o download de apps nativos, o que pode ser uma barreira para testes iniciais ou para usuários com armazenamento limitado.

O **Proz Love** surge para preencher essa lacuna, oferecendo uma plataforma especializada, segura e multiplataforma, que prioriza conexões com base em compatibilidade intelectual e de estilo de vida, não apenas física.

---

### **2.3 Justificativa da Solução**  
O **Proz Love** se diferencia por:
- Focar em **público acadêmico/profissional jovem**;
- Oferecer **filtros inteligentes** (curso, instituição, interesses, objetivos);
- Utilizar **algoritmo de matching com pesos** em compatibilidade intelectual;
- Garantir **segurança e verificação** de perfis;
- Fornecer experiência unificada entre **web e PWA**, com sincronização em tempo real.

A **versão web** será ideal para criação de perfil detalhado, upload de fotos, configuração de preferências e visualização de matches em tela grande.  
A **versão PWA** permitirá interação rápida, notificações de matches e mensagens, acesso offline básico e uso sem necessidade de instalação via loja de aplicativos.

---

### **2.4 Justificativa para Versões Web e PWA**  
- **Web**: experiência completa, ideal para configurações iniciais, edição de perfil e exploração visual ampla.  
- **PWA**: acesso rápido, notificações push, funcionamento offline para perfis já carregados, e instalação direta pelo navegador — reduzindo atritos de uso e aumentando engajamento.

---

## **3. PÚBLICO-ALVO**  
Estudantes de ensino técnico, graduação e pós-graduação, além de jovens profissionais entre 18 e 30 anos, que buscam relacionamentos com pessoas de interesses e contextos similares. Público familiarizado com tecnologia, que valoriza segurança, compatibilidade intelectual e experiência de usuário fluida entre dispositivos.

---

## **4. STACK TECNOLÓGICA**

### **4.1 Front-end Web**
- **React + Vite** – desenvolvimento rápido e componentizado.
- **TypeScript** – tipagem estática para maior segurança.
- **Tailwind CSS** – estilização utilitária e responsiva.
- **React Router** – navegação entre telas.
- **React Query** – gerenciamento de estado e cache.
- **Framer Motion** – animações fluidas.

### **4.2 PWA (Mobile)**
- Base React adaptada com **design responsivo**.
- **Service Workers** para cache e funcionamento offline.
- **Web App Manifest** com temas e ícones adaptativos.
- **Notificações push** via Web Push API.

### **4.3 Back-end**
- **Node.js + Fastify** – API RESTful para lógica de negócio.
- **PostgreSQL + Prisma ORM** – banco relacional para dados estruturados (usuários, matches, preferências).
- **Firebase Authentication** – autenticação segura com e-mail, Google e verificação.
- **Supabase Storage** – armazenamento de imagens de perfil com CDN e otimização.
- **Socket.io** – mensagens em tempo real.
- **JWT** – tokens para sessão e autorização.

**Justificativa:**  

### **4.4 Justificativa das Escolhas**  
Firebase oferece autenticação robusta e pronta. Supabase fornece storage escalável com API simples. PostgreSQL + Prisma garante modelagem relacional para matches e perfis, enquanto Node.js mantém a lógica de matching e integrações.

---

## **5. ARQUITETURA DO SISTEMA E FLUXO**

### **5.1 Navegação – Web**
1. **Login/Cadastro** → 2. **Onboarding** → 3. **Dashboard (Matches Sugeridos)** → 4. **Perfil** → 5. **Chat** → 6. **Configurações**.

### **5.2 Navegação – PWA**
1. **Login** → 2. **Home (Cards de Perfil)** → 3. **Likes/Matches** → 4. **Chat** → 5. **Menu inferior rápido**.

### **5.3 Fluxo do Usuário**
- Cadastro com e-mail verificado.
- Preenchimento de perfil com foto, bio, interesses e filtros.
- Visualização de sugestões diárias.
- Like/Pass → Match → Chat.
- Notificações em tempo real.

---

## **6. TELAS DO SISTEMA**

### **6.1 Web**
- **Login/Cadastro** – autenticação inicial.
- **Onboarding** – coleta de dados iniciais.
- **Dashboard** – cards interativos de perfis sugeridos.
- **Perfil Completo** – visualização e edição.
- **Matches** – lista de conexões.
- **Chat** – mensagens com Socket.io.
- **Configurações** – privacidade, filtros, notificações.

### **6.2 PWA**
- **Home** – cards para like/pass (estilo Tinder).
- **Matches Rápidos** – lista simplificada.
- **Chat Mobile** – interface otimizada para toque.
- **Notificações** – alertas de novos matches/mensagens.

---

## **7. FUNCIONALIDADES**

### **7.1 Essenciais (MVP)**
- Cadastro com verificação de e-mail.
- Criação e edição de perfil.
- Sistema de likes/passes.
- Algoritmo de matching básico.
- Chat em tempo real.
- Versão web e PWA funcionais.

### **7.2 Importantes**
- Filtros avançados (curso, localização, interesses).
- Notificações push.
- Modo offline para perfis visualizados.
- Upload múltiplo de fotos.

### **7.3 Futuras**
- Vídeo-chamadas.
- Eventos e encontros virtuais.
- Relatórios de compatibilidade.
- Integração com redes sociais acadêmicas.

---

## **8. IDENTIDADE VISUAL**
- **Cores principais**: Roxo (#6A0DAD), Laranja (#FF6B35), Branco (#FFFFFF).
- **Tipografia**: Poppins (títulos), Inter (textos).
- **Estilo**: Moderno, jovial, limpo, com toques vibrantes.
- **Consistência** entre web e PWA com componentes compartilhados.

---

## **9. CRONOGRAMA DE DESENVOLVIMENTO**
| Período          | Atividade                          | Responsável         |
|------------------|------------------------------------|---------------------|
| 02/12 – 15/12   | Configuração do ambiente           | Victor Galvão       |
| 16/12 – 31/12   | Desenvolvimento front-end web      | Victor Galvão       |
| 02/01 – 15/01   | Desenvolvimento PWA                | Victor Galvão       |
| 16/01 – 25/01   | Back-end e integração              | Victor Galvão       |
| 26/01 – 01/02   | Testes e ajustes finais            | Ermano              |

---

## **10. REFERÊNCIAS**
- Documentação oficial React, PWA, Socket.io.
- Diretrizes de UX para apps de relacionamento.
- Estudos sobre comportamento de jovens em plataformas de dating.
- Materiais do curso e boas práticas de segurança digital.

