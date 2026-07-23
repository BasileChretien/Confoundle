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
};
