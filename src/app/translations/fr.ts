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
};
