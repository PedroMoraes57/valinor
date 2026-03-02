## Envio de solução

Gostariamos de entender como você pensa e as decisões que você tomou durante o
desenvolvimento, detalhe um pouco mais sobre:

**Framework, linguagem e ferramentas**

Descreva ferramentas e bibliotecas (libraries, framework, tools etc) você usou.

R: Para o desenvolvimento do projeto, utilizei Angular na camada frontend e
NestJS no backend, com TypeScript como linguagem principal. No frontend,
utilizei CSS puro com variáveis e media queries para criar uma interface
responsiva e personalizável sem depender de frameworks externos. No backend,
optei pelo TypeORM com SQLite para persistência de dados, garantindo
simplicidade e rapidez no desenvolvimento do teste.

Além disso, utilizei ferramentas como Vitest para testes unitários no frontend e
Jest com Supertest para testes integrados no backend. Também utilizei
SweetAlert2 para feedback visual interativo e RxJS para gerenciamento de streams
de dados reativos no Angular.

**Técnologias X e Y**

Justifique porque você optou pela tecnologia X e não a Y?

R:Como o teste exigia o uso de Angular no frontend e NestJS no backend, não
houve escolha entre frameworks principais. No entanto, durante o
desenvolvimento, precisei decidir entre diferentes bibliotecas e abordagens
dentro dessas tecnologias.

No frontend, utilizei RxJS para gerenciamento de dados reativos, em vez de
abordagens mais tradicionais baseadas apenas em callbacks ou eventos diretos, o
que trouxe maior consistência e facilidade na manipulação de fluxos de dados
assíncronos. Para alertas e notificações, escolhi SweetAlert2, que oferece
componentes visuais mais modernos e interativos em comparação com alertas
nativos do navegador.

No backend, optei por uma API REST utilizando NestJS com TypeORM e SQLite.
Embora GraphQL pudesse ser uma alternativa interessante, escolhi REST devido à
minha experiência limitada com GraphQL e pelo fato de REST ser mais direto para
implementação de endpoints simples, garantindo que eu conseguisse entregar o
projeto completo dentro do prazo.

Também utilizei class-validator e class-transformer para validação e
transformação de dados, que oferecem uma abordagem moderna e tipada em
TypeScript, em comparação com validações manuais que exigiriam mais código
repetitivo e maior risco de erros.

**Princípios de software**

Quais princípios da engenharia de software que você usou?

R:Durante o desenvolvimento, procurei seguir princípios da engenharia de
software como:

SOLID, garantindo código modular, fácil de manter e com responsabilidades bem
definidas.

DRY (Don't Repeat Yourself), evitando duplicação de lógica e promovendo
reutilização de componentes e serviços.

Separation of Concerns, mantendo a separação clara entre frontend e backend, e
entre camadas de serviço, controller e model no NestJS.

**Desafios e problemas**

Conte um pouco sobre os desafios e problemas que você enfrentou e como você
resolveu.

R:Como iniciante em Angular e NestJS, meu maior desafio foi garantir a
integração eficiente entre o backend e o frontend, permitindo que o usuário
recebesse atualizações em tempo real. Trabalhar com RxJS para gerenciar o fluxo
de dados reativos exigiu atenção para estruturar corretamente observables e
subscriptions, garantindo desempenho e consistência da aplicação.

Apesar de já ter experiência com Django e desenvolvimento backend, precisei
aprender rapidamente conceitos específicos do NestJS, assim como adaptar minha
lógica de backend para funcionar de forma integrada com o frontend em Angular.

Para superar essas dificuldades, utilizei a documentação oficial, exemplos de
projetos, auxilio de inteligência Artificial e testes iterativos. Esse processo
me permitiu aprender bastante sobre arquitetura full-stack, reatividade e
integração frontend-backend, além de reforçar minha habilidade de aprender novas
tecnologias rapidamente e aplicar boas práticas. Estou sempre disposto a evoluir
e explorar soluções mais avançadas para desafios semelhantes.

**Melhorias e próximas implementações**

O que você entende que pode ser melhorado e como isso pode ser feito?

R:Embora o projeto esteja funcional e com testes E2E já implementados e
confiáveis, algumas melhorias podem ser aplicadas para torná-lo ainda mais
robusto e moderno:

Implementar Socket.IO ou WebSockets para atualização em tempo real do Kanban,
proporcionando uma experiência mais dinâmica para o usuário. Essa é uma melhoria
interessante, mas que exige conhecimento mais avançado que estou estudando para
aplicar futuramente.

Substituir a API REST por GraphQL para otimizar consultas e reduzir tráfego de
dados em aplicações mais complexas.

Aprimorar a interface com CSS avançado, variáveis e animações, mantendo a
responsividade e melhorando a experiência do usuário.

Essas melhorias representam próximos passos naturais do projeto, e estou
motivado a explorá-las para evoluir ainda mais minhas habilidades com Angular e
NestJS.

**Vídeo de apresentação**

Grave um vídeo do seu projeto rodando e envie o link:
https://jam.dev/c/33b4ecbc-cea2-4927-91bb-5e4f14a69ccb

**Sobre você**

Queremos te conhecer um pouco melhor, conte um pouco sobre você.

Onde nasceu/De onde você é? Lugares que estudou, empresas que trabalhou, como
você se envolveu com desenvolvimento de software.. enfim, Quem é você?

R: Meu nome é Pedro Moraes, tenho 18 anos, nasci e sou de São José do Rio Preto.
Estudei no SESI Yolanda Bassitt 338 desde o 4º ano até a conclusão do ensino
médio, e depois me formei em Análise e Desenvolvimento de Sistemas pelo SENAI
Rio Preto. Atualmente curso Ciências da Computação na UNIP.

Tenho experiência com Python, Django, JavaScript, MySQL e CSS, e venho
expandindo meus conhecimentos para React, Angular, NestJS e TypeScript,
tecnologias em que ainda sou iniciante, mas que estou estudando e aplicando com
dedicação.

Participei de projetos relevantes que unem tecnologia e impacto social. Entre
eles, destaque para a Signalive, uma IA de tradução de Libras em tempo real,
onde trabalhei no frontend, integração com APIs e melhoria da experiência do
usuário. Também atuei no projeto D.O.C., focado em processamento de documentos
com OCR e NLP, desenvolvimento de APIs, geração automática de resumos e
apresentações, e integração de chat inteligente.

Além disso, tenho experiência com Docker, versionamento de código com Git,
manipulação de dados e conceitos básicos de machine learning aplicados à NLP.
Esses projetos me permitiram aprimorar minhas habilidades técnicas, minha
capacidade de aprender rapidamente novas ferramentas e minha adaptabilidade para
lidar com tecnologias novas ou complexas.

**Outros detalhes**

R: O teste prático foi uma oportunidade de demonstrar minha capacidade de aprender
rapidamente novas tecnologias, como Angular, NestJS e TypeScript, aplicando boas
práticas de engenharia de software mesmo sendo iniciante nessas ferramentas.
Estou sempre motivado a continuar evoluindo e aplicando novos conhecimentos para
entregar soluções de qualidade e com impacto real para os usuários.

---

Ah, deixe seu e-mail ou telefone para entrarmos em contato com você :)

Contato

E-mail: [pedroferreira5711@gmail.com]

Telefone: [(17)99236-8381]
