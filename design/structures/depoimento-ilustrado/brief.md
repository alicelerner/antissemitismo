# Depoimento ilustrado

## Hub summary (2026-10-08)

> Experiência ancorada no depoimento da Lia, apresentando evidências do que é mencionado.

## Alice's description (2026-10-09)

> vamos usar esse depoimento aqui: [testimony below]
>
> quero que ele ocupe a metade esquerda da tela, com tipografia grande. conforme o scroll ele deve ir pintando de preto como se fosse um teleprompter/karaokê.
> algumas palavras chaves devem aparecer sublinhadas. ao fazer hover nelas, aparece na metade da direita o vídeo/print/ detalhes do episódio.

Sketches: `references/01-sketch-split.webp`, `references/02-sketch-caption.webp`.

### The testimony (as given, Lia Vainer Schucman)

> Muitos judeus, realmente preocupados com a sua própria sobrevivência, têm recusado Lula, acreditando que gostar de Israel seria uma garantia de não ser antissemita. Eu entendo o medo. Mas precisamos olhar para o que cada projeto político faz, para além das bandeiras que exibe.
>
> O apoio de Flávio Bolsonaro a Israel não apaga a história do bolsonarismo. Jair Bolsonaro falou em “perdoar” o Holocausto e recebeu Beatrix von Storch, liderança da extrema direita alemã. No seu governo, Roberto Alvim reproduziu um discurso de Goebbels, ministro da propaganda nazista, e acabou demitido. Amar Israel não limpa essa história. (www1.folha.uol.com.br, www1.folha.uol.com.br, agenciabrasil.ebc.com.br)
>
> Também precisamos entender que esse apoio pode ser um aceno aos evangélicos. Em algumas correntes do sionismo cristão, os judeus fazem parte de uma profecia que termina com sua conversão a Jesus. Esse aparente amor aos judeus, chamado de filosemitismo, nem sempre reconhece nosso direito de continuar sendo judeus. Isso não descreve todos os evangélicos, mas é uma dimensão importante dessa aliança. (cdamm.org, onlinelibrary.wiley.com)
>
> Enquanto isso, o governo Lula reuniu um espectro amplo da comunidade judaica, incluindo CONIB, rabinos, pesquisadores e coletivos de diferentes posições. Acolheu uma articulação para enfrentar o antissemitismo e abriu frentes de discussão jurídica e educacional. Há interlocução com a educação e ações de segurança pública contra nazismo e conteúdos antissemitas nas redes. É para esse trabalho que precisamos olhar. (jjpd1.substack.com, noticias.uol.com.br, gov.br, gov.br)
>
> Sobre a IHRA, é preciso ser preciso: o Brasil não saiu como membro pleno, porque nunca teve essa condição. Deixou de prosseguir na participação como observador. A IHRA é uma aliança pela memória do Holocausto; sua definição de antissemitismo não é uma lei e não tem força jurídica por si só. O problema é que seu uso tem sido politizado, inclusive para tentar silenciar críticas a Israel. Isso compromete sua legitimidade e pode enfraquecer justamente o combate ao antissemitismo. (noticias.uol.com.br, holocaustremembrance.com)
>
> Por isso, considero mais inteligente construir uma estratégia brasileira, apoiada nas nossas leis antirracistas: proteger judeus sem responsabilizá-los por Israel e garantir que denunciar violações contra palestinos não seja automaticamente tratado como antissemitismo. Alguns setores da esquerda chamam esse diálogo de sionismo; setores da direita chamam o afastamento da IHRA de antissemitismo. Falta reconhecer que uma posição democrática pode sustentar as duas coisas. Nossa proteção não precisa depender do silenciamento de ninguém. Lia Vainer Schucman

## Understanding

