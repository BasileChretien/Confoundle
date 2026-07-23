/**
 * French dictionary: English source string, French translation. Keys must match
 * the English text exactly. Native review by Basile; correct in place.
 */
export const fr: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "La compétence",
  "Where this shows up": "Où ça se rencontre",
  "See it in the wild": "Le voir en vrai",
  "Why it happens": "Pourquoi ça arrive",
  "Same trap, other places": "Le même piège, ailleurs",
  Source: "Source",
  "Make my card →": "Créer ma carte →",
  "Go deeper on this idea →": "Approfondir cette idée →",
  "Commit to see the reveal. No peeking.":
    "Choisissez pour découvrir la réponse. Pas de triche.",
  "Reveal the answer": "Révéler la réponse",
  "Name the skill →": "Nommer la compétence →",
  "Play again": "Rejouer",
  "The lurking variable": "La variable cachée",
  "Nicely done, you didn't take the number at face value.":
    "Bien joué. Vous n'avez pas pris le chiffre pour argent comptant.",
  "So does almost everyone. That's exactly the trap.":
    "Presque tout le monde aussi. C'est précisément le piège.",
  "You caught it": "Vous l'avez repéré",
  "Most people miss this": "La plupart passent à côté",
  "You picked": "Vous avez choisi",
  Replay: "Rejouer",
  "Who each treatment actually treated":
    "Qui chaque traitement a réellement traité",
  "So what's the skill? →": "Alors, quelle est la compétence ? →",
  // scope tags (right of the figure caption)
  Overall: "Au total",
  "By subgroup": "Par sous-groupe",
  "The facts": "Les faits",
  "The reality": "La réalité",
  Observed: "Observé",
  Explained: "Expliqué",
  Survivors: "Les survivants",
  "The full picture": "L'image complète",
  // category names (humanized)
  "Causal reasoning": "Raisonnement causal",
  "Statistical reasoning": "Raisonnement statistique",
  // tags
  Everyday: "Grand public",
  Clinical: "Clinique",
  Research: "Recherche",
  Statistics: "Statistiques",
  Diagnosis: "Diagnostic",
  Screening: "Dépistage",
  Epidemiology: "Épidémiologie",
  Pharmacology: "Pharmacologie",
  Psychology: "Psychologie",
  Biology: "Biologie",
  Technology: "Technologie",
  Economics: "Économie",
  Politics: "Politique",
  Education: "Éducation",
  Finance: "Finance",
  Business: "Gestion",
  Law: "Droit",
  Sports: "Sport",
  History: "Histoire",
  Media: "Médias",
  "Demo · try any puzzle": "Démo · essayez n'importe quel puzzle",
  // frequency view (base-rate puzzle)
  "1 in": "1 sur",
  "How common it is": "Sa fréquence",
  "Test catches it": "Le test la détecte",
  Always: "Toujours",
  "False-alarm rate": "Taux de fausses alertes",
  "Positive tests": "Tests positifs",
  of: "sur",
  actually: "réellement",
  chance: "de probabilité",
  "false alarm": "fausse alerte",
  // wager + stats
  "How sure are you?": "À quel point êtes-vous sûr ?",
  Hunch: "Intuition",
  "Fairly sure": "Assez sûr",
  Certain: "Certain",
  "Pick one, then stake how sure you are":
    "Choisissez, puis misez votre niveau de confiance",
  pts: "pts",
  Today: "Aujourd'hui",
  Streak: "Série",
  Best: "Record",
  Caught: "Repérés",
  Calibration: "Calibration",
  "You beat {pct}% of players today":
    "Vous avez battu {pct} % des joueurs aujourd'hui",
  "A new puzzle every day. Keep the streak alive.":
    "Un nouveau puzzle chaque jour. Ne cassez pas la série.",
  "Sharp eye, and you called it.":
    "Bien vu, et vous l'aviez annoncé.",
  "Nicely spotted.": "Joliment repéré.",
  "Good instinct.": "Bon instinct.",
  "Ouch. Confidently wrong, the classic trap.":
    "Aïe. Sûr de vous et pourtant dans l'erreur, le piège classique.",
  "So does almost everyone. That's the trap.":
    "Comme presque tout le monde. C'est ça, le piège.",
  "You sensed something was off, but went with it anyway.":
    "Vous sentiez que quelque chose clochait, mais vous y êtes allé quand même.",
  // friends board
  "Friends board": "Classement entre amis",
  "Your name": "Votre nom",
  "Copy result": "Copier le résultat",
  Copied: "Copié",
  Share: "Partager",
  "Paste your friends' results here":
    "Collez ici les résultats de vos amis",
  "Add to board": "Ajouter au classement",
  // trap hunt
  "Trap Hunt": "Chasse aux pièges",
  "Some of these are sound. Some hide a trap.":
    "Certains de ces raisonnements sont valides. D'autres cachent un piège.",
  "Sound reasoning": "Raisonnement valide",
  "There's a trap": "Il y a un piège",
  "Which trap?": "Quel piège ?",
  Rank: "Rang",
  Done: "Terminé",
  "Trap Hunt unlocked": "Chasse aux pièges débloquée",
  "Can you still spot the traps?":
    "Saurez-vous encore repérer les pièges ?",
  Novice: "Novice",
  Sceptic: "Sceptique",
  Detective: "Détective",
  Analyst: "Analyste",
  "Sharp eye": "Œil aiguisé",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "Je l'ai vu venir. Pas sûr que vous y arriviez.",
  "I totally fell for this.": "Je suis complètement tombé dans le panneau.",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "Le traitement B guérit plus de patients au total. Lequel choisiriez-vous ?",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "Deux traitements contre les calculs rénaux, 350 patients chacun. Sur le taux de réussite global, le traitement B arrive en tête. Même maladie, même objectif, un seul chiffre pour trancher.",
  "Which treatment would you pick?": "Quel traitement choisiriez-vous ?",
  "Success rate": "Taux de réussite",
  "Treatment A, open surgery": "Traitement A, chirurgie ouverte",
  "Treatment B, keyhole (PCNL)": "Traitement B, voie percutanée (NLPC)",
  "Small stones": "Petits calculs",
  "Large stones": "Gros calculs",
  "Treatment B": "Traitement B",
  "83% overall": "83 % au total",
  "Treatment A": "Traitement A",
  "78% overall": "78 % au total",
  "Treatment A actually wins, for both stone sizes.":
    "En réalité, c'est le traitement A qui gagne, pour les deux tailles de calculs.",
  "Stone size (case severity)":
    "La taille des calculs (la gravité des cas)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "A et B ne traitaient pas les mêmes patients. A a surtout reçu les cas difficiles (gros calculs), tandis que B a surtout reçu les cas faciles. Tout le monde réussit moins bien sur les cas difficiles, donc la moyenne globale de A s'effondre alors même que A gagne dans chaque groupe :",
  "Simpson's paradox": "Le paradoxe de Simpson",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "Une tendance globale peut s'inverser dès qu'on tient compte d'une variable cachée répartie de façon inégale entre les groupes.",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "Chaque fois que deux groupes sont comparés avec un seul taux global, demandez-vous ce qu'on a mélangé pour obtenir ce chiffre, et si les deux groupes affrontaient vraiment les mêmes chances. La taille des calculs est le facteur de confusion le plus évident ici ; c'est rarement le seul.",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "Le score « global » n'est pas une nouvelle mesure ; c'est le mélange des scores de chaque groupe, et les groupes les plus grands pèsent davantage. Quand un camp est rempli de cas faciles et l'autre de cas difficiles, ce mélange tire leurs scores globaux dans des directions opposées. Une option peut donc mener dans le groupe facile comme dans le groupe difficile, et pourtant rester derrière au total, parce qu'elle a traité la plupart des cas difficiles et que son score mélangé se rapproche de ce chiffre plus bas. Le remède, c'est une répartition équitable : donnez aux deux camps le même mélange de cas faciles et difficiles (exactement ce que fait un essai randomisé), et l'inversion devient impossible.",
  "University admissions": "Les admissions à l'université",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "En 1973, les écoles doctorales de Berkeley ont admis 44 % des hommes mais seulement 35 % des femmes. Cela ressemblait à une pure discrimination. Pourtant, département par département, les femmes étaient admises à peu près au même taux que les hommes, voire davantage. Elles postulaient simplement plus souvent dans les départements les plus sélectifs, où presque tout le monde était refusé. L'écart tenait à l'endroit où l'on postulait, pas à qui décidait.",
  "Baseball batting averages": "Les moyennes au bâton au baseball",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "David Justice a mieux frappé que Derek Jeter en 1995 (0,253 contre 0,250) puis à nouveau en 1996 (0,321 contre 0,314). Mais sur les deux saisons réunies, c'est Jeter qui l'emporte, 0,310 contre 0,270. Chaque année prise seule désignait Justice ; les deux années ensemble désignaient Jeter, parce que les joueurs avaient des nombres de passages au bâton très différents lors de leurs bonnes et de leurs mauvaises saisons.",
  "COVID-19 death rates": "Les taux de mortalité de la COVID-19",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "Début 2020, le taux de mortalité rapporté parmi les cas de COVID était plus élevé en Italie qu'en Chine au total. Mais ventilé par âge, le taux italien était plus faible dans chaque tranche d'âge. L'Italie comptait simplement beaucoup plus de patients âgés, plus à risque ; regrouper tous les âges faisait donc paraître l'Italie pire que ne le montrait une comparaison équitable, âge par âge.",
  "Simpson's paradox, a reasoning trap.":
    "Le paradoxe de Simpson, un piège de raisonnement.",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "Une option peut gagner dans chaque groupe pris séparément, et pourtant perdre dès qu'on réunit tous les groupes. Cela paraît impossible, mais c'est bien réel. Cela se produit quand les groupes ne forment pas une comparaison équitable : un camp a discrètement hérité des cas faciles, l'autre des cas difficiles. Le grand chiffre global dit alors une chose pendant que les chiffres groupe par groupe disent le contraire, et c'est le grand chiffre qui vous trompe.",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "Le tableau à deux traitements de 350/350 est présenté tel quel par Julious et Mullee (1994), à partir de la série clinique de Charig et al. (1986) (qui comparait à l'origine trois modalités).",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "Un test presque parfait vous dit que vous êtes malade. Faut-il vraiment s'inquiéter ?",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "Cette maladie est rare : environ 1 personne sur 1 000 en est atteinte. Le test ne la manque jamais quand elle est réellement présente, et il ne donne une fausse alerte que chez environ 1 personne en bonne santé sur 20. Votre résultat vient de revenir positif.",
  "What's the chance you actually have the disease?":
    "Quelle est la probabilité que vous ayez réellement la maladie ?",
  "In 1,000 people": "Sur 1 000 personnes",
  "have the disease": "ont la maladie",
  "test positive": "sont positives au test",
  "About 95%": "Environ 95 %",
  "the test is 95% accurate": "le test est fiable à 95 %",
  "About half": "Environ la moitié",
  "50/50": "50/50",
  "About 2%": "Environ 2 %",
  "roughly 1 in 50": "à peu près 1 sur 50",
  "Positive, but almost certainly a false alarm.":
    "Positif, mais presque certainement une fausse alerte.",
  "The base rate": "Le taux de base",
  "A rare disease flips the odds":
    "Une maladie rare renverse les probabilités",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "Comme presque personne n'a la maladie, le petit taux d'erreur du test fait tout le travail. Sur 1 000 personnes, 1 seule est vraiment malade, mais environ 50 personnes en bonne santé sont elles aussi positives. Parmi les ~51 résultats positifs, 1 seul est donc réel. Un test positif vous fait à peine passer de « très improbable » à « toujours improbable ».",
  "The base-rate fallacy": "Le biais du taux de base",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "Quand une chose est rare, même un test très fiable produit bien plus de fausses alertes que de vrais cas ; un résultat positif peut donc encore vouloir dire que vous allez probablement bien.",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "La solution : raisonner en personnes entières, pas en pourcentages. Imaginez-en 1 000, comptez les vrais positifs et les fausses alertes, puis comparez. Demandez-vous toujours à quel point la chose est fréquente avant de faire confiance à un test positif.",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "La fiabilité d'un test et vos probabilités réelles sont deux choses différentes. La fiabilité se mesure sur des personnes dont on sait déjà si elles sont malades ou saines. Mais un résultat positif pose la question inverse (étant donné ce positif, suis-je malade ?), et cela dépend du nombre de malades qu'il y avait à trouver au départ. Si seulement 1 personne sur 1 000 a la maladie, l'immense majorité en bonne santé produit un déluge de fausses alertes qui noie l'unique vrai cas. Rendez la maladie fréquente et le même test paraît excellent ; rendez-la rare et un positif ne veut pas dire grand-chose à lui seul.",
  "Even doctors slip": "Même les médecins se trompent",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "Des chercheurs ont posé exactement cette question à des médecins et à du personnel médical : une maladie touchant 1 personne sur 1 000, un test avec 5 % de fausses alertes. La réponse la plus fréquente était 95 %. La moyenne était de 56 %. Environ 1 sur 5 seulement a donné la bonne réponse, à peu près 2 %.",
  "Think in people, not percentages":
    "Raisonner en personnes, pas en pourcentages",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "Le remède le plus simple, c'est la formulation. Posez le même problème en fréquences naturelles (« 1 personne sur 1 000 » et « environ 50 fausses alertes » plutôt que « 0,1 % » et « 5 % »), et bien plus de gens, médecins compris, trouvent la bonne réponse.",
  "The base-rate fallacy, a reasoning trap.":
    "Le biais du taux de base, un piège de raisonnement.",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "Un test peut être fiable à 95 % et un résultat positif peut quand même vouloir dire que vous allez presque sûrement bien. Tout dépend de la rareté de la chose. Si seulement 1 personne sur 1 000 a une maladie, alors parmi tous ceux qui sont positifs, les rares vrais cas sont enfouis sous une montagne de fausses alertes. La fiabilité n'est pas la même chose que vos probabilités réelles ; il faut d'abord se demander à quel point la chose est fréquente.",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "Plus de chocolat, plus de prix Nobel. Votre pays devrait-il faire des réserves ?",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "C'est un résultat réel et publié : dans 23 pays, plus les gens mangent de chocolat, plus le pays a produit de lauréats du prix Nobel, une forte corrélation (r ≈ 0,79). La tendance est difficile à contester.",
  "So, does eating chocolate help win Nobel Prizes?":
    "Alors, manger du chocolat aide-t-il à gagner des prix Nobel ?",
  "Across 23 countries": "Dans 23 pays",
  "Chocolate eaten": "Chocolat consommé",
  "Nobel prizes": "Prix Nobel",
  "A country's wealth": "La richesse du pays",
  "r ≈ 0.79": "r ≈ 0,79",
  "Yes, chocolate boosts brainpower":
    "Oui, le chocolat stimule le cerveau",
  "the trend is strong": "la tendance est forte",
  "No, it's a pure fluke": "Non, c'est un pur hasard",
  coincidence: "coïncidence",
  "No, a third thing drives both":
    "Non, une troisième chose agit sur les deux",
  "a common cause": "une cause commune",
  "The chocolate isn't doing anything.": "Le chocolat n'y est pour rien.",
  "The common cause": "La cause commune",
  "A country's wealth pulls both up":
    "La richesse du pays tire les deux vers le haut",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "Les pays plus riches peuvent s'offrir plus de chocolat ET financer plus d'universités, de laboratoires et de recherche, ce qui, en réalité, fait gagner des prix Nobel. La richesse agit sur les deux : chocolat et Nobel montent ensemble sans que l'un cause l'autre. Distribuez du chocolat gratuit et vous obtiendrez des dents plus sucrées, pas plus de lauréats.",
  "Correlation ≠ causation": "Corrélation ≠ causalité",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "Deux choses qui évoluent ensemble ne signifient pas que l'une cause l'autre. Souvent, une troisième chose agit discrètement sur les deux.",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "Devant un lien fort, passez en revue les possibilités avant de croire que X cause Y : peut-être Y cause X, peut-être une cause commune agit sur les deux, ou peut-être est-ce le hasard. En général, seule une comparaison contrôlée permet de trancher.",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "Une corrélation dit seulement que deux choses ont tendance à évoluer ensemble. Cela peut avoir plusieurs causes : l'une cause vraiment l'autre ; la causalité va dans l'autre sens ; un troisième facteur caché agit sur les deux (une cause commune, comme la chaleur qui fait grimper à la fois les ventes de glaces et les noyades) ; ou c'est une coïncidence, d'autant plus probable qu'on passe au crible davantage de données. Repérer une corrélation est la partie facile. Déterminer laquelle de ces explications est en jeu, voilà le vrai travail, et il faut en général une expérience, pas seulement un graphique.",
  "Storks and babies": "Les cigognes et les bébés",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "Dans les pays européens, ceux qui comptent plus de cigognes ont réellement plus de naissances humaines, un lien statistiquement significatif. La légende est fausse : les grands pays ont simplement de la place pour plus de cigognes et pour plus d'habitants.",
  "Nicolas Cage and drownings": "Nicolas Cage et les noyades",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "Le nombre de films que sort Nicolas Cage dans l'année suit le nombre de personnes qui se noient dans des piscines. Personne ne croit que l'un cause l'autre ; alignez assez de tendances sans rapport et certaines coïncideront par pur hasard.",
  "Correlation ≠ causation, a reasoning trap.":
    "Corrélation ≠ causalité, un piège de raisonnement.",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "Deux choses peuvent monter et descendre parfaitement ensemble sans avoir le moindre rapport. Très souvent, une troisième chose cachée tire les deux ficelles à la fois : on croit alors que l'une cause l'autre, alors qu'aucune ne le fait. Avant de croire un titre disant que « X est lié à Y », demandez-vous ce qui pourrait bien agir sur les deux.",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "Les bombardiers rentrent criblés d'impacts. Où ajoutez-vous le blindage ?",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "Pendant la Seconde Guerre mondiale, les bombardiers de retour étaient constellés d'impacts, surtout sur les ailes et le fuselage, tandis que les moteurs et le cockpit revenaient presque intacts. Le blindage est lourd : vous ne pouvez renforcer que quelques zones.",
  "Where should the armour go?": "Où placer le blindage ?",
  "Returning bombers": "Les bombardiers de retour",
  "hits on planes that came back": "impacts sur les avions revenus",
  "armour here, the lost planes' hits":
    "blinder ici, les impacts des avions perdus",
  "The wings and body": "Les ailes et le fuselage",
  "where the holes are": "là où sont les impacts",
  "Spread it evenly": "Le répartir uniformément",
  "play it safe": "jouer la sécurité",
  "The engines and cockpit": "Les moteurs et le cockpit",
  "where there are no holes": "là où il n'y a pas d'impacts",
  "Armour where the holes aren't.":
    "Blindez là où il n'y a pas d'impacts.",
  "The missing planes": "Les avions manquants",
  "You only see the survivors": "Vous ne voyez que les survivants",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "Ce sont les avions qui sont rentrés. Ceux touchés au moteur ou au cockpit ne sont pas revenus, donc leurs impacts n'apparaissent jamais dans les données. Les trous des survivants indiquent exactement où un bombardier peut être touché et voler encore. Les zones intactes sont les zones fatales : c'est là qu'il faut blinder.",
  "Survivorship bias": "Le biais du survivant",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "Quand on ne regarde que les gagnants, les échecs deviennent invisibles, alors qu'ils portent souvent la vraie leçon.",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "Avant de conclure, demandez-vous qui manque dans les données. Les avions qui ne sont pas revenus, les fonds qui ont fermé, les entreprises qui ont coulé : ils ont été discrètement écartés, et les remettre dans le tableau peut inverser la réponse.",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "Le biais du survivant s'installe dès que vos données ont été discrètement filtrées pour ne garder que ce qui « a réussi » : les avions revenus, les fonds encore cotés, les entreprises encore là. Vous ne voyez jamais ceux qui ont échoué et disparu, et comme les survivants partagent ce qui les a aidés à survivre, ce trait paraît bien plus répandu, ou bien plus efficace, qu'il ne l'est vraiment. Le remède, c'est de traquer le groupe manquant et de se demander ce que montrerait l'image complète. (Le vrai Wald a fait plus que pointer un schéma : il a construit une méthode statistique pour estimer la vulnérabilité de chaque partie à partir des impacts des survivants.)",
  "Falling cats": "Les chats qui tombent",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "Des vétérinaires ont constaté que les chats tombant des étages élevés arrivaient souvent avec moins de blessures que ceux tombant de plus bas. Une partie de l'explication est un sinistre biais du survivant : un chat qui n'a pas survécu à la chute n'a jamais été amené, si bien que les données de la clinique ne comptent que ceux qui ont survécu.",
  "Star mutual funds": "Les fonds vedettes",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "Regardez les fonds encore proposés aujourd'hui et la gestion active paraît excellente. Mais les fonds qui ont mal performé sont discrètement fermés et retirés des registres : les survivants flattent donc tout le secteur. Compter les fonds disparus réduit le rendement moyen de plus d'un point de pourcentage par an.",
  "Survivorship bias, a reasoning trap.":
    "Le biais du survivant, un piège de raisonnement.",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "Il est facile d'étudier les gagnants, les survivants, les réussites, ce qui tient encore debout, et de copier ce qu'ils ont en commun. Mais les échecs sont invisibles : ils ont disparu des données. Ce qui a aidé les survivants à survivre paraît bien plus puissant qu'il ne l'est, parce qu'on ne voit jamais tous ceux qu'il n'a pas sauvés. Avant de copier les gagnants, demandez-vous qui manque.",

  // ==== Prosecutor's fallacy (People v. Collins) ====
  "A 1 in 12 million match. Case closed?":
    "Une correspondance à 1 sur 12 millions. Affaire classée ?",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "Los Angeles, 1964. Une femme est jetée à terre et son sac est emporté. Des témoins décrivent le duo qui s'est enfui : une femme blonde à queue de cheval et un homme noir barbu, dans une voiture en partie jaune. Un couple qui correspond à chaque détail est inculpé. Au procès, on demande à un expert de supposer une fréquence pour chaque caractéristique ; il les multiplie entre elles et obtient 1 sur 12 millions. Le procureur explique au jury que c'est la probabilité que les deux accusés soient innocents. Prenez ce 1 sur 12 millions pour argent comptant, et imaginez les 12 millions de couples qui auraient pu être ceux-là.",
  "This couple fits the description. What are the odds they did it?":
    "Ce couple correspond à la description. Quelle est la probabilité qu'il soit coupable ?",
  "In 12 million couples": "Sur 12 millions de couples",
  "did it": "sont coupables",
  "fit the description": "correspondent à la description",
  "Virtually certain": "Quasiment certain",
  "12 million to one against them": "12 millions contre un en leur défaveur",
  "Around 99%": "Environ 99 %",
  "not quite proof, but close": "pas tout à fait une preuve, mais presque",
  "About a coin flip": "À peu près un pile ou face",
  "roughly 50/50": "à peu près 50/50",
  "One in 12 million, and still a coin flip.":
    "Une chance sur 12 millions, et pourtant un pile ou face.",
  "The flipped question": "La question inversée",
  "Rare evidence is common in a big crowd":
    "Un indice rare devient courant dans une grande foule",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "Le 1 sur 12 millions répond à une question : si l'on prend un couple au hasard, quelle est la probabilité qu'il corresponde ? Le jury doit en trancher une autre : parmi tous les couples qui correspondent, lequel a fait le coup ? Alignez 12 millions de couples. L'un d'eux est le couple de voleurs, et il correspond bien sûr. Mais à raison de 1 sur 12 millions, environ un couple de plus dans cette foule correspond par pur hasard. Un couple qui correspond a donc à peu près autant de chances d'être innocent que coupable.",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "La Cour suprême de Californie a annulé la condamnation en 1968. En partant des propres chiffres de l'accusation, elle a trouvé une probabilité de plus de 40 pour cent qu'au moins un autre couple ait pu correspondre tout aussi bien à la description, et elle a averti que la culpabilité ne peut pas se régler par une arithmétique de ce genre.",
  "The prosecutor's fallacy": "Le sophisme du procureur",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "« S'il était innocent, cet indice serait aussi improbable » n'est pas la même chose que « cet indice rend son innocence aussi improbable ». Intervertissez les deux et un pile ou face se met à sonner comme une certitude.",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "Avant d'accepter une correspondance à une chance sur un million, demandez quelle était la taille du bassin. Une chance sur un million dans une ville de dix millions d'habitants fait apparaître une dizaine de correspondances, et une seule de ces personnes est coupable. Le chiffre ne veut rien dire tant qu'on n'a pas dit qui composait la foule.",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "Deux questions paraissent identiques et ne le sont pas. La première : si cette personne n'y était pour rien, quelle est la probabilité de cet indice ? Voilà ce qu'un laboratoire ou un expert peut réellement mesurer, et c'est de là que viennent des chiffres comme 1 sur 12 millions. La seconde : étant donné cet indice, quelle est la probabilité que cette personne soit coupable ? Voilà ce qu'un jury doit trancher, et cela dépend de quelque chose qu'aucun laboratoire ne mesure : combien de personnes auraient pu le faire. Appliquez une probabilité de 1 sur 12 millions à une foule de 12 millions et vous attendez environ une correspondance innocente ; à elle seule, la correspondance vaut donc à peu près un pile ou face. Réduisez la foule, ou ajoutez des indices indépendants, et la même correspondance devient puissante. Agrandissez la foule, et elle devient faible. Le piège fonctionne aussi à l'envers : un avocat de la défense peut dire que 2 000 personnes dans la ville partagent ce groupe sanguin, donc que l'indice ne prouve rien, ce qui passe discrètement sous silence le fait que les 1 999 autres n'étaient nulle part près du lieu du crime.",
  "Two cot deaths, and a number that became guilt":
    "Deux morts subites du nourrisson, et un chiffre devenu culpabilité",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "Lors d'un procès pour meurtre en Angleterre, il a été avancé que la probabilité de deux morts subites du nourrisson dans une famille comme celle de l'accusée était de 1 sur 73 millions. La presse en a fait la probabilité que ces décès soient naturels. La Royal Statistical Society a déclaré publiquement que ce chiffre n'avait aucun fondement statistique, parce qu'il supposait les deux décès indépendants, et que le lire comme une probabilité d'innocence relève du sophisme du procureur. Ce dont le jury avait besoin, c'était d'une comparaison : deux morts subites et deux meurtres sont rares tous les deux, alors lequel est le plus rare ici ?",
  "Almost nobody spots the swap": "Presque personne ne repère l'inversion",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "Des chercheurs ont soumis à 73 étudiants une affaire de meurtre où le groupe sanguin du tueur se retrouve chez 1 personne sur 100, puis leur ont montré un raisonnement de l'accusation bâti sur la question inversée : seulement 1 pour cent de probabilité que le sang vienne de quelqu'un d'autre, donc 99 pour cent de probabilité que le suspect soit coupable. 21 des 73 ont jugé ce raisonnement correct, et 16 seulement ont vu que lui et le raisonnement adverse de la défense étaient faux tous les deux.",
  "The prosecutor's fallacy, a reasoning trap.":
    "Le sophisme du procureur, un piège de raisonnement.",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "Quand un expert affirme qu'il n'y a qu'une chance sur un million de correspondance par accident, c'est un fait sur l'indice, pas sur la personne dans le box. Intervertissez les deux et vous obtenez le sophisme du procureur. Le remède, c'est de demander combien de personnes composaient le bassin : une chance sur un million dans une ville de dix millions d'habitants produit une dizaine de correspondances innocentes, si bien qu'à elle seule une correspondance peut être très loin d'une preuve.",
  "Spotted the swap. Bet you don't.":
    "J'ai repéré l'inversion. Pas sûr que vous y arriviez.",
  "I'd have convicted on the spot.": "Je l'aurais condamné sur-le-champ.",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "L'annexe de l'arrêt montrait qu'avec ces mêmes chiffres, sur un bassin d'environ 12 millions de couples, la probabilité qu'au moins un autre couple corresponde à la description était d'environ 41 pour cent.",

  // ==== Trap Hunt items ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "Deux écoles publient leurs résultats aux examens. L'école B a le meilleur taux de réussite au total, 75 % contre 70 %. Quand on ventile les résultats selon le milieu des élèves, l'école A arrive en tête dans chaque groupe sans exception. Le district scolaire félicite l'école B.",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "A gagne dans chaque groupe mais perd au total, ce qui arrive quand les groupes sont mélangés de façon inégale. C'est le chiffre global qui induit en erreur ici.",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "Une usine annonce que son nouveau procédé a un taux de défauts plus faible que l'ancien, 3 % contre 4 %. En examinant séparément les pièces simples et les pièces complexes, l'ancien procédé avait moins de défauts dans les deux cas.",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "Meilleur dans les deux catégories et pourtant moins bon au total : cela signifie que les deux procédés ont traité des mélanges très différents de pièces simples et de pièces complexes.",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "Une maladie touche environ 1 personne sur 2 000. Un test de dépistage est fiable à 99 %. Un patient est positif et on lui dit qu'il est presque certainement atteint.",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "Avec une maladie aussi rare, le taux d'erreur de 1 % produit bien plus de faux positifs qu'il n'y a de vrais cas ; un résultat positif reste donc plus probablement une fausse alerte.",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "Un système signale des voyageurs comme suspects et est fiable à 95 %. Environ 1 voyageur sur 1 000 représente réellement une menace. Un responsable affirme qu'un voyageur signalé a 95 % de probabilité d'être une menace.",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "Cela confond la fiabilité du système avec la probabilité une fois le signalement émis. Comme les menaces sont rares, l'immense majorité des signalements concernent des voyageurs ordinaires.",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "Les quartiers qui comptent plus de parcs ont des taux d'obésité plus faibles. Un rapport municipal en conclut que construire des parcs fera reculer l'obésité, et propose un programme de création de parcs.",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "La richesse et l'urbanisme agissent vraisemblablement à la fois sur la présence de parcs et sur la santé ; ce ne sont donc peut-être pas les parcs qui font le travail.",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "Les étudiants qui vont plus souvent à la bibliothèque obtiennent de meilleures notes. Une université annonce des visites hebdomadaires obligatoires à la bibliothèque pour faire monter les notes.",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "Les étudiants motivés travaillent davantage et fréquentent aussi la bibliothèque. Imposer la visite n'apporte pas la motivation qui a produit les notes.",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "Un livre de management étudie des entreprises prospères depuis cinquante ans et constate que presque toutes avaient des dirigeants audacieux, prêts à prendre des risques. Il en conclut qu'une direction audacieuse est la cause d'un succès durable.",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "Les entreprises audacieuses qui ont coulé ne figurent pas dans l'échantillon. L'audace peut tout aussi bien causer des échecs spectaculaires, que l'étude ne peut pas voir.",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "Une clinique examine les patients qui ont terminé son programme de rééducation exigeant et constate d'excellents résultats. Elle présente le programme comme très efficace.",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "Les patients qui ont abandonné sont exclus, et ce sont probablement ceux qui vont le plus mal. Ne compter que ceux qui vont au bout flatte le programme.",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "Une recherche dans une base de données fait ressortir un homme dont l'ADN correspond à un prélèvement fait sur les lieux du crime. Le laboratoire indique que ce profil se retrouve chez environ 1 personne sur un million. Le procureur explique au jury qu'il y a donc environ une chance sur un million qu'il soit innocent.",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "Le 1 sur un million est la probabilité d'une correspondance s'il est innocent, pas la probabilité qu'il soit innocent étant donné la correspondance. Dans un grand bassin, d'autres personnes correspondent aussi : les deux chiffres sont très loin d'être les mêmes.",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "Des fibres relevées sur le manteau d'un suspect correspondent au tapis de la victime. Un expert affirme que seul environ 1 manteau sur 5 000 porterait de telles fibres. L'avocat en conclut que le suspect a 4 999 fois plus de chances d'être coupable qu'innocent.",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "Un chiffre de rareté décrit l'indice, pas la personne. Le nombre d'innocents qui auraient pu récupérer ces fibres dépend du nombre de gens qui se sont un jour approchés de ce tapis.",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "Un expert témoigne que le profil ADN se retrouve chez environ 1 personne sur un million, et ajoute que, dans une ville de deux millions d'habitants, cela signifie qu'environ deux autres personnes devraient correspondre elles aussi ; à elle seule, la correspondance ne désigne donc pas l'accusé.",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "Voilà le chiffre de rareté énoncé correctement. L'expert le convertit en nombre attendu de correspondances dans la population au lieu de le retourner en probabilité d'innocence.",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "Des patients sont répartis au hasard entre un médicament et un placebo. Le groupe traité compte moins d'AVC, et l'écart se maintient dans chaque tranche d'âge. Les chercheurs concluent que le médicament réduit les AVC.",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "La randomisation équilibre les différences cachées, et l'effet résiste à la ventilation par âge. Ce raisonnement est valide.",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "Un test avec 1 % de faux positifs est utilisé dans une clinique où environ 40 % des personnes testées sont réellement atteintes. Un médecin dit à un patient qu'un résultat positif rend la maladie beaucoup plus probable.",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "Le taux de base compte, et ici il est élevé. Avec une prévalence de 40 %, un résultat positif est réellement une preuve forte ; appliquer la leçon des maladies rares serait une erreur.",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "Une ville compare les morts sur la route avant et après l'abaissement d'une limitation de vitesse, ajuste sur le volume de trafic, et vérifie la tendance nationale sur les mêmes années. La baisse locale est plus forte que la tendance nationale.",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "Ils ont tenu compte des facteurs de confusion évidents et de la tendance de fond, ce qui est précisément ce qui rend crédible une comparaison avant/après.",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "Un essai rapporte les résultats de toutes les personnes incluses, y compris celles qui ont arrêté le traitement en cours de route, et précise combien ont abandonné et pourquoi.",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "Rapporter l'ensemble du groupe inclus, abandons compris, c'est exactement la protection contre le fait de ne compter que les survivants.",
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "Un hôpital installe un scanner plus sensible. Au cours des deux années suivantes, il rapporte que la survie s'est améliorée dans chaque grade de gravité de la maladie, du plus léger au plus avancé, et en conclut que ses soins se sont améliorés.",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "Un scanner plus précis reclasse les patients. Ceux qui sortent d'un grade léger en étaient les plus malades, et ils arrivent dans un grade grave comme les moins malades de celui-ci ; les deux moyennes montent donc sans que personne ne s'en sorte mieux.",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "Une école adopte un test d'orientation bien meilleur pour repérer les élèves en difficulté, et s'en sert pour les répartir entre une classe de niveau fort et une classe de niveau faible. L'année suivante, les résultats moyens montent dans les deux classes. Le chef d'établissement l'attribue aux nouvelles méthodes d'enseignement.",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "Les élèves sortis de la classe forte en étaient les plus faibles et deviennent les plus forts de la classe faible ; les deux moyennes montent donc par la seule redistribution.",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "Un hôpital rapporte que la survie s'est améliorée dans chaque grade de gravité sur cinq ans. Il précise aussi que les critères de classement n'ont pas changé pendant cette période, qu'aucun nouveau test diagnostique n'a été introduit, et que le nombre de patients dans chaque grade est resté à peu près le même.",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "Voilà le cas où l'amélioration est réelle. Rien n'a reclassé les patients, et les grades ont conservé la même part de personnes ; aucune redistribution n'a donc pu fabriquer ce gain.",

  // ==== Will Rogers phenomenon (stage migration) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "Une meilleure survie dans chaque stade sans exception. Quelqu'un a-t-il réellement vécu plus longtemps ?",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "Un même groupe de 131 patients atteints d'un cancer du poumon, traités en 1977, classés en stades à deux reprises. D'abord avec les seules informations que les hôpitaux d'autrefois pouvaient recueillir, puis de nouveau après de nouveaux examens d'imagerie. Personne n'a été soigné différemment. Seul le classement a changé.",
  "Did these patients actually do better?":
    "Ces patients s'en sont-ils réellement mieux sortis ?",
  "Six-month survival": "Survie à six mois",
  "Sorted the old way": "Classés à l'ancienne",
  Old: "Ancien",
  "Sorted after the new scans": "Classés après les nouveaux examens",
  New: "Nouveau",
  "Stage I": "Stade I",
  "Stage II": "Stade II",
  "Stage III": "Stade III",
  "Yes, they did better": "Oui, ils s'en sont mieux sortis",
  "every stage improved": "chaque stade s'est amélioré",
  "There is no way to tell": "Impossible de le savoir",
  "too little to go on": "trop peu d'éléments pour trancher",
  "No, nothing changed": "Non, rien n'a changé",
  "only the labels moved": "seules les étiquettes ont bougé",
  "Identical. Seventy two survivors either way.":
    "Identique. Soixante-douze survivants dans les deux cas.",
  "The migration": "La migration",
  "Patients moved between stages, and lifted both":
    "Des patients ont changé de stade, et ont tiré les deux vers le haut",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "Les nouveaux examens ont repéré une extension de la maladie que le bilan d'autrefois avait manquée, si bien que des patients ont été déplacés de stades favorables vers des stades plus graves. Chacun d'eux comptait parmi les plus malades du stade qu'il quittait, donc la moyenne de ce stade a monté. Chacun comptait aussi parmi les moins malades du stade qu'il rejoignait, donc cette moyenne a monté elle aussi. Chaque stade s'est amélioré et le sort de personne n'a changé :",
  "The Will Rogers phenomenon": "Le phénomène de Will Rogers",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "Déplacez des membres d'un groupe vers un autre et vous pouvez faire monter la moyenne de tous les groupes à la fois, alors que le tableau d'ensemble reste exactement le même.",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "Chaque fois que la moyenne d'une catégorie s'améliore, demandez-vous si cette catégorie contient toujours le même type de membres. Une meilleure détection redistribue discrètement qui est compté comme léger et qui est compté comme grave, et cette redistribution suffit à elle seule à faire paraître chaque colonne meilleure.",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "Imaginez deux seaux, l'un de bons résultats et l'autre de mauvais. Retirez les pires éléments du bon seau et laissez-les tomber dans le mauvais, où ils sont les meilleurs d'un mauvais lot. La moyenne du bon seau monte parce que ses membres les plus faibles sont partis. La moyenne du mauvais seau monte parce qu'il a gagné des membres meilleurs que les siens. Les deux moyennes s'améliorent et rien n'a changé pour aucun individu. En médecine, cette redistribution est l'œuvre de meilleurs examens d'imagerie, qui découvrent une maladie qui était là depuis toujours mais restait invisible. Voilà pourquoi la survie par stade peut s'améliorer partout à la fois pendant une période où les traitements eux-mêmes n'ont pas progressé, et voilà pourquoi comparer des stades entre des époques aux technologies différentes est périlleux.",
  "The check that gave it away": "La vérification qui a tout révélé",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "Les mêmes chercheurs ont plutôt classé les patients des deux époques d'après leurs symptômes, une mesure qu'aucun scanner ne peut déplacer. Jugés ainsi, les deux groupes survivaient à peu près au même taux, environ 77 et 78 pour cent pour ceux sans symptômes, et 26 contre 22 pour cent pour les plus malades. Ce qui avait réellement changé, c'était la composition, car le groupe le plus récent comptait une proportion deux fois plus élevée des patients les plus légers.",
  "It happened again with PET": "Cela s'est reproduit avec la TEP",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "À mesure que la TEP se répandait dans les hôpitaux américains, les patients atteints d'un cancer du poumon ont été reclassés une nouvelle fois. La part étiquetée au stade le plus avancé a grossi, et la survie à l'intérieur des stades a dûment progressé : la survie à deux ans est passée de 18 à 22 pour cent dans un stade, et de 6 à 8 pour cent dans un autre. Les auteurs ont intitulé leur article le phénomène revisité.",
  "The Will Rogers phenomenon, a reasoning trap.":
    "Le phénomène de Will Rogers, un piège de raisonnement.",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "Prenez les pires membres d'un bon groupe et déplacez-les dans un mauvais groupe. La moyenne du bon groupe monte, parce que ses éléments les plus faibles sont partis. La moyenne du mauvais groupe monte aussi, parce que les nouveaux venus valent mieux que ce qu'il avait déjà. Chaque groupe s'améliore et il ne s'est rien passé de réel. C'est ainsi que des examens plus précis peuvent faire paraître la survie meilleure à chaque stade d'une maladie alors qu'exactement autant de gens vivent et meurent.",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "Les effectifs sont ceux du tableau 4 : la cohorte de 1977, soit 131 patients classés deux fois, une fois sur les données dont disposait la cohorte plus ancienne et une fois avec la nouvelle imagerie. Les deux classements donnent 72 survivants, soit une survie à six mois de 55 pour cent.",
};
