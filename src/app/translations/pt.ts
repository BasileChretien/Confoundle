/**
 * Portuguese (Brazilian) dictionary: English source string, Portuguese translation.
 * Keys must match the English text exactly. Native review pending; correct in place.
 */
export const pt: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "A habilidade",
  "Where this shows up": "Onde isso aparece",
  "See it in the wild": "Veja no mundo real",
  "Why it happens": "Por que acontece",
  "Same trap, other places": "A mesma armadilha, em outros lugares",
  Source: "Fonte",
  "Make my card →": "Criar meu cartão →",
  "Go deeper on this idea →": "Aprofundar nessa ideia →",
  "Commit to see the reveal. No peeking.":
    "Escolha para ver a resposta. Nada de espiar.",
  "Reveal the answer": "Revelar a resposta",
  "Name the skill →": "Nomear a habilidade →",
  "Play again": "Jogar de novo",
  "The lurking variable": "A variável oculta",
  "Nicely done, you didn't take the number at face value.":
    "Muito bem, você não aceitou o número sem questionar.",
  "So does almost everyone. That's exactly the trap.":
    "Como quase todo mundo. É exatamente essa a armadilha.",
  "You caught it": "Você percebeu",
  "Most people miss this": "A maioria não percebe",
  "You picked": "Você escolheu",
  Replay: "Repetir",
  "Who each treatment actually treated":
    "Quem cada tratamento realmente tratou",
  "So what's the skill? →": "Então, qual é a habilidade? →",
  // scope tags (right of the figure caption)
  Overall: "No total",
  "By subgroup": "Por subgrupo",
  "The facts": "Os fatos",
  "The reality": "A realidade",
  Observed: "Observado",
  Explained: "Explicado",
  Survivors: "Sobreviventes",
  "The full picture": "A imagem completa",
  // category names (humanized)
  "Causal reasoning": "Raciocínio causal",
  "Statistical reasoning": "Raciocínio estatístico",
  // tags
  Everyday: "Cotidiano",
  Clinical: "Clínica",
  Research: "Pesquisa",
  Statistics: "Estatística",
  Diagnosis: "Diagnóstico",
  Screening: "Rastreamento",
  Epidemiology: "Epidemiologia",
  Pharmacology: "Farmacologia",
  Psychology: "Psicologia",
  Biology: "Biologia",
  Technology: "Tecnologia",
  Economics: "Economia",
  Politics: "Política",
  Education: "Educação",
  Finance: "Finanças",
  Business: "Negócios",
  Law: "Direito",
  Sports: "Esporte",
  History: "História",
  Media: "Mídia",
  "Demo · try any puzzle": "Demo · experimente qualquer desafio",
  // frequency view (base-rate puzzle)
  "1 in": "1 em",
  "How common it is": "Quão comum é",
  "Test catches it": "O teste detecta",
  Always: "Sempre",
  "False-alarm rate": "Taxa de falsos alarmes",
  "Positive tests": "Testes positivos",
  of: "de",
  actually: "realmente",
  chance: "de probabilidade",
  "false alarm": "falso alarme",
  // wager + stats
  "How sure are you?": "Quão certo você está?",
  Hunch: "Palpite",
  "Fairly sure": "Bastante certo",
  Certain: "Certeza",
  "Pick one, then stake how sure you are":
    "Escolha uma e aposte o quanto está certo",
  pts: "pts",
  Today: "Hoje",
  Streak: "Sequência",
  Best: "Recorde",
  Caught: "Percebidos",
  Calibration: "Calibração",
  "A new puzzle every day. Keep the streak alive.":
    "Um novo desafio todo dia. Mantenha a sequência viva.",
  "Sharp eye, and you called it.":
    "Olho atento, e você acertou na previsão.",
  "Nicely spotted.": "Bem percebido.",
  "Good instinct.": "Bom instinto.",
  "Ouch. Confidently wrong, the classic trap.":
    "Ai. Errado com confiança, a armadilha clássica.",
  "So does almost everyone. That's the trap.":
    "Como quase todo mundo. É essa a armadilha.",
  "You sensed something was off, but went with it anyway.":
    "Você sentiu que algo estava errado, mas foi em frente mesmo assim.",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "Eu percebi. Aposto que você não consegue.",
  "I totally fell for this.": "Caí redondinho nessa.",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "O tratamento B cura mais pacientes no total. Qual você escolheria?",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "Dois tratamentos para cálculos renais, 350 pacientes cada. Na taxa de sucesso global, o tratamento B sai na frente. Mesma doença, mesmo objetivo, um único número para decidir.",
  "Which treatment would you pick?": "Qual tratamento você escolheria?",
  "Success rate": "Taxa de sucesso",
  "Treatment A, open surgery": "Tratamento A, cirurgia aberta",
  "Treatment B, keyhole (PCNL)": "Tratamento B, percutânea (NLPC)",
  "Small stones": "Cálculos pequenos",
  "Large stones": "Cálculos grandes",
  "Treatment B": "Tratamento B",
  "83% overall": "83% no total",
  "Treatment A": "Tratamento A",
  "78% overall": "78% no total",
  "Treatment A actually wins, for both stone sizes.":
    "Na verdade, o tratamento A vence, nos dois tamanhos de cálculo.",
  "Stone size (case severity)":
    "O tamanho do cálculo (a gravidade dos casos)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "A e B não estavam tratando os mesmos pacientes. A recebeu sobretudo os casos difíceis (cálculos grandes), enquanto B recebeu sobretudo os fáceis. Todo mundo se sai pior nos casos difíceis, então a média global de A despenca mesmo que A vença em cada grupo:",
  "Simpson's paradox": "O paradoxo de Simpson",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "Uma tendência global pode se inverter quando levamos em conta uma variável oculta distribuída de forma desigual entre os grupos.",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "Sempre que dois grupos são comparados com uma única taxa agregada, pergunte o que foi misturado para gerar aquele número e se os grupos enfrentavam mesmo as mesmas chances. O tamanho do cálculo é o fator de confusão mais evidente aqui; raramente é o único.",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "O placar 'combinado' não é uma nova medição; é a mistura dos placares de cada grupo, e os grupos maiores pesam mais. Quando um lado está cheio de casos fáceis e o outro de casos difíceis, essa mistura puxa os placares combinados em direções opostas. Assim, uma opção pode liderar tanto no grupo fácil quanto no grupo difícil e, ainda assim, ficar atrás no total, porque tratou a maior parte dos casos difíceis e seu placar misturado fica mais perto daquele número mais baixo. A cura é uma divisão justa: dê aos dois lados a mesma mistura de casos fáceis e difíceis (exatamente o que faz um ensaio randomizado), e a inversão não pode acontecer.",
  "University admissions": "As admissões na universidade",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "Em 1973, os programas de pós-graduação de Berkeley admitiram 44% dos homens, mas apenas 35% das mulheres. Parecia pura discriminação. No entanto, departamento por departamento, as mulheres eram admitidas a uma taxa mais ou menos igual à dos homens, ou maior. As mulheres simplesmente se candidatavam com mais frequência aos departamentos mais concorridos, onde quase todo mundo era recusado. A diferença tinha a ver com onde as pessoas se candidatavam, não com quem decidia.",
  "Baseball batting averages": "As médias de rebatidas no beisebol",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "David Justice rebateu melhor que Derek Jeter em 1995 (0,253 contra 0,250) e de novo em 1996 (0,321 contra 0,314). Mas, nas duas temporadas somadas, Jeter saiu na frente, 0,310 contra 0,270. Cada ano isolado apontava para Justice; os dois anos juntos apontavam para Jeter, porque os jogadores tiveram números muito diferentes de idas ao bastão em suas boas e más temporadas.",
  "COVID-19 death rates": "As taxas de mortalidade da COVID-19",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "No início de 2020, a taxa de mortalidade registrada entre os casos de COVID era mais alta na Itália do que na China no total. Mas, discriminada por idade, a taxa italiana era mais baixa em todas as faixas etárias. A Itália simplesmente tinha muito mais pacientes idosos, que correm maior risco; juntar todas as idades fazia a Itália parecer pior do que mostrava uma comparação justa, faixa a faixa.",
  "Simpson's paradox, a reasoning trap.":
    "O paradoxo de Simpson, uma armadilha do raciocínio.",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "Uma opção pode vencer em cada grupo isolado e, mesmo assim, perder no instante em que você junta todos os grupos. Parece impossível, mas é real. Isso acontece quando os grupos não formam uma comparação justa: um lado ficou discretamente com os casos fáceis, o outro com os difíceis. Então o grande número combinado diz uma coisa enquanto os números grupo a grupo dizem o contrário, e é o grande número que engana você.",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "A tabela de dois tratamentos com 350/350 é apresentada tal como em Julious e Mullee (1994), a partir da série clínica de Charig et al. (1986) (que originalmente comparava três modalidades).",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "Um teste quase perfeito diz que você está doente. O quanto você deveria se preocupar?",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "Essa doença é rara: cerca de 1 em cada 1.000 pessoas a têm. O teste nunca a deixa passar quando ela está de fato presente, e dá um falso alarme em apenas cerca de 1 em cada 20 pessoas saudáveis. Seu resultado acabou de voltar positivo.",
  "What's the chance you actually have the disease?":
    "Qual é a probabilidade de você realmente ter a doença?",
  "In 1,000 people": "Em 1.000 pessoas",
  "have the disease": "têm a doença",
  "test positive": "dão positivo no teste",
  "About 95%": "Cerca de 95%",
  "the test is 95% accurate": "o teste é 95% preciso",
  "About half": "Cerca de metade",
  "50/50": "50/50",
  "About 2%": "Cerca de 2%",
  "roughly 1 in 50": "mais ou menos 1 em 50",
  "Positive, but almost certainly a false alarm.":
    "Positivo, mas quase com certeza um falso alarme.",
  "The base rate": "A taxa de base",
  "A rare disease flips the odds":
    "Uma doença rara inverte as probabilidades",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "Como quase ninguém tem a doença, a pequena taxa de erro do teste faz todo o trabalho. Em 1.000 pessoas, apenas 1 está realmente doente, mas cerca de 50 pessoas saudáveis também dão positivo. Assim, entre os ~51 resultados positivos, só 1 é verdadeiro. Um positivo mal leva você de “muito improvável” para “ainda improvável”.",
  "The base-rate fallacy": "A falácia da taxa de base",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "Quando algo é raro, mesmo um teste muito preciso gera muito mais falsos alarmes do que casos reais, então um resultado positivo ainda pode significar que você provavelmente está bem.",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "A solução é pensar em pessoas inteiras, não em porcentagens: imagine 1.000 delas, conte os verdadeiros positivos e os falsos alarmes, e compare. Pergunte sempre o quanto a coisa é comum antes de confiar em um positivo.",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "A precisão de um teste e as suas probabilidades reais são duas coisas diferentes. A precisão é medida em pessoas que já sabemos estar doentes ou saudáveis. Mas um resultado positivo faz a pergunta inversa (dado este positivo, estou doente?), e isso depende de quantos doentes havia para encontrar em primeiro lugar. Se apenas 1 em cada 1.000 tem a doença, a enorme maioria saudável produz uma enxurrada de falsos alarmes que encobre o único caso real. Torne a doença comum e o mesmo teste parece excelente; torne-a rara e um positivo, por si só, significa pouco.",
  "Even doctors slip": "Até os médicos erram",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "Pesquisadores fizeram exatamente esta pergunta a médicos e profissionais de saúde: uma doença que atinge 1 em cada 1.000, um teste com 5% de falsos alarmes. A resposta mais comum foi 95%. A média foi 56%. Só cerca de 1 em cada 5 deu a resposta correta, aproximadamente 2%.",
  "Think in people, not percentages":
    "Pense em pessoas, não em porcentagens",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "A solução mais simples é a formulação. Apresente o mesmo problema em frequências naturais (“1 em cada 1.000 pessoas” e “cerca de 50 falsos alarmes” em vez de “0,1%” e “5%”), e muito mais gente, médicos incluídos, acerta.",
  "The base-rate fallacy, a reasoning trap.":
    "A falácia da taxa de base, uma armadilha do raciocínio.",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "Um teste pode ser 95% preciso e um resultado positivo ainda pode significar que você quase com certeza está bem. O truque está em quão rara é a coisa. Se apenas 1 em cada 1.000 pessoas tem uma doença, então, entre todos os que dão positivo, os poucos casos reais ficam soterrados sob uma pilha de falsos alarmes. Precisão não é o mesmo que as suas probabilidades reais; primeiro é preciso perguntar o quanto a coisa é comum.",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "Mais chocolate, mais prêmios Nobel. Seu país deveria fazer estoque?",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "É um resultado real e publicado: em 23 países, quanto mais chocolate as pessoas comem, mais laureados com o Nobel o país produziu, uma correlação forte (r ≈ 0,79). A tendência é difícil de contestar.",
  "So, does eating chocolate help win Nobel Prizes?":
    "Então, comer chocolate ajuda a ganhar prêmios Nobel?",
  "Across 23 countries": "Em 23 países",
  "Chocolate eaten": "Chocolate consumido",
  "Nobel prizes": "Prêmios Nobel",
  "A country's wealth": "A riqueza do país",
  "r ≈ 0.79": "r ≈ 0,79",
  "Yes, chocolate boosts brainpower":
    "Sim, o chocolate turbina o cérebro",
  "the trend is strong": "a tendência é forte",
  "No, it's a pure fluke": "Não, é puro acaso",
  coincidence: "coincidência",
  "No, a third thing drives both":
    "Não, uma terceira coisa influencia as duas",
  "a common cause": "uma causa comum",
  "The chocolate isn't doing anything.": "O chocolate não tem nada a ver com isso.",
  "The common cause": "A causa comum",
  "A country's wealth pulls both up":
    "A riqueza do país puxa as duas para cima",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "Países mais ricos podem comprar mais chocolate E financiar mais universidades, laboratórios e pesquisa, que é o que de fato ganha prêmios Nobel. A riqueza influencia as duas coisas: chocolate e Nobel sobem juntos sem que um cause o outro. Distribua chocolate de graça e você terá dentes mais doces, não mais laureados.",
  "Correlation ≠ causation": "Correlação ≠ causalidade",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "Duas coisas que variam juntas não significam que uma cause a outra. Muitas vezes, uma terceira coisa influencia as duas discretamente.",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "Diante de um vínculo forte, percorra as possibilidades antes de acreditar que X causa Y: talvez Y cause X, talvez uma causa comum influencie as duas, ou talvez seja o acaso. Em geral, só uma comparação controlada permite decidir.",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "Uma correlação diz apenas que duas coisas tendem a variar juntas. Isso pode ter várias causas: uma realmente causa a outra; a causalidade vai no sentido inverso; um terceiro fator oculto influencia as duas (uma causa comum, como o calor que faz subir tanto as vendas de sorvete quanto os afogamentos); ou é uma coincidência, tanto mais provável quanto mais dados você examina. Notar uma correlação é a parte fácil. Descobrir qual dessas explicações está por trás é o verdadeiro trabalho, e em geral exige um experimento, não apenas um gráfico.",
  "Storks and babies": "As cegonhas e os bebês",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "Entre os países europeus, os que têm mais cegonhas realmente têm mais nascimentos humanos, um vínculo estatisticamente significativo. A lenda não é verdadeira: os países maiores simplesmente têm espaço para mais cegonhas e mais habitantes.",
  "Nicolas Cage and drownings": "Nicolas Cage e os afogamentos",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "O número de filmes que Nicolas Cage lança por ano acompanha o número de pessoas que se afogam em piscinas. Ninguém acha que um causa o outro; alinhe tendências sem relação em quantidade suficiente e algumas vão coincidir por puro acaso.",
  "Correlation ≠ causation, a reasoning trap.":
    "Correlação ≠ causalidade, uma armadilha do raciocínio.",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "Duas coisas podem subir e descer juntas perfeitamente e ainda assim não ter nada a ver uma com a outra. Muitas vezes, uma terceira coisa oculta puxa as duas cordas ao mesmo tempo, então parece que uma causa a outra quando nenhuma causa. Antes de acreditar em uma manchete dizendo que “X está ligado a Y”, pergunte o que mais poderia estar influenciando as duas.",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "Os bombardeiros voltam crivados de furos de bala. Onde você adiciona a blindagem?",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "Na Segunda Guerra Mundial, os bombardeiros que voltavam estavam repletos de danos, mais intensos nas asas e na fuselagem, enquanto os motores e a cabine voltavam quase intactos. A blindagem é pesada, então você só pode reforçar algumas áreas.",
  "Where should the armour go?": "Onde colocar a blindagem?",
  "Returning bombers": "Os bombardeiros que voltam",
  "hits on planes that came back": "impactos nos aviões que voltaram",
  "armour here, the lost planes' hits":
    "blindar aqui, os impactos dos aviões perdidos",
  "The wings and body": "As asas e a fuselagem",
  "where the holes are": "onde estão os furos",
  "Spread it evenly": "Distribuir por igual",
  "play it safe": "jogar pelo seguro",
  "The engines and cockpit": "Os motores e a cabine",
  "where there are no holes": "onde não há furos",
  "Armour where the holes aren't.":
    "Blinde onde não há furos.",
  "The missing planes": "Os aviões que faltam",
  "You only see the survivors": "Você só vê os sobreviventes",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "Estes são os aviões que chegaram em casa. Os atingidos no motor ou na cabine não chegaram, então os danos deles nunca aparecem nos dados. Os furos nos sobreviventes mostram exatamente onde um bombardeiro pode ser atingido e ainda voar. As áreas intactas são as fatais: é ali que se deve blindar.",
  "Survivorship bias": "O viés de sobrevivência",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "Quando você olha só para os vencedores, os fracassos se tornam invisíveis, e muitas vezes é neles que está a verdadeira lição.",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "Antes de tirar uma conclusão, pergunte quem está faltando nos dados. Os aviões que não voltaram, os fundos que fecharam, os negócios que quebraram: foram discretamente filtrados para fora, e recolocá-los pode inverter a resposta.",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "O viés de sobrevivência se instala sempre que seus dados foram discretamente filtrados para manter só as coisas que “deram certo”: aviões que voltaram, fundos ainda em operação, empresas ainda existentes. Você nunca vê aquelas que fracassaram e saíram de cena e, como os sobreviventes compartilham aquilo que os ajudou a sobreviver, esse traço parece bem mais comum, ou bem mais eficaz, do que realmente é. A solução é caçar o grupo que falta e perguntar o que a imagem completa mostraria. (O verdadeiro Wald fez mais do que apontar para um diagrama: ele construiu um método estatístico para estimar a vulnerabilidade de cada parte a partir dos danos dos sobreviventes.)",
  "Falling cats": "Os gatos que caem",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "Veterinários constataram que gatos que caíam de andares mais altos muitas vezes chegavam com menos ferimentos do que os que caíam de andares mais baixos. Parte da explicação é uma sombria sobrevivência: um gato que não sobreviveu à queda nunca era levado à clínica, então os dados do hospital só contam os que sobreviveram.",
  "Star mutual funds": "Os fundos estrelados",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "Olhe para os fundos ainda oferecidos hoje e a gestão ativa parece ótima. Mas os fundos que foram mal são discretamente fechados e retirados dos registros, então os sobreviventes lisonjeiam todo o setor. Contar os fundos que morreram reduz o retorno médio em mais de um ponto percentual ao ano.",
  "Survivorship bias, a reasoning trap.":
    "O viés de sobrevivência, uma armadilha do raciocínio.",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "É fácil estudar os vencedores, os sobreviventes, os sucessos, o que ainda está de pé, e copiar o que eles têm em comum. Mas os fracassos são invisíveis: saíram dos dados. Aquilo que ajudou os sobreviventes a sobreviver parece bem mais poderoso do que é, porque você nunca vê todos aqueles que não foram salvos. Antes de copiar os vencedores, pergunte quem está faltando.",
};