- Desktop: two halves. Left, on the warm gray block, the testimony in large bold type. Right, white, a sticky evidence panel (media, date, status, title, caption, sources), as in sketch 02.
- Karaoke: every word starts gray; a reading line at 62% of the viewport paints each word black as it passes. It is tied to scroll position, so it has no duration of its own and runs the same under reduced motion (it is a color change, not movement).
- Underlined phrases are anchors to dossier evidence. Hover (or keyboard focus) shows that anchor's evidence on the right. When nothing is hovered, the right half shows the last anchor the reader has passed, so it is never empty while reading. This follow-the-reader behaviour is an addition to Alice's description.
- Phones: one column. The current evidence docks as a card at the bottom; tapping it or an underlined phrase opens it as a bottom sheet.
- The author's own citations (domains) stay under each paragraph in small mono type; the evidence shown is the dossier's, not the author's links.

## Wireframe

`design/wireframes/depoimento-ilustrado/index.html` (+ `data.js`). Evidence map with match notes: `evidence-map.json` (14 anchors: 8 verified, 6 partly verified).

Motion: evidence swap 200ms opacity + 8px rise `cubic-bezier(0.23, 1, 0.32, 1)` (CSS transitions, so rapid hovering retargets); dock 200ms; sheet 300ms `cubic-bezier(0.32, 0.72, 0, 1)`; reduced motion keeps fades, drops movement.

## Open questions

1. **Six anchors are only partly verified.** The site rule is `verified` only. The testimony says more than the dossier supports in these places:
   - "reuniu um espectro amplo… rabinos": the 28 Jan 2026 Planalto meeting is verified, but rabbis are not in the participant list, Lula was absent (Alckmin chaired), and no plan or working group was announced.
   - "frentes de discussão jurídica e educacional": education is verified (Itamaraty seminar, Apr 2026); nothing in the dossier on the legal front.
   - "ações de segurança pública contra nazismo e conteúdos antissemitas nas redes": the only verified federal action is the Nov 2023 PF operation against a Hezbollah-linked plot (counter-terrorism, not anti-Nazi or online). Operação Nuremberg was state prosecutors (GAECO) and must not be credited to the federal government.
   - "Deixou de prosseguir": press says "retira"/"deixa"; withdrawal vs non-renewal is unconfirmed, and the sentence leaves out that no official reason was given.
   - "não tem força jurídica por si só": true federally; RS and some cities adopted the definition.
   - "silenciar críticas a Israel": opinion; supported only by Kenneth Stern's 2017 House testimony about misuse on campuses.

   Options: ask Lia to adjust wording, keep the text and show the gap honestly (as the wireframe does now, dashed underline + note), or drop those anchors.
2. **Imprecisions in verified passages.** "perdoar": the dossier requires showing his 14 Apr 2019 retraction letter with the quote (the caption does). Alvim: a near-literal paraphrase, Special Secretary (not minister), fired by Jair himself within 24h with a note of "total e irrestrito apoio à comunidade judaica". "Setores da direita chamam o afastamento da IHRA de antissemitismo": closest match is the Simon Wiesenthal Centre; CONIB explicitly did not call Lula antisemitic.
3. **Unanchored claim.** "nem sempre reconhece nosso direito de continuar sendo judeus" has only expert-column support (Magali Cunha, Michel Gherman). Accept expert quotes as a source type, or leave it unanchored?
4. **Author's sources.** cdamm.org and the Substack are not usable as evidence; the Wiley article in the dossier (Dennen & Djupe 2023) is about US Christian nationalism, not conversion theology. Ask Lia which Wiley article she means.
5. **Media.** Every panel is a placeholder named after the asset it needs (video of Alvim's speech, Bolsonaro's note, Planalto photo…). Who collects them? The Alvim original was deleted; copies exist at Folha, G1, Metrópoles.
6. **Follow-the-reader panel.** Keep it, or show evidence only on hover as described?

## Decisions

- 2026-10-09: The dossier, not the author's links, is the evidence shown. Anchors not fully verified stay visible in the wireframe with a dashed underline and an internal note, so the gap is reviewed rather than hidden.
