/**
 * Diccionario en español: cadena original en inglés, traducción al español. Las
 * claves deben coincidir exactamente con el texto en inglés. Revisión nativa por
 * Basile; corregir sobre la marcha.
 */
export const es: Record<string, string> = {
  // ---- Interfaz (botones, etiquetas, encabezados de sección) ----
  "The skill": "La habilidad",
  "Where this shows up": "Dónde aparece esto",
  "See it in the wild": "Verlo en la práctica",
  "Why it happens": "Por qué ocurre",
  "Same trap, other places": "La misma trampa, en otros sitios",
  "Source": "Fuente",
  "Make my card →": "Crear mi tarjeta →",
  "Go deeper on this idea →": "Profundizar en esta idea →",
  "Commit to see the reveal. No peeking.":
    "Confirma tu elección para ver la respuesta. Nada de espiar.",
  "Reveal the answer": "Revelar la respuesta",
  "Name the skill →": "Nombra la habilidad →",
  "Play again": "Jugar de nuevo",
  "The lurking variable": "La variable oculta",
  "Nicely done, you didn't take the number at face value.":
    "Bien hecho, no te tomaste el número al pie de la letra.",
  "So does almost everyone. That's exactly the trap.":
    "Como casi todo el mundo. Esa es justamente la trampa.",
  "You caught it": "Lo detectaste",
  "Most people miss this": "La mayoría no lo ve",
  "You picked": "Elegiste",
  "Replay": "Repetir",
  "Who each treatment actually treated":
    "A quién trató realmente cada tratamiento",
  "So what's the skill? →": "Entonces, ¿cuál es la habilidad? →",
  // etiquetas de alcance (a la derecha del pie de figura)
  "Overall": "En total",
  "By subgroup": "Por subgrupo",
  "The facts": "Los hechos",
  "The reality": "La realidad",
  "Observed": "Observado",
  "Explained": "Explicado",
  "Survivors": "Los supervivientes",
  "The full picture": "La imagen completa",
  // nombres de categoría (humanizados)
  "Causal reasoning": "Razonamiento causal",
  "Statistical reasoning": "Razonamiento estadístico",
  // etiquetas
  "Everyday": "Cotidiano",
  "Clinical": "Clínico",
  "Research": "Investigación",
  "Statistics": "Estadística",
  "Diagnosis": "Diagnóstico",
  "Screening": "Cribado",
  "Epidemiology": "Epidemiología",
  "Pharmacology": "Farmacología",
  "Psychology": "Psicología",
  "Biology": "Biología",
  "Technology": "Tecnología",
  "Economics": "Economía",
  "Politics": "Política",
  "Education": "Educación",
  "Finance": "Finanzas",
  "Business": "Negocios",
  "Law": "Derecho",
  "Sports": "Deporte",
  "History": "Historia",
  "Media": "Medios",
  "Demo · try any puzzle": "Demo · prueba cualquier puzle",
  // vista de frecuencias (puzle de tasa base)
  "1 in": "1 de cada",
  "How common it is": "Su frecuencia",
  "Test catches it": "El test la detecta",
  "Always": "Siempre",
  "False-alarm rate": "Tasa de falsas alarmas",
  "Positive tests": "Tests positivos",
  "of": "de",
  "actually": "realmente",
  "chance": "de probabilidad",
  "false alarm": "falsa alarma",
  // apuesta + estadísticas
  "How sure are you?": "¿Cómo de seguro estás?",
  "Hunch": "Corazonada",
  "Fairly sure": "Bastante seguro",
  "Certain": "Certeza",
  "Pick one, then stake how sure you are":
    "Elige una y luego apuesta cómo de seguro estás",
  "pts": "pts",
  "Today": "Hoy",
  "Streak": "Racha",
  "Best": "Récord",
  "Caught": "Detectados",
  "Calibration": "Calibración",
  "You beat {pct}% of players today":
    "Has superado al {pct} % de los jugadores hoy",
  "A new puzzle every day. Keep the streak alive.":
    "Un puzle nuevo cada día. No rompas la racha.",
  "Sharp eye, and you called it.":
    "Buen ojo, y lo habías anunciado.",
  "Nicely spotted.": "Bien visto.",
  "Good instinct.": "Buen instinto.",
  "Ouch. Confidently wrong, the classic trap.":
    "Ay. Seguro de ti mismo y aun así equivocado, la trampa clásica.",
  "So does almost everyone. That's the trap.":
    "Como casi todo el mundo. Esa es la trampa.",
  "You sensed something was off, but went with it anyway.":
    "Intuías que algo no cuadraba, pero aun así te decidiste por ello.",
  // clasificación entre amigos
  "Friends board": "Clasificación entre amigos",
  "Your name": "Tu nombre",
  "Copy result": "Copiar resultado",
  "Copied": "Copiado",
  "Share": "Compartir",
  "Paste your friends' results here":
    "Pega aquí los resultados de tus amigos",
  "Add to board": "Añadir a la clasificación",
  // caza de trampas
  "Trap Hunt": "Caza de trampas",
  "Some of these are sound. Some hide a trap.":
    "Algunos de estos razonamientos son válidos. Otros esconden una trampa.",
  "Sound reasoning": "Razonamiento válido",
  "There's a trap": "Hay una trampa",
  "Which trap?": "¿Qué trampa?",
  "Rank": "Rango",
  "Done": "Terminado",
  "Trap Hunt unlocked": "Caza de trampas desbloqueada",
  "Can you still spot the traps?":
    "¿Sabrás seguir detectando las trampas?",
  "Novice": "Novato",
  "Sceptic": "Escéptico",
  "Detective": "Detective",
  "Analyst": "Analista",
  "Sharp eye": "Ojo experto",

  // ---- textos compartidos de la tarjeta ----
  "Caught it. Bet you can't.": "Lo vi venir. A que tú no.",
  "I totally fell for this.": "Caí de lleno en la trampa.",

  // ==== Paradoja de Simpson (cálculos renales) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "El tratamiento B cura a más pacientes en total. ¿Cuál elegirías?",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "Dos tratamientos contra los cálculos renales, 350 pacientes cada uno. En tasa de éxito global, el tratamiento B queda por delante. Misma enfermedad, mismo objetivo, un solo número para decidir.",
  "Which treatment would you pick?": "¿Qué tratamiento elegirías?",
  "Success rate": "Tasa de éxito",
  "Treatment A, open surgery": "Tratamiento A, cirugía abierta",
  "Treatment B, keyhole (PCNL)": "Tratamiento B, vía percutánea (NLPC)",
  "Small stones": "Cálculos pequeños",
  "Large stones": "Cálculos grandes",
  "Treatment B": "Tratamiento B",
  "83% overall": "83 % en total",
  "Treatment A": "Tratamiento A",
  "78% overall": "78 % en total",
  "Treatment A actually wins, for both stone sizes.":
    "En realidad gana el tratamiento A, para los dos tamaños de cálculos.",
  "Stone size (case severity)":
    "El tamaño de los cálculos (la gravedad del caso)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "A y B no trataban a los mismos pacientes. A recibió sobre todo los casos difíciles (cálculos grandes), mientras que B recibió sobre todo los fáciles. A todo el mundo le va peor en los casos difíciles, así que la media global de A se hunde aunque A gane en cada grupo:",
  "Simpson's paradox": "La paradoja de Simpson",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "Una tendencia global puede invertirse en cuanto se tiene en cuenta una variable oculta repartida de forma desigual entre los grupos.",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "Siempre que se comparen dos grupos con una única tasa combinada, pregúntate qué se ha mezclado para obtener ese número y si los dos grupos se enfrentaban realmente a las mismas probabilidades. El tamaño de los cálculos es el factor de confusión más evidente aquí; rara vez es el único.",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "La puntuación «global» no es una medición nueva; es la mezcla de las puntuaciones de cada grupo, y los grupos más grandes pesan más. Cuando un bando está lleno de casos fáciles y el otro de casos difíciles, esa mezcla arrastra sus puntuaciones globales en direcciones opuestas. Así, una opción puede ir por delante en el grupo fácil y en el difícil y, aun así, quedar por detrás en total, porque atendió la mayoría de los casos difíciles y su puntuación mezclada se sitúa más cerca de ese número más bajo. El remedio es un reparto justo: da a los dos bandos la misma mezcla de casos fáciles y difíciles (exactamente lo que hace un ensayo aleatorizado), y la inversión no puede producirse.",
  "University admissions": "Las admisiones universitarias",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "En 1973, las escuelas de posgrado de Berkeley admitieron al 44 % de los hombres pero solo al 35 % de las mujeres. Parecía una discriminación clara. Sin embargo, departamento por departamento, las mujeres eran admitidas a una tasa parecida a la de los hombres, o mayor. Simplemente solicitaban plaza con más frecuencia en los departamentos más competitivos, donde casi todo el mundo era rechazado. La diferencia tenía que ver con dónde se solicitaba, no con quién decidía.",
  "Baseball batting averages": "Los promedios de bateo en béisbol",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "David Justice bateó mejor que Derek Jeter en 1995 (0,253 frente a 0,250) y de nuevo en 1996 (0,321 frente a 0,314). Pero sumando las dos temporadas, quien queda por delante es Jeter, 0,310 frente a 0,270. Cada año por separado señalaba a Justice; los dos años juntos señalaban a Jeter, porque los jugadores tuvieron números de turnos al bate muy distintos en sus temporadas buenas y malas.",
  "COVID-19 death rates": "Las tasas de mortalidad de la COVID-19",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "A comienzos de 2020, la tasa de mortalidad notificada entre los casos de COVID era más alta en Italia que en China en conjunto. Pero desglosada por edad, la tasa italiana era más baja en todos los grupos de edad. Italia tenía sencillamente muchos más pacientes mayores, que corren más riesgo, así que juntar todas las edades hacía que Italia pareciera peor de lo que mostraba una comparación justa, edad por edad.",
  "Simpson's paradox, a reasoning trap.":
    "La paradoja de Simpson, una trampa de razonamiento.",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "Una opción puede ganar en cada grupo por separado y, aun así, perder en cuanto juntas todos los grupos. Suena imposible, pero es real. Ocurre cuando los grupos no forman una comparación justa: un bando recibió calladamente los casos fáciles y el otro los difíciles. Así, el gran número combinado dice una cosa mientras que los números grupo por grupo dicen lo contrario, y es el número grande el que te engaña.",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "La tabla de dos tratamientos de 350/350 se presenta tal cual en Julious y Mullee (1994), a partir de la serie clínica de Charig et al. (1986) (que originalmente comparaba tres modalidades).",

  // ==== Falacia de la tasa base (test médico) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "Un test casi perfecto dice que estás enfermo. ¿Cuánto deberías preocuparte?",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "Esta enfermedad es rara: alrededor de 1 de cada 1000 personas la tiene. El test nunca la pasa por alto cuando está realmente presente, y solo da una falsa alarma en aproximadamente 1 de cada 20 personas sanas. Tu resultado acaba de dar positivo.",
  "What's the chance you actually have the disease?":
    "¿Qué probabilidad hay de que realmente tengas la enfermedad?",
  "In 1,000 people": "En 1000 personas",
  "have the disease": "tienen la enfermedad",
  "test positive": "dan positivo",
  "About 95%": "Alrededor del 95 %",
  "the test is 95% accurate": "el test es fiable al 95 %",
  "About half": "Alrededor de la mitad",
  "50/50": "50/50",
  "About 2%": "Alrededor del 2 %",
  "roughly 1 in 50": "más o menos 1 de cada 50",
  "Positive, but almost certainly a false alarm.":
    "Positivo, pero casi con certeza una falsa alarma.",
  "The base rate": "La tasa base",
  "A rare disease flips the odds":
    "Una enfermedad rara invierte las probabilidades",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "Como casi nadie tiene la enfermedad, la pequeña tasa de error del test hace todo el trabajo. En 1000 personas, solo 1 está realmente enferma, pero unas 50 personas sanas también dan positivo. Así, entre los ~51 resultados positivos, solo 1 es real. Un positivo apenas te mueve de «muy improbable» a «todavía improbable».",
  "The base-rate fallacy": "La falacia de la tasa base",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "Cuando algo es raro, incluso un test muy fiable genera muchas más falsas alarmas que casos reales, así que un resultado positivo puede seguir significando que probablemente estás bien.",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "La solución es pensar en personas enteras, no en porcentajes: imagina 1000 de ellas, cuenta los verdaderos positivos y las falsas alarmas, y compara. Pregúntate siempre cómo de frecuente es algo antes de fiarte de un positivo.",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "La fiabilidad de un test y tus probabilidades reales son dos cosas distintas. La fiabilidad se mide en personas de las que ya sabemos si están enfermas o sanas. Pero un resultado positivo plantea la pregunta inversa (dado este positivo, ¿estoy enfermo?), y eso depende de cuántas personas enfermas había que encontrar desde el principio. Si solo 1 de cada 1000 tiene la enfermedad, la enorme mayoría sana produce un aluvión de falsas alarmas que sepulta el único caso real. Haz que la enfermedad sea frecuente y el mismo test parece excelente; hazla rara y un positivo significa poco por sí solo.",
  "Even doctors slip": "Hasta los médicos se equivocan",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "Unos investigadores plantearon exactamente esta pregunta a médicos y personal sanitario: una enfermedad que afecta a 1 de cada 1000, un test con un 5 % de falsas alarmas. La respuesta más frecuente fue 95 %. La media fue del 56 %. Solo alrededor de 1 de cada 5 dio la respuesta correcta, más o menos un 2 %.",
  "Think in people, not percentages":
    "Piensa en personas, no en porcentajes",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "El remedio más sencillo es la redacción. Plantea el mismo problema en frecuencias naturales («1 de cada 1000 personas» y «unas 50 falsas alarmas» en lugar de «0,1 %» y «5 %»), y mucha más gente, médicos incluidos, acierta.",
  "The base-rate fallacy, a reasoning trap.":
    "La falacia de la tasa base, una trampa de razonamiento.",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "Un test puede ser fiable al 95 % y un resultado positivo puede seguir significando que casi con certeza estás bien. La clave está en lo rara que es la cosa. Si solo 1 de cada 1000 personas tiene una enfermedad, entonces, entre todos los que dan positivo, los pocos casos reales quedan enterrados bajo un montón de falsas alarmas. La fiabilidad no es lo mismo que tus probabilidades reales; primero hay que preguntarse cómo de frecuente es.",

  // ==== Correlación no es causalidad (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "Más chocolate, más premios Nobel. ¿Debería tu país abastecerse?",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "Es un hallazgo real y publicado: en 23 países, cuanto más chocolate come la gente, más premios Nobel ha producido el país, una fuerte correlación (r ≈ 0,79). La tendencia es difícil de rebatir.",
  "So, does eating chocolate help win Nobel Prizes?":
    "Entonces, ¿comer chocolate ayuda a ganar premios Nobel?",
  "Across 23 countries": "En 23 países",
  "Chocolate eaten": "Chocolate consumido",
  "Nobel prizes": "Premios Nobel",
  "A country's wealth": "La riqueza del país",
  "r ≈ 0.79": "r ≈ 0,79",
  "Yes, chocolate boosts brainpower":
    "Sí, el chocolate potencia el cerebro",
  "the trend is strong": "la tendencia es fuerte",
  "No, it's a pure fluke": "No, es pura casualidad",
  "coincidence": "coincidencia",
  "No, a third thing drives both":
    "No, una tercera cosa influye en ambos",
  "a common cause": "una causa común",
  "The chocolate isn't doing anything.": "El chocolate no está haciendo nada.",
  "The common cause": "La causa común",
  "A country's wealth pulls both up":
    "La riqueza del país tira de ambos hacia arriba",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "Los países más ricos pueden permitirse más chocolate Y financiar más universidades, laboratorios e investigación, que es lo que de verdad gana premios Nobel. La riqueza influye en ambos, así que chocolate y Nobel suben juntos sin que uno cause el otro. Reparte chocolate gratis y conseguirás más caries, no más galardonados.",
  "Correlation ≠ causation": "Correlación ≠ causalidad",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "Que dos cosas se muevan juntas no significa que una cause la otra. A menudo, una tercera cosa influye calladamente en ambas.",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "Cuando veas un vínculo fuerte, repasa las posibilidades antes de creer que X causa Y: quizá Y cause X, quizá una causa común influya en ambos, o quizá sea el azar. Por lo general, solo una comparación controlada permite saber cuál es.",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "Una correlación solo dice que dos cosas tienden a moverse juntas. Eso puede ocurrir por varias razones: una causa de verdad a la otra; la causalidad va en sentido contrario; un tercer factor oculto influye en ambas (una causa común, como el calor que dispara a la vez las ventas de helados y los ahogamientos); o es una coincidencia, tanto más probable cuanto más datos revisas. Detectar una correlación es la parte fácil. Averiguar cuál de estas explicaciones está detrás es el verdadero trabajo, y suele requerir un experimento, no solo un gráfico.",
  "Storks and babies": "Las cigüeñas y los bebés",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "En los países europeos, los que tienen más cigüeñas tienen realmente más nacimientos humanos, un vínculo estadísticamente significativo. La leyenda no es cierta: los países más grandes simplemente tienen sitio para más cigüeñas y para más personas.",
  "Nicolas Cage and drownings": "Nicolas Cage y los ahogamientos",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "El número de películas que estrena Nicolas Cage en un año sigue de cerca el número de personas que se ahogan en piscinas. Nadie cree que una cause la otra; alinea suficientes tendencias sin relación y algunas coincidirán por pura casualidad.",
  "Correlation ≠ causation, a reasoning trap.":
    "Correlación ≠ causalidad, una trampa de razonamiento.",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "Dos cosas pueden subir y bajar juntas a la perfección y aun así no tener nada que ver entre sí. Muy a menudo, una tercera cosa oculta mueve ambos hilos a la vez, así que parece que una causa la otra cuando ninguna lo hace. Antes de creerte un titular que dice que «X está relacionado con Y», pregúntate qué más podría estar influyendo en ambos.",

  // ==== Sesgo de supervivencia (bombarderos) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "Los bombarderos vuelven acribillados a balazos. ¿Dónde añades el blindaje?",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "En la Segunda Guerra Mundial, los bombarderos que regresaban estaban plagados de daños, sobre todo en las alas y el fuselaje, mientras que los motores y la cabina volvían casi intactos. El blindaje es pesado, así que solo puedes reforzar unas pocas zonas.",
  "Where should the armour go?": "¿Dónde debería ir el blindaje?",
  "Returning bombers": "Los bombarderos que regresan",
  "hits on planes that came back": "impactos en los aviones que volvieron",
  "armour here, the lost planes' hits":
    "blinda aquí, los impactos de los aviones perdidos",
  "The wings and body": "Las alas y el fuselaje",
  "where the holes are": "donde están los agujeros",
  "Spread it evenly": "Repartirlo de forma uniforme",
  "play it safe": "ir a lo seguro",
  "The engines and cockpit": "Los motores y la cabina",
  "where there are no holes": "donde no hay agujeros",
  "Armour where the holes aren't.":
    "Blinda donde no hay agujeros.",
  "The missing planes": "Los aviones que faltan",
  "You only see the survivors": "Solo ves a los supervivientes",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "Estos son los aviones que consiguieron volver a casa. Los que recibieron impactos en el motor o la cabina no lo lograron, así que sus daños nunca aparecen en los datos. Los agujeros de los supervivientes señalan exactamente dónde puede recibir disparos un bombardero y seguir volando. Las zonas intactas son las mortales: blinda esas.",
  "Survivorship bias": "El sesgo de supervivencia",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "Cuando solo miras a los ganadores, los fracasos se vuelven invisibles, y a menudo encierran la verdadera lección.",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "Antes de sacar una conclusión, pregúntate quién falta en los datos. Los aviones que no regresaron, los fondos que cerraron, los negocios que quebraron: fueron descartados calladamente, y volver a incluirlos puede darle la vuelta a la respuesta.",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "El sesgo de supervivencia se cuela siempre que tus datos se han filtrado calladamente para quedarse solo con lo que «lo consiguió»: los aviones que vuelven, los fondos que siguen cotizando, las empresas que siguen ahí. Nunca ves a los que fracasaron y quedaron fuera y, como los supervivientes comparten aquello que les ayudó a sobrevivir, ese rasgo parece mucho más común, o más eficaz, de lo que realmente es. El remedio es buscar al grupo que falta y preguntarse qué mostraría la imagen completa. (El verdadero Wald hizo algo más que señalar un diagrama: construyó un método estadístico para estimar la vulnerabilidad de cada parte a partir de los daños de los supervivientes.)",
  "Falling cats": "Los gatos que caen",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "Los veterinarios descubrieron que los gatos que caían desde pisos más altos llegaban a menudo con menos heridas que los que caían desde pisos más bajos. Parte del motivo es una macabra supervivencia: a un gato que no sobrevivía a la caída nunca lo llevaban, así que los datos de la clínica solo cuentan a los que vivieron.",
  "Star mutual funds": "Los fondos estrella",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "Mira los fondos que todavía se ofrecen hoy y la gestión activa parece estupenda. Pero los fondos que fueron mal se cierran calladamente y desaparecen de los registros, así que los supervivientes favorecen a todo el sector. Contar los fondos desaparecidos recorta la rentabilidad media en más de un punto porcentual al año.",
  "Survivorship bias, a reasoning trap.":
    "El sesgo de supervivencia, una trampa de razonamiento.",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "Es fácil estudiar a los ganadores, los supervivientes, los éxitos, lo que sigue en pie, y copiar lo que tienen en común. Pero los fracasos son invisibles: quedaron fuera de los datos. Aquello que ayudó a sobrevivir a los supervivientes parece mucho más poderoso de lo que es, porque nunca ves a todos aquellos a los que no salvó. Antes de copiar a los ganadores, pregúntate quién falta.",

  // ==== Falacia del fiscal (People v. Collins, 1968) ====
  "A 1 in 12 million match. Case closed?":
    "Una coincidencia de 1 entre 12 millones. ¿Caso cerrado?",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "Los Ángeles, 1964. Una mujer es derribada y le roban el bolso. Los testigos describen a la pareja que huyó: una mujer rubia con coleta y un hombre negro con barba, en un coche parcialmente amarillo. Se acusa a una pareja que encaja en todos y cada uno de los detalles. En el juicio se pide a un perito que suponga una frecuencia para cada rasgo, las multiplica entre sí y obtiene 1 entre 12 millones. El fiscal le dice al jurado que esa es la probabilidad de que los dos acusados sean inocentes. Toma el 1 entre 12 millones al pie de la letra e imagina los 12 millones de parejas que podrían haber sido.",
  "This couple fits the description. What are the odds they did it?":
    "Esta pareja encaja con la descripción. ¿Qué probabilidad hay de que fueran ellos?",
  "In 12 million couples": "En 12 millones de parejas",
  "did it": "lo hicieron",
  "fit the description": "encajan con la descripción",
  "Virtually certain": "Prácticamente seguro",
  "12 million to one against them": "12 millones a uno en su contra",
  "Around 99%": "Alrededor del 99 %",
  "not quite proof, but close": "no es una prueba definitiva, pero casi",
  "About a coin flip": "Como cara o cruz",
  "roughly 50/50": "más o menos 50/50",
  "One in 12 million, and still a coin flip.":
    "Uno entre 12 millones, y aun así es cara o cruz.",
  "The flipped question": "La pregunta invertida",
  "Rare evidence is common in a big crowd":
    "Una prueba rara es frecuente en una multitud grande",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "El 1 entre 12 millones responde a una pregunta: si eliges una pareja al azar, ¿qué probabilidad hay de que encaje? El jurado tiene que responder a otra distinta: de todas las parejas que sí encajan, ¿cuál cometió el robo? Pon en fila 12 millones de parejas. Una de ellas son los ladrones y, por supuesto, encajan. Pero con una probabilidad de 1 entre 12 millones, aproximadamente otra pareja más de esa multitud encaja por puro azar. Así que una pareja que encaja tiene casi la misma probabilidad de ser inocente que de ser culpable.",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "El Tribunal Supremo de California anuló la condena en 1968. Partiendo de las propias cifras de la acusación, halló una probabilidad superior al 40 por ciento de que al menos otra pareja pudiera haber encajado igual de bien con la descripción, y advirtió de que la culpabilidad no puede decidirse con una aritmética como esta.",
  "The prosecutor's fallacy": "La falacia del fiscal",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "«Si fuera inocente, esta prueba sería así de improbable» no es lo mismo que «esta prueba hace que sea así de improbable que sea inocente». Intercambia las dos y algo que es cara o cruz empieza a sonar a certeza.",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "Antes de aceptar una coincidencia de una entre un millón, pregunta cuánta gente había en el conjunto. Una probabilidad de una entre un millón en una ciudad de diez millones produce unas diez coincidencias, y solo una de esas personas lo hizo. El número no significa nada hasta que digas quiénes formaban la multitud.",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "Dos preguntas suenan idénticas y no lo son. La primera: si esta persona no tuviera nada que ver, ¿qué probabilidad hay de encontrar esta prueba? Eso es lo que un laboratorio o un perito pueden medir de verdad, y de ahí salen cifras como 1 entre 12 millones. La segunda: dada esta prueba, ¿qué probabilidad hay de que esta persona lo hiciera? Eso es lo que tiene que decidir un jurado, y depende de algo que ningún laboratorio mide: cuánta gente podría haberlo hecho. Aplica una probabilidad de 1 entre 12 millones a una multitud de 12 millones y esperarás alrededor de una coincidencia inocente, así que la coincidencia por sí sola vale más o menos lo que cara o cruz. Reduce la multitud, o añade pruebas independientes, y esa misma coincidencia se vuelve poderosa. Amplía la multitud y se vuelve débil. La trampa también funciona al revés: un abogado defensor puede decir que 2000 personas de la ciudad comparten ese grupo sanguíneo, así que la prueba no demuestra nada, lo que ignora calladamente que las otras 1999 no estaban ni cerca del crimen.",
  "Two cot deaths, and a number that became guilt":
    "Dos muertes súbitas del lactante y un número que se convirtió en culpabilidad",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "En un juicio por asesinato en Inglaterra se declaró que la probabilidad de dos muertes súbitas del lactante en una familia como la de la acusada era de 1 entre 73 millones. La prensa lo convirtió en la probabilidad de que las muertes fueran naturales. La Royal Statistical Society declaró públicamente que la cifra no tenía base estadística, porque daba por supuesto que las dos muertes eran independientes, y que leerla como una probabilidad de inocencia es la falacia del fiscal. Lo que el jurado necesitaba era una comparación: dos muertes súbitas del lactante y dos asesinatos son ambos sucesos raros, así que ¿cuál es más raro en este caso?",
  "Almost nobody spots the swap": "Casi nadie detecta el intercambio",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "Unos investigadores plantearon a 73 estudiantes un caso de asesinato en el que el grupo sanguíneo del asesino se encuentra en 1 de cada 100 personas y luego les mostraron un argumento de la acusación construido sobre la pregunta intercambiada: solo hay un 1 por ciento de probabilidad de que la sangre viniera de otra persona, así que hay un 99 por ciento de probabilidad de que el sospechoso sea culpable. 21 de los 73 calificaron ese argumento de correcto, y solo 16 vieron que tanto ese argumento como el argumento contrario de la defensa eran erróneos.",
  "The prosecutor's fallacy, a reasoning trap.":
    "La falacia del fiscal, una trampa de razonamiento.",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "Cuando un perito dice que solo hay una probabilidad entre un millón de que la coincidencia se deba al azar, eso es un dato sobre la prueba, no sobre la persona que está en el banquillo. Dale la vuelta y obtienes la falacia del fiscal. El remedio es preguntar cuánta gente había en el conjunto: una probabilidad de una entre un millón en una ciudad de diez millones produce unas diez coincidencias inocentes, así que por sí sola una coincidencia puede estar muy lejos de ser una prueba concluyente.",
  "Spotted the swap. Bet you don't.": "Detecté el intercambio. A que tú no.",
  "I'd have convicted on the spot.": "Yo lo habría condenado en el acto.",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "El apéndice de la sentencia mostró que, con esas mismas cifras y un conjunto de unos 12 millones de parejas, la probabilidad de que al menos otra pareja encajara con la descripción era de aproximadamente el 41 por ciento.",

  // ==== Fenómeno de Will Rogers (migración de estadios) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "Mejor supervivencia en todos y cada uno de los estadios. ¿Vivió alguien realmente más tiempo?",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "Un mismo grupo de 131 pacientes con cáncer de pulmón, tratados en 1977, clasificados en estadios dos veces. Primero usando solo la información que podían reunir los hospitales de antes, y después de nuevo tras las nuevas pruebas de imagen. A nadie se le trató de forma distinta. Lo único que cambió fue la clasificación.",
  "Did these patients actually do better?":
    "¿Les fue realmente mejor a estos pacientes?",
  "Six-month survival": "Supervivencia a seis meses",
  "Sorted the old way": "Clasificados a la manera antigua",
  "Old": "Antiguo",
  "Sorted after the new scans":
    "Clasificados tras las nuevas pruebas de imagen",
  "New": "Nuevo",
  "Stage I": "Estadio I",
  "Stage II": "Estadio II",
  "Stage III": "Estadio III",
  "Yes, they did better": "Sí, les fue mejor",
  "every stage improved": "todos los estadios mejoraron",
  "There is no way to tell": "No hay manera de saberlo",
  "too little to go on": "hay muy poco en lo que basarse",
  "No, nothing changed": "No, no cambió nada",
  "only the labels moved": "solo se movieron las etiquetas",
  "Identical. Seventy two survivors either way.":
    "Idéntico. Setenta y dos supervivientes en ambos casos.",
  "The migration": "La migración",
  "Patients moved between stages, and lifted both":
    "Los pacientes cambiaron de estadio y elevaron los dos",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "Las nuevas pruebas de imagen detectaron una extensión de la enfermedad que el estudio antiguo había pasado por alto, así que algunos pacientes salieron de estadios mejores para pasar a otros peores. Cada uno de ellos estaba entre los más graves del estadio que dejaba, así que la media de ese estadio subió. Y cada uno estaba también entre los menos graves del estadio al que llegaba, así que esa media subió también. Todos los estadios mejoraron y no cambió el desenlace de ni una sola persona:",
  "The Will Rogers phenomenon": "El fenómeno de Will Rogers",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "Traslada miembros de un grupo a otro y puedes elevar la media de todos los grupos a la vez, mientras el panorama general se mantiene exactamente igual.",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "Siempre que mejore la media de una categoría, pregúntate si esa categoría sigue conteniendo el mismo tipo de miembros. Una mejor detección redistribuye calladamente quién cuenta como leve y quién como grave, y una redistribución por sí sola puede hacer que todas las columnas parezcan mejores.",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "Imagina dos cubos, uno de buenos resultados y otro de malos. Saca los peores elementos del cubo bueno y échalos en el malo, donde pasan a ser los mejores de un mal lote. La media del cubo bueno sube porque se han ido sus miembros más débiles. La media del cubo malo sube porque ha ganado miembros mejores que los suyos. Las dos medias mejoran y nada ha cambiado en ningún individuo. En medicina, la redistribución la hacen unas pruebas de imagen mejores, que encuentran enfermedad que siempre estuvo ahí pero antes era invisible. Por eso la supervivencia por estadios puede mejorar en todos los frentes en una época en la que los tratamientos en sí no mejoraron, y por eso comparar estadios entre épocas con tecnologías distintas resulta traicionero.",
  "The check that gave it away": "La comprobación que lo delató",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "Los mismos investigadores clasificaron a los pacientes de ambas épocas según sus síntomas, un criterio que ningún escáner puede alterar. Juzgados así, los dos grupos sobrevivieron a tasas muy parecidas, en torno al 77 y al 78 por ciento entre quienes no tenían síntomas, y del 26 frente al 22 por ciento entre los más graves. Lo que había cambiado de verdad era la composición, porque el grupo más reciente contenía el doble de proporción de pacientes leves.",
  "It happened again with PET": "Volvió a ocurrir con la PET",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "A medida que la PET se extendía por los hospitales estadounidenses, los pacientes con cáncer de pulmón volvieron a reclasificarse. La proporción etiquetada como más avanzada creció, y la supervivencia dentro de los estadios subió como era de esperar: la supervivencia a dos años pasó del 18 al 22 por ciento en un estadio y del 6 al 8 por ciento en otro. Los autores titularon su artículo el fenómeno revisitado.",
  "The Will Rogers phenomenon, a reasoning trap.":
    "El fenómeno de Will Rogers, una trampa de razonamiento.",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "Coge a los peores miembros de un grupo bueno y pásalos a un grupo malo. La media del grupo bueno sube, porque se han ido los más flojos. La media del grupo malo sube también, porque los recién llegados son mejores que los que ya tenía. Todos los grupos mejoran y no ha ocurrido nada real. Así es como unas pruebas de imagen más finas pueden hacer que la supervivencia parezca mejor en todos los estadios de una enfermedad mientras vive y muere exactamente la misma gente.",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "Los recuentos son los de la tabla 4: la cohorte de 1977 de 131 pacientes clasificada en estadios dos veces, una con los datos de que disponía la cohorte anterior y otra con las nuevas pruebas de imagen. Las dos clasificaciones dan 72 supervivientes, una supervivencia a seis meses del 55 por ciento.",

  // ==== Caza de trampas: escenarios y explicaciones ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "Dos colegios publican sus resultados de los exámenes. El colegio B tiene la tasa de aprobados más alta en total, un 75 % frente a un 70 %. Cuando los resultados se desglosan por origen social del alumnado, el colegio A queda por delante en todos y cada uno de los grupos. El distrito elogia al colegio B.",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "A gana en todos los grupos pero pierde en total, algo que ocurre cuando los grupos están mezclados de forma desigual. Aquí el número engañoso es el combinado.",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "Una fábrica informa de que su nuevo proceso tiene una tasa de defectos menor que el antiguo, un 3 % frente a un 4 %. Si se miran por separado las piezas simples y las piezas complejas, el proceso antiguo tenía menos defectos en ambos casos.",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "Ser mejor en las dos categorías y aun así peor en total significa que los dos procesos trataron mezclas muy distintas de piezas simples y complejas.",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "Una afección se da en alrededor de 1 de cada 2000 personas. Un test de cribado es fiable al 99 %. Un paciente da positivo y se le dice que casi con certeza tiene la afección.",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "Con una afección tan rara, la tasa de error del 1 % produce muchos más falsos positivos que casos reales, así que sigue siendo más probable que un positivo sea una falsa alarma.",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "Un sistema señala a algunos viajeros como sospechosos y es fiable al 95 %. Alrededor de 1 de cada 1000 viajeros es realmente una amenaza. Un funcionario afirma que un viajero señalado tiene un 95 % de probabilidades de ser una amenaza.",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "Eso confunde la fiabilidad del test con las probabilidades una vez que ha saltado la alerta. Como las amenazas son raras, la inmensa mayoría de las alertas son viajeros corrientes.",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "Los barrios con más parques tienen tasas de obesidad más bajas. Un informe municipal concluye que construir parques reducirá la obesidad y propone un programa de construcción de parques.",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "Es plausible que la riqueza y el urbanismo influyan tanto en la dotación de parques como en la salud, así que puede que no sean los parques los que hacen el trabajo.",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "Los estudiantes que van más a menudo a la biblioteca sacan mejores notas. Una universidad anuncia visitas semanales obligatorias a la biblioteca para subir las notas.",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "Los estudiantes motivados estudian más y además van a la biblioteca. Obligar a la visita no aporta la motivación que produjo las notas.",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "Un libro de negocios estudia empresas que han prosperado durante cincuenta años y descubre que casi todas tenían líderes audaces y dispuestos a arriesgar. Concluye que el liderazgo audaz produce el éxito duradero.",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "Las empresas audaces que quebraron no están en la muestra. La audacia podría causar igual de bien fracasos espectaculares, algo que el estudio no puede ver.",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "Una clínica revisa a los pacientes que completaron su exigente programa de rehabilitación y encuentra excelentes resultados. Informa de que el programa es muy eficaz.",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "Los pacientes que lo abandonaron quedan excluidos, y probablemente son los que peor van. Contar solo a quienes terminan favorece al programa.",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "Una búsqueda en una base de datos da con un hombre cuyo ADN coincide con una muestra de la escena del crimen. El laboratorio informa de que ese perfil se da en aproximadamente 1 de cada millón de personas. El fiscal le dice al jurado que, por tanto, hay alrededor de una probabilidad entre un millón de que sea inocente.",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "El 1 entre un millón es la probabilidad de que haya coincidencia si él es inocente, no la probabilidad de que sea inocente dada la coincidencia. En un conjunto grande también coinciden otras personas, así que los dos números no se parecen en nada.",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "Unas fibras en el abrigo de un sospechoso coinciden con la alfombra de la víctima. Un perito afirma que solo alrededor de 1 de cada 5000 abrigos llevaría esas fibras. El letrado concluye que el sospechoso tiene 4999 veces más probabilidades de ser culpable que de ser inocente.",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "Una cifra de rareza describe la prueba, no a la persona. Cuántos inocentes podrían haber recogido esas fibras depende de cuánta gente estuvo alguna vez cerca de esa alfombra.",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "Un perito declara que el perfil de ADN se da en aproximadamente 1 de cada millón de personas y añade que, en una ciudad de dos millones, cabría esperar que otras dos personas coincidieran también, así que la coincidencia por sí sola no señala al acusado.",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "Esta es la cifra de rareza expresada correctamente. El perito la convierte en coincidencias esperadas dentro de la población en lugar de darle la vuelta para transformarla en una probabilidad de inocencia.",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "Los pacientes se asignan al azar a un fármaco o a un placebo. El grupo del fármaco tiene menos ictus, y la diferencia se mantiene dentro de cada grupo de edad. Los investigadores concluyen que el fármaco reduce los ictus.",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "La aleatorización equilibra las diferencias ocultas, y el efecto sobrevive al desglose por edad. Este razonamiento es válido.",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "Un test con una tasa de falsos positivos del 1 % se usa en una consulta donde alrededor del 40 % de las personas analizadas tiene realmente la afección. Un médico le dice a un paciente que un resultado positivo hace que la afección sea mucho más probable.",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "La tasa base importa, y aquí es alta. Con una prevalencia del 40 %, un positivo sí es una prueba sólida, así que aplicar la lección de las enfermedades raras sería un error.",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "Una ciudad compara las muertes en carretera antes y después de bajar un límite de velocidad, ajusta por volumen de tráfico y comprueba la tendencia nacional de esos mismos años. La caída local es mayor que la tendencia nacional.",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "Tuvieron en cuenta los factores de confusión evidentes y también la tendencia de fondo, que es lo que hace creíble una comparación de antes y después.",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "Un ensayo informa de los resultados de todas las personas que fueron incluidas, incluidas las que interrumpieron el tratamiento antes de tiempo, e indica cuántas lo abandonaron y por qué.",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "Informar de todo el grupo incluido, con los abandonos dentro, es justamente lo que protege frente a contar solo a los supervivientes.",
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "Un hospital instala un escáner más sensible. En los dos años siguientes informa de que la supervivencia mejoró en todos los grados de gravedad de la enfermedad, desde el más leve hasta el más avanzado, y concluye que su atención ha mejorado.",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "Un escáner más fino reclasifica a los pacientes. Los que salen de un grado leve eran los más graves de ese grado, y llegan a un grado severo como los que mejor están de él, así que las dos medias suben sin que a nadie le vaya mejor.",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "Un colegio adopta una prueba de nivel que identifica mucho mejor a los alumnos con dificultades y la usa para repartirlos entre un grupo avanzado y otro de refuerzo. Al año siguiente, los resultados medios suben en los dos grupos. El director lo atribuye a los nuevos métodos de enseñanza.",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "Los alumnos que la reclasificación sacó del grupo avanzado eran los más flojos de ese grupo y pasan a ser los más fuertes del grupo de refuerzo, así que las dos medias suben solo por la redistribución.",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "Un hospital informa de que la supervivencia mejoró en todos los grados de gravedad a lo largo de cinco años. Informa además de que los criterios de clasificación no cambiaron en ese tiempo, de que no se introdujo ninguna prueba diagnóstica nueva y de que el número de pacientes de cada grado se mantuvo más o menos igual.",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "Este es el caso en el que la mejora es real. Nada reclasificó a los pacientes, y los grados mantuvieron la misma proporción de personas, así que ninguna redistribución pudo fabricar esa ganancia.",

  // ==== Sesgo de anticipación diagnóstica (puzle #7) ====
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "Los pacientes cribados sobreviven cinco años tras el diagnóstico. Los no cribados, dos.",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "El mismo cáncer, que crece a la misma velocidad, tratado de la misma manera. A una de las personas le hicieron una prueba de imagen que lo detectó pronto. La otra fue al médico años más tarde, cuando apareció el primer síntoma. La supervivencia se cuenta desde el día del diagnóstico, que es como se cuenta casi siempre.",
  "Did finding it early give this person more time alive?":
    "¿Detectarlo pronto le dio a esta persona más tiempo de vida?",
  "One life, two moments of diagnosis": "Una vida, dos momentos de diagnóstico",
  "years": "años",
  "cancer begins": "empieza el cáncer",
  "diagnosed": "se diagnostica",
  "died": "muere",
  "Survival counted from diagnosis":
    "Supervivencia contada desde el diagnóstico",
  "Found when symptoms appeared": "Detectado al aparecer los síntomas",
  "Found early, by screening": "Detectado pronto, por cribado",
  "Yes, three extra years": "Sí, tres años más",
  "five instead of two": "cinco en lugar de dos",
  "No, not one extra day": "No, ni un solo día más",
  "only the clock moved": "solo se movió el reloj",
  "Both died on exactly the same day.":
    "Los dos murieron exactamente el mismo día.",
  "The clock started earlier, the life did not get longer":
    "El reloj empezó antes, la vida no se alargó",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "El cribado no aplazó nada. Adelantó el diagnóstico tres años, así que esta persona pasó tres años más sabiendo que tenía cáncer. Contado desde el diagnóstico, eso se lee como tres años más de supervivencia. Pon las dos vidas en el mismo calendario y terminan en el mismo instante:",
  "The extra years": "Los años de más",
  "Lead-time bias": "El sesgo de anticipación diagnóstica",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "Detectar antes una enfermedad alarga la supervivencia medida desde el diagnóstico aunque no retrase la muerte ni un solo día.",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "Esto no significa que la detección precoz no sirva de nada. Significa que la supervivencia desde el diagnóstico no puede decirte si funcionó. Siempre que la supervivencia mejore tras la llegada de un test nuevo, pregúntate si la gente vive más tiempo o simplemente se entera antes. La medida que no se deja engañar así es la tasa de mortalidad en toda la población, cribada y no cribada por igual.",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "Las estadísticas de supervivencia ponen su reloj en marcha el día del diagnóstico. Ese día no es un dato sobre la enfermedad, es un dato sobre cuándo miró alguien. Adelanta el momento de mirar y añades tiempo por delante de la medición sin cambiar nada por detrás. Todo el que recibe un diagnóstico precoz tiene garantizado superar la marca de los cinco años más a menudo, porque le han dado ventaja de salida. Otros dos efectos empujan en la misma dirección. Un programa de cribado detecta la enfermedad de crecimiento lento mucho más a menudo que la de crecimiento rápido, sencillamente porque la lenta se queda ahí más tiempo esperando a que la encuentren, y la lenta tiene además mejor pronóstico. Y un test lo bastante sensible encuentra anomalías inofensivas que nunca habrían dado problemas, que luego se cuentan como cánceres curados. Los tres adornan la supervivencia sin salvar a nadie. La única prueba honesta consiste en tomar una población entera, invitar a la mitad al cribado y contar las muertes en todos desde el día de la invitación. Hay programas de cribado que superan esa prueba, y por eso mismo merece la pena exigirla.",
  "Survival rose for every cancer. Deaths did not follow.":
    "La supervivencia subió en todos los cánceres. Las muertes no siguieron.",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "Entre 1950 y 1995, la supervivencia a cinco años mejoró en los 20 tumores sólidos más frecuentes de Estados Unidos, desde apenas 3 puntos en el cáncer de páncreas hasta 50 en el de próstata. En esos mismos años la tasa de mortalidad bajó en 12 de esos cánceres y subió en los otros 8. Comparando tumor por tumor, el cambio en la supervivencia no guardaba relación con el cambio en la mortalidad, sino que seguía al cambio en cuántos cánceres se estaban detectando.",
  "Screening babies for a childhood tumour":
    "Cribar a los bebés en busca de un tumor infantil",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "Dos grandes programas pusieron a prueba el cribado de neuroblastoma en lactantes. Quebec cribó a 476 654 niños nacidos a lo largo de cinco años, con una participación del 92 por ciento, y las muertes por el tumor antes de los ocho años fueron de 4,78 por cada 100 000, no menos que en las poblaciones de comparación. Alemania comparó a 1 475 773 niños cribados con 2 117 600 no cribados y encontró enfermedad avanzada en 3,7 frente a 3,8 por cada 100 000, y muertes en 1,3 frente a 1,2. Se encontraron más tumores. Murió el mismo número de niños.",
  "What a real benefit looks like": "Qué aspecto tiene un beneficio real",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "El cribado no está condenado a ser una ilusión, solo hay que medirlo bien. Un ensayo repartió a 46 551 personas de 50 a 80 años en tres grupos: análisis anual de sangre oculta en heces, análisis cada dos años o ninguno. A lo largo de 13 años, las muertes por cáncer colorrectal fueron de 5,88 por cada 1000 en el grupo anual frente a 8,83 en el grupo sin cribado, un tercio menos. Eso es un recuento de las muertes de todas las personas invitadas, no una supervivencia desde el diagnóstico, así que ninguna ventaja de salida pudo producirlo.",
  "Lead-time bias, a reasoning trap.":
    "El sesgo de anticipación diagnóstica, una trampa de razonamiento.",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "La supervivencia se cuenta desde el día en que te diagnostican. Así que un test que detecta antes una enfermedad hace que la supervivencia parezca más larga de forma automática, aunque no cambie nada sobre cuándo te mata la enfermedad. Simplemente pasas más parte de tu vida siendo paciente. Por eso un programa de cribado puede subir muchísimo la supervivencia a cinco años mientras muere exactamente la misma gente. El número que no se puede manipular son las muertes en toda la población, no la supervivencia entre los diagnosticados.",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "La línea de tiempo es una ilustración esquemática de una vida, no un dato medido. El hallazgo que hay detrás es el de Welch y colaboradores: en los 20 tumores sólidos más frecuentes entre 1950 y 1995, la supervivencia a cinco años subió en todos ellos, pero tumor por tumor el cambio en la supervivencia no guardaba correlación con el cambio en la mortalidad (r de Pearson = 0,00) y sí seguía al cambio en la incidencia (r de Pearson = 0,49).",
  // caza de trampas
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "Un hospital introduce un análisis de sangre que detecta un cáncer unos dos años antes de que hubieran aparecido los síntomas. Entre los pacientes diagnosticados allí, la supervivencia a cinco años sube del 41 % al 68 %. El hospital anuncia que el test está salvando vidas.",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "La supervivencia se cuenta desde el diagnóstico, y ahora el diagnóstico llega dos años antes. Todo el mundo recibe una ventaja de salida de dos años hacia la marca de los cinco años, haya cambiado o no el test el desenlace de alguien.",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "Un registro nacional informa de que el tiempo medio entre el diagnóstico y la muerte por una enfermedad ha pasado de tres años a seis desde que una nueva prueba de imagen se usa de forma rutinaria. Un ministro dice que los pacientes viven ahora el doble.",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "El tiempo entre el diagnóstico y la muerte puede duplicarse solo porque el diagnóstico se ha adelantado. Para afirmar que la gente vive más hay que demostrar que la muerte llega más tarde, no que la etiqueta llega antes.",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "Una región invita a la mitad de sus habitantes, elegidos al azar, a cribarse para una enfermedad y deja a la otra mitad sin invitar. Diez años después cuenta las muertes por esa enfermedad entre todas las personas de las dos mitades, se cribaran o no, acudieran o no. Las muertes son un 30 % menores en la mitad invitada.",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "Este es el diseño al que un diagnóstico más precoz no puede engañar. El reloj arranca en la invitación y no en el diagnóstico, y el recuento incluye a todos los invitados, así que ninguna ventaja de salida ni ningún diagnóstico de más puede fabricar la diferencia.",

  // ---- Etiquetas de tema, alcance de figura y cadenas sueltas ----
  // etiquetas de alcance (a la derecha del pie de figura)
  "From diagnosis": "Desde el diagnóstico",
  "The whole life": "La vida entera",
  // etiquetas cortas de los dos tratamientos en el gráfico
  "A": "A",
  "B": "B",
  // descripciones de las etiquetas (pantalla de exploración)
  "Anyone can fall for it": "Cualquiera puede caer",
  "Bites at the bedside": "Muerde a pie de cama",
  "Study design & evidence appraisal": "Diseño de estudios y lectura crítica",
  "Reading the numbers": "Leer los números",
  "Tests & diagnostic reasoning": "Tests y razonamiento diagnóstico",
  "Screening programmes": "Programas de cribado",
  "Populations, exposure & risk": "Poblaciones, exposición y riesgo",
  "Drugs & drug safety": "Fármacos y su seguridad",
  "Mind & behaviour": "Mente y conducta",
  "Life & evolution": "Vida y evolución",
  "Data, computing & AI": "Datos, informática e IA",
  "Markets & incentives": "Mercados e incentivos",
  "Elections & policy": "Elecciones y políticas públicas",
  "Teaching & testing": "Enseñar y evaluar",
  "Investing & returns": "Inversión y rentabilidad",
  "Management & strategy": "Gestión y estrategia",
  "Courts & forensics": "Tribunales y ciencia forense",
  "Performance & records": "Rendimiento y récords",
  "The past & how we read it": "El pasado y cómo lo leemos",
  "News & the numbers in it": "Las noticias y sus números",

  // ==== Sesgo de espectro (puzle #8) ====
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "Este test de orina detecta el 92 % de las infecciones. Los síntomas de tu paciente son vagos. ¿Cómo de bueno es ahora?",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "Una tira reactiva para la infección urinaria, comprobada frente a urocultivos en un servicio de urgencias y en un centro de atención sin cita. Entre los pacientes cuyo médico ya creía probable una infección, detectó 49 de las 53 que había realmente. La sensibilidad se suele citar como un único número, como si fuera una propiedad fija del test.",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "En los pacientes en los que el médico cree improbable la infección, ¿con qué frecuencia detecta una infección real?",
  "Times the dipstick was right": "Veces que la tira reactiva acertó",
  "Doctor thought infection likely": "El médico creía probable la infección",
  "Likely": "Probable",
  "Doctor thought infection unlikely":
    "El médico creía improbable la infección",
  "Unlikely": "Improbable",
  "Patients who really had an infection":
    "Pacientes que sí tenían una infección",
  "Patients who did not": "Pacientes que no la tenían",
  "The quoted figure": "La cifra citada",
  "About the same, 92%": "Más o menos igual, 92 %",
  "the test has not changed": "el test no ha cambiado",
  "A little lower, around 80%": "Un poco menos, en torno al 80 %",
  "some drop off": "baja un poco",
  "Barely half, 56%": "Apenas la mitad, 56 %",
  "it misses most of them": "se le escapan la mayoría",
  "Barely half. And the other column flips the other way.":
    "Apenas la mitad. Y la otra columna se mueve en sentido contrario.",
  "The patients changed, not the test": "Cambiaron los pacientes, no el test",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "Los pacientes de los que su médico ya sospechaba tenían infecciones floridas, del tipo que una tira reactiva detecta con facilidad. Los pacientes en los que se creía improbable la infección tenían infecciones leves o incipientes, y al test se le escaparon la mayoría. Fíjate ahora en el segundo panel, el de los pacientes que no tenían ninguna infección: ahí el test acertó el 42 % de las veces en el primer grupo y el 78 % en el segundo. La sensibilidad y la especificidad no son propiedades de un test. Son propiedades de un test que se encuentra con una mezcla concreta de personas:",
  "Both groups": "Los dos grupos",
  "The spectrum": "El espectro",
  "How many in each group really had an infection":
    "Cuántos de cada grupo tenían realmente una infección",
  "Spectrum bias": "El sesgo de espectro",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "La fiabilidad de un test no es fija. Cambia con lo avanzada, lo típica y lo evidente que sea la enfermedad en los pacientes a los que se les hace la prueba.",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "Antes de fiarte de una sensibilidad citada, pregunta en quién se midió. Una cifra obtenida en pacientes con una enfermedad inconfundible favorecerá al test en una consulta llena de casos más leves, y un estudio que solo recluta casos de manual y voluntarios sanos lo favorecerá todavía más.",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "La sensibilidad es la proporción de personas realmente enfermas que un test detecta, y la especificidad es la proporción de personas sanas a las que descarta correctamente. Las dos se citan como si pertenecieran al test, igual que su precio. No es así. Un test capta una señal, y la señal es más fuerte en la enfermedad avanzada que en la incipiente, así que cuanto más graves estén los enfermos a los que haces la prueba, a más de ellos los encontrarás. La misma lógica funciona al revés con las personas que no tienen la enfermedad: cuanto más claramente sanas están, más fácilmente las descarta el test. Por eso un test evaluado con casos evidentes frente a no casos evidentes puede parecer magnífico y luego decepcionar en una consulta real, donde casi todo el mundo está en algún punto intermedio. De ahí salen dos hábitos prácticos. Lee la descripción de a quién se reclutó antes de leer las cifras de fiabilidad. Y desconfía sobre todo de un estudio cuyos grupos de enfermos y de sanos se eligieron por separado en lugar de ser pacientes consecutivos con el mismo motivo de consulta.",
  "The same test, sorted a different way":
    "El mismo test, clasificado de otra manera",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "El mismo estudio volvió a dividir a sus pacientes, esta vez según cuántos leucocitos se veían en la orina al microscopio. Cuando no se veía ninguno, la tira reactiva detectó 5 de las 10 infecciones reales. Cuando se veían unos pocos, detectó 15 de 22. Cuando había muchos, detectó las 34 de 34. Un solo test, las muestras de una tarde, y una sensibilidad de entre el 50 y el 100 por ciento según qué pacientes contaras.",
  "Why promising tests keep disappointing":
    "Por qué los tests prometedores siguen decepcionando",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "El problema recibió su nombre en 1978, tras una serie de tests nuevos que llegaban con una fiabilidad publicada excelente y luego dejaban fríos a los médicos que los usaban. Dos ejemplos de la época fueron el test del antígeno carcinoembrionario y el del nitroazul de tetrazolio. Los autores atribuyeron la decepción a dos cosas: una fiabilidad medida en una mezcla de pacientes mucho más estrecha que la de la práctica real, y el hecho de que el resultado del test y el diagnóstico verdadero no se juzgaran de forma independiente el uno del otro.",
  "Spectrum bias, a reasoning trap.":
    "El sesgo de espectro, una trampa de razonamiento.",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "La fiabilidad de un test suena a dato sobre el test, como la velocidad máxima de un coche. No lo es. Un test que detecta el 92 % de las infecciones en personas que están claramente enfermas puede detectar apenas la mitad en personas que solo están un poco enfermas, porque hay menos que encontrar. Siempre que te digan que un test es fiable al 95 %, la pregunta de verdad es en quién se midió eso y si esas personas se parecen en algo a ti.",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "Los recuentos son los de la tabla 3, página 137: 49 de 53 y 21 de 50 en el grupo de probabilidad previa alta, 10 de 18 y 188 de 241 en el de probabilidad previa baja. Una tira reactiva positiva significaba esterasa leucocitaria o nitritos o ambos; un cultivo positivo significaba más de 100 000 colonias por mililitro. La corrección señala que el grupo de probabilidad previa alta tiene 103 pacientes, no los 107 que sigue imprimiendo el resumen, y que las tasas ya se calcularon sobre 103 y se mantienen. El resumen impreso da además el intervalo de confianza del 0,56 como 0,03 a 0,79; la propia tabla del artículo da 0,31 a 0,79.",

  // ==== Sesgo de Berkson (puzle #9) ====
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "Entre los pacientes hospitalizados, los problemas de pulmón y los de articulaciones van juntos. ¿Están relacionadas las dos enfermedades?",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "Una encuesta llamó a las puertas y preguntó a miles de personas corrientes qué enfermedades tenían. Entre quienes habían estado en el hospital en los seis meses anteriores, una cuarta parte de las personas con una enfermedad respiratoria tenía también una enfermedad de los huesos o las articulaciones, frente a bastante menos de una décima parte del resto.",
  "Are these two diseases actually related?":
    "¿Están estas dos enfermedades realmente relacionadas?",
  "Also had a bone or joint disease":
    "Tenía también una enfermedad ósea o articular",
  "Had a respiratory disease": "Tenía una enfermedad respiratoria",
  "Lungs": "Pulmonar",
  "No respiratory disease": "Sin enfermedad respiratoria",
  "No lungs": "No pulmonar",
  "In hospital in the last 6 months": "En el hospital en los últimos 6 meses",
  "Everyone the survey asked": "Todas las personas encuestadas",
  "Hospital patients": "Pacientes hospitalizados",
  "Yes, one brings on the other": "Sí, una provoca la otra",
  "three times as common": "el triple de frecuente",
  "Yes, but the other way round": "Sí, pero al revés",
  "the joint disease comes first": "la enfermedad articular va primero",
  "No, the hospital made the link": "No, el vínculo lo creó el hospital",
  "it is about who gets admitted": "depende de quién ingresa",
  "Ask everyone, and the link disappears.":
    "Pregunta a todo el mundo y el vínculo desaparece.",
  "Two illnesses are two chances to be admitted":
    "Dos enfermedades son dos oportunidades de ingresar",
  "Hospital and community": "Hospital y comunidad",
  "The filter": "El filtro",
  "Berkson's bias": "El sesgo de Berkson",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "Estudiar solo a las personas que han pasado un filtro puede inventar una relación que fuera de él no existe.",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "El hospital es el filtro más evidente, y por eso los estudios de casos y controles construidos con pacientes hospitalizados se miran con recelo. Pero cualquier grupo seleccionado hace lo mismo: quienes respondieron a la encuesta, los usuarios que siguieron suscritos, los candidatos a los que se entrevistó. Pregúntate qué hizo falta para entrar en la muestra y si las dos cosas que comparas ayudan a entrar.",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "Supón que dos enfermedades no tienen ninguna relación entre sí y que cada una por su cuenta te da cierta probabilidad de ingresar en el hospital. Alguien con la mala suerte de tener las dos tiene dos oportunidades de ingresar, así que es mucho más probable que esté en la planta que alguien que solo tiene una. Ponte ahora dentro de la planta y cuenta. Las personas con la primera enfermedad están muy enriquecidas en la segunda, porque eso es justamente lo que metió allí a muchas de ellas. No has descubierto un vínculo entre las enfermedades. Has vuelto a descubrir la norma de ingreso y la has disfrazado de biología. La forma general de esto es un colisionador: algo hacia lo que apuntan dos causas. Seleccionar en función de él, ya sea estudiando solo a los ingresados, solo a los que se hicieron la prueba o solo a los que tuvieron éxito, une esas causas dentro de tus datos aunque en el mundo real no las una nada. La defensa es una muestra definida antes del filtro, y por eso mismo las encuestas poblacionales y los registros de población entera valen lo que cuestan.",
  "The bias that was theory for thirty years":
    "El sesgo que fue teoría durante treinta años",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "Joseph Berkson advirtió en 1946 de que las comparaciones basadas en pacientes de hospital podían fabricar asociaciones, pero su argumento era matemático y sus números estaban inventados para ilustrarlo. Señaló que el mismo artefacto aparecería si se muestrearan cartas barajadas en lugar de pacientes. Hubo que esperar a esta encuesta, tres décadas después, para que alguien demostrara el efecto en personas reales.",
  "Why early covid studies disagreed":
    "Por qué los primeros estudios sobre la covid se contradecían",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "En 2020, los estudios sobre quién contraía la covid y quién enfermaba gravemente solo podían reclutar entre las personas a las que se había hecho la prueba o que habían ingresado, y al principio esas eran sobre todo personal del hospital, gente ya enferma y personas mayores. Entrar en la muestra dependía justamente de aquello que se estaba estudiando. Los análisis mostraron que esto por sí solo podía producir factores de riesgo aparentes, e incluso invertir la dirección de uno real, sin ninguna biología detrás.",
  "Berkson's bias, a reasoning trap.":
    "El sesgo de Berkson, una trampa de razonamiento.",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "Mira solo a los pacientes hospitalizados y puede parecer que dos enfermedades sin ninguna relación entre sí van de la mano. El motivo no es la biología, es la puerta de entrada. Cualquiera de las dos enfermedades puede hacer que te ingresen, así que quienes tienen las dos están sobrerrepresentados dentro, y desde ahí dentro las dos parecen ligadas. Cualquier grupo filtrado hace lo mismo: las personas a las que se hizo la prueba, los candidatos a los que se entrevistó, los clientes que se quedaron. Antes de creerte un patrón, pregúntate qué hizo falta para entrar en los datos.",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "Los recuentos son los de la tabla 2: entrevistas domiciliarias a 2784 personas, de las cuales 257 habían estado en el hospital en los seis meses anteriores. Las odds relativas que da la propia tabla son de 1,06 en la población general y de 4,06 entre las personas hospitalizadas. Las cifras del hospital se apoyan en solo 20 personas con una enfermedad respiratoria, así que esta única tabla demuestra el mecanismo más que medir su tamaño con precisión.",

  // ==== Caza de trampas: espectro y Berkson ====
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "Un test rápido se valida en pacientes ingresados en el hospital con enfermedad grave y en donantes de sangre sanos. Separa a los dos grupos casi a la perfección, y el fabricante declara una sensibilidad del 98 %. Después se vende a los médicos de familia para pacientes con una tos leve.",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "Distinguir a quien está claramente enfermo de quien está claramente sano es la tarea más fácil que existe. Los pacientes de un médico de familia están todos en algún punto intermedio, y ahí es precisamente donde el test nunca se ha medido.",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "Un manual indica que una prueba de imagen tiene una sensibilidad del 90 %. Una consulta que atiende sobre todo casos precoces y leves la adopta y comprueba que se le escapa alrededor de un tercio de los casos que después confirman los especialistas. La consulta concluye que su máquina debe de estar averiada.",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "Una sensibilidad citada viene pegada a los pacientes en los que se midió. Una enfermedad más precoz y más leve le da al test menos que encontrar, así que una tasa de detección más baja es lo que cabe esperar, no la prueba de que la máquina esté estropeada.",
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "Un estudio de los pacientes ingresados en un hospital observa que quienes tienen una enfermedad metabólica presentan también una enfermedad de la vesícula biliar mucho más a menudo que el resto de los ingresados. Los autores concluyen que la primera enfermedad provoca la segunda.",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "Cualquiera de las dos enfermedades por sí sola puede llevar a alguien a una cama de hospital, así que los pacientes que tienen las dos están sobrerrepresentados entre los ingresados. Puede que el vínculo solo exista dentro del edificio.",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "Alguien se da cuenta de que, entre las personas con las que ha salido, las más guapas eran sistemáticamente peor compañía. Concluye que la belleza estropea el carácter.",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "En general se acepta una cita porque alguien es guapo o porque es buena compañía. Seleccionar en función de eso impone dentro de la muestra un compromiso entre las dos cosas, sea cual sea la relación que haya fuera de ella.",
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "Un test diagnóstico se evalúa en todos los pacientes consecutivos que acuden a una consulta por el mismo motivo, sea cual sea su diagnóstico final, y el artículo informa de su fiabilidad por separado para la enfermedad leve y para la avanzada. Otra consulta con un tipo de pacientes parecido adopta esas cifras.",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "Así es como debe construirse un estudio diagnóstico. Pacientes consecutivos con un mismo motivo de consulta, y la fiabilidad desglosada por gravedad, para que quien lo lea pueda encontrar el subgrupo que de verdad se parece a sus propios pacientes.",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "Una empresa se pregunta si dos características de sus usuarios van juntas. Toma una muestra al azar de todas las personas que abrieron una cuenta alguna vez, incluidas las que no volvieron nunca y las que se dieron de baja, y no encuentra ninguna relación entre ellas.",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "La muestra se extrajo antes de cualquier filtro en el que hubiera podido influir cualquiera de las dos cosas. Ni quedarse, ni tener éxito, ni ser admitido decidió a quién se contaba, así que no puede esconderse ahí un artefacto de selección.",

  // ==== Corrección: sesgo de Berkson (odds de 1,06 frente a 1) ====
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "La misma encuesta, las mismas personas, las mismas dos enfermedades. Entre todas las personas a las que preguntó, las que tenían una enfermedad respiratoria tenían apenas algo más de probabilidad de tener una enfermedad ósea o articular que las que no la tenían, y las odds quedan en 1,06 frente a 1, que no es nada. El panel del hospital no es un hallazgo sobre la enfermedad, es un hallazgo sobre el ingreso. Cualquiera de las dos enfermedades puede llevarte a una cama de hospital, así que las personas que tienen las dos aparecen allí mucho más a menudo que las que tienen una sola, y dentro de esas paredes las dos parecen inseparables:",

  // ==== Riesgo relativo frente a absoluto (estatinas, puzle #10) ====
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "Un fármaco reduce en torno a un tercio tu riesgo de infarto. ¿A cuántas personas ayuda eso?",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "Un ensayo dio a 6595 hombres de mediana edad con el colesterol alto y sin antecedentes de problemas de corazón una estatina o una pastilla falsa, y los siguió durante unos cinco años. El fármaco redujo los infartos y las muertes coronarias en torno a un tercio. Es un resultado real, y así fue como se comunicó el hallazgo.",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "De cada 1000 hombres que lo tomaron durante cinco años, ¿cuántos se libraron de un infarto o de una muerte coronaria?",
  "A five-year statin trial in 6,595 men":
    "Un ensayo de cinco años con estatina en 6595 hombres",
  "Heart attack or death from heart disease":
    "Infarto o muerte por enfermedad cardíaca",
  "Dummy pill": "Pastilla falsa",
  "Statin": "Estatina",
  // etiquetas de alcance (a la derecha del pie de figura)
  "Compared to the risk": "Frente al riesgo",
  "Compared to the people": "Frente a las personas",
  // pies de las cifras grandes (nunca dentro de una frase)
  "of the risk removed": "de reducción del riesgo",
  "spared, in every 1,000 men treated for five years":
    "hombres que se libran, por cada 1000 tratados durante cinco años",
  "men treated for five years to spare one":
    "hombres tratados durante cinco años para que uno se libre",
  // opciones
  "About 300": "Unos 300",
  "roughly a third of them": "más o menos un tercio de ellos",
  "About 100": "Unos 100",
  "one in ten": "uno de cada diez",
  "About 23": "Unos 23",
  "roughly 1 in 44": "más o menos 1 de cada 44",
  // revelación y lección
  "Twenty three men in a thousand.": "Veintitrés hombres de cada mil.",
  "A third of a risk that was small to begin with":
    "Un tercio de un riesgo que ya era pequeño de entrada",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "Los dos números salen del mismo ensayo. Sin el fármaco, unos 75 hombres de cada 1000 tuvieron un infarto o murieron por una enfermedad cardíaca a lo largo de los cinco años. Con él, unos 53. Eso es un tercio del riesgo que desaparece, y son también 23 hombres de cada 1000. El primer número se divide por el riesgo, el segundo por las personas, y esa es toda la razón de que resulten tan distintos. Dicho al revés, 44 hombres tuvieron que tomar el fármaco durante cinco años para que uno de ellos se librara:",
  "A third of what?": "¿Un tercio de qué?",
  "Relative versus absolute risk": "Riesgo relativo frente a riesgo absoluto",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "Una reducción porcentual te dice qué parte de un riesgo desapareció. No puede decirte cómo de grande era ese riesgo, y esa es justamente la parte que decide si tiene importancia para ti.",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "Siempre que te encuentres con un cambio porcentual, pregúntate de qué es ese porcentaje. Reducir a la mitad un riesgo de uno entre un millón y reducir a la mitad un riesgo de uno entre dos dan el mismo titular y significan cosas completamente distintas. Las dos cifras que merece la pena pedir son la diferencia en número de personas y cuántas hay que tratar para que una de ellas se beneficie.",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "Toma un riesgo de 8 de cada 100 y bájalo a 5 de cada 100. Divide la bajada por el riesgo y obtienes un tercio, que suena a mucho. Divide esa misma bajada por las personas y obtienes 3 de cada 100, que suena a muy poco. Ninguna de las dos cuentas está mal. Responden a preguntas distintas: qué fracción del peligro se ha eliminado, y qué probabilidad hay de que esto me ayude a mí. Solo la segunda habla de ti. La distancia entre ambas crece a medida que el riesgo se encoge, y por eso las cifras relativas más impresionantes suelen venir de los desenlaces más raros. Y esto no es solo un problema de los medios. Las cifras relativas también hacen que los tratamientos parezcan mejores a los médicos, y un mismo resultado de un ensayo despierta más entusiasmo cuando se describe en términos relativos que cuando se describe en personas enteras. Con los daños funciona igual pero al revés: un susto expresado como un riesgo que se duplica suena alarmante tanto si el riesgo pasó de 1 de cada 10 a 2 de cada 10 como si pasó de 1 de cada 100 000 a 2 de cada 100 000. La costumbre que te protege en las dos direcciones es exigir los números sobre un grupo fijo de personas, y cuántas hay que tratar, o exponer, para que una se vea afectada.",
  // ejemplos
  "The same kind of drug, in people at real risk":
    "El mismo tipo de fármaco, en personas con riesgo real",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "Un segundo ensayo dio una estatina a pacientes que ya habían tenido un infarto o tenían angina de pecho. Los eventos coronarios mayores bajaron del 28 por ciento al 19 por ciento. Como cifra relativa eso es alrededor de un tercio, casi el mismo titular que en los hombres sanos. Pero como el riesgo sobre el que actuaba era casi cuatro veces mayor, la ganancia fue de unos 9 pacientes de cada 100 en lugar de 2. Titular idéntico, varias veces el beneficio. Por eso un porcentaje por sí solo no puede decirte si merece la pena tomar un fármaco, y por eso la respuesta cambia de un paciente a otro.",
  "When a relative figure did real damage":
    "Cuando una cifra relativa hizo daño de verdad",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "En octubre de 1995, un comité de seguridad británico advirtió de que algunas píldoras anticonceptivas conllevaban alrededor del doble de riesgo de un coágulo de sangre. La advertencia circuló como una duplicación, sin ninguna idea de lo pequeño que era el riesgo en un caso y en el otro, y las mujeres dejaron de tomar la píldora. Entre las menores de 16 años, el uso cayó del 40 por ciento al 27 por ciento en un año. El sistema sanitario asumió unos 21 millones de libras en costes de maternidad adicionales y 46 millones de libras en la prestación de abortos. Una cifra relativa sin una cifra absoluta al lado no es una manera neutral de describir un riesgo.",
  "The fix is in the wording": "El remedio está en la redacción",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "Describe el mismo resultado en personas enteras, tantos de cada 1000 frente a tantos de cada 1000, y tanto los pacientes como los médicos lo juzgan con mucha más precisión que cuando llega en forma de reducción porcentual. Los riesgos relativos pertenecen a una pequeña familia de formatos que confunden de manera fiable, junto a las probabilidades de un solo suceso y a las condicionales, como la sensibilidad de un test. Ninguno de ellos es erróneo. Solo son fáciles de malinterpretar, y hay una manera más clara de decir lo mismo.",
  // tarjeta y procedencia
  "Relative versus absolute risk, a reasoning trap.":
    "Riesgo relativo frente a riesgo absoluto, una trampa de razonamiento.",
  "\"Cuts your risk by a third\" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.":
    "«Reduce tu riesgo en un tercio» suena enorme. Pero ¿un tercio de qué? Si el riesgo era de 75 de cada 1000, un tercio son 23 personas. Si el riesgo era de 3 de cada 1000, un tercio es una. El porcentaje te dice cuánto riesgo desapareció y no dice absolutamente nada sobre cuánto riesgo había, que es la parte que decide si tiene importancia para ti. Pide los números sencillos: cuántos de cada 1000, y cuántas personas tienen que tomarlo para que una de ellas se beneficie.",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "Los recuentos corresponden al criterio de valoración principal del ensayo, un infarto no mortal confirmado o la muerte por enfermedad coronaria: 248 eventos entre los hombres con placebo y 174 entre los que tomaban pravastatina, a lo largo de una media de 4,9 años. El artículo comunica una reducción del riesgo relativo del 31 por ciento, estimada con un modelo de riesgos proporcionales; los recuentos brutos dan un 30 por ciento. Todas las cifras que muestra este puzle se derivan de los recuentos, así que habla de alrededor de un tercio en lugar de dar un número que el gráfico contradiría.",

  // ==== Caza de trampas: riesgo relativo frente a absoluto ====
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "Una nota de prensa dice que un fármaco nuevo reduce a la mitad el riesgo de una complicación rara. No dice cómo de frecuente es la complicación. Un periódico publica la noticia con el titular de que el fármaco reduce el peligro a la mitad.",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "Reducir un riesgo a la mitad no significa nada hasta que sabes cuál era el riesgo. Si la complicación afecta a 2 personas de cada 10 000, reducirla a la mitad libra a una de ellas.",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "Un suplemento se anuncia como capaz de reducir un 40 % la probabilidad de un cáncer concreto. El ensayo en el que se apoya encontró 7 casos entre unas 1000 personas que tomaban el suplemento y 12 entre unas 1000 que tomaban una pastilla falsa.",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "El 40 % es aritméticamente correcto y equivale a 5 personas de cada 1000. Unas 200 personas tendrían que tomar el suplemento durante años para que una de ellas evitara un cáncer.",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "Un ensayo informa de que el tratamiento redujo los ictus de 12 de cada 100 pacientes a 8 de cada 100, lo llama una reducción de un tercio y añade que hay que tratar a unos 25 pacientes durante cinco años para evitar un ictus.",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "La cifra relativa, el número de personas y el número necesario a tratar están todos sobre la mesa, así que no hay nada escondido detrás del porcentaje. Así es como debería comunicarse un resultado.",

  // ==== Confusión por indicación (digoxina, ensayo DIG, puzle #11) ====
  "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?":
    "Los pacientes que tomaban este fármaco para el corazón murieron más a menudo que los que no lo tomaban. ¿Los está matando el fármaco?",
  "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.":
    "6800 personas con insuficiencia cardíaca. Cuando entraron en el ensayo, algunas ya tomaban digoxina porque un médico había decidido prescribírsela, y otras no. En los años siguientes murió el 40 por ciento de quienes ya la tomaban, frente al 31 por ciento del resto.",
  "Is digoxin causing those extra deaths?":
    "¿Está causando la digoxina esas muertes de más?",
  // etiquetas del gráfico
  "Died during the trial": "Murieron durante el ensayo",
  "On digoxin": "Con digoxina",
  "Digoxin": "Digoxina",
  "Not on digoxin": "Sin digoxina",
  "Not on it": "Sin ella",
  "Sorted by what doctors prescribed":
    "Clasificados según lo que prescribieron los médicos",
  "Sorted by the trial's coin flip":
    "Clasificados según el cara o cruz del ensayo",
  "As prescribed in practice": "Según la prescripción real",
  // opciones
  "Yes, the drug is harming them": "Sí, el fármaco les está haciendo daño",
  "nine points worse": "nueve puntos peor",
  "No, and adjusting for severity will show that":
    "No, y el ajuste por gravedad lo demostrará",
  "the statistics can correct it": "la estadística puede corregirlo",
  "No, and adjusting will not fix it either":
    "No, y el ajuste tampoco lo arregla",
  "the prescription marks the patient": "la prescripción marca al paciente",
  // revelación y lección
  "The same 6,800 patients, sorted by a coin flip. No difference.":
    "Los mismos 6800 pacientes, clasificados a cara o cruz. Ninguna diferencia.",
  "The prescription marked how ill they already were":
    "La prescripción marcaba lo enfermos que ya estaban",
  "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:":
    "Son las mismas personas en los dos paneles, agrupadas de dos maneras distintas. Clasificadas según lo que habían decidido sus médicos, la digoxina parece letal. Clasificadas según la asignación aleatoria del ensayo, en la que no intervino ningún juicio clínico, los dos grupos mueren a la misma tasa. Los médicos recurrían a la digoxina en los pacientes que ya estaban peor, así que la prescripción llevaba dentro información sobre el paciente que nada en el conjunto de datos había registrado:",
  "Both ways of sorting": "Las dos clasificaciones",
  "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.":
    "Ajustar por 27 características basales registradas apenas lo movió: el exceso pasó del 36 por ciento al 22 por ciento. Y ese mismo exceso apareció entre los pacientes que el ensayo había aleatorizado a placebo, personas que durante el ensayo no tomaron nada de digoxina. Un fármaco no puede dañar a quienes nunca lo recibieron, así que el exceso nunca fue el fármaco.",
  "The reason for the prescription": "El motivo de la prescripción",
  "Confounding by indication": "La confusión por indicación",
  "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.":
    "Cuando un médico decide quién recibe un tratamiento, los tratados se diferencian de los no tratados en cosas que los datos nunca registraron, y el tratamiento carga con la culpa, o con el mérito, del motivo por el que se dio.",
  "This is why observational comparisons between treated and untreated patients are read so warily, and why \"we adjusted for that\" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.":
    "Por eso las comparaciones observacionales entre pacientes tratados y no tratados se leen con tanto recelo, y por eso «lo hemos ajustado» no zanja la discusión. El ajuste solo puede eliminar lo que quedó escrito. El juicio que llevó a la prescripción casi nunca lo estuvo.",
  "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.":
    "Los tratamientos no se reparten al azar. Un médico prescribe por algo que ve en el paciente: está más enfermo, o más frágil, o sus síntomas son peores. Ese algo influye además en cómo le iba a ir de todos modos. Así que el grupo tratado parte de una situación distinta, y cualquier comparación con los no tratados mide a la vez el fármaco y el motivo por el que se eligió, enredados el uno con el otro. Funciona en las dos direcciones. Un fármaco que se da a los más graves parece dañino; un fármaco que se da a los que están mejor, o que solo pueden recibir los pacientes con fuerzas suficientes para acudir a una consulta, parece milagroso. La defensa habitual es ajustar por las diferencias, y ayuda, pero solo por las diferencias que a alguien se le ocurrió registrar. La impresión del clínico de que este paciente en concreto iba cuesta abajo es información real, es el motivo de que la prescripción ocurriera, y casi nunca está en el conjunto de datos. Esa es toda la razón de que los ensayos aleatorizados valgan lo que cuestan: el cara o cruz no puede saber nada del paciente, así que no puede colar ese motivo dentro de la comparación. Cuando un ensayo y un estudio observacional discrepan sobre el mismo fármaco, este suele ser el porqué.",
  // ejemplos
  "Taking your pills predicts survival, even when they are dummies":
    "Tomarse las pastillas predice la supervivencia, incluso cuando son falsas",
  "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.":
    "Un ensayo anterior dividió a sus pacientes según lo fielmente que se habían tomado las pastillas. Quienes tomaron al menos el 80 por ciento tuvieron una mortalidad a cinco años del 15,0 por ciento frente al 24,6 por ciento del resto, lo que parece la prueba de que el fármaco funciona si de verdad te lo tomas. Después los investigadores hicieron la misma división dentro del grupo de placebo, donde las pastillas no contenían nada: 15,1 por ciento frente a 28,2 por ciento. Ajustar por 40 características registradas estrechó esa diferencia hasta 16,4 frente a 25,8 y la dejó igual de abrumadora. Sea lo que sea lo que la adherencia marca de una persona, no era el medicamento.",
  "The same argument, about a procedure":
    "El mismo argumento, con un procedimiento",
  "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.":
    "En un estudio con 5735 pacientes críticos, quienes recibieron un catéter introducido hasta el lado derecho del corazón murieron más a menudo en los 30 días siguientes que quienes no lo recibieron: 38,0 por ciento frente a 30,6 por ciento. El procedimiento se reservaba para los pacientes en peor estado. Cuando después se puso a prueba aleatorizando a quién se le colocaba, la mortalidad salió del 62 por ciento con catéter y del 60 por ciento sin él, en un ensayo cuyos pacientes estaban todavía más graves. La diferencia que parecía un daño era sobre todo una diferencia en a quién se elegía.",
  // tarjeta y procedencia
  "Confounding by indication, a reasoning trap.":
    "La confusión por indicación, una trampa de razonamiento.",
  "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.":
    "Nadie reparte los medicamentos al azar. Los médicos prescriben por algo que ven en el paciente, y ese algo suele influir en cómo le iba a ir de todos modos. Así que las personas que toman un fármaco pueden morir más a menudo que las que no lo toman mientras el fármaco no hace absolutamente nada: se les dio a quienes ya estaban peor. Ajustar por las diferencias ayuda, pero solo por las diferencias que alguien anotó, y el motivo de la prescripción rara vez es una de ellas. Por eso vale tanto el cara o cruz.",
  "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.":
    "Los cuatro recuentos de muertes están impresos en el artículo de 2019, y los tamaños de los brazos aleatorizados en el informe del ensayo de 1997. Los dos denominadores de la prescripción real no están impresos en ninguna parte: 3017 es la suma de los dos recuentos de uso previo de digoxina del material suplementario (1498 y 1519) y 3783 es el resto de los 6800. Eso es una suma de números enteros publicados y no una cifra deducida hacia atrás a partir de un porcentaje, y cuadra en las dos direcciones: 1207 más 1168 y 1181 más 1194 dan los dos 2375 muertes, y las dos parejas de denominadores dan 6800 pacientes.",

  // ==== Caza de trampas: confusión por indicación y repaso ====
  "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.":
    "Un hospital revisa sus registros y observa que los pacientes a los que se dio un determinado soporte respiratorio murieron mucho más a menudo que los pacientes a los que no. Un comité recomienda usarlo menos.",
  "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.":
    "El soporte se dio a los pacientes que tenían dificultad para respirar. Está haciendo de sustituto de lo enfermos que ya estaban, y los registros no pueden separar el tratamiento del motivo por el que se recurrió a él.",
  "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.":
    "Un estudio observacional encuentra una mortalidad más alta entre los pacientes que toman un fármaco. Los autores ajustan por edad, sexo, presión arterial y doce valores de laboratorio, el exceso se encoge un poco pero se mantiene, y concluyen que el fármaco es dañino.",
  "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.":
    "El ajuste solo puede eliminar lo que se registró. La sensación del clínico de que este paciente estaba empeorando es justamente el motivo de que se prescribiera el fármaco, y no está entre los doce valores de laboratorio.",
  "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.":
    "Una auditoría nacional observa que los pacientes operados en hospitales locales pequeños sobreviven más a menudo que los operados en grandes hospitales universitarios. Desglosado según la gravedad del caso, los hospitales universitarios quedan por delante en todas las categorías.",
  "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.":
    "Los hospitales universitarios se quedan con los casos difíciles, así que su cifra combinada la arrastra hacia abajo una composición de casos que nadie eligió al azar. Ser mejor en todas las franjas de gravedad y peor en total es la firma de eso.",
  "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.":
    "Un test genético para una afección que se da en alrededor de 1 de cada 5000 personas es fiable al 99,9 %. Una consulta dice a todas las personas que dan positivo en el cribado que el diagnóstico está prácticamente confirmado.",
  "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.":
    "Incluso con un 99,9 %, los errores superan en número a los casos reales cuando la afección es así de rara. Entre 100 000 personas unas 20 la tienen, y unas 100 personas sanas dan positivo también, así que un positivo acierta más o menos una de cada seis veces.",
  "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.":
    "Un cirujano informa de unos resultados excelentes a largo plazo en los pacientes atendidos en la consulta de seguimiento a los cinco años. Los pacientes que se mudaron, dejaron de acudir o murieron antes de los cinco años no están en la serie.",
  "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.":
    "La serie la definió quién seguía apareciendo. Los pacientes a los que peor les fue son precisamente los que con más probabilidad faltan en ella, así que los resultados describen a los supervivientes más que a la operación.",
  "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.":
    "Los hospitales que usan más un determinado aparato de monitorización tienen tasas de mortalidad más bajas. El folleto del fabricante concluye que comprar el aparato salva vidas.",
  "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.":
    "Los hospitales que pueden permitirse más monitores suelen poder permitirse más de todo lo demás, incluido el personal. El aparato puede ser un indicador de un hospital bien dotado y no la causa de sus resultados.",
  "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.":
    "Una reacción rara aparece en alrededor de 1 de cada 50 000 personas que toman un fármaco. Un paciente la sufre, y un informe concluye que solo hay una probabilidad de 1 entre 50 000 de que el fármaco no fuera el responsable.",
  "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.":
    "Eso le da la vuelta a la pregunta. El 1 de cada 50 000 es la frecuencia con la que aparece la reacción entre las personas que toman el fármaco, no la probabilidad de que el fármaco causara este caso. Para responder a eso hace falta saber con qué frecuencia ocurre lo mismo en personas que nunca lo tomaron.",
  "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.":
    "Un ensayo informa del desenlace que había registrado de antemano como principal, indica que midió otros once y dice con claridad que el éxito se juzgó solo con el desenlace registrado.",
  "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.":
    "Nombrar el desenlace antes de ver los datos, y comunicar después todos ellos, es lo que impide que un estudio ascienda calladamente la medida que por casualidad salió bien.",
  "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.":
    "Un estudio de cohortes vincula una exposición con una enfermedad. Informa de que la asociación sobrevivió al ajuste por los factores de confusión nombrados de antemano, de que a más exposición correspondía más enfermedad y de que dos cohortes independientes de otros lugares encontraron el mismo patrón.",
  "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.":
    "Ninguna de estas cosas por sí sola zanja la causalidad, pero juntas son lo que hace que un hallazgo observacional merezca tomarse en serio: un plan previo, un patrón de dosis y respuesta, y la replicación en poblaciones que no comparten las mismas peculiaridades.",
  "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.":
    "Un ordenador asigna a los pacientes a un fármaco o a una pastilla falsa, sin que ni ellos ni su médico sepan cuál. Las muertes se cuentan en todas las personas asignadas, tomaran después lo que tomaran. Al grupo del fármaco le va un poco mejor.",
  "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.":
    "El cara o cruz no sabe nada del paciente, así que no puede colar el motivo del tratamiento dentro de la comparación. Contar a todo el mundo según la asignación mantiene esa protección incluso cuando algunas personas dejan de tomarse las pastillas.",
  "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.":
    "Una consulta compara sus resultados con una referencia nacional, ajusta por la gravedad de la enfermedad de sus pacientes y publica las cifras brutas y las ajustadas una al lado de la otra, junto con la composición de casos por la que ajustó.",
  "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.":
    "Enseñar las dos cifras y la composición que hay detrás es lo honesto. Quien lo lea puede ver cuánto de la diferencia era la composición de casos y cuánto sobrevivió a tenerla en cuenta, en lugar de recibir solo la que favorece.",

  // ==== Sesgo de duración (Mayo Lung Project, puzle #12) ====
  "Screened men whose lung cancer was found died of it less often. Did the screening save them?":
    "Los hombres cribados a los que se detectó un cáncer de pulmón murieron de él con menos frecuencia. ¿Los salvó el cribado?",
  "9,211 male smokers were randomly assigned either to chest x-rays and sputum tests every four months for six years, or to usual care, and followed for two decades. Among the men who were diagnosed with lung cancer, 65 percent of the intensively screened died of it, against 74 percent of the others.":
    "9211 fumadores varones se asignaron al azar a radiografías de tórax y análisis de esputo cada cuatro meses durante seis años, o a la atención habitual, y se les siguió durante dos décadas. Entre los hombres a los que se diagnosticó un cáncer de pulmón, murió de él el 65 por ciento de los cribados de forma intensiva, frente al 74 por ciento del resto.",
  "Did the extra screening save lives?": "¿Salvó vidas el cribado adicional?",
  "Died of lung cancer": "Murieron de cáncer de pulmón",
  "Screened every four months": "Cribados cada cuatro meses",
  "Screened": "Cribados",
  "Usual care": "Atención habitual",
  "Among the men diagnosed with lung cancer":
    "Entre los hombres diagnosticados de cáncer de pulmón",
  "Among everyone in the trial": "Entre todas las personas del ensayo",
  "Among the diagnosed": "Entre los diagnosticados",
  "Yes, fewer of them died of it": "Sí, murieron menos por ese cáncer",
  "65% against 74%": "65 % frente a 74 %",
  "Too early to say": "Es demasiado pronto para saberlo",
  "the follow-up is too short": "el seguimiento es demasiado corto",
  "No, count everyone and it vanishes": "No, cuenta a todos y desaparece",
  "the cases changed, not the deaths": "cambiaron los casos, no las muertes",
  "Count everyone, and the screened arm did no better.":
    "Cuenta a todos y al brazo cribado no le fue mejor.",
  "Screening changed who counted as having cancer":
    "El cribado cambió quién contaba como enfermo de cáncer",
  "The screened men were diagnosed far more often, 206 against 160, in a trial that split them evenly. The extra cancers were not a random sample of the disease. A test applied every few months catches the slow-growing tumours, because slow ones sit in the detectable stage for years waiting to be found, while fast ones surface between visits. Slow tumours also do better whatever you do, and some would never have surfaced at all. Those cases join the pool of people with lung cancer and survive it, so the share dying falls. Nobody was saved:":
    "A los hombres cribados se les diagnosticó mucho más a menudo, 206 frente a 160, en un ensayo que los repartió a partes iguales. Los cánceres de más no eran una muestra al azar de la enfermedad. Un test que se aplica cada pocos meses detecta los tumores de crecimiento lento, porque los lentos se quedan años en la fase detectable esperando a que los encuentren, mientras que los rápidos afloran entre una visita y otra. A los tumores lentos les va además mejor se haga lo que se haga, y algunos no habrían aflorado nunca. Esos casos se suman al conjunto de personas con cáncer de pulmón y lo sobreviven, así que la proporción que muere baja. No se salvó a nadie:",
  "Both ways of counting": "Las dos maneras de contar",
  "Three effects travel together here and this trial cannot separate them: the slow cases are caught preferentially (length-time), the clock starts earlier for those caught (lead-time), and some tumours found would never have caused harm (overdiagnosis). All three flatter the diagnosed group and none of them postpones a death. The number that stayed honest is deaths among everyone randomised, and it did not fall.":
    "Aquí viajan juntos tres efectos y este ensayo no puede separarlos: los casos lentos se detectan de forma preferente (sesgo de duración), el reloj arranca antes para los detectados (anticipación diagnóstica) y algunos de los tumores encontrados nunca habrían causado daño (sobrediagnóstico). Los tres adornan al grupo diagnosticado y ninguno retrasa una muerte. El número que se mantuvo honesto son las muertes entre todos los aleatorizados, y no bajó.",
  "Who became a case": "Quién se convertía en caso",
  "Length-time bias": "El sesgo de duración",
  "Screening does not sample disease fairly. It catches the slow-growing kind preferentially, and the slow kind was always going to do better, so screen-detected cases flatter the test.":
    "El cribado no muestrea la enfermedad de forma justa. Detecta de forma preferente la de crecimiento lento, y a la lenta siempre le iba a ir mejor, así que los casos detectados por cribado favorecen al test.",
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening.":
    "Siempre que se defienda un programa de cribado con lo bien que les va a los casos que detecta, pregúntate qué tipo de enfermedad puede detectar un test periódico. Un tumor que tarda años en manifestarse está disponible para que lo encuentren en muchas visitas; uno que pasa de nada a síntomas en tres meses no lo está en casi ninguna. La única pregunta justa es si bajan las muertes entre todas las personas a las que se ofrece el cribado.",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not.":
    "Imagina la misma enfermedad llegando a dos velocidades. Los tumores lentos pasan años en la ventana en la que un test podría encontrarlos pero el paciente no nota nada. Los rápidos cruzan esa ventana en semanas. Muestrea ahora a la población cada seis meses. Encontrarás casi todos los lentos y casi ninguno de los rápidos, porque los rápidos se anuncian entre una visita y otra. Así, el montón de casos detectados por cribado está cargado de enfermedad indolente, y el montón de casos detectados por los síntomas está cargado de enfermedad agresiva, antes incluso de que el tratamiento entre en la historia. Compara sus desenlaces y el cribado parece maravilloso. En el extremo de todo esto está el sobrediagnóstico: una enfermedad tan lenta que nunca habría molestado a esa persona en toda su vida, que cuenta como un cáncer encontrado y curado mientras solo hace daño a través del tratamiento. La defensa es la misma que vence al sesgo de anticipación diagnóstica, y es el motivo de que los programas de cribado se juzguen como se juzgan: aleatoriza a quién se invita y cuenta después las muertes en todos los invitados, acudieran o no, se les diagnosticara o no.",
  "The trial's own explanation": "La explicación del propio ensayo",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "Los autores no atribuyeron la diferencia a un mejor tratamiento. Señalaron que una mortalidad parecida junto a una mejor supervivencia apunta a que en el brazo cribado se estaban encontrando lesiones de escasa relevancia clínica. Veinte años de seguimiento no rescataron el resultado: las muertes por cáncer de pulmón fueron 337 entre 4607 hombres cribados y 303 entre otros 4585, una diferencia en la dirección equivocada y sin significación estadística.",
  "Why screening is judged on deaths, not survival":
    "Por qué el cribado se juzga por las muertes, no por la supervivencia",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "Esto no es una curiosidad histórica. Los programas nacionales de cribado se evalúan según si bajan las muertes por la enfermedad en toda la población invitada, precisamente porque la supervivencia entre los casos detectados puede subir por tres artefactos distintos sin que se alargue ni una sola vida. Un programa que sube la supervivencia a cinco años y deja intacta la mortalidad no ha hecho, según los datos, más que ponerle la etiqueta a más gente.",
  "Length-time bias, a reasoning trap.":
    "El sesgo de duración, una trampa de razonamiento.",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.":
    "Un test que se hace cada pocos meses encuentra la enfermedad de crecimiento lento mucho más fácilmente que la de crecimiento rápido, porque la lenta se queda ahí años esperando a que la encuentren mientras que la rápida estalla entre una visita y otra. La enfermedad lenta tiene además mejor pronóstico haga lo que haga nadie. Así que los casos que detecta un programa de cribado son los mansos, les va bien, y el programa se lleva el mérito. El único número que no se puede manipular así son las muertes entre todas las personas a las que se ofrece el cribado, acudieran o no.",
  "Table 3 prints the usual-care case count as 106, which is a typographic error; the correct figure is 160, and this puzzle uses 160. The paper says so itself six times over: the body text on page 1310, the Figure 2 curve label, Table 3's own percentages (119 of 160 printed as 74 percent, 156 of 160 as 98 percent), and the totals of Tables 4 and 5. With 106 the lung-cancer deaths alone would outnumber the cohort. Note also that this trial compared two screening intensities rather than screening against none, and that it cannot separate length-time bias from lead-time bias and overdiagnosis, which is why the lesson names all three.":
    "La tabla 3 imprime el recuento de casos de la atención habitual como 106, lo que es una errata; la cifra correcta es 160, y este puzle usa 160. El propio artículo lo dice hasta seis veces: el texto de la página 1310, la etiqueta de la curva de la figura 2, los porcentajes de la propia tabla 3 (119 de 160 impreso como 74 por ciento, 156 de 160 como 98 por ciento) y los totales de las tablas 4 y 5. Con 106, solo las muertes por cáncer de pulmón ya superarían en número a la cohorte. Ten en cuenta además que este ensayo comparó dos intensidades de cribado y no el cribado frente a ninguno, y que no puede separar el sesgo de duración del sesgo de anticipación diagnóstica y del sobrediagnóstico, y por eso la lección nombra los tres.",

  // ==== Sesgo de publicación (antidepresivos, Turner 2008, puzle #13) ====
  "Read the journals and almost every trial of these drugs worked. How many actually did?":
    "Lee las revistas y casi todos los ensayos de estos fármacos funcionaron. ¿Cuántos funcionaron de verdad?",
  "Twelve antidepressants, and every trial run to get them approved had to be registered with the American regulator before it began. That registry is the rare thing in medicine: a complete list, including the trials nobody ever wrote up. Go to the medical journals instead and you find 51 published trials, of which 48 read as positive.":
    "Doce antidepresivos, y todos los ensayos realizados para conseguir su aprobación tuvieron que registrarse ante la agencia reguladora estadounidense antes de empezar. Ese registro es algo raro en medicina: una lista completa, incluidos los ensayos que nadie llegó a redactar nunca. Ve en cambio a las revistas médicas y encontrarás 51 ensayos publicados, de los cuales 48 se leen como positivos.",
  "Out of all 74 trials that were actually run, how many did the regulator judge positive?":
    "De los 74 ensayos que realmente se hicieron, ¿cuántos consideró positivos la agencia reguladora?",
  "Trials that read as positive": "Ensayos que se leen como positivos",
  "As the journals tell it": "Según lo cuentan las revistas",
  "Journals": "Revistas",
  "As the full registry tells it": "Según lo cuenta el registro completo",
  "Registry": "Registro",
  "Trials of twelve antidepressants": "Ensayos de doce antidepresivos",
  "The published literature": "La literatura publicada",
  "Nearly all of them": "Casi todos",
  "the journals are the evidence": "las revistas son la evidencia",
  "About two thirds": "Alrededor de dos tercios",
  "some trials always fail": "algunos ensayos siempre fallan",
  "38 of the 74": "38 de los 74",
  "Half. A coin flip, printed as a near-certainty.":
    "La mitad. Un cara o cruz, impreso como una casi certeza.",
  "The failures were filtered out on the way to the journals":
    "Los fracasos se filtraron por el camino hacia las revistas",
  "The regulator judged 38 of the 74 trials positive and 36 not. Of those 36, twenty two were never published at all. Eleven more did reach print, but reading as a positive result. So a doctor searching the literature finds 48 positive trials out of 51 and concludes the case is overwhelming, when the complete record says it was close to even:":
    "La agencia reguladora consideró positivos 38 de los 74 ensayos y no positivos los otros 36. De esos 36, veintidós no se publicaron nunca. Otros once sí llegaron a la imprenta, pero leyéndose como un resultado positivo. Así, un médico que busque en la literatura encuentra 48 ensayos positivos de 51 y concluye que el caso es abrumador, cuando el registro completo dice que estaba casi empatado:",
  "Journals against the registry": "Las revistas frente al registro",
  "Two of those judgements belong to different people, and it matters. Positive or negative was the regulator's own decision on the outcome each trial had promised to measure in advance. The reading that eleven publications conveyed a positive result was the study authors' assessment, not the regulator's, and they said so. What is not a matter of opinion is the twenty two that never appeared.":
    "Dos de esos juicios pertenecen a personas distintas, y eso importa. Positivo o negativo era la decisión de la propia agencia reguladora sobre el desenlace que cada ensayo había prometido medir de antemano. La lectura de que once publicaciones transmitían un resultado positivo era la valoración de los autores del estudio, no de la agencia, y ellos mismos lo dijeron. Lo que no es cuestión de opinión son los veintidós que nunca aparecieron.",
  "What never reached print": "Lo que nunca llegó a la imprenta",
  "Publication bias": "El sesgo de publicación",
  "The published literature is not a sample of the research done. It is the research that someone chose to submit and someone chose to print, and success survives that filter far better than failure.":
    "La literatura publicada no es una muestra de la investigación que se hizo. Es la investigación que alguien decidió enviar y alguien decidió imprimir, y el éxito sobrevive a ese filtro mucho mejor que el fracaso.",
  "This is why a registry matters more than it sounds. Requiring every trial to be declared before it starts creates the denominator, so the missing ones become countable instead of invisible. When you read a review, the question is not only what the studies found but whether you are looking at all of them.":
    "Por eso un registro importa más de lo que parece. Exigir que todo ensayo se declare antes de empezar crea el denominador, así que los que faltan pasan a ser contables en lugar de invisibles. Cuando leas una revisión, la pregunta no es solo qué encontraron los estudios, sino si los estás viendo todos.",
  "Nothing here requires anyone to lie. A trial that finds nothing is duller to write up, harder to place, and commercially unwelcome, so it drifts to the bottom of the pile and quietly never gets finished. Repeat that across a field and the surviving literature is systematically sunnier than the research was. The effect compounds, because reviews and guidelines are built on what was published, so the gap is inherited by everything downstream and looks like accumulating evidence rather than a filter. Two things push back. The first is registration: declare the trial and its primary outcome before you start, and an unpublished result leaves a visible hole rather than no trace. The second is the funnel plot, which exploits the fact that small studies scatter widely and large ones cluster; if the small studies that should have landed on the disappointing side are missing, the scatter comes out lopsided. Neither fix works retrospectively on a literature that predates them, which is why the regulator's archive was the only way to answer this question at all.":
    "Nada de esto exige que nadie mienta. Un ensayo que no encuentra nada es más aburrido de redactar, más difícil de colocar y comercialmente incómodo, así que se va deslizando al fondo del montón y calladamente no se termina nunca. Repite eso en todo un campo y la literatura que sobrevive es sistemáticamente más luminosa de lo que fue la investigación. El efecto se acumula, porque las revisiones y las guías se construyen sobre lo publicado, así que todo lo que viene después hereda esa distancia y parece evidencia que se va sumando en lugar de un filtro. Dos cosas se le oponen. La primera es el registro: declara el ensayo y su desenlace principal antes de empezar, y un resultado sin publicar deja un agujero visible en lugar de ningún rastro. La segunda es el gráfico en embudo, que aprovecha que los estudios pequeños se dispersan mucho y los grandes se agrupan; si faltan los estudios pequeños que deberían haber caído del lado decepcionante, la dispersión sale torcida. Ninguno de los dos remedios funciona hacia atrás sobre una literatura anterior a ellos, y por eso el archivo de la agencia reguladora era la única manera de responder a esta pregunta.",
  "The drugs also looked stronger than they were":
    "Los fármacos también parecían más potentes de lo que eran",
  "The same trials were pooled twice, once as the regulator held them and once as the journals reported them. Measured across the complete set the average benefit was 0.31 on a standardised scale; measured from the published literature alone it was 0.41, about a third larger. That is a standardised mean difference, not a share of patients helped, and the effect was not confined to one drug: every one of the twelve looked better in the journals, by between 11 and 69 percent.":
    "Los mismos ensayos se combinaron en un metaanálisis dos veces, una tal como los guardaba la agencia reguladora y otra tal como los contaban las revistas. Medido sobre el conjunto completo, el beneficio medio fue de 0,31 en una escala estandarizada; medido solo a partir de la literatura publicada fue de 0,41, alrededor de un tercio mayor. Eso es una diferencia de medias estandarizada, no una proporción de pacientes a los que se ayuda, y el efecto no se limitaba a un fármaco: los doce parecían mejores en las revistas, entre un 11 y un 69 por ciento mejores.",
  "It got better, which is the point": "Ha mejorado, y esa es la cuestión",
  "The same team repeated the audit on four antidepressants approved between 2008 and 2013, after trial registration had become the norm. This time all 15 positive trials were reported transparently, and of the 15 negative ones 6 went unpublished and 2 were reported as positive. Still imperfect, and still worth knowing about, but the inflation in apparent effect had roughly halved. Publication bias is not a law of nature; it responds to rules about declaring trials in advance.":
    "El mismo equipo repitió la auditoría con cuatro antidepresivos aprobados entre 2008 y 2013, cuando registrar los ensayos ya se había convertido en la norma. Esta vez los 15 ensayos positivos se comunicaron de forma transparente, y de los 15 negativos 6 quedaron sin publicar y 2 se comunicaron como positivos. Sigue sin ser perfecto y sigue mereciendo la pena saberlo, pero la inflación del tamaño aparente del efecto se había reducido más o menos a la mitad. El sesgo de publicación no es una ley de la naturaleza; responde a las normas sobre declarar los ensayos de antemano.",
  "Publication bias, a reasoning trap.":
    "El sesgo de publicación, una trampa de razonamiento.",
  "Search the medical literature on a drug and you are not seeing the research that was done. You are seeing the research that got written up and accepted, and studies that found something clear survive that filter much better than studies that found nothing. For one class of drugs the regulator's complete archive showed about half the trials were positive, while the journals showed nearly all of them. Nobody had to lie for that to happen. The disappointing ones simply never got finished.":
    "Busca en la literatura médica sobre un fármaco y no estás viendo la investigación que se hizo. Estás viendo la investigación que se redactó y se aceptó, y los estudios que encontraron algo claro sobreviven a ese filtro mucho mejor que los que no encontraron nada. Para una clase de fármacos, el archivo completo de la agencia reguladora mostró que alrededor de la mitad de los ensayos eran positivos, mientras que las revistas mostraban casi todos. Nadie tuvo que mentir para que eso ocurriera. Los decepcionantes sencillamente nunca se terminaron.",
  "Three points of care. The positive or negative verdict on each trial is the regulator's own, on the outcome the trial specified in advance; the label questionable, and the reading that eleven publications conveyed a positive result, are the study authors' judgements and the paper says so. The published-trial figure of 48 of 51 is the sum of two printed counts, 37 and 11, rather than a single printed number. And the authors note that they excluded articles covering several studies at once, so they probably counted a few trials as unpublished that were technically published, which makes 22 and 23 upper bounds.":
    "Tres precauciones. El veredicto de positivo o negativo sobre cada ensayo es de la propia agencia reguladora, sobre el desenlace que el ensayo había especificado de antemano; la etiqueta de cuestionable, y la lectura de que once publicaciones transmitían un resultado positivo, son juicios de los autores del estudio, y el artículo así lo dice. La cifra de ensayos publicados de 48 de 51 es la suma de dos recuentos impresos, 37 y 11, y no un único número impreso. Y los autores señalan que excluyeron los artículos que abarcaban varios estudios a la vez, así que probablemente contaron como no publicados unos pocos ensayos que técnicamente sí lo estaban, lo que convierte 22 y 23 en cotas superiores.",

  // ==== Caza de trampas: sesgo de publicación y sesgo de duración ====
  "A review gathers every published trial of a treatment it can find. Eleven of the thirteen are positive, and it concludes the treatment works. The review does not say how many trials of the treatment were ever started.":
    "Una revisión reúne todos los ensayos publicados de un tratamiento que consigue encontrar. Once de los trece son positivos, y concluye que el tratamiento funciona. La revisión no dice cuántos ensayos de ese tratamiento se llegaron a iniciar.",
  "Searching the literature finds the studies that reached print, not the studies that were run. Without knowing how many were started, there is no way to tell whether two disappointing trials is the whole story or the visible corner of it.":
    "Buscar en la literatura encuentra los estudios que llegaron a la imprenta, no los estudios que se hicieron. Sin saber cuántos se iniciaron, no hay manera de saber si dos ensayos decepcionantes son toda la historia o solo la esquina visible de ella.",
  "A researcher runs a study that finds nothing, decides it is not interesting enough to write up, and moves on to the next project. Several colleagues in the same field do the same thing that year.":
    "Un investigador hace un estudio que no encuentra nada, decide que no es lo bastante interesante como para redactarlo y pasa al proyecto siguiente. Varios colegas del mismo campo hacen lo mismo ese año.",
  "Nobody here has done anything dishonest, and that is exactly the point. The filter is made of ordinary decisions about what is worth the effort, and it still leaves the published record systematically sunnier than the research was.":
    "Nadie ha hecho aquí nada deshonesto, y esa es justamente la cuestión. El filtro está hecho de decisiones corrientes sobre qué merece el esfuerzo, y aun así deja el registro publicado sistemáticamente más luminoso de lo que fue la investigación.",
  "A clinic reports that men whose cancer was picked up by its regular screening programme are far more likely to still be alive ten years on than men who came in with symptoms. It concludes that screening works.":
    "Una consulta informa de que los hombres a los que su programa periódico de cribado detectó el cáncer tienen muchas más probabilidades de seguir vivos diez años después que los hombres que llegaron con síntomas. Concluye que el cribado funciona.",
  "A test run at intervals catches slow tumours easily and fast ones hardly at all, because fast ones surface between visits. So the screen-detected group is loaded with the gentle kind of disease before treatment is even considered.":
    "Un test que se hace a intervalos detecta con facilidad los tumores lentos y casi nunca los rápidos, porque los rápidos afloran entre una visita y otra. Así que el grupo detectado por cribado está cargado del tipo manso de enfermedad antes incluso de plantearse el tratamiento.",
  "A new scan finds three times as many cases of a cancer as were previously diagnosed in the same population, and the people it finds do very well. Deaths from that cancer in the population are unchanged.":
    "Una nueva prueba de imagen encuentra el triple de casos de un cáncer de los que antes se diagnosticaban en la misma población, y a las personas que detecta les va muy bien. Las muertes por ese cáncer en la población no cambian.",
  "More cases found, the same number of deaths, and excellent outcomes among the extra cases is the signature of finding disease that was never going to cause harm. The survival figures improve because the denominator filled up with people who were never in danger.":
    "Más casos encontrados, el mismo número de muertes y unos resultados excelentes entre los casos de más son la firma de estar encontrando enfermedad que nunca iba a causar daño. Las cifras de supervivencia mejoran porque el denominador se llenó de personas que nunca estuvieron en peligro.",

  // ---- intention to treat, recall bias, immortal time ----
  "Among the patients who actually got the treatment they were assigned, surgery saved lives. Is that the trial's answer?":
    "Entre los pacientes que realmente recibieron el tratamiento asignado, la cirugía salvó vidas. ¿Es esa la respuesta del ensayo?",
  "1,212 people with heart failure, randomly assigned to medicine alone or to medicine plus bypass surgery. Analysing the ones who received what they were assigned, 43 percent of the medicine group died against 34 percent of the surgery group. The difference is statistically significant.":
    "1.212 personas con insuficiencia cardiaca, aleatorizadas a tratamiento médico solo o a tratamiento médico más cirugía de derivación coronaria. Analizando a quienes recibieron lo que se les asignó, murió el 43 por ciento del grupo médico frente al 34 por ciento del grupo quirúrgico. La diferencia es estadísticamente significativa.",
  "Does this trial show that surgery cuts deaths?":
    "¿Demuestra este ensayo que la cirugía reduce las muertes?",
  "Died during follow-up":
    "Fallecidos durante el seguimiento",
  "Medicine alone":
    "Solo tratamiento médico",
  "Medicine":
    "Médico",
  "Surgery added":
    "Cirugía añadida",
  "Surgery":
    "Cirugía",
  "Only those who got what they were assigned":
    "Solo quienes recibieron lo asignado",
  "Everyone, as the coin assigned them":
    "Todos, según los asignó la moneda",
  "The patients left out of the first panel":
    "Los pacientes excluidos del primer panel",
  "Those who followed the protocol":
    "Quienes cumplieron el protocolo",
  "Yes, that is what surgery does":
    "Sí, eso es lo que hace la cirugía",
  "nine points fewer deaths":
    "nueve puntos menos de muertes",
  "No, and it understates the benefit":
    "No, y subestima el beneficio",
  "crossovers dilute a real effect":
    "los cambios de rama diluyen un efecto real",
  "No, that comparison is no longer randomised":
    "No, esa comparación ya no es aleatorizada",
  "dying is why some were left out":
    "morir es el motivo de algunas exclusiones",
  "Counting everyone the coin assigned, the difference is not significant.":
    "Contando a todos los que asignó la moneda, la diferencia no es significativa.",
  "The surgical patients who were dropped had mostly died first":
    "Los pacientes quirúrgicos excluidos habían muerto antes, en su mayoría",
  "The 120 patients missing from the first panel are not a random sample. Of the 55 dropped from the surgery group, 30 died, and most of them died before they ever reached an operating table. Of the 65 dropped from the medicine group, only 15 died, because crossing over to surgery required living long enough to have it. So the surgical arm shed its worst outcomes and the medical arm lost its best, and the gap nearly doubled without one patient's fate changing:":
    "Los 120 pacientes que faltan en el primer panel no son una muestra aleatoria. De los 55 excluidos del grupo quirúrgico, murieron 30, y la mayoría murió antes de llegar siquiera al quirófano. De los 65 excluidos del grupo médico, solo murieron 15, porque pasarse a la cirugía exigía vivir lo suficiente para recibirla. Así, la rama quirúrgica se deshizo de sus peores desenlaces y la médica perdió los mejores, y la diferencia casi se duplicó sin que cambiara el destino de ni un solo paciente:",
  "All three views of one trial":
    "Las tres vistas de un mismo ensayo",
  "A randomised comparison is only worth something while it is still random. The coin flip made the two groups alike; deciding afterwards who counts, on the basis of something that happened after the flip, undoes that. Here the deciding factor was survival itself, which is the outcome being measured. Counting everyone in the group they were assigned to, whatever happened next, is the analysis that keeps the coin flip intact.":
    "Una comparación aleatorizada solo vale algo mientras sigue siendo aleatoria. El lanzamiento de la moneda hizo que los dos grupos fueran semejantes; decidir después quién cuenta, a partir de algo ocurrido tras el lanzamiento, lo deshace. Aquí el factor decisivo fue la propia supervivencia, que es el desenlace que se mide. Contar a cada persona en el grupo al que se le asignó, pasara lo que pasara luego, es el análisis que mantiene intacto el lanzamiento de la moneda.",
  "Who the analysis dropped":
    "A quién excluyó el análisis",
  "Intention to treat":
    "Intención de tratar",
  "Once you exclude people for what happened after they were randomised, you are no longer comparing the groups the coin made, and the exclusions usually favour one side.":
    "En cuanto excluyes a personas por lo que ocurrió después de aleatorizarlas, ya no comparas los grupos que creó la moneda, y las exclusiones suelen favorecer a un lado.",
  "This is not a rule that per-protocol analysis is dishonest. It answers a different question, and there are trials where it is the right one to ask. The rule is narrower and harder: any analysis that drops people for something that happened after randomisation has to explain why those people were not different, and when the reason for dropping is entangled with the outcome, no explanation will do.":
    "Esto no significa que el análisis por protocolo sea deshonesto. Responde a otra pregunta, y hay ensayos en los que es la pregunta correcta. La regla es más estrecha y más exigente: todo análisis que excluya personas por algo ocurrido después de la aleatorización tiene que explicar por qué esas personas no eran distintas, y cuando el motivo de la exclusión se enreda con el desenlace, ninguna explicación basta.",
  "Randomisation buys one thing: two groups that differ only by chance, including in all the ways nobody measured. Everything a trial claims rests on that. The trouble is that trials are run on people, who cross over, refuse the operation, stop the tablets or die before treatment starts, and it is tempting to set those people aside and look at the clean comparison underneath. But whether someone stayed on protocol is itself an outcome. Patients who cross from medicine to surgery must survive to be operated on. Patients assigned to surgery who never get it are often the ones too ill to be operated on, or already dead. Removing them is removing patients selected by prognosis, and prognosis is what the trial is measuring. Intention to treat keeps everyone in the arm the coin put them in, which sounds absurd when a patient never received the treatment, and is exactly the point: it measures the effect of the decision to treat, under real conditions, which is also the decision a doctor actually faces. It has a known cost. Crossovers pull the arms together, so intention to treat tends to shrink a real effect towards nothing. That is a conservative failure when you are trying to prove a drug works, and a dangerous one when you are trying to prove a drug is no worse than another, which is why non-inferiority trials report both analyses and are believed only when the two agree.":
    "La aleatorización compra una sola cosa: dos grupos que solo difieren por azar, también en todo aquello que nadie midió. Todo lo que afirma un ensayo se apoya en eso. El problema es que los ensayos se hacen con personas, que cambian de rama, rechazan la operación, dejan las pastillas o mueren antes de empezar el tratamiento, y resulta tentador apartar a esas personas y mirar la comparación limpia que queda debajo. Pero que alguien cumpliera el protocolo es en sí mismo un desenlace. Los pacientes que pasan del tratamiento médico a la cirugía tienen que sobrevivir para ser operados. Los asignados a cirugía que nunca la reciben suelen ser los demasiado graves para operarse, o los que ya han muerto. Quitarlos es quitar pacientes seleccionados por su pronóstico, y el pronóstico es justo lo que el ensayo mide. El análisis por intención de tratar mantiene a cada persona en la rama en la que la puso la moneda, lo que suena absurdo cuando un paciente nunca recibió el tratamiento, y es precisamente la idea: mide el efecto de la decisión de tratar, en condiciones reales, que es también la decisión a la que se enfrenta un médico. Tiene un coste conocido. Los cambios de rama acercan las ramas entre sí, de modo que la intención de tratar tiende a encoger un efecto real hacia la nada. Ese fallo es conservador cuando intentas demostrar que un fármaco funciona, y peligroso cuando intentas demostrar que un fármaco no es peor que otro, y por eso los ensayos de no inferioridad publican los dos análisis y solo se creen cuando ambos coinciden.",
  "The same trap, without the verdict flipping":
    "La misma trampa, sin que cambie el veredicto",
  "A tuberculosis trial compared shorter regimens with the standard six-month one. In the group treated per protocol, the standard regimen appeared to fail in about 8 percent of patients. Counting everyone who was randomised and had an assessable outcome, it failed in about 16 percent. Almost everyone the per-protocol analysis removed had had an unfavourable outcome, because an unfavourable outcome was frequently the reason they left the protocol. Nothing about the trial's conclusion changed, and every failure rate in it halved.":
    "Un ensayo de tuberculosis comparó pautas más cortas con la estándar de seis meses. En el grupo analizado por protocolo, la pauta estándar parecía fracasar en torno al 8 por ciento de los pacientes. Contando a todos los aleatorizados con un desenlace evaluable, fracasó en torno al 16 por ciento. Casi todos los que el análisis por protocolo eliminó habían tenido un desenlace desfavorable, porque un desenlace desfavorable era con frecuencia el motivo de que abandonaran el protocolo. La conclusión del ensayo no cambió en nada, y todas sus tasas de fracaso se redujeron a la mitad.",
  "Intention to treat, a reasoning trap.":
    "Intención de tratar, una trampa de razonamiento.",
  "A trial flips a coin so its two groups start out alike. Then real life happens: people switch treatments, refuse the operation, or die before it. It seems only fair to compare the ones who actually got what they were assigned. It is not, because whether someone stuck to the plan depends on how they were doing, and often on whether they survived. Dropping them quietly sorts the groups by prognosis, which is the very thing the trial is trying to measure. Count everyone where the coin put them, and the flattering result can vanish.":
    "Un ensayo lanza una moneda para que sus dos grupos empiecen siendo semejantes. Luego llega la vida real: la gente cambia de tratamiento, rechaza la operación o muere antes de recibirla. Parece justo comparar solo a quienes recibieron de verdad lo que se les asignó. No lo es, porque cumplir el plan depende de cómo iba cada uno, y a menudo de si sobrevivió. Excluirlos ordena en silencio los grupos por pronóstico, que es justo lo que el ensayo intenta medir. Cuenta a cada persona donde la puso la moneda y el resultado halagüeño puede desaparecer.",
  "The four counts in the first two panels are printed. The third panel is subtraction over those printed integers rather than figures of its own: 65 and 55 are 602 minus 537 and 610 minus 555, and 15 and 30 are 244 minus 229 and 218 minus 188. It closes three ways. The excluded patients reassemble the as-treated arms, 537 plus 55 and 555 plus 65 giving 592 and 620, which sum to the 1,212 randomised; and total deaths are conserved in every split, 244 plus 218 and 259 plus 203 both giving 462. Note also that the trial's P values, 0.12 as randomised and 0.005 per protocol, come from Cox proportional-hazards models over the whole follow-up, not from these four-cell tables, so they are quoted as the trial's own results and not recomputed here.":
    "Los cuatro recuentos de los dos primeros paneles están publicados. El tercer panel es una resta sobre esos enteros publicados y no cifras propias: 65 y 55 son 602 menos 537 y 610 menos 555, y 15 y 30 son 244 menos 229 y 218 menos 188. Cuadra por tres vías. Los pacientes excluidos recomponen las ramas según el tratamiento recibido, 537 más 55 y 555 más 65 dan 592 y 620, que suman los 1.212 aleatorizados; y el total de muertes se conserva en cada reparto, 244 más 218 y 259 más 203 dan ambos 462. Ten en cuenta además que los valores de P del ensayo, 0,12 según la aleatorización y 0,005 por protocolo, proceden de modelos de riesgos proporcionales de Cox sobre todo el seguimiento y no de estas tablas de cuatro celdas, por lo que se citan como resultados del propio ensayo y no se recalculan aquí.",
  "Women with melanoma report burning easily far more often than women without it. How much of that gap is their skin?":
    "Las mujeres con melanoma dicen quemarse con facilidad mucho más a menudo que las mujeres sin melanoma. ¿Qué parte de esa diferencia es su piel?",
  "141 women who had been diagnosed with melanoma and 1,094 who had not, asked how their skin responds to the sun. 45 percent of the women with melanoma said they tan little or not at all, against 25 percent of the others. Pale, easily burned skin is a known risk factor, so the finding looks exactly as expected.":
    "141 mujeres diagnosticadas de melanoma y 1.094 sin diagnóstico, a las que se preguntó cómo responde su piel al sol. El 45 por ciento de las mujeres con melanoma dijo que se broncea poco o nada, frente al 25 por ciento de las demás. La piel clara, que se quema con facilidad, es un factor de riesgo conocido, así que el hallazgo es exactamente el esperado.",
  "Is that twenty point gap what their skin was really like?":
    "¿Refleja esa diferencia de veinte puntos cómo era realmente su piel?",
  "Said their skin tans little or not at all":
    "Dijeron que su piel se broncea poco o nada",
  "Women who developed melanoma":
    "Mujeres que desarrollaron melanoma",
  "Melanoma":
    "Melanoma",
  "Women who did not":
    "Mujeres que no",
  "No melanoma":
    "Sin melanoma",
  "Asked after the diagnosis":
    "Preguntadas después del diagnóstico",
  "Asked years before anyone knew":
    "Preguntadas años antes de que nadie lo supiera",
  "Yes, pale skin is a real risk factor":
    "Sí, la piel clara es un factor de riesgo real",
  "the gap is their skin":
    "la diferencia es su piel",
  "No, the whole association is an artefact":
    "No, toda la asociación es un artefacto",
  "they are reinterpreting their past":
    "están reinterpretando su pasado",
  "Partly, and part of it appeared afterwards":
    "En parte, y otra parte apareció después",
  "real, but not this large":
    "real, pero no tan grande",
  "These same women had already answered, years earlier.":
    "Estas mismas mujeres ya habían respondido, años antes.",
  "The question was answered by a different person, in a sense":
    "En cierto sentido, la respuesta la dio otra persona",
  "Every one of these women filled in the same question before anyone knew who would get melanoma. Back then the gap was thirteen points, not twenty. The women who went on to be diagnosed shifted seven points towards saying they burn; the women who were not diagnosed, answering over the same years, shifted a point the other way. Nobody's skin changed in between. What changed was that some of them had since been asked to explain a cancer:":
    "Todas estas mujeres respondieron a la misma pregunta antes de que nadie supiera quién tendría melanoma. Entonces la diferencia era de trece puntos, no de veinte. Las mujeres que después fueron diagnosticadas se desplazaron siete puntos hacia decir que se queman; las que no fueron diagnosticadas, respondiendo en los mismos años, se desplazaron un punto en sentido contrario. A nadie le cambió la piel entretanto. Lo que cambió es que a algunas les habían pedido desde entonces que explicaran un cáncer:",
  "The same women, asked twice":
    "Las mismas mujeres, preguntadas dos veces",
  "So the risk factor is real and the study still overstates it: the crude odds ratio these counts give is about 1.8 before the diagnosis and about 2.5 after it, so roughly a third of what the later study measured was not there beforehand. That is the awkward shape of recall bias. It rarely conjures an association out of nothing. It takes a true one and inflates it, which is far harder to spot, because the result still agrees with everything you already believed.":
    "Así que el factor de riesgo es real y aun así el estudio lo exagera: la odds ratio cruda que dan estos recuentos es de aproximadamente 1,8 antes del diagnóstico y de aproximadamente 2,5 después, de modo que alrededor de un tercio de lo que midió el estudio posterior no estaba allí antes. Esa es la forma incómoda del sesgo de memoria. Rara vez inventa una asociación de la nada. Toma una verdadera y la infla, lo que es mucho más difícil de detectar, porque el resultado sigue concordando con todo lo que ya creías.",
  "What the diagnosis changed":
    "Lo que cambió el diagnóstico",
  "Recall bias":
    "Sesgo de memoria",
  "People who know how their story ended remember the beginning differently, so asking about the past after the outcome is known measures the outcome as well as the past.":
    "Quien sabe cómo terminó su historia recuerda el principio de otra manera, así que preguntar por el pasado cuando ya se conoce el desenlace mide también el desenlace, no solo el pasado.",
  "Nobody here is lying. Searching your memory harder because you have been given a reason to search it is an ordinary human thing to do, and the answers that come back are honestly meant. That is what makes it so hard to correct for: there is no dishonest group to exclude and no question you can ask that fixes it, because the more carefully someone thinks about it, the worse it gets.":
    "Aquí nadie miente. Rebuscar más en la memoria porque te han dado un motivo para hacerlo es algo humano corriente, y las respuestas que salen son sinceras. Eso es lo que hace tan difícil corregirlo: no hay un grupo deshonesto al que excluir ni una pregunta que puedas hacer que lo arregle, porque cuanto más cuidadosamente piensa alguien en ello, peor se pone.",
  "A case-control study starts from the outcome and works backwards, asking people who have a disease and people who do not what they were exposed to. It is fast, it is cheap, and for a rare disease it is often the only design that will ever be affordable. Its weakness is that one group has been given a reason to search their memory. A diagnosis prompts the question \"why me\", and the mind answers it, reaching for the sunburn, the chemical, the medicine, the difficult pregnancy. The other group has no such prompt and remembers no harder than anyone remembers anything. So the two groups are not just being compared on exposure, they are being compared on how hard they looked. The direction is usually predictable: it inflates whatever the person already suspects is to blame, which means it tends to confirm the hypothesis under test. The defences are all about not relying on memory. Take the exposure from a record written before the outcome, from a prescription database, a workplace log, a stored blood sample, a questionnaire filled in years earlier. Or build in a comparison the mechanism cannot touch, such as a second exposure question that nobody associates with the disease: if the groups drift equally on that one, the drift is not about the disease. What does not work is asking the question more carefully, and what does not work is telling people to be objective.":
    "Un estudio de casos y controles parte del desenlace y va hacia atrás: pregunta a personas que tienen una enfermedad y a personas que no la tienen a qué estuvieron expuestas. Es rápido, es barato y, para una enfermedad rara, suele ser el único diseño asequible. Su debilidad es que a uno de los grupos se le ha dado un motivo para rebuscar en su memoria. Un diagnóstico plantea la pregunta «por qué a mí», y la mente la responde echando mano de la quemadura solar, el producto químico, el medicamento, el embarazo complicado. El otro grupo no recibe ese estímulo y no recuerda con más empeño de lo que cualquiera recuerda cualquier cosa. Así que los dos grupos no solo se comparan en exposición, se comparan en cuánto buscaron. La dirección suele ser previsible: infla aquello que la persona ya sospecha que tiene la culpa, lo que significa que tiende a confirmar la hipótesis puesta a prueba. Las defensas consisten todas en no depender de la memoria. Toma la exposición de un registro escrito antes del desenlace: una base de datos de prescripciones, un registro laboral, una muestra de sangre almacenada, un cuestionario rellenado años antes. O incorpora una comparación que el mecanismo no pueda tocar, como una segunda pregunta de exposición que nadie asocia con la enfermedad: si los grupos se desvían por igual en esa, la desviación no tiene que ver con la enfermedad. Lo que no funciona es preguntar con más cuidado, y lo que no funciona es pedir a la gente que sea objetiva.",
  "The study everyone credits for this does not show it":
    "El estudio al que todos lo atribuyen no lo demuestra",
  "A 1967 Finnish study is cited across the literature as the origin of recall bias. It re-interviewed mothers whose answers had been recorded during pregnancy, and its own text reports no significant difference between the mothers of affected and healthy children in how often the replies disagreed. What it does show, and spectacularly, is something else: only about a quarter of the information collected prospectively reappeared identically at re-interview, and roughly two thirds of the retrospective positive answers had no prospective record behind them, in both groups alike. That is not recall bias, it is a warning that retrospective interviews are unreliable even when nobody is biased at all.":
    "Un estudio finlandés de 1967 se cita en toda la literatura como el origen del sesgo de memoria. Reentrevistó a madres cuyas respuestas se habían registrado durante el embarazo, y su propio texto no encuentra diferencia significativa entre las madres de niños afectados y las de niños sanos en la frecuencia con que las respuestas discrepaban. Lo que sí muestra, y de forma espectacular, es otra cosa: solo alrededor de una cuarta parte de la información recogida de forma prospectiva reapareció idéntica en la reentrevista, y aproximadamente dos tercios de las respuestas positivas retrospectivas no tenían detrás ningún registro prospectivo, por igual en ambos grupos. Eso no es sesgo de memoria, es un aviso de que las entrevistas retrospectivas no son fiables ni siquiera cuando nadie está sesgado.",
  "And the largest test of it found almost none":
    "Y la mayor comprobación apenas encontró sesgo",
  "The biggest study of this design compared what parents said in interview against what their family doctor had already written down, for 1,624 children with cancer and 2,524 without. Agreement with the records was poor in places, but it was poor in much the same way in both groups. The authors found essentially no evidence that having a sick child changed how the past was reported. Recall bias is a real mechanism and a reason to prefer records over memory. It is not a law that memory always bends, and a study is not discredited by the mere fact that it asked people to remember.":
    "El mayor estudio de este diseño comparó lo que dijeron los padres en la entrevista con lo que su médico de familia ya había anotado, en 1.624 niños con cáncer y 2.524 sin él. La concordancia con los registros era mala en algunos puntos, pero era mala de forma muy parecida en ambos grupos. Los autores no encontraron prácticamente ninguna prueba de que tener un hijo enfermo cambiara la manera de relatar el pasado. El sesgo de memoria es un mecanismo real y un motivo para preferir los registros a la memoria. No es una ley que la memoria siempre se doble, y un estudio no queda desacreditado por el mero hecho de haber pedido a alguien que recordara.",
  "Recall bias, a reasoning trap.":
    "Sesgo de memoria, una trampa de razonamiento.",
  "Ask someone what they were exposed to before they got ill and you are not only asking about the past, you are asking someone who has been given a reason to search it. A diagnosis makes people look harder, and looking harder turns up more. In one study the same women answered the same question about their skin years apart, once before anyone knew and once after a melanoma diagnosis, and the ones who had been diagnosed had shifted. Their skin had not. This rarely invents a finding from nothing. It takes a true one and makes it look bigger, which is much harder to catch, because the answer still agrees with what you expected.":
    "Pregunta a alguien a qué estuvo expuesto antes de enfermar y no solo preguntas por el pasado: preguntas a alguien a quien se le ha dado un motivo para rebuscarlo. Un diagnóstico hace que la gente busque con más empeño, y buscar más saca más cosas. En un estudio, las mismas mujeres respondieron a la misma pregunta sobre su piel con años de diferencia, una vez antes de que nadie supiera nada y otra tras un diagnóstico de melanoma, y las que habían sido diagnosticadas se habían desplazado. Su piel no. Esto rara vez inventa un hallazgo de la nada. Toma uno verdadero y lo hace parecer mayor, lo que es mucho más difícil de detectar, porque la respuesta sigue coincidiendo con lo que esperabas.",
  "Two things a careful reader should know. First, the reference standard is the woman's own questionnaire filled in before diagnosis, not an external record, so this shows that the answers moved rather than which of the two answers was correct, and the authors' own conclusion is appropriately hedged: tanning ability was the one host factor whose shift was significant in the cases and not in the controls. Second, the paper prints odds ratios of 1.90 and 3.01 for this comparison. Those are the authors' own estimates and are not the crude odds ratios of these four cells, which are 1.80 and 2.55. The two pairs move in the same direction by a similar factor but they are not the same quantity, so only the crude ones, which anyone can recompute from the counts shown, appear in the text above.":
    "Dos cosas que conviene saber a un lector cuidadoso. Primera, el patrón de referencia es el propio cuestionario que la mujer rellenó antes del diagnóstico, no un registro externo, de modo que esto muestra que las respuestas se movieron, no cuál de las dos era correcta, y la conclusión de los autores está matizada con prudencia: la capacidad de broncearse fue el único factor del huésped cuyo desplazamiento resultó significativo en los casos y no en los controles. Segunda, el artículo publica odds ratios de 1,90 y 3,01 para esta comparación. Son las estimaciones de los propios autores y no son las odds ratios crudas de estas cuatro celdas, que son 1,80 y 2,55. Los dos pares se mueven en la misma dirección y en un factor parecido, pero no son la misma magnitud, así que en el texto de arriba solo aparecen las crudas, que cualquiera puede recalcular a partir de los recuentos mostrados.",
  "Patients who were dispensed this drug died far less often than those who were not. Is the drug working?":
    "Los pacientes a los que se dispensó este fármaco murieron mucho menos que aquellos a los que no. ¿Está funcionando el fármaco?",
  "A cohort is followed from the day each patient enters it. Anyone who is dispensed the drug at any point during follow-up counts as treated; everyone else counts as untreated. 49 percent of the treated died against 71 percent of the untreated, and the drug appears to halve the death rate.":
    "Una cohorte se sigue desde el día en que entra cada paciente. Quien recibe el fármaco en cualquier momento del seguimiento cuenta como tratado; el resto cuenta como no tratado. Murió el 49 por ciento de los tratados frente al 71 por ciento de los no tratados, y el fármaco parece reducir a la mitad la mortalidad.",
  "Is that gap the drug?":
    "¿Es el fármaco esa diferencia?",
  "One patient from each group":
    "Un paciente de cada grupo",
  "months":
    "meses",
  "entered the cohort":
    "entró en la cohorte",
  "first prescription dispensed":
    "primera receta dispensada",
  "follow-up credited to each group":
    "seguimiento atribuido a cada grupo",
  "Counted, but death was impossible":
    "Contado, pero morir era imposible",
  "Follow-up credited to each group":
    "Seguimiento atribuido a cada grupo",
  "Counted as on the drug":
    "Contado como en tratamiento",
  "Counted as not on the drug":
    "Contado como sin tratamiento",
  "As the study counted it":
    "Tal como lo contó el estudio",
  "Yes, the drug is keeping them alive":
    "Sí, el fármaco los mantiene vivos",
  "half the deaths":
    "la mitad de las muertes",
  "No, the untreated were sicker to begin with":
    "No, los no tratados ya estaban más graves",
  "they were never offered it":
    "nunca se lo ofrecieron",
  "No, some of that time could not contain a death":
    "No, parte de ese tiempo no podía contener una muerte",
  "the clock was started too early":
    "el reloj se puso en marcha demasiado pronto",
  "Half the treated group's follow-up was time in which nobody could die.":
    "La mitad del seguimiento del grupo tratado fue tiempo en el que nadie podía morir.",
  "Surviving is what put them in the treated group":
    "Sobrevivir es lo que los puso en el grupo tratado",
  "This patient was counted as treated from the day they entered, but the prescription was not dispensed until month 11. Those eleven months are immortal: had the patient died in month 6, no prescription would ever have been written and they would have been counted in the other group instead. Death was not merely unlikely in that stretch, it was impossible by the way the groups were defined, and it is credited to the drug all the same:":
    "A este paciente se le contó como tratado desde el día en que entró, pero la receta no se dispensó hasta el mes 11. Esos once meses son inmortales: si el paciente hubiera muerto en el mes 6, nunca se habría escrito receta alguna y se le habría contado en el otro grupo. La muerte no era solo improbable en ese tramo, era imposible por la forma en que se definieron los grupos, y aun así se le atribuye al fármaco:",
  "The same follow-up, marked":
    "El mismo seguimiento, señalado",
  "Nothing about the patients has to differ for this to work. Give both groups exactly the same drug, the same illness and the same luck, and the treated group will still come out ahead, because it has been handed a run of guaranteed survival that the other group cannot have. In the published example this is drawn from, the treated group was credited with 291.1 immortal person-years against 276.3 person-years in which it was genuinely at risk: more of its follow-up was impossible-to-die time than was real. Correcting only that moved the hazard ratio from 0.48 to 0.91.":
    "No hace falta que los pacientes se diferencien en nada para que esto funcione. Da a los dos grupos exactamente el mismo fármaco, la misma enfermedad y la misma suerte, y el grupo tratado seguirá saliendo ganando, porque se le ha regalado un tramo de supervivencia garantizada que el otro grupo no puede tener. En el ejemplo publicado del que procede esto, al grupo tratado se le atribuyeron 291,1 personas-año inmortales frente a 276,3 personas-año en las que estuvo realmente en riesgo: más parte de su seguimiento fue tiempo en el que era imposible morir que tiempo real. Corregir solo eso movió el hazard ratio de 0,48 a 0,91.",
  "The stretch before the prescription":
    "El tramo previo a la receta",
  "Immortal time bias":
    "Sesgo de tiempo inmortal",
  "If being in a group requires surviving until something happens, then the time before it happened cannot contain a death, and counting it towards that group manufactures survival out of bookkeeping.":
    "Si pertenecer a un grupo exige sobrevivir hasta que ocurra algo, el tiempo anterior a que ocurriera no puede contener una muerte, y atribuírselo a ese grupo fabrica supervivencia a base de contabilidad.",
  "The tell is a group defined by something that occurs after follow-up starts: filled the prescription, had the operation, responded to treatment, won the award, completed the course. Ask what happens to a person who dies the day before. If they land in the comparison group, the clock is wrong. The fix is not a cleverer adjustment: it is to count each person's time as unexposed until the moment they become exposed, and let them switch.":
    "La señal es un grupo definido por algo que ocurre después de que empiece el seguimiento: retiró la receta, se operó, respondió al tratamiento, ganó el premio, completó el programa. Pregúntate qué pasa con quien muere el día antes. Si acaba en el grupo de comparación, el reloj está mal. El arreglo no es un ajuste más ingenioso: consiste en contar el tiempo de cada persona como no expuesto hasta el momento en que pasa a estar expuesta, y dejar que cambie de grupo.",
  "Cohort studies compare rates, and a rate is deaths divided by time at risk. That denominator is where this hides. Suppose you want to know whether a drug helps, so you follow everyone admitted to hospital and sort them afterwards by whether they were ever dispensed it. The sorting looks innocent, but it uses information from the future: to be dispensed a drug in month 11, you must be alive in month 11. So every patient in the treated group is guaranteed to have survived to their own first prescription, and if you start their clock at admission you credit the treated group with all of that guaranteed survival. The untreated group gets no such gift, because it is where the early deaths necessarily land. The bias is large, it always points the same way, it makes useless drugs look protective, and it does not shrink with a bigger sample, because it is not noise. It also has nothing to do with confounding, which is why adjusting for how ill the patients were does not touch it: you can simulate the whole thing with identical patients and a drug that does nothing. The correct handling is standard and unglamorous. Treat exposure as time-varying: every patient contributes unexposed time from entry until their first prescription and exposed time after it, so nobody is credited to a group before they belong to it. The same trap sits under any claim built on people who finished something, from Academy Award winners living longer than nominees to patients who completed a rehabilitation programme, and in each case the first question is the same: what happens in these numbers to the person who died in the middle?":
    "Los estudios de cohortes comparan tasas, y una tasa son muertes divididas por tiempo en riesgo. En ese denominador es donde se esconde esto. Supón que quieres saber si un fármaco ayuda, así que sigues a todos los ingresados en el hospital y luego los clasificas según si alguna vez se les dispensó. La clasificación parece inocente, pero usa información del futuro: para que te dispensen un fármaco en el mes 11, tienes que estar vivo en el mes 11. De modo que todos los pacientes del grupo tratado sobrevivieron necesariamente hasta su primera receta, y si pones su reloj en marcha en el ingreso le atribuyes al grupo tratado toda esa supervivencia garantizada. El grupo no tratado no recibe ese regalo, porque es donde caen forzosamente las muertes tempranas. El sesgo es grande, apunta siempre en la misma dirección, hace que fármacos inútiles parezcan protectores y no disminuye con una muestra mayor, porque no es ruido. Tampoco tiene nada que ver con la confusión, y por eso ajustar por lo enfermos que estaban los pacientes no lo toca: puedes simularlo entero con pacientes idénticos y un fármaco que no hace nada. El manejo correcto es estándar y poco lucido. Trata la exposición como variable en el tiempo: cada paciente aporta tiempo no expuesto desde su entrada hasta su primera receta y tiempo expuesto a partir de ahí, de modo que nadie se atribuye a un grupo antes de pertenecer a él. La misma trampa está debajo de cualquier afirmación construida sobre personas que terminaron algo, desde los ganadores de un Óscar que viven más que los nominados hasta los pacientes que completaron un programa de rehabilitación, y en cada caso la primera pregunta es la misma: ¿qué pasa en estos números con quien murió por el camino?",
  "The Oscar winners who did not, after all, live longer":
    "Los ganadores del Óscar que, después de todo, no vivieron más",
  "A well-known study reported that Academy Award winners outlived the actors merely nominated alongside them by nearly four years, and it was widely read as evidence that status is good for your health. But an actor cannot win an award while dead, so every winner was credited with all the years before their win, whereas a nominee who died young could only ever be a nominee. Reanalysing the same data with the award treated as something that happens partway through a life, rather than a property of the whole life, cut the advantage to about a year and it was no longer statistically significant. The original authors later published a null result of their own.":
    "Un estudio muy conocido informó de que los ganadores del Óscar vivían casi cuatro años más que los actores simplemente nominados junto a ellos, y se leyó ampliamente como prueba de que el estatus es bueno para la salud. Pero un actor no puede ganar un premio estando muerto, así que a cada ganador se le atribuyeron todos los años previos a su premio, mientras que un nominado que moría joven nunca podía pasar de nominado. Al reanalizar los mismos datos tratando el premio como algo que ocurre a mitad de una vida, y no como una propiedad de la vida entera, la ventaja se redujo a alrededor de un año y dejó de ser estadísticamente significativa. Los autores originales publicaron después un resultado nulo propio.",
  "Immortal time bias, a reasoning trap.":
    "Sesgo de tiempo inmortal, una trampa de razonamiento.",
  "Sort people into groups by something that happens later, and one of those groups gets a hidden head start. To be counted as having taken the drug, you have to live long enough to be given it. So everybody in the treated group is guaranteed to have survived up to their first prescription, and if you count that stretch towards the drug, the drug is credited with survival it had nothing to do with. Anyone who died early is automatically filed under untreated. It works even when the drug does nothing at all, it always points the same way, and a bigger study only makes it more convincing.":
    "Clasifica a las personas en grupos según algo que ocurre después y uno de esos grupos recibe una ventaja oculta. Para contar como alguien que tomó el fármaco, tienes que vivir lo suficiente para que te lo den. Así que todos los del grupo tratado sobrevivieron necesariamente hasta su primera receta, y si cuentas ese tramo a favor del fármaco, se le atribuye una supervivencia con la que no tuvo nada que ver. Quien murió pronto queda archivado automáticamente como no tratado. Funciona incluso cuando el fármaco no hace nada, apunta siempre en la misma dirección, y un estudio más grande solo lo hace más convincente.",
  "The figure above is schematic, like the bomber diagram: two illustrative patients rather than two rows of the dataset, with proportions chosen to echo the published ones (eleven immortal months out of twenty-two counted, against 291.1 immortal person-years out of 567.4 counted, which is 51.3 percent). The numbers that are claims about the world, the death counts and the two hazard ratios, are all in the citation above and none of them is recomputed here: the hazard ratios come from survival models rather than from any two-by-two table, and the paper is a methodological reanalysis in which several cohort definitions are applied to one dataset, so the row is named exactly.":
    "La figura de arriba es esquemática, como el diagrama del bombardero: dos pacientes ilustrativos en lugar de dos filas del conjunto de datos, con proporciones elegidas para reflejar las publicadas (once meses inmortales de los veintidós contados, frente a 291,1 personas-año inmortales de las 567,4 contadas, que es el 51,3 por ciento). Las cifras que son afirmaciones sobre el mundo, los recuentos de muertes y los dos hazard ratios, están todas en la cita de arriba y ninguna se recalcula aquí: los hazard ratios proceden de modelos de supervivencia y no de ninguna tabla de dos por dos, y el artículo es un reanálisis metodológico en el que se aplican varias definiciones de cohorte a un mismo conjunto de datos, así que la fila se nombra con exactitud.",
  "A weight-loss trial randomly assigns 400 people to a programme or to usual care. It reports the average weight lost among the 180 programme participants who attended at least eight sessions, and among all 200 controls. The programme wins comfortably.":
    "Un ensayo de pérdida de peso asigna aleatoriamente a 400 personas a un programa o a la atención habitual. Informa del peso medio perdido entre los 180 participantes del programa que acudieron al menos a ocho sesiones, y entre la totalidad de los 200 controles. El programa gana con holgura.",
  "One arm has been filtered and the other has not. Attending eight sessions is something people who were doing well were more able to do, so the programme group has quietly been reduced to its successes while the control group keeps everybody.":
    "Una rama se ha filtrado y la otra no. Acudir a ocho sesiones era más fácil para quienes iban bien, así que el grupo del programa ha quedado reducido en silencio a sus éxitos mientras el grupo control conserva a todo el mundo.",
  "In a surgical trial, some patients assigned to medication deteriorate and are operated on anyway. The analysis counts each patient under the treatment they ended up receiving, and finds surgery ahead.":
    "En un ensayo quirúrgico, algunos pacientes asignados a tratamiento farmacológico empeoran y se les acaba operando. El análisis cuenta a cada paciente según el tratamiento que recibió finalmente y encuentra que la cirugía va por delante.",
  "Switching happened after the coin flip and for a reason: those patients had to survive long enough to reach the operating table. Counting people by what they received rather than what they were assigned sorts them by how they were doing, which is the thing being measured.":
    "El cambio ocurrió después del lanzamiento de la moneda y por un motivo: esos pacientes tuvieron que sobrevivir lo suficiente para llegar al quirófano. Contar a las personas por lo que recibieron en vez de por lo que se les asignó las ordena según cómo iban, que es justo lo que se está midiendo.",
  "A trial of a daily tablet excludes anyone who took less than 80 percent of their doses, on the grounds that the question is whether the drug works when actually taken. Both arms are filtered the same way.":
    "Un ensayo con una pastilla diaria excluye a quien tomó menos del 80 por ciento de sus dosis, con el argumento de que la pregunta es si el fármaco funciona cuando se toma de verdad. Las dos ramas se filtran del mismo modo.",
  "Filtering both arms identically does not repair it. Who manages to take 80 percent of their tablets differs by how well they are and by much else besides, so each arm loses a different kind of patient and the groups the coin made no longer exist.":
    "Filtrar las dos ramas igual no lo arregla. Quién consigue tomar el 80 por ciento de sus pastillas depende de cómo se encuentra y de muchas otras cosas, así que cada rama pierde un tipo distinto de paciente y los grupos que creó la moneda dejan de existir.",
  "A trial reports that among patients who completed the full twelve months, the new drug halved relapses. A quarter of that arm withdrew before twelve months and are not counted.":
    "Un ensayo informa de que, entre los pacientes que completaron los doce meses enteros, el fármaco nuevo redujo a la mitad las recaídas. Una cuarta parte de esa rama abandonó antes de los doce meses y no se contabiliza.",
  "People usually withdraw for a reason, and relapsing is one of the commonest. An analysis of completers can turn the drug's failures into people who simply are not in the table.":
    "La gente suele abandonar por algún motivo, y recaer es uno de los más frecuentes. Un análisis de quienes completan puede convertir los fracasos del fármaco en personas que simplemente no aparecen en la tabla.",
  "Mothers of babies born with a heart defect are interviewed about what they took during pregnancy, alongside mothers of healthy babies. The mothers of affected babies report far more medicine use in the first trimester, and a report concludes the medicines are implicated.":
    "Se entrevista a madres de bebés nacidos con una cardiopatía sobre lo que tomaron durante el embarazo, junto a madres de bebés sanos. Las madres de los bebés afectados refieren mucho más consumo de medicamentos en el primer trimestre, y un informe concluye que los medicamentos están implicados.",
  "One group has spent months being asked what went wrong and searching for it. The other has had no reason to think about the first trimester at all. The comparison is partly of what was taken and partly of how hard each group looked.":
    "A un grupo llevan meses preguntándole qué salió mal, y buscándolo. El otro no ha tenido ningún motivo para pensar en el primer trimestre. La comparación es en parte de lo que se tomó y en parte de cuánto buscó cada grupo.",
  "People with a brain tumour and people without are asked how many hours a week they used a mobile phone ten years ago, and on which side of the head. Those with a tumour report more hours, and more often on the side the tumour is on.":
    "Se pregunta a personas con un tumor cerebral y a personas sin él cuántas horas a la semana usaban el móvil hace diez años, y de qué lado de la cabeza. Quienes tienen un tumor refieren más horas, y más a menudo del lado en el que está el tumor.",
  "Nobody can accurately recall a decade of phone habits, so the gap is filled in, and the tumour tells them which side to fill it in on. Billing records would settle it; memory cannot.":
    "Nadie puede recordar con exactitud una década de hábitos telefónicos, así que el hueco se rellena, y el tumor indica de qué lado rellenarlo. Los registros de facturación lo zanjarían; la memoria no puede.",
  "After a bowel cancer diagnosis, patients are asked to describe their diet over the previous twenty years, and their answers are compared with those of healthy volunteers of the same age.":
    "Tras un diagnóstico de cáncer de colon, se pide a los pacientes que describan su dieta de los veinte años anteriores, y sus respuestas se comparan con las de voluntarios sanos de la misma edad.",
  "The patients have already been told which foods are suspected, and are reconstructing twenty years around a diagnosis. The volunteers are reconstructing twenty years around nothing in particular.":
    "A los pacientes ya les han dicho qué alimentos se sospechan, y reconstruyen veinte años en torno a un diagnóstico. Los voluntarios reconstruyen veinte años en torno a nada en particular.",
  "Workers making a compensation claim for back pain are asked how heavy their lifting used to be, and their answers are compared with those of colleagues who made no claim.":
    "A trabajadores que reclaman una indemnización por dolor de espalda se les pregunta cuánto peso levantaban antes, y sus respuestas se comparan con las de compañeros que no reclamaron.",
  "Both groups did the same job. Only one has spent months assembling an account of how demanding it was, and that account is what is being measured.":
    "Los dos grupos hicieron el mismo trabajo. Solo uno lleva meses construyendo un relato de lo exigente que era, y ese relato es lo que se está midiendo.",
  "A registry compares patients who received a transplant with those on the waiting list who did not, counting each patient's survival from the day they joined the list. The transplanted group lives far longer.":
    "Un registro compara a los pacientes que recibieron un trasplante con los de la lista de espera que no lo recibieron, contando la supervivencia de cada paciente desde el día en que entró en la lista. El grupo trasplantado vive mucho más.",
  "To be transplanted you must survive until an organ arrives, so everyone in that group is guaranteed to have lived from listing to surgery. Anyone who dies while waiting can only ever be in the other group.":
    "Para recibir un trasplante tienes que sobrevivir hasta que llegue un órgano, así que todos los de ese grupo vivieron necesariamente desde la inclusión en la lista hasta la operación. Quien muere esperando solo puede acabar en el otro grupo.",
  "A hospital reports that patients who completed the full six-week rehabilitation course had better one-year survival than those who did not, measured from the day of admission.":
    "Un hospital informa de que los pacientes que completaron el programa de rehabilitación de seis semanas tuvieron mejor supervivencia al año que quienes no lo completaron, medida desde el día del ingreso.",
  "Completing six weeks requires being alive for six weeks. The comparison group collects everyone who died in the meantime, and the course is credited with those first six weeks of guaranteed survival.":
    "Completar seis semanas exige estar vivo seis semanas. El grupo de comparación recoge a todos los que murieron entretanto, y al programa se le atribuyen esas primeras seis semanas de supervivencia garantizada.",
  "Using a prescription database, researchers classify each patient as a drug user if they were ever dispensed it during follow-up, and count follow-up from the date of their hospital discharge.":
    "Con una base de datos de prescripciones, unos investigadores clasifican a cada paciente como usuario del fármaco si alguna vez se le dispensó durante el seguimiento, y cuentan el seguimiento desde la fecha del alta hospitalaria.",
  "The classification uses the future. Time between discharge and the first dispensing cannot contain a death for anyone counted as a user, yet it is credited to the drug. Counting each patient as unexposed until their first prescription removes it.":
    "La clasificación usa el futuro. El tiempo entre el alta y la primera dispensación no puede contener una muerte para nadie contado como usuario, y aun así se le atribuye al fármaco. Contar a cada paciente como no expuesto hasta su primera receta lo elimina.",
  "An oncology paper reports that patients whose tumour responded to chemotherapy survived longer than non-responders, timing survival from the start of treatment. Response was assessed after three cycles.":
    "Un artículo de oncología informa de que los pacientes cuyo tumor respondió a la quimioterapia sobrevivieron más que los no respondedores, contando la supervivencia desde el inicio del tratamiento. La respuesta se evaluó tras tres ciclos.",
  "You cannot be classed as a responder unless you live to the assessment after three cycles. Patients who die during the first two cycles are all non-responders by construction, so the responder group starts with survival built into it.":
    "No puedes ser clasificado como respondedor si no llegas vivo a la evaluación posterior a los tres ciclos. Los pacientes que mueren durante los dos primeros ciclos son todos no respondedores por construcción, así que el grupo de respondedores parte con supervivencia incorporada.",
  "A drug-safety study counts each patient as untreated from enrolment until the day of their first prescription, and as treated from that day onwards, so a patient can contribute time to both groups.":
    "Un estudio de seguridad de fármacos cuenta a cada paciente como no tratado desde su inclusión hasta el día de su primera receta, y como tratado a partir de ese día, de modo que un paciente puede aportar tiempo a los dos grupos.",
  "Nobody is credited to a group before they belong to it, so no stretch of guaranteed survival is handed to the treated group. This is the standard fix, correctly applied.":
    "Nadie se atribuye a un grupo antes de pertenecer a él, así que no se le regala al grupo tratado ningún tramo de supervivencia garantizada. Es el arreglo estándar, aplicado correctamente.",
  "A study of patients who completed a course of treatment starts everyone's clock at the end of the course, and excludes anyone who died before that point from both groups alike.":
    "Un estudio de pacientes que completaron un ciclo de tratamiento pone en marcha el reloj de todos al terminar el ciclo, y excluye por igual de ambos grupos a quien murió antes de ese momento.",
  "Starting the clock after the point where group membership was settled means neither group can be credited with survival it was guaranteed. It costs some early data, and it removes the head start.":
    "Poner en marcha el reloj después del momento en que quedó decidida la pertenencia a cada grupo hace que a ninguno se le pueda atribuir una supervivencia que tenía garantizada. Cuesta algunos datos iniciales, y elimina la ventaja de salida.",
  "A study of a drug taken in pregnancy takes the exposure from the national prescription database rather than from interviews, then compares outcomes. Neither the mothers nor the researchers supplied the exposure data.":
    "Un estudio sobre un fármaco tomado en el embarazo toma la exposición de la base de datos nacional de prescripciones en lugar de las entrevistas, y después compara los desenlaces. Ni las madres ni los investigadores aportaron los datos de exposición.",
  "The exposure was written down before anyone knew the outcome, by someone with no stake in it. That is the standard defence against memory bending, and here it was used.":
    "La exposición quedó registrada antes de que nadie conociera el desenlace, y por alguien sin nada en juego. Esa es la defensa estándar frente a la memoria que se dobla, y aquí se ha usado.",
  "A case-control study asks about the suspected exposure and also about a second, unrelated one that nobody associates with the disease. Both groups report the second one at the same rate, and the authors say so before reporting the first.":
    "Un estudio de casos y controles pregunta por la exposición sospechosa y también por una segunda, no relacionada, que nadie asocia con la enfermedad. Los dos grupos refieren la segunda en la misma proporción, y los autores lo dicen antes de presentar la primera.",
  "The second question is a control for the searching itself. If one group were simply remembering harder across the board, it would show up there too, and it did not.":
    "La segunda pregunta es un control de la propia búsqueda. Si un grupo estuviera simplemente recordando con más empeño en todo, también aparecería ahí, y no apareció.",
  "A trial's main result counts every patient in the group they were randomly assigned to, including the 40 who never started the treatment. A per-protocol analysis is reported alongside it, agrees with it, and is labelled as secondary.":
    "El resultado principal de un ensayo cuenta a cada paciente en el grupo al que fue asignado aleatoriamente, incluidos los 40 que nunca empezaron el tratamiento. Junto a él se publica un análisis por protocolo, que coincide con el anterior y se etiqueta como secundario.",
  "The randomised comparison is the one the conclusion rests on, the other is shown for completeness, and the two agree. That is how both analyses are supposed to be used.":
    "La comparación aleatorizada es aquella en la que se apoya la conclusión, la otra se muestra para ser completos, y ambas coinciden. Así es como se supone que deben usarse los dos análisis.",
  "A trial testing whether a simpler regimen is no worse than the standard one reports both analyses, notes that counting non-adherent patients in their assigned group tends to make two treatments look alike, and declines to claim non-inferiority because only one of the two analyses supports it.":
    "Un ensayo que comprueba si una pauta más simple no es peor que la estándar publica los dos análisis, señala que contar a los pacientes no adherentes en su grupo asignado tiende a hacer que dos tratamientos parezcan iguales, y renuncia a afirmar la no inferioridad porque solo uno de los dos análisis la respalda.",
  "Counting everyone as assigned is conservative when you are trying to show a difference and permissive when you are trying to show similarity, so a non-inferiority claim needs both analyses to agree. Refusing to claim it when they disagree is the careful move, not the trap.":
    "Contar a todos según la asignación es conservador cuando intentas mostrar una diferencia y permisivo cuando intentas mostrar similitud, así que una afirmación de no inferioridad necesita que ambos análisis coincidan. Negarse a afirmarla cuando discrepan es la actitud cuidadosa, no la trampa.",
};
