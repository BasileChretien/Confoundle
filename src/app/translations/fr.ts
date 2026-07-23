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

  // ==== Lead-time bias (puzzle #7) ====
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "Les patients dépistés survivent cinq ans après le diagnostic. Les patients non dépistés, deux ans.",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "Le même cancer, qui progresse à la même vitesse, traité de la même façon. L'une des deux personnes a passé un examen d'imagerie qui l'a détecté tôt. L'autre a consulté des années plus tard, quand le premier symptôme est apparu. La survie se compte à partir du jour du diagnostic, comme on la compte presque toujours.",
  "Did finding it early give this person more time alive?":
    "Le détecter tôt a-t-il donné à cette personne plus de temps à vivre ?",
  "One life, two moments of diagnosis": "Une vie, deux moments de diagnostic",
  years: "ans",
  "cancer begins": "début du cancer",
  diagnosed: "diagnostic",
  died: "décès",
  "Survival counted from diagnosis": "Survie comptée à partir du diagnostic",
  "Found when symptoms appeared": "Détecté à l'apparition des symptômes",
  "Found early, by screening": "Détecté tôt, par dépistage",
  "Yes, three extra years": "Oui, trois années de plus",
  "five instead of two": "cinq au lieu de deux",
  "No, not one extra day": "Non, pas un jour de plus",
  "only the clock moved": "seul le chronomètre a bougé",
  "Both died on exactly the same day.":
    "Les deux sont morts exactement le même jour.",
  "The clock started earlier, the life did not get longer":
    "Le chronomètre a démarré plus tôt, la vie n'a pas été plus longue",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "Le dépistage n'a rien repoussé. Il a avancé le diagnostic de trois ans, si bien que cette personne a passé trois années de plus à savoir qu'elle avait un cancer. Compté à partir du diagnostic, cela se lit comme trois années de survie en plus. Mettez les deux vies sur le même calendrier et elles s'arrêtent au même instant :",
  "The extra years": "Les années en plus",
  "Lead-time bias": "Le biais d'avance au diagnostic",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "Détecter une maladie plus tôt allonge la survie mesurée à partir du diagnostic, même quand cela ne repousse la mort d'aucun jour.",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "Cela ne veut pas dire que la détection précoce est inutile. Cela veut dire que la survie à partir du diagnostic ne peut pas vous dire si elle a marché. Chaque fois que la survie s'améliore après l'arrivée d'un nouveau test, demandez-vous si les gens vivent plus longtemps ou si on les prévient simplement plus tôt. La mesure qu'on ne peut pas tromper ainsi, c'est le taux de mortalité dans toute la population, dépistés et non dépistés confondus.",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "Les statistiques de survie démarrent leur chronomètre le jour du diagnostic. Ce jour-là n'est pas un fait sur la maladie, c'est un fait sur le moment où quelqu'un a regardé. Regardez plus tôt et vous ajoutez du temps au début de la mesure sans rien changer à la fin. Les personnes diagnostiquées tôt franchissent forcément plus souvent le cap des cinq ans, parce qu'on leur a offert une longueur d'avance. Deux autres effets poussent dans le même sens. Un programme de dépistage attrape bien plus souvent les maladies à croissance lente que celles à croissance rapide, tout simplement parce qu'une maladie lente reste là plus longtemps à attendre d'être trouvée, et qu'une maladie lente a de toute façon un meilleur pronostic. Et un test assez sensible découvre des anomalies inoffensives qui n'auraient jamais causé d'ennuis, que l'on compte ensuite comme des cancers guéris. Ces trois effets flattent la survie sans sauver personne. Le seul test honnête consiste à prendre une population entière, à en inviter la moitié au dépistage, et à compter les décès chez tout le monde à partir du jour de l'invitation. Il existe des programmes de dépistage qui réussissent ce test, et c'est précisément pour cela qu'il vaut la peine de l'exiger.",
  "Survival rose for every cancer. Deaths did not follow.":
    "La survie a monté pour tous les cancers. Les décès n'ont pas suivi.",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "Entre 1950 et 1995, la survie à cinq ans s'est améliorée pour les 20 tumeurs solides les plus fréquentes aux États-Unis, de seulement 3 points pour le cancer du pancréas et jusqu'à 50 points pour la prostate. Sur les mêmes années, le taux de mortalité a baissé pour 12 de ces cancers et augmenté pour les 8 autres. Tumeur par tumeur, la variation de la survie n'avait aucun rapport avec la variation de la mortalité ; elle suivait la variation du nombre de cancers détectés.",
  "Screening babies for a childhood tumour":
    "Dépister une tumeur de l'enfant chez le nourrisson",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "Deux grands programmes ont testé le dépistage du neuroblastome chez le nourrisson. Le Québec a dépisté 476 654 enfants nés sur cinq ans, avec 92 pour cent de participation, et les décès dus à la tumeur avant l'âge de huit ans se sont élevés à 4,78 pour 100 000, pas plus bas que dans les populations de comparaison. L'Allemagne a comparé 1 475 773 enfants dépistés à 2 117 600 enfants non dépistés et a trouvé des formes avancées chez 3,7 contre 3,8 pour 100 000, et des décès chez 1,3 contre 1,2. On a trouvé plus de tumeurs. Le même nombre d'enfants est mort.",
  "What a real benefit looks like": "À quoi ressemble un vrai bénéfice",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "Le dépistage n'est pas condamné à n'être qu'une illusion, il doit simplement être mesuré correctement. Un essai a réparti 46 551 personnes de 50 à 80 ans en trois groupes : recherche annuelle de sang occulte dans les selles, recherche tous les deux ans, ou aucune. Sur 13 ans, les décès par cancer colorectal se sont élevés à 5,88 pour 1 000 dans le groupe annuel contre 8,83 dans le groupe non dépisté, soit un tiers de moins. C'est un décompte des décès chez toutes les personnes invitées, pas une survie à partir du diagnostic ; aucune longueur d'avance n'a donc pu le produire.",
  "Lead-time bias, a reasoning trap.":
    "Le biais d'avance au diagnostic, un piège de raisonnement.",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "La survie se compte à partir du jour où l'on est diagnostiqué. Un test qui détecte une maladie plus tôt allonge donc automatiquement la survie apparente, même s'il ne change rien au moment où la maladie vous tue. Vous passez simplement une plus grande part de votre vie en tant que patient. C'est pour cela qu'un programme de dépistage peut faire bondir la survie à cinq ans alors qu'exactement autant de gens meurent. Le chiffre qu'on ne peut pas truquer, ce sont les décès dans toute la population, pas la survie parmi les personnes diagnostiquées.",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "La frise chronologique est une illustration schématique d'une vie, pas une donnée mesurée. Le résultat qui la sous-tend est celui de Welch et de ses collègues : sur les 20 tumeurs solides les plus fréquentes entre 1950 et 1995, la survie à cinq ans a monté pour chacune d'elles, et pourtant, tumeur par tumeur, la variation de la survie n'était pas corrélée à la variation de la mortalité (r de Pearson = 0,00) ; elle suivait la variation de l'incidence (r de Pearson = 0,49).",

  // ---- Trap Hunt items (lead-time bias) ----
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "Un hôpital met en place un test sanguin qui repère un cancer environ deux ans avant l'apparition des symptômes. Chez les patients qui y sont diagnostiqués, la survie à cinq ans passe de 41 % à 68 %. L'hôpital annonce que le test sauve des vies.",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "La survie se compte à partir du diagnostic, et le diagnostic tombe désormais deux ans plus tôt. Tout le monde reçoit deux ans de longueur d'avance vers le cap des cinq ans, que le test ait changé le sort de quelqu'un ou non.",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "Un registre national rapporte que le délai moyen entre le diagnostic et le décès pour une maladie est passé de trois à six ans depuis qu'un nouvel examen d'imagerie est entré dans la pratique courante. Un ministre déclare que les patients vivent maintenant deux fois plus longtemps.",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "Le délai entre le diagnostic et le décès peut doubler uniquement parce que le diagnostic a été avancé. Pour affirmer que les gens vivent plus longtemps, il faut montrer que la mort arrive plus tard, pas que l'étiquette arrive plus tôt.",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "Une région invite au dépistage d'une maladie la moitié de ses habitants, tirés au sort, et n'invite pas l'autre moitié. Dix ans plus tard, elle compte les décès dus à cette maladie chez tout le monde dans les deux moitiés, dépistés ou non, présents au rendez-vous ou non. Les décès sont inférieurs de 30 % dans la moitié invitée.",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "Voilà le protocole d'étude qu'un diagnostic plus précoce ne peut pas tromper. Le chronomètre démarre à l'invitation plutôt qu'au diagnostic, et le décompte inclut toutes les personnes invitées ; ni longueur d'avance ni diagnostics supplémentaires ne peuvent donc fabriquer cette différence.",

  // ---- Tag blurbs (browse screen) ----
  "Anyone can fall for it": "Tout le monde peut s'y laisser prendre",
  "Bites at the bedside": "Ça mord au chevet du patient",
  "Study design & evidence appraisal": "Protocoles et lecture critique",
  "Reading the numbers": "Lire les chiffres",
  "Tests & diagnostic reasoning": "Tests et raisonnement diagnostique",
  "Screening programmes": "Programmes de dépistage",
  "Populations, exposure & risk": "Populations, expositions et risque",
  "Drugs & drug safety": "Médicaments et sécurité d'emploi",
  "Mind & behaviour": "Esprit et comportement",
  "Life & evolution": "Le vivant et l'évolution",
  "Data, computing & AI": "Données, informatique et IA",
  "Markets & incentives": "Marchés et incitations",
  "Elections & policy": "Élections et politiques publiques",
  "Teaching & testing": "Enseigner et évaluer",
  "Investing & returns": "Placements et rendements",
  "Management & strategy": "Gestion et stratégie",
  "Courts & forensics": "Tribunaux et police scientifique",
  "Performance & records": "Performances et records",
  "The past & how we read it": "Le passé et sa lecture",
  "News & the numbers in it": "L'actualité et ses chiffres",

  // ---- Scope tags and compact chart labels ----
  "From diagnosis": "Depuis le diagnostic",
  "The whole life": "Toute la vie",
  A: "A",
  B: "B",

  // ==== Spectrum bias (urine dipstick) ====
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "Ce test urinaire détecte 92 % des infections. Les symptômes de votre patient sont flous. Que vaut-il maintenant ?",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "Une bandelette urinaire pour repérer une infection, confrontée aux cultures d'urine dans un service d'urgences et dans un centre de consultation sans rendez-vous. Chez les patients dont le médecin jugeait déjà une infection probable, elle a détecté 49 des 53 patients qui en avaient réellement une. La sensibilité est d'ordinaire annoncée sous la forme d'un seul chiffre, comme s'il s'agissait d'une propriété fixe du test.",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "Chez les patients que le médecin juge peu susceptibles d'être infectés, à quelle fréquence détecte-t-elle une infection réelle ?",
  "Times the dipstick was right": "Fois où la bandelette a vu juste",
  "Doctor thought infection likely": "Le médecin jugeait l'infection probable",
  Likely: "Probable",
  "Doctor thought infection unlikely":
    "Le médecin jugeait l'infection peu probable",
  Unlikely: "Peu probable",
  "Patients who really had an infection": "Patients réellement infectés",
  "Patients who did not": "Patients qui ne l'étaient pas",
  "The quoted figure": "Le chiffre annoncé",
  "About the same, 92%": "À peu près pareil, 92 %",
  "the test has not changed": "le test n'a pas changé",
  "A little lower, around 80%": "Un peu moins, environ 80 %",
  "some drop off": "une petite baisse",
  "Barely half, 56%": "À peine la moitié, 56 %",
  "it misses most of them": "il en manque la plupart",
  "Barely half. And the other column flips the other way.":
    "À peine la moitié. Et l'autre colonne bascule dans l'autre sens.",
  "The patients changed, not the test":
    "Ce sont les patients qui ont changé, pas le test",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "Les patients que leur médecin suspectait déjà avaient des infections franches, celles qu'une bandelette repère facilement. Les patients jugés peu susceptibles d'être infectés en avaient de discrètes ou de débutantes, et le test en a manqué la plupart. Regardez maintenant le second panneau, celui des patients qui n'avaient aucune infection : là, le test a vu juste 42 % du temps dans le premier groupe et 78 % dans le second. La sensibilité et la spécificité ne sont pas des propriétés d'un test. Ce sont les propriétés d'un test confronté à un mélange particulier de personnes :",
  "Both groups": "Les deux groupes",
  "The spectrum": "Le spectre",
  "How many in each group really had an infection":
    "Combien, dans chaque groupe, étaient réellement infectés",
  "Spectrum bias": "Le biais de spectre",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "La fiabilité d'un test n'est pas une valeur fixe. Elle varie avec le stade de la maladie, son caractère typique et son évidence chez les patients testés.",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "Avant de faire confiance à une sensibilité annoncée, demandez sur qui elle a été mesurée. Un chiffre obtenu chez des patients à la maladie manifeste flattera le test dans un cabinet rempli de cas plus légers, et une étude qui ne recrute que des cas d'école et des volontaires en bonne santé le flattera plus encore.",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "La sensibilité, c'est la part des personnes réellement malades qu'un test détecte, et la spécificité, la part des personnes saines qu'il déclare à juste titre indemnes. Les deux sont annoncées comme si elles appartenaient au test, comme son prix. Ce n'est pas le cas. Un test capte un signal, et ce signal est plus fort dans une maladie avancée que dans une maladie débutante : plus les malades que vous testez sont atteints, plus le test en trouve. La logique inverse vaut pour les personnes indemnes : plus elles sont manifestement en bonne santé, plus le test les déclare facilement indemnes. Voilà pourquoi un test évalué sur des cas évidents face à des non-cas évidents peut paraître superbe, puis décevoir dans une vraie consultation, où presque tout le monde se situe entre les deux. Deux habitudes pratiques en découlent. Lisez la description des personnes recrutées avant de lire les chiffres de fiabilité. Et méfiez-vous surtout d'une étude dont les groupes malades et sains ont été choisis séparément, plutôt que constitués de patients consécutifs venus pour le même motif.",
  "The same test, sorted a different way": "Le même test, trié autrement",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "La même étude a de nouveau ventilé ses patients, cette fois selon le nombre de globules blancs visibles au microscope dans les urines. Quand il n'y en avait aucun, la bandelette a détecté 5 des 10 infections réelles. Quand il y en avait quelques-uns, elle en a détecté 15 sur 22. Quand il y en avait beaucoup, elle les a toutes détectées, 34 sur 34. Un seul test, les prélèvements d'un même après-midi, et une sensibilité allant de 50 à 100 pour cent selon les seuls patients que l'on comptait.",
  "Why promising tests keep disappointing":
    "Pourquoi les tests prometteurs déçoivent si souvent",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "Le problème a été nommé en 1978, devant la répétition d'un même scénario : de nouveaux tests arrivaient avec d'excellents chiffres de fiabilité publiés, puis décevaient les médecins qui les utilisaient. Deux exemples de l'époque : le dosage de l'antigène carcino-embryonnaire et le test au nitrobleu de tétrazolium. Les auteurs ont attribué cette déception à deux choses : une fiabilité mesurée sur un mélange de patients bien plus étroit que la pratique réelle, et un résultat du test et un diagnostic de référence qui n'étaient pas jugés indépendamment l'un de l'autre.",
  "Spectrum bias, a reasoning trap.":
    "Le biais de spectre, un piège de raisonnement.",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "La fiabilité d'un test sonne comme un fait à propos du test, comme une voiture a une vitesse de pointe. Ce n'en est pas un. Un test qui détecte 92 % des infections chez des gens manifestement malades peut n'en détecter qu'à peine la moitié chez des gens à peine souffrants, parce qu'il y a moins à trouver. Chaque fois qu'on vous dit qu'un test est fiable à 95 %, la vraie question est de savoir sur qui on l'a mesuré, et si ces personnes vous ressemblent un tant soit peu.",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "Les effectifs sont ceux du tableau 3, page 137 : 49 sur 53 et 21 sur 50 dans le groupe à forte probabilité a priori, 10 sur 18 et 188 sur 241 dans le groupe à faible probabilité. Une bandelette positive signifiait leucocyte-estérase ou nitrites ou les deux ; une culture positive signifiait plus de 100 000 colonies par millilitre. Le rectificatif précise que le groupe à forte probabilité a priori compte 103 patients, et non les 107 encore imprimés dans le résumé, et que les taux avaient déjà été calculés sur 103 et restent valables. Le résumé imprimé donne aussi l'intervalle de confiance associé au 0,56 comme allant de 0,03 à 0,79 ; le tableau de l'article lui-même donne 0,31 à 0,79.",

  // ==== Berkson's bias (hospital sample) ====
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "Chez les patients hospitalisés, les problèmes de poumons et les problèmes d'articulations vont de pair. Les deux maladies sont-elles liées ?",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "Une enquête a frappé aux portes et demandé à des milliers de gens ordinaires de quelles maladies ils souffraient. Parmi ceux qui avaient été hospitalisés dans les six mois précédents, un quart des personnes atteintes d'une maladie respiratoire avaient aussi une maladie des os ou des articulations, contre bien moins d'un dixième chez toutes les autres.",
  "Are these two diseases actually related?":
    "Ces deux maladies sont-elles réellement liées ?",
  "Also had a bone or joint disease":
    "Avaient aussi une maladie osseuse ou articulaire",
  "Had a respiratory disease": "Avaient une maladie respiratoire",
  Lungs: "Poumons",
  "No respiratory disease": "Pas de maladie respiratoire",
  "No lungs": "Sans poumons",
  "In hospital in the last 6 months": "Hospitalisés dans les 6 derniers mois",
  "Everyone the survey asked": "Toutes les personnes interrogées",
  "Hospital patients": "Patients hospitalisés",
  "Yes, one brings on the other": "Oui, l'une provoque l'autre",
  "three times as common": "trois fois plus fréquente",
  "Yes, but the other way round": "Oui, mais dans l'autre sens",
  "the joint disease comes first": "la maladie articulaire vient en premier",
  "No, the hospital made the link": "Non, c'est l'hôpital qui a créé le lien",
  "it is about who gets admitted": "tout tient à qui est hospitalisé",
  "Ask everyone, and the link disappears.":
    "Interrogez tout le monde, et le lien disparaît.",
  "Two illnesses are two chances to be admitted":
    "Deux maladies, deux occasions d'être hospitalisé",
  "Hospital and community": "Hôpital et population générale",
  "The filter": "Le filtre",
  "Berkson's bias": "Le biais de Berkson",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "N'étudier que les personnes qui ont franchi un filtre peut inventer une relation qui n'existe pas en dehors de lui.",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "L'hôpital est le filtre le plus évident, et la raison pour laquelle on se méfie des études cas-témoins bâties sur des patients hospitalisés. Mais n'importe quel groupe sélectionné produit le même effet : les gens qui ont répondu à l'enquête, les utilisateurs restés abonnés, les candidats convoqués en entretien. Demandez-vous ce qu'il fallait pour entrer dans l'échantillon, et si les deux choses que vous comparez aident toutes les deux à y entrer.",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "Supposons deux maladies totalement indépendantes, chacune donnant à elle seule une certaine probabilité d'être hospitalisé. Qui a la malchance d'avoir les deux dispose de deux occasions d'être admis : cette personne a donc bien plus de chances de se trouver dans le service que celle qui n'en a qu'une. Placez-vous maintenant dans le service et comptez. Les personnes atteintes de la première maladie ont bien plus souvent aussi la seconde, parce que c'est précisément ce qui a fait entrer beaucoup d'entre elles. Vous n'avez pas découvert un lien entre les maladies. Vous avez redécouvert la règle d'admission, et vous l'avez déguisée en biologie. La forme générale de tout cela est un facteur de collision, ce que l'on appelle aussi un collider : une variable vers laquelle pointent deux causes. Sélectionner sur ce facteur, en n'étudiant que les personnes hospitalisées, que les personnes testées ou que celles qui ont réussi, relie les causes entre elles dans vos données, même quand rien ne les relie dans le monde réel. La protection, c'est un échantillon défini avant le filtre, et c'est exactement pour cela que les enquêtes en population et les registres exhaustifs valent leur coût.",
  "The bias that was theory for thirty years":
    "Le biais resté théorique pendant trente ans",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "Joseph Berkson avertissait dès 1946 que les comparaisons faites à l'hôpital pouvaient fabriquer des associations, mais son raisonnement était mathématique et ses chiffres inventés pour l'illustrer. Il notait que le même artefact apparaîtrait si l'on échantillonnait des cartes battues plutôt que des patients. Il a fallu attendre cette enquête, trois décennies plus tard, pour que quelqu'un démontre l'effet chez de vraies personnes.",
  "Why early covid studies disagreed":
    "Pourquoi les premières études sur la covid se contredisaient",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "En 2020, les études sur qui attrapait la covid et qui faisait une forme grave ne pouvaient recruter que parmi les personnes testées ou hospitalisées, et au début il s'agissait surtout du personnel hospitalier, des personnes déjà malades et des personnes âgées. Entrer dans l'échantillon dépendait précisément de ce que l'on étudiait. Des analyses ont montré que cela suffisait à produire des facteurs de risque apparents, et même à inverser le sens d'un facteur réel, sans qu'aucune biologie ne soit en cause.",
  "Berkson's bias, a reasoning trap.":
    "Le biais de Berkson, un piège de raisonnement.",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "Ne regardez que les patients hospitalisés et deux maladies totalement indépendantes peuvent sembler voyager ensemble. La raison n'est pas biologique, c'est la porte d'entrée. Chacune des deux maladies peut vous faire hospitaliser : les personnes qui ont les deux sont donc surreprésentées à l'intérieur, et vues de là les deux paraissent liées. N'importe quel groupe filtré produit cet effet : les gens qui ont été testés, les candidats convoqués en entretien, les clients restés fidèles. Avant de croire à un schéma, demandez-vous ce qu'il fallait pour entrer dans les données.",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "Les effectifs sont ceux du tableau 2 : des entretiens à domicile auprès de 2 784 personnes, dont 257 avaient été hospitalisées dans les six mois précédents. Les cotes relatives données par le tableau lui-même sont de 1,06 dans la population générale et de 4,06 chez les personnes hospitalisées. Les chiffres hospitaliers ne reposent que sur 20 personnes atteintes d'une maladie respiratoire ; ce seul tableau démontre donc le mécanisme plutôt qu'il n'en mesure précisément l'ampleur.",

  // ---- Trap Hunt items (spectrum bias) ----
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "Un test rapide est validé chez des patients hospitalisés pour une forme grave de la maladie et chez des donneurs de sang en bonne santé. Il sépare les deux groupes presque parfaitement, et le fabricant annonce 98 % de sensibilité. Il est ensuite vendu aux médecins généralistes pour des patients qui ont une simple toux.",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "Distinguer les malades évidents des bien-portants évidents est la tâche la plus facile qui soit. Les patients d'un médecin généraliste se situent tous entre les deux, et c'est précisément là que le test n'a jamais été mesuré.",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "Un manuel indique qu'un examen d'imagerie a une sensibilité de 90 %. Un cabinet qui voit surtout des cas débutants et légers l'adopte et constate qu'il manque environ un tiers des cas confirmés ensuite par des spécialistes. Le cabinet en conclut que sa machine doit être défectueuse.",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "Une sensibilité annoncée reste attachée aux patients sur lesquels elle a été mesurée. Une maladie plus précoce et plus légère donne moins à trouver au test : un taux de détection plus faible est donc ce à quoi il faut s'attendre, pas la preuve d'une machine en panne.",

  // ---- Trap Hunt items (Berkson's bias) ----
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "Une étude menée chez les patients hospitalisés d'un hôpital constate que ceux qui ont une maladie métabolique ont bien plus souvent aussi une maladie de la vésicule biliaire que les autres patients hospitalisés. Les auteurs en concluent que la première maladie provoque la seconde.",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "Chacune des deux maladies peut à elle seule conduire quelqu'un à un lit d'hôpital : les patients qui ont les deux sont donc surreprésentés parmi les hospitalisés. Le lien n'existe peut-être qu'à l'intérieur du bâtiment.",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "Quelqu'un remarque que, parmi les personnes avec qui il est sorti, les plus jolies étaient systématiquement de moins agréable compagnie. Il en conclut que la beauté gâte le caractère.",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "On accepte généralement un rendez-vous parce que la personne est jolie ou parce qu'elle est de compagnie agréable. Sélectionner là-dessus impose un compromis entre les deux à l'intérieur de l'échantillon, quelle que soit la relation en dehors.",

  // ---- Trap Hunt items (sound reasoning) ----
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "Un test diagnostique est évalué sur tous les patients consécutifs qui se présentent dans un cabinet pour le même motif, quel que soit le diagnostic final, et l'article rapporte sa fiabilité séparément pour les formes légères et pour les formes avancées. Un autre cabinet, au recrutement comparable, adopte ces chiffres.",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "Voilà comment une étude diagnostique doit être bâtie. Des patients consécutifs venus pour un même motif, et une fiabilité ventilée par gravité, de sorte qu'un lecteur puisse retrouver le sous-groupe qui ressemble vraiment à ses propres patients.",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "Une entreprise se demande si deux caractéristiques de ses utilisateurs vont de pair. Elle tire au hasard parmi toutes les personnes ayant un jour ouvert un compte, y compris celles qui ne sont jamais revenues et celles qui ont résilié, et ne trouve aucune relation entre les deux.",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "L'échantillon a été tiré avant tout filtre que l'une ou l'autre de ces deux caractéristiques aurait pu influencer. Ni le fait de rester, ni celui de réussir, ni celui d'être admis n'a décidé qui serait compté ; aucun artefact de sélection ne peut donc s'y cacher.",

  // ==== Relative versus absolute risk (statin trial) ====
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "Un médicament réduit d'environ un tiers votre risque d'infarctus. Combien de personnes cela aide-t-il ?",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "Un essai a donné à 6 595 hommes d'âge moyen ayant un cholestérol élevé et aucun antécédent cardiaque soit une statine, soit un placebo, et les a suivis pendant environ cinq ans. Le médicament a réduit d'environ un tiers les infarctus et les décès coronariens. C'est un vrai résultat, et c'est ainsi qu'il a été rapporté.",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "Sur 1 000 hommes qui l'ont pris pendant cinq ans, combien ont échappé à un infarctus ou à un décès coronarien ?",
  "A five-year statin trial in 6,595 men":
    "Un essai de cinq ans avec une statine, chez 6 595 hommes",
  "Heart attack or death from heart disease":
    "Infarctus ou décès par maladie cardiaque",
  "Dummy pill": "Placebo",
  Statin: "Statine",
  "of the risk removed": "du risque supprimé",
  "spared, in every 1,000 men treated for five years":
    "hommes épargnés, sur 1 000 traités pendant cinq ans",
  "men treated for five years to spare one":
    "hommes traités pendant cinq ans pour en épargner un",
  "About 300": "Environ 300",
  "roughly a third of them": "à peu près un tiers d'entre eux",
  "About 100": "Environ 100",
  "one in ten": "un sur dix",
  "About 23": "Environ 23",
  "roughly 1 in 44": "à peu près 1 sur 44",
  "Twenty three men in a thousand.": "Vingt-trois hommes sur mille.",
  "A third of a risk that was small to begin with":
    "Un tiers d'un risque déjà faible au départ",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "Les deux chiffres viennent du même essai. Sans le médicament, environ 75 hommes sur 1 000 ont fait un infarctus ou sont morts d'une maladie cardiaque en cinq ans. Avec lui, environ 53. C'est un tiers du risque en moins, et c'est aussi 23 hommes sur 1 000. Le premier chiffre est divisé par le risque, le second par les personnes, et c'est toute la raison pour laquelle ils donnent une impression si différente. Dit dans l'autre sens, il a fallu que 44 hommes prennent le médicament pendant cinq ans pour que l'un d'eux soit épargné :",
  "A third of what?": "Un tiers de quoi ?",
  "Relative versus absolute risk": "Risque relatif contre risque absolu",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "Une réduction en pourcentage vous dit quelle part d'un risque a disparu. Elle ne peut pas vous dire quelle était l'ampleur de ce risque, et c'est pourtant cela qui décide si le résultat compte pour vous.",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "Chaque fois que vous rencontrez une variation en pourcentage, demandez-vous de quoi elle est le pourcentage. Diviser par deux un risque d'une chance sur un million et diviser par deux un risque d'une chance sur deux donnent le même titre et veulent dire des choses complètement différentes. Les deux chiffres qu'il vaut la peine de réclamer sont l'écart exprimé en nombre de personnes, et le nombre de sujets à traiter pour qu'un seul en bénéficie.",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "Prenez un risque de 8 sur 100 et faites-le descendre à 5 sur 100. Divisez la baisse par le risque et vous obtenez un tiers, ce qui paraît énorme. Divisez la même baisse par les personnes et vous obtenez 3 sur 100, ce qui paraît minuscule. Aucun des deux n'est faux. Ils répondent à des questions différentes : quelle fraction du danger a été supprimée, et quelles sont mes chances que cela m'aide. Seule la seconde parle de vous. L'écart entre les deux se creuse à mesure que le risque diminue, et c'est pourquoi les chiffres relatifs les plus impressionnants viennent en général des événements les plus rares. Ce n'est pas seulement un problème de médias. Les chiffres relatifs rendent aussi les traitements plus séduisants aux yeux des médecins, et un même résultat d'essai suscite plus d'enthousiasme présenté en relatif que présenté en personnes entières. Le mécanisme joue aussi dans l'autre sens pour les dangers : une alerte formulée comme un doublement du risque paraît inquiétante, que le risque soit passé de 1 sur 10 à 2 sur 10 ou de 1 sur 100 000 à 2 sur 100 000. L'habitude qui vous protège dans les deux sens, c'est d'exiger les chiffres rapportés à un groupe de personnes fixé d'avance, et le nombre de personnes qu'il faut traiter, ou exposer, pour qu'une seule soit concernée.",
  "The same kind of drug, in people at real risk":
    "Le même type de médicament, chez des personnes réellement à risque",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "Un second essai a donné une statine à des patients qui avaient déjà fait un infarctus ou qui souffraient d'angine de poitrine. Les événements coronariens majeurs sont passés de 28 pour cent à 19 pour cent. En relatif, cela fait environ un tiers, presque le même titre que chez les hommes en bonne santé. Mais comme le risque entamé était près de quatre fois plus élevé, le gain a été d'environ 9 patients sur 100 au lieu de 2. Titre identique, bénéfice plusieurs fois supérieur. Voilà pourquoi un pourcentage à lui seul ne peut pas vous dire si un médicament vaut la peine d'être pris, et pourquoi la réponse change d'un patient à l'autre.",
  "When a relative figure did real damage":
    "Quand un chiffre relatif a fait de vrais dégâts",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "En octobre 1995, un comité de sécurité britannique a averti que certaines pilules contraceptives comportaient environ deux fois plus de risque de caillot sanguin. L'avertissement a circulé sous la forme d'un doublement, sans la moindre idée de la petitesse du risque dans un cas comme dans l'autre, et les femmes ont arrêté la pilule. Chez les filles de moins de 16 ans, l'usage est tombé de 40 pour cent à 27 pour cent en un an. Le système de santé a supporté environ 21 millions de livres de frais de maternité supplémentaires et 46 millions de livres de prise en charge des avortements. Un chiffre relatif sans chiffre absolu à côté n'est pas une façon neutre de décrire un risque.",
  "The fix is in the wording": "Le remède est dans la formulation",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "Décrivez le même résultat en personnes entières, tant sur 1 000 contre tant sur 1 000, et patients comme médecins le jugent bien plus justement que lorsqu'il arrive sous forme de réduction en pourcentage. Les risques relatifs appartiennent à une petite famille de formats qui égarent à tous les coups, aux côtés des probabilités d'événement unique et des probabilités conditionnelles comme la sensibilité d'un test. Aucun n'est faux. Ils sont simplement faciles à mal lire, et il existe une façon plus claire de dire la même chose.",
  "Relative versus absolute risk, a reasoning trap.":
    "Risque relatif contre risque absolu, un piège de raisonnement.",
  '"Cuts your risk by a third" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.':
    "« Réduit votre risque d'un tiers » sonne énorme. Mais un tiers de quoi ? Si le risque était de 75 sur 1 000, un tiers, cela fait 23 personnes. S'il était de 3 sur 1 000, un tiers, cela fait une personne. Le pourcentage vous dit quelle part du risque a disparu et ne dit absolument rien de l'ampleur de ce risque, alors que c'est cela qui décide si le résultat compte pour vous. Réclamez les chiffres bruts : combien sur 1 000, et combien de personnes doivent le prendre pour qu'une seule en bénéficie.",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "Les effectifs sont ceux du critère de jugement principal de l'essai, un infarctus non mortel certain ou un décès par cardiopathie coronarienne : 248 événements chez les hommes sous placebo et 174 chez ceux sous pravastatine, sur une durée moyenne de 4,9 ans. L'article rapporte une réduction du risque relatif de 31 pour cent, estimée à partir d'un modèle à risques proportionnels ; les effectifs bruts donnent 30 pour cent. Chaque chiffre montré par ce puzzle est dérivé de ces effectifs, si bien qu'il annonce environ un tiers plutôt qu'un nombre que le graphique viendrait contredire.",

  // ---- Scope tags (relative / absolute risk) ----
  "Compared to the risk": "Rapporté au risque",
  "Compared to the people": "Rapporté aux personnes",

  // ---- Trap Hunt items (relative versus absolute risk) ----
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "Un communiqué de presse annonce qu'un nouveau médicament réduit de moitié le risque d'une complication rare. Il ne dit pas à quel point cette complication est fréquente. Un journal reprend l'information sous le titre que le médicament réduit le danger de moitié.",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "Diviser un risque par deux ne veut rien dire tant qu'on ne connaît pas ce risque. Si la complication touche 2 personnes sur 10 000, le diviser par deux en épargne une seule.",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "Un complément alimentaire est présenté comme réduisant de 40 % le risque d'un cancer donné. L'essai sur lequel il s'appuie a trouvé 7 cas chez environ 1 000 personnes prenant le complément et 12 chez environ 1 000 personnes prenant un placebo.",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "Les 40 % sont arithmétiquement exacts, et ils représentent 5 personnes sur 1 000. Il faudrait qu'environ 200 personnes prennent le complément pendant des années pour qu'une seule évite un cancer.",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "Un essai rapporte que le traitement a fait passer les AVC de 12 patients sur 100 à 8 sur 100, qualifie cela de réduction d'un tiers, et ajoute qu'il faut traiter environ 25 patients pendant cinq ans pour éviter un AVC.",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "Le chiffre relatif, les nombres bruts de personnes et le nombre de sujets à traiter sont tous sur la table : rien n'est caché derrière le pourcentage. C'est ainsi qu'un résultat devrait être rapporté.",

  // ---- Berkson's bias, corrected reveal wording ----
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "La même enquête, les mêmes personnes, les deux mêmes maladies. Sur l'ensemble des personnes interrogées, celles qui avaient une maladie respiratoire n'avaient guère plus souvent une maladie osseuse ou articulaire que les autres, et les cotes ressortent à 1,06 contre 1, autant dire rien. Le panneau de l'hôpital n'est pas un résultat sur la maladie, c'est un résultat sur l'hospitalisation. Chacune des deux maladies peut vous conduire à un lit d'hôpital : les personnes qui ont les deux s'y retrouvent donc bien plus souvent que celles qui n'en ont qu'une, et entre ces murs les deux paraissent inséparables :",

  // ==== Confounding by indication (DIG trial) ====
  "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?":
    "Les patients qui prenaient ce médicament pour le cœur mouraient plus souvent que ceux qui n'en prenaient pas. Le médicament les tue-t-il ?",
  "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.":
    "6 800 personnes en insuffisance cardiaque. À leur entrée dans l'essai, certaines prenaient déjà de la digoxine parce qu'un médecin avait décidé de la prescrire, d'autres non. Au cours des années suivantes, 40 pour cent de celles qui en prenaient déjà sont mortes, contre 31 pour cent des autres.",
  "Is digoxin causing those extra deaths?":
    "La digoxine est-elle la cause de ces décès supplémentaires ?",
  "Died during the trial": "Décédés pendant l'essai",
  "On digoxin": "Sous digoxine",
  Digoxin: "Digoxine",
  "Not on digoxin": "Sans digoxine",
  "Not on it": "Sans",
  "Sorted by what doctors prescribed":
    "Classés selon ce que les médecins avaient prescrit",
  "Sorted by the trial's coin flip": "Classés selon le pile ou face de l'essai",
  "As prescribed in practice": "Tel que prescrit en pratique",
  "Yes, the drug is harming them": "Oui, le médicament leur nuit",
  "nine points worse": "neuf points de plus",
  "No, and adjusting for severity will show that":
    "Non, et l'ajustement sur la gravité le montrera",
  "the statistics can correct it": "les statistiques peuvent le corriger",
  "No, and adjusting will not fix it either":
    "Non, et l'ajustement n'y changera rien non plus",
  "the prescription marks the patient": "la prescription marque le patient",
  "The same 6,800 patients, sorted by a coin flip. No difference.":
    "Les mêmes 6 800 patients, classés par un pile ou face. Aucune différence.",
  "The prescription marked how ill they already were":
    "La prescription signalait à quel point ils allaient déjà mal",
  "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:":
    "Ce sont les mêmes personnes dans les deux panneaux, regroupées de deux façons différentes. Classées selon ce que leurs médecins avaient décidé, la digoxine paraît mortelle. Classées selon la répartition aléatoire de l'essai, qu'aucun jugement clinique n'a touchée, les deux groupes meurent au même rythme. Les médecins recouraient à la digoxine chez les patients qui allaient déjà plus mal : la prescription portait donc sur le patient une information que rien dans le jeu de données n'avait consignée :",
  "Both ways of sorting": "Les deux classements",
  "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.":
    "L'ajustement sur 27 caractéristiques initiales enregistrées n'y a presque rien changé : l'excès est passé de 36 pour cent à 22 pour cent. Et le même excès est apparu chez les patients que l'essai avait randomisés dans le groupe placebo, des personnes qui n'ont pris aucune digoxine pendant l'essai. Un médicament ne peut pas nuire à ceux qui ne l'ont jamais reçu : l'excès n'a donc jamais été le fait du médicament.",
  "The reason for the prescription": "La raison de la prescription",
  "Confounding by indication": "Le biais d'indication",
  "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.":
    "Quand c'est un médecin qui décide qui reçoit un traitement, les patients traités diffèrent des non traités par des aspects que les données n'ont jamais consignés, et le traitement se voit imputer, en mal ou en bien, la raison pour laquelle il a été donné.",
  'This is why observational comparisons between treated and untreated patients are read so warily, and why "we adjusted for that" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.':
    "C'est pour cela que les comparaisons observationnelles entre patients traités et non traités sont lues avec autant de méfiance, et que « nous avons ajusté là-dessus » ne clôt pas le débat. L'ajustement ne peut retirer que ce qui a été écrit. Le jugement qui a conduit à la prescription, lui, ne l'a en général pas été.",
  "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.":
    "Les traitements ne sont pas distribués au hasard. Un médecin prescrit à cause de quelque chose chez le patient : il est plus malade, ou plus fragile, ou ses symptômes sont plus marqués. Ce quelque chose pèse aussi sur ce qui allait lui arriver de toute façon. Le groupe traité part donc différent, et toute comparaison avec les patients non traités mesure à la fois le médicament et la raison pour laquelle il a été choisi, emmêlés l'un dans l'autre. Cela joue dans les deux sens. Un médicament donné aux plus malades paraît nocif ; un médicament donné aux plus solides, ou qu'on ne peut recevoir qu'en étant assez en forme pour se rendre en consultation, paraît miraculeux. La parade habituelle consiste à ajuster sur les différences, et cela aide, mais seulement pour les différences que quelqu'un a pensé à noter. L'impression du clinicien que ce patient-là déclinait est une information réelle, c'est elle qui a déclenché la prescription, et elle ne figure presque jamais dans le jeu de données. Voilà toute la raison pour laquelle les essais randomisés valent leur coût : un pile ou face ne peut rien savoir du patient, il ne peut donc pas faire entrer clandestinement la raison dans la comparaison. Quand un essai et une étude observationnelle se contredisent à propos du même médicament, c'est en général de là que cela vient.",
  "Taking your pills predicts survival, even when they are dummies":
    "Prendre ses comprimés prédit la survie, même quand ce sont des placebos",
  "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.":
    "Un essai plus ancien a réparti ses patients selon la fidélité avec laquelle ils avaient pris leurs comprimés. Ceux qui en avaient pris au moins 80 pour cent avaient une mortalité à cinq ans de 15,0 pour cent, contre 24,6 pour cent pour les autres, ce qui ressemble à la preuve que le médicament marche à condition de le prendre vraiment. Les chercheurs ont ensuite appliqué la même répartition à l'intérieur du groupe placebo, où les comprimés ne contenaient rien : 15,1 pour cent contre 28,2 pour cent. L'ajustement sur 40 caractéristiques enregistrées a ramené cet écart à 16,4 contre 25,8 et l'a laissé écrasant. Quoi que l'observance signale d'une personne, ce n'était pas le médicament.",
  "The same argument, about a procedure":
    "Le même raisonnement, à propos d'un geste technique",
  "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.":
    "Dans une étude portant sur 5 735 patients en réanimation, ceux chez qui un cathéter avait été monté dans les cavités droites du cœur sont morts plus souvent dans les 30 jours que les autres, 38,0 pour cent contre 30,6 pour cent. Le geste était réservé aux patients les plus en difficulté. Quand il a été testé plus tard en tirant au sort qui en bénéficiait, la mortalité est ressortie à 62 pour cent avec le cathéter et à 60 pour cent sans, dans un essai dont les patients étaient encore plus graves. L'écart qui ressemblait à une nocivité tenait surtout à un écart dans le choix des patients.",
  "Confounding by indication, a reasoning trap.":
    "Le biais d'indication, un piège de raisonnement.",
  "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.":
    "Personne ne distribue les médicaments au hasard. Les médecins prescrivent à cause de quelque chose chez le patient, et ce quelque chose pèse en général sur ce qui allait lui arriver de toute façon. Des gens sous traitement peuvent donc mourir plus souvent que des gens sans traitement alors que le médicament n'y est absolument pour rien : il a été donné à ceux qui allaient déjà plus mal. Ajuster sur les différences aide, mais seulement sur les différences que quelqu'un a notées, et la raison de la prescription en fait rarement partie. C'est pour cela qu'un pile ou face vaut si cher.",
  "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.":
    "Les quatre effectifs de décès sont imprimés dans l'article de 2019, et les tailles des bras randomisés dans le rapport d'essai de 1997. Les deux dénominateurs correspondant à la prescription en pratique ne sont imprimés nulle part : 3 017 est la somme des deux effectifs de prise antérieure de digoxine figurant dans le supplément (1 498 et 1 519), et 3 783 est le reste des 6 800. Il s'agit d'une addition de nombres entiers publiés, et non d'un chiffre reconstitué à rebours à partir d'un pourcentage, et le compte tombe juste dans les deux sens : 1 207 plus 1 168 et 1 181 plus 1 194 donnent tous deux 2 375 décès, et les deux paires de dénominateurs donnent 6 800 patients.",

  // ---- Trap Hunt items (confounding by indication) ----
  "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.":
    "Un hôpital examine ses dossiers et constate que les patients ayant reçu une certaine assistance respiratoire sont morts bien plus souvent que les autres. Une commission recommande d'y recourir moins souvent.",
  "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.":
    "L'assistance a été donnée aux patients qui peinaient à respirer. Elle tient lieu de marqueur de leur gravité initiale, et les dossiers ne permettent pas de séparer le traitement de la raison pour laquelle on y a eu recours.",
  "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.":
    "Une étude observationnelle trouve une mortalité plus élevée chez les patients sous un médicament. Les auteurs ajustent sur l'âge, le sexe, la pression artérielle et douze paramètres biologiques ; l'excès diminue un peu mais persiste, et ils concluent que le médicament est nocif.",
  "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.":
    "L'ajustement ne peut retirer que ce qui a été enregistré. Le sentiment du clinicien que ce patient se dégradait est précisément la raison pour laquelle le médicament a été prescrit, et il ne figure pas parmi les douze paramètres biologiques.",

  // ---- Trap Hunt items (earlier skills) ----
  "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.":
    "Un audit national constate que les patients opérés dans de petits hôpitaux locaux survivent plus souvent que ceux opérés dans de grands centres hospitalo-universitaires. Ventilé selon la gravité des cas, ce sont les centres hospitalo-universitaires qui arrivent en tête dans chaque catégorie.",
  "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.":
    "Les centres hospitalo-universitaires prennent les cas difficiles : leur chiffre global est donc tiré vers le bas par une composition de patients que personne n'a tirée au sort. Meilleur dans chaque tranche de gravité et moins bon au total, c'est la signature de ce phénomène.",
  "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.":
    "Un test génétique pour une maladie qui touche environ 1 personne sur 5 000 est fiable à 99,9 %. Un centre annonce à toutes les personnes dépistées positives que le diagnostic est pour ainsi dire confirmé.",
  "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.":
    "Même à 99,9 %, les erreurs sont plus nombreuses que les vrais cas quand la maladie est aussi rare. Sur 100 000 personnes, environ 20 sont atteintes, et environ 100 personnes en bonne santé sont elles aussi positives : un résultat positif a donc raison à peu près une fois sur six.",
  "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.":
    "Un chirurgien rapporte d'excellents résultats à long terme chez les patients vus à la consultation de suivi à cinq ans. Les patients qui ont déménagé, qui ont cessé de venir ou qui sont morts avant cinq ans ne figurent pas dans la série.",
  "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.":
    "La série a été définie par ceux qui se présentaient encore. Les patients qui s'en sont le plus mal sortis sont justement ceux qui ont le plus de chances d'y manquer : les résultats décrivent donc les survivants, pas l'intervention.",
  "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.":
    "Les hôpitaux qui utilisent le plus un certain appareil de surveillance ont des taux de mortalité plus bas. La brochure du fabricant en conclut qu'acheter cet appareil sauve des vies.",
  "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.":
    "Les hôpitaux qui peuvent s'offrir plus de moniteurs peuvent en général s'offrir plus de tout le reste aussi, personnel compris. L'appareil est peut-être un marqueur d'un hôpital bien doté plutôt que la cause de ses résultats.",
  "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.":
    "Un effet indésirable rare survient chez environ 1 personne sur 50 000 prenant un médicament. Un patient le présente, et un rapport conclut qu'il n'y a qu'une chance sur 50 000 que le médicament n'en soit pas responsable.",
  "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.":
    "Cela inverse la question. Le 1 sur 50 000 dit à quelle fréquence l'effet apparaît chez les personnes qui prennent le médicament, pas la probabilité que le médicament ait causé ce cas-ci. Pour y répondre, il faut savoir à quelle fréquence la même chose survient chez les personnes qui n'en ont jamais pris.",

  // ---- Trap Hunt items (sound reasoning) ----
  "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.":
    "Un essai rapporte comme critère principal celui qu'il avait enregistré à l'avance, précise qu'il en a aussi mesuré onze autres, et indique clairement que le succès a été jugé sur le seul critère enregistré.",
  "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.":
    "Nommer le critère avant de voir les données, puis les rapporter tous, c'est ce qui empêche une étude de promouvoir discrètement la mesure qui s'est trouvée bien tomber.",
  "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.":
    "Une étude de cohorte relie une exposition à une maladie. Elle rapporte que l'association a résisté à l'ajustement sur les facteurs de confusion nommés à l'avance, que plus d'exposition allait avec plus de maladie, et que deux cohortes indépendantes ailleurs ont retrouvé le même schéma.",
  "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.":
    "Aucun de ces éléments ne tranche à lui seul la question de la causalité, mais réunis ce sont eux qui rendent un résultat observationnel digne d'être pris au sérieux : un plan établi à l'avance, une relation dose-effet, et une réplication dans des populations qui ne partagent pas les mêmes particularités.",
  "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.":
    "Des patients sont répartis par ordinateur entre un médicament et un comprimé placebo, sans qu'eux ni leur médecin sachent lequel. Les décès sont comptés chez toutes les personnes réparties, quel que soit ce qu'elles ont pris ensuite. Le groupe traité s'en sort un peu mieux.",
  "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.":
    "Un pile ou face ne sait rien du patient : il ne peut donc pas faire entrer clandestinement la raison du traitement dans la comparaison. Compter chacun dans le groupe qui lui a été attribué conserve cette protection même quand des gens arrêtent de prendre leurs comprimés.",
  "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.":
    "Un service compare ses résultats à une référence nationale, ajuste sur la gravité de la maladie de ses patients, et publie côte à côte les chiffres bruts et les chiffres ajustés, ainsi que la composition des cas sur laquelle il a ajusté.",
  "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.":
    "Montrer les deux chiffres et la composition qui les sous-tend, voilà le geste honnête. Un lecteur peut voir quelle part de l'écart tenait à la composition des cas et quelle part a subsisté une fois celle-ci prise en compte, au lieu de ne recevoir que le chiffre flatteur.",
};
