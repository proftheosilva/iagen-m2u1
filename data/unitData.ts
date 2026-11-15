import type { UnitContent } from "./types";

export const unitData: UnitContent = {
  unitNumber: "Módulo 2 · Unidade 1",
  unitTitle: "Vetorização e Embeddings para Busca Semântica",
  unitSubtitle:
    "Como o texto vira número, como o significado vira distância e como isso sustenta a busca e o RAG.",
  overview:
    "Nesta unidade você descobre o motor por trás da busca inteligente moderna: os embeddings. Em vez de procurar apenas palavras idênticas como o Ctrl+F, sistemas de IA transformam frases e documentos em coordenadas numéricas (vetores), permitindo encontrar respostas pelo significado mesmo quando as palavras são diferentes.",
  simulatorTitle: "Simulador de Vetorização e Busca por Similaridade",
  simulatorSubtitle:
    "Clique em 'Simular Fluxo' ou navegue pelas etapas para ver como uma pergunta em português encontra o trecho certo por proximidade semântica.",
  simulatorSteps: [
    {
      id: "texto",
      label: "1. Texto Original",
      shortDesc: "Recebe os documentos e prepara o corte.",
      detail:
        "Documentos longos são divididos em blocos menores (chunks) com pequena sobreposição para que nenhuma frase importante seja cortada ao meio.",
      payload: `{
  "documento": "politica_ferias.pdf",
  "chunk_id": "chunk_04",
  "texto": "Colaboradores com 12 meses de casa têm direito a 30 dias de descanso remunerado."
}`,
    },
    {
      id: "embedding",
      label: "2. Modelo de Embedding",
      shortDesc: "Converte significado em vetor denso.",
      detail:
        "Um modelo neural transforma o texto em uma lista de números (ex.: 384 ou 1536 dimensões) que representa o sentido da frase no espaço semântico.",
      payload: `{
  "modelo": "text-embedding-3-small",
  "dimensoes": 1536,
  "vetor_amostra": [0.021, -0.148, 0.309, "...", 0.084]
}`,
    },
    {
      id: "indice",
      label: "3. Índice Vetorial",
      shortDesc: "Armazena vetor e metadados para busca rápida.",
      detail:
        "Os vetores são indexados em bancos vetoriais (como Chroma ou índices ANN/HNSW) junto com metadados de origem, página e data.",
      payload: `{
  "colecao": "rh_documentos",
  "indice": "HNSW (ANN)",
  "metadados": { "origem": "politica_ferias.pdf", "ano": 2026 }
}`,
    },
    {
      id: "cosseno",
      label: "4. Similaridade de Cosseno",
      shortDesc: "Mede o ângulo entre pergunta e trechos.",
      detail:
        "O usuário pergunta 'Como funciona o recesso anual?' — sem usar a palavra 'férias'. A similaridade de cosseno compara a direção dos vetores e encontra alta proximidade.",
      payload: `{
  "pergunta": "Como funciona o recesso anual?",
  "comparacao": "angulo(vetor_pergunta, vetor_chunk_04)",
  "score_cosseno": 0.89
}`,
    },
    {
      id: "hibrida",
      label: "5. Top-K e Fusão Híbrida",
      shortDesc: "Combina busca semântica e léxica.",
      detail:
        "Os K trechos mais próximos são retornados, podendo combinar a pontuação semântica (vetores) com a pontuação por palavras exatas (BM25/TF-IDF).",
      payload: `{
  "top_k": 3,
  "modo": "busca_hibrida (densa + esparsa)",
  "melhor_trecho": "chunk_04 (score: 0.89)"
}`,
    },
  ],
  concepts: [
    {
      id: "m2u1c1",
      chapter: "Capítulo 1 & 2 · Fundamentos",
      title: "O que é um Vetor e por que Vizinhança é Significado",
      summary:
        "Como o sentido das palavras vira posição em um mapa multidimensional.",
      fromZero:
        "Imagine um mapa de supermercado: frutas ficam perto de verduras, e materiais de limpeza ficam em outro corredor. Um vetor (embedding) faz a mesma coisa com textos, dando 'coordenadas' numéricas onde ideias parecidas moram perto umas das outras.",
      inPractice:
        "Se um usuário busca 'dor de cabeça forte' e o documento fala em 'cefaleia intensa', a busca por palavra exata falha, mas os vetores ficam vizinhos no mapa e encontram a resposta.",
      attention:
        "O vetor representa o contexto semântico geral, mas não substitui verificações exatas de lógica, contas matemáticas ou códigos únicos como número de nota fiscal.",
      keyTakeaway:
        "Em embeddings, proximidade geométrica significa proximidade de sentido.",
    },
    {
      id: "m2u1c2",
      chapter: "Capítulo 3 · Medidas de Distância",
      title: "Distância Euclidiana, Produto Escalar e Cosseno",
      summary:
        "Como o sistema calcula quem está mais perto — e por que o Cosseno vence.",
      fromZero:
        "Existem três jeitos principais de comparar vetores: medir a linha reta entre dois pontos (Euclidiana), multiplicar magnitudes (Produto Escalar) ou medir apenas o ângulo entre as setas (Similaridade de Cosseno).",
      inPractice:
        "A Similaridade de Cosseno é a favorita em textos porque olha para a direção (o assunto) sem ser enganada pelo tamanho do texto (se uma frase tem 10 palavras e a outra 100).",
      attention:
        "Um score de cosseno 0,85 não significa '85% de verdade absoluta' — é apenas uma medida relativa para ordenar quais trechos são mais parecidos entre si.",
      keyTakeaway:
        "Similaridade de Cosseno compara direção (significado) e ignora diferenças de comprimento do texto.",
    },
    {
      id: "m2u1c3",
      chapter: "Capítulo 4 · Léxica vs. Semântica",
      title: "Busca Esparsa (TF-IDF / BM25) vs. Vetor Denso",
      summary:
        "Quando contar palavras ganha dos embeddings — e vice-versa.",
      fromZero:
        "A busca esparsa (como TF-IDF e BM25) funciona como um índice remissivo superinteligente: conta palavras exatas e dá mais peso a termos raros. Já o vetor denso entende sinônimos e intenção mesmo sem repetir palavras.",
      inPractice:
        "Para buscar sinônimos ('carro barato' → 'automóvel econômico'), o vetor denso é imbatível. Para buscar o código 'ERR-4092' ou o nome exato 'Portaria 142', a busca esparsa é mais certeira.",
      attention:
        "Não jogue fora a busca por palavras-chave! Ela resolve justamente onde o vetor denso costuma escorregar.",
      keyTakeaway:
        "Busca esparsa encontra palavras exatas; vetor denso encontra significado.",
    },
    {
      id: "m2u1c4",
      chapter: "Capítulo 5 & 6 · Evolução dos Modelos",
      title: "De Word2Vec aos Transformers e Aprendizado Contrastivo",
      summary:
        "Como os modelos modernos aprendem a aproximar perguntas e respostas certas.",
      fromZero:
        "Modelos antigos (como Word2Vec) davam um único vetor fixo por palavra ('banco' de praça e 'banco' financeiro viravam a mesma coisa). Com Transformers, o vetor depende da frase inteira.",
      inPractice:
        "No treinamento por aprendizado contrastivo, o modelo vê milhões de pares: puxa para perto a pergunta e sua resposta correta, e empurra para longe respostas erradas.",
      attention:
        "Mesmo modelos modernos não entendem fatos novos da sua empresa se esses documentos nunca foram indexados para consulta.",
      keyTakeaway:
        "Embeddings modernos consideram o contexto da frase inteira graças à arquitetura Transformer.",
    },
    {
      id: "m2u1c5",
      chapter: "Capítulo 7 · Escolha do Modelo",
      title: "Comparando Modelos e Dimensão Configurável",
      summary:
        "Equilíbrio entre qualidade, idioma, velocidade e tamanho do vetor.",
      fromZero:
        "Mais dimensões (ex.: 3072 vs. 384) guardam mais detalhes, mas ocupam mais memória e deixam a busca mais cara. Alguns modelos permitem encurtar o vetor (técnica Matryoshka) perdendo pouca qualidade.",
      inPractice:
        "Para documentos em português, sempre teste modelos multilíngues (como BGE-M3 ou modelos modernos da OpenAI/Voyage/Cohere) em perguntas reais do seu negócio.",
      attention:
        "Nunca misture vetores gerados por modelos diferentes no mesmo índice — cada modelo cria um 'mapa' com coordenadas incompatíveis.",
      keyTakeaway:
        "Se trocar o modelo de embedding, você precisa reindexar toda a base de documentos.",
    },
    {
      id: "m2u1c6",
      chapter: "Capítulo 8 · Preparação de Texto",
      title: "Chunking (Tamanho, Sobreposição e Estrutura) + Metadados",
      summary:
        "Como dividir documentos sem destruir o raciocínio do trecho.",
      fromZero:
        "Se você vetorizar um livro inteiro em um único vetor, tudo se mistura e a busca fica genérica. Por isso cortamos o texto em pedaços (chunks), deixando uma pequena sobreposição (overlap) entre o fim de um e o início do outro.",
      inPractice:
        "Respeitar títulos, parágrafos e seções (corte por estrutura) e anexar metadados (nome do arquivo, capítulo, data) melhora drasticamente a qualidade da recuperação.",
      attention:
        "Chunks grandes demais misturam vários assuntos; chunks pequenos demais perdem o contexto da frase.",
      keyTakeaway:
        "Um bom chunking com metadados ricos vale mais do que trocar para um modelo mais caro.",
    },
    {
      id: "m2u1c7",
      chapter: "Capítulo 9 · Bancos Vetoriais",
      title: "Busca Exata vs. Aproximada (ANN) e Ferramentas",
      summary:
        "Como pesquisar entre milhões de vetores em milissegundos.",
      fromZero:
        "Comparar sua pergunta contra 10 mil vetores um por um (busca exata) é rápido. Contra 10 milhões, fica lento. A Busca Aproximada (ANN, como o algoritmo HNSW) cria 'atalhos' para achar os vizinhos em milissegundos.",
      inPractice:
        "Ferramentas como Chroma, Qdrant, pgvector e LibSQL permitem começar localmente no computador e escalar para produção sem complicação.",
      attention:
        "Meça sempre o equilíbrio entre velocidade (latência) e revocação (quantos trechos certos o atalho realmente encontrou).",
      keyTakeaway:
        "Índices ANN trocam uma fração mínima de precisão por velocidade altíssima em grandes bases.",
    },
    {
      id: "m2u1c8",
      chapter: "Capítulo 10, 11 & 12 · Busca Híbrida e Prática",
      title: "Quando Cada Busca Falha, Fusão Híbrida e Limites",
      summary:
        "Por que combinar busca densa + esparsa é o padrão ouro em produção.",
      fromZero:
        "Embeddings falham em códigos de produto, placas, CPFs e siglas raras. Busca por palavra-chave falha em sinônimos e perguntas abertas. A Busca Híbrida une os dois rankings!",
      inPractice:
        "Um fluxo completo gera embeddings dos chunks, indexa no banco vetorial (como Chroma), combina resultados com busca léxica e avalia com perguntas reais.",
      attention:
        "Embedding sozinho não resolve dados desatualizados, documentos mal escaneados (OCR ruim) nem perguntas que exigem soma ou contagem em planilhas.",
      keyTakeaway:
        "Busca Híbrida (semântica + palavras-chave) entrega o melhor dos dois mundos.",
    },
  ],
  quiz: [
    {
      id: 1,
      question: "O que é um 'embedding' (vetor) no contexto de textos e IA?",
      options: [
        "Uma imagem JPEG salva dentro de um PDF.",
        "Uma representação numérica (lista de coordenadas) que captura o significado do texto.",
        "Um tipo de cabo para conectar servidores.",
        "Um comando que apaga palavras repetidas.",
      ],
      correctIndex: 1,
      explanation:
        "Embeddings traduzem palavras, frases ou trechos em números onde textos de sentido parecido ficam próximos.",
    },
    {
      id: 2,
      question: "Por que a Similaridade de Cosseno é a medida mais usada para comparar textos?",
      options: [
        "Porque ela mede o ângulo (assunto/direção) sem ser distorcida pelo tamanho do texto.",
        "Porque funciona apenas com números inteiros negativos.",
        "Porque é a única que conta letras maiúsculas.",
        "Porque apaga a pontuação antes de salvar no disco.",
      ],
      correctIndex: 0,
      explanation:
        "Dois textos sobre o mesmo tema apontam para direções semelhantes no espaço vetorial, mesmo tendo tamanhos diferentes.",
    },
    {
      id: 3,
      question: "Em qual situação a busca esparsa (TF-IDF / BM25) costuma superar o vetor denso?",
      options: [
        "Quando o usuário usa apenas sinônimos genéricos.",
        "Quando é preciso encontrar códigos exatos, siglas, CPFs ou nomes próprios raros.",
        "Quando o texto está em formato de áudio.",
        "Nunca, busca por palavras é sempre inferior.",
      ],
      correctIndex: 1,
      explanation:
        "Códigos como 'ART-902' ou números de protocolo dependem de correspondência exata de termos.",
    },
    {
      id: 4,
      question: "Qual foi o grande avanço dos Transformers em relação ao Word2Vec?",
      options: [
        "Reduziram o tamanho da tela do computador.",
        "Passaram a gerar vetores que consideram o contexto da frase inteira (ex.: 'banco' de sentar vs. 'banco' financeiro).",
        "Eliminarem a necessidade de números.",
        "Passaram a funcionar apenas em inglês.",
      ],
      correctIndex: 1,
      explanation:
        "Modelos baseados em Transformers entendem a mesma palavra de forma diferente conforme o contexto ao redor.",
    },
    {
      id: 5,
      question: "O que acontece se você misturar vetores de dois modelos de embedding diferentes no mesmo índice?",
      options: [
        "A busca fica duas vezes mais inteligente.",
        "As distâncias perdem o sentido, pois cada modelo cria um mapa de coordenadas incompatível.",
        "O banco converte automaticamente um no outro.",
        "Nada muda no resultado.",
      ],
      correctIndex: 1,
      explanation:
        "Ao trocar de modelo de embedding, é obrigatório reprocessar e reindexar todos os documentos.",
    },
    {
      id: 6,
      question: "Para que serve a sobreposição (overlap) no chunking?",
      options: [
        "Para deixar o arquivo PDF mais colorido.",
        "Para evitar que uma ideia ou frase seja quebrada ao meio na fronteira entre dois blocos.",
        "Para duplicar o preço da nuvem de propósito.",
        "Para remover os metadados do autor.",
      ],
      correctIndex: 1,
      explanation:
        "Uma pequena sobreposição preserva a continuidade de sentido nas bordas de cada pedaço.",
    },
    {
      id: 7,
      question: "Por que anexar metadados (arquivo, página, data) aos chunks?",
      options: [
        "Para filtrar resultados antes da busca e permitir citar a fonte exata na resposta.",
        "Para impedir que o usuário leia o texto.",
        "Para aumentar o tamanho do vetor para 1 milhão de dimensões.",
        "Apenas por estética no terminal.",
      ],
      correctIndex: 0,
      explanation:
        "Metadados permitem buscar apenas documentos válidos (ex.: ano 2026) e rastrear de onde veio a informação.",
    },
    {
      id: 8,
      question: "Qual é a vantagem da Busca Aproximada (ANN / HNSW) sobre a busca exata?",
      options: [
        "Garante 100% de força bruta em qualquer computador sem memória.",
        "Encontra os vizinhos mais próximos em milissegundos mesmo em bases com milhões de vetores.",
        "Não precisa gerar embeddings.",
        "Traduz automaticamente o texto para espanhol.",
      ],
      correctIndex: 1,
      explanation:
        "Estruturas como HNSW criam atalhos no grafo vetorial, evitando comparar a pergunta contra todos os registros.",
    },
    {
      id: 9,
      question: "O que é 'Busca Híbrida'?",
      options: [
        "Usar um computador ligado na tomada e na bateria ao mesmo tempo.",
        "Combinar os resultados da busca semântica (vetores) com a busca léxica (palavras-chave).",
        "Buscar primeiro no Google e depois no Excel.",
        "Misturar imagens e vídeos no mesmo vetor sem texto.",
      ],
      correctIndex: 1,
      explanation:
        "A fusão híbrida junta precisão em termos exatos (BM25) com compreensão de significado (embeddings).",
    },
    {
      id: 10,
      question: "Qual tarefa embeddings SOZINHOS NÃO resolvem bem?",
      options: [
        "Encontrar textos com temas parecidos.",
        "Fazer contas exatas, somar valores de tabelas ou garantir fatos que não estão na base.",
        "Agrupar perguntas frequentes semelhantes.",
        "Sugerir artigos relacionados.",
      ],
      correctIndex: 1,
      explanation:
        "Embeddings medem similaridade semântica; cálculos, agregações e filtros rígidos exigem bancos estruturados ou SQL.",
    },
  ],
  memoryPairs: [
    {
      id: "m2u1m1",
      term: "Embedding (Vetor)",
      definition: "Lista numérica que posiciona o significado do texto em um mapa semântico.",
    },
    {
      id: "m2u1m2",
      term: "Similaridade de Cosseno",
      definition: "Medida do ângulo entre vetores que compara sentido sem depender do tamanho.",
    },
    {
      id: "m2u1m3",
      term: "Busca Esparsa (BM25)",
      definition: "Busca baseada em palavras exatas, ideal para siglas, códigos e termos raros.",
    },
    {
      id: "m2u1m4",
      term: "Chunking com Overlap",
      definition: "Dividir documentos em blocos com sobreposição para não quebrar ideias.",
    },
    {
      id: "m2u1m5",
      term: "ANN (Busca Aproximada)",
      definition: "Índice com atalhos (como HNSW) para buscar entre milhões de vetores rápido.",
    },
    {
      id: "m2u1m6",
      term: "Busca Híbrida",
      definition: "Fusão entre busca semântica (densa) e busca por palavras-chave (esparsa).",
    },
  ],
};
